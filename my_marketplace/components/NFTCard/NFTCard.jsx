import React, { useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsImages } from "react-icons/bs";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./NFTCard.module.css";

const NFTCard = ({ NFTData }) => {
  const [like, setLike] = useState(false);

  const likeNft = () => setLike(!like);

  return (
    <div className={Style.NFTCard}>
      {NFTData.map((el, i) => (
        <Link href={{ pathname: "/NFT-details", query: el }} key={i}>
          <div className={Style.NFTCard_box}>
            {/* NFT Image */}
            <div className={Style.NFTCard_box_img}>
              <img
                src={el.image}
                alt={`NFT ${el.name}`}
                className={Style.NFTCard_box_img_img}
              />
            </div>

            {/* Like and Timer Section */}
            <div className={Style.NFTCard_box_update}>
              <div
                className={Style.NFTCard_box_update_left}
                onClick={likeNft}
              >
                {like ? (
                  <AiFillHeart className={Style.liked} />
                ) : (
                  <AiOutlineHeart />
                )}
                <span>22</span>
              </div>
              <div className={Style.NFTCard_box_update_right}>
                <small>Remaining Time</small>
                <p>3h : 15m : 20s</p>
              </div>
            </div>

            {/* Details Section */}
            <div className={Style.NFTCard_box_update_details}>
              <div className={Style.NFTCard_box_update_details_price}>
                <h4>
                  {el.name} #{el.tokenId}
                </h4>
                <div className={Style.price_stock}>
                  <div className={Style.current_bid}>
                    <small>Current Bid</small>
                    <p>{el.price} ETH</p>
                  </div>
                  <small>61 in stock</small>
                </div>
              </div>
              <div className={Style.NFTCard_box_update_details_category}>
                <BsImages />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NFTCard;
