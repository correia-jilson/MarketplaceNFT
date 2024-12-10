// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract NFTMarketplaceBidding is ReentrancyGuard {
    uint256 private _currentAuctionId;
    mapping(uint256 => Auction) public auctions;
    mapping(address => mapping(uint256 => uint256)) public tokenToAuctionId;
    mapping(address => uint256) public pendingReturns;
    uint256[] public activeAuctions;
    
    uint256 public constant MIN_AUCTION_DURATION = 1 hours;
    uint256 public constant MAX_AUCTION_DURATION = 7 days;
    
    struct Auction {
        uint256 auctionId;
        uint256 tokenId;
        address nftContract;
        address seller;
        uint256 startingPrice;
        uint256 endTime;
        address highestBidder;
        uint256 highestBid;
        bool ended;
        bool isActive;
        string ipfsHash;
    }
    
    event AuctionCreated(
        uint256 indexed auctionId,
        uint256 tokenId,
        address indexed nftContract,
        address indexed seller,
        uint256 startingPrice,
        uint256 endTime,
        string ipfsHash
    );
    
    event BidPlaced(
        uint256 indexed auctionId, 
        address indexed bidder, 
        uint256 amount
    );
    
    event AuctionEnded(
        uint256 indexed auctionId, 
        address indexed winner, 
        uint256 amount
    );
    
    event BidWithdrawn(
        address indexed bidder, 
        uint256 amount
    );
    
    function createAuction(
        address _nftContract,
        uint256 _tokenId,
        uint256 _startingPrice,
        uint256 _duration,
        string memory _ipfsHash
    ) external nonReentrant returns (uint256) {
        require(_startingPrice > 0, "Price must be greater than 0");
        require(_duration >= MIN_AUCTION_DURATION, "Duration too short");
        require(_duration <= MAX_AUCTION_DURATION, "Duration too long");
        require(_nftContract != address(0), "Invalid NFT contract address");

        IERC721 nft = IERC721(_nftContract);
        require(nft.ownerOf(_tokenId) == msg.sender, "Not token owner");
        require(
            nft.isApprovedForAll(msg.sender, address(this)) ||
            nft.getApproved(_tokenId) == address(this),
            "Not approved for transfer"
        );

        nft.transferFrom(msg.sender, address(this), _tokenId);
        
        _currentAuctionId++;
        uint256 newAuctionId = _currentAuctionId;
        
        auctions[newAuctionId] = Auction({
            auctionId: newAuctionId,
            tokenId: _tokenId,
            nftContract: _nftContract,
            seller: msg.sender,
            startingPrice: _startingPrice,
            endTime: block.timestamp + _duration,
            highestBidder: address(0),
            highestBid: 0,
            ended: false,
            isActive: true,
            ipfsHash: _ipfsHash
        });
        
        tokenToAuctionId[_nftContract][_tokenId] = newAuctionId;
        activeAuctions.push(newAuctionId);
        
        emit AuctionCreated(
            newAuctionId,
            _tokenId,
            _nftContract,
            msg.sender,
            _startingPrice,
            block.timestamp + _duration,
            _ipfsHash
        );
        
        return newAuctionId;
    }
    
    function placeBid(uint256 _auctionId) external payable nonReentrant {
        Auction storage auction = auctions[_auctionId];
        require(auction.isActive, "Auction not active");
        require(!auction.ended, "Auction ended");
        require(block.timestamp < auction.endTime, "Auction expired");
        require(msg.value > auction.highestBid && msg.value >= auction.startingPrice, "Bid too low");
        require(msg.sender != auction.seller, "Seller cannot bid");
        
        address previousBidder = auction.highestBidder;
        uint256 previousBid = auction.highestBid;
        
        if (previousBidder != address(0)) {
            pendingReturns[previousBidder] += previousBid;
        }
        
        auction.highestBidder = msg.sender;
        auction.highestBid = msg.value;
        
        emit BidPlaced(_auctionId, msg.sender, msg.value);
    }
    
    function endAuction(uint256 _auctionId) external nonReentrant {
        Auction storage auction = auctions[_auctionId];
        require(auction.isActive, "Auction not active");
        require(!auction.ended, "Auction already ended");
        require(
            block.timestamp >= auction.endTime || msg.sender == auction.seller,
            "Auction still active"
        );
        
        auction.ended = true;
        auction.isActive = false;
        _removeFromActiveAuctions(_auctionId);
        
        if (auction.highestBidder != address(0)) {
            IERC721(auction.nftContract).transferFrom(
                address(this),
                auction.highestBidder,
                auction.tokenId
            );
            payable(auction.seller).transfer(auction.highestBid);
        } else {
            IERC721(auction.nftContract).transferFrom(
                address(this),
                auction.seller,
                auction.tokenId
            );
        }
        
        emit AuctionEnded(
            _auctionId,
            auction.highestBidder,
            auction.highestBid
        );
    }

    function getCollectionActiveAuctions(address collectionAddress) 
        external 
        view 
        returns (Auction[] memory) 
    {
        uint256 count = 0;
        
        for(uint256 i = 0; i < activeAuctions.length; i++) {
            if(auctions[activeAuctions[i]].nftContract == collectionAddress) {
                count++;
            }
        }
        
        Auction[] memory collectionAuctions = new Auction[](count);
        uint256 currentIndex = 0;
        
        for(uint256 i = 0; i < activeAuctions.length; i++) {
            if(auctions[activeAuctions[i]].nftContract == collectionAddress) {
                collectionAuctions[currentIndex] = auctions[activeAuctions[i]];
                currentIndex++;
            }
        }
        
        return collectionAuctions;
    }
        
    function withdrawBid() external nonReentrant {
        uint256 amount = pendingReturns[msg.sender];
        require(amount > 0, "No funds to withdraw");
        
        pendingReturns[msg.sender] = 0;
        
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Transfer failed");
        
        emit BidWithdrawn(msg.sender, amount);
    }
    
    function getAuction(uint256 _auctionId) 
        external 
        view 
        returns (Auction memory) 
    {
        require(auctions[_auctionId].seller != address(0), "Auction does not exist");
        return auctions[_auctionId];
    }
    
    function _removeFromActiveAuctions(uint256 auctionId) internal {
        for (uint i = 0; i < activeAuctions.length; i++) {
            if (activeAuctions[i] == auctionId) {
                activeAuctions[i] = activeAuctions[activeAuctions.length - 1];
                activeAuctions.pop();
                break;
            }
        }
    }
}