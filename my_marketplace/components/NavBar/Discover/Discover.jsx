import React from "react";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./Discover.module.css";

const Discover = () => {
  //--------DISCOVER NAVIGATION MENU
  const discover = [
    {
      name: "Collection",
      link: "collection",
    },
    {
      name: "Search",
      link: "searchPage",
    },
    {
      name: "Author Profile",
      link: "author",
    },
    {
      name: "Account Setting",
      link: "account",
    },
    {
      name: "Upload NFT",
      link: "uploadNFT",
    },
    {
      name: "Connect Wallet",
      link: "connectWallet",
    },
  ];

  return (
    <div className={Style.discover_menu}>
      {discover.map((el, i) => (
        <Link key={i} href={{ pathname: `${el.link}` }}>
          <a className={Style.discover_item}>{el.name}</a>
        </Link>
      ))}
    </div>
  );
};

export default Discover;
