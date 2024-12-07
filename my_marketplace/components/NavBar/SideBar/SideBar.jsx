import React, { useState } from "react";
import { GrClose } from "react-icons/gr";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
  TiArrowSortedDown,
} from "react-icons/ti";
import { DiJqueryLogo } from "react-icons/di";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./SideBar.module.css";
import Button from "../../Button/Button";

const SideBar = ({ setOpenSideMenu, currentAccount, connectWallet }) => {
  const [openDiscover, setOpenDiscover] = useState(false);
  const [openHelp, setOpenHelp] = useState(false);

  const discover = [
    { name: "Collection", link: "/collection" },
    { name: "Search", link: "/searchPage" },
    { name: "Author Profile", link: "/author" },
    { name: "Upload NFT", link: "/uploadNFT" },
    { name: "Blog", link: "/blog" },
  ];

  const helpCenter = [
    { name: "About", link: "/aboutus" },
    { name: "Contact Us", link: "/contactus" },
    { name: "LogIn", link: "/login" },
    { name: "Subscription", link: "/subscription" },
  ];

  return (
    <div className={Style.sideBar}>
      <GrClose className={Style.sideBar_closeBtn} onClick={() => setOpenSideMenu(false)} />

      <div className={Style.sideBar_box}>
        <div className={Style.sideBar_logo}>
          <DiJqueryLogo />
          <p>Your gateway to NFTs and beyond.</p>
        </div>

        <div className={Style.sideBar_menu}>
          <div onClick={() => setOpenDiscover(!openDiscover)} className={Style.sideBar_menu_item}>
            <p>Discover</p>
            <TiArrowSortedDown />
          </div>
          {openDiscover && (
            <div className={Style.sideBar_submenu}>
              {discover.map((el, i) => (
                <Link href={el.link} key={i}>
                  <p>{el.name}</p>
                </Link>
              ))}
            </div>
          )}

          <div onClick={() => setOpenHelp(!openHelp)} className={Style.sideBar_menu_item}>
            <p>Help Center</p>
            <TiArrowSortedDown />
          </div>
          {openHelp && (
            <div className={Style.sideBar_submenu}>
              {helpCenter.map((el, i) => (
                <Link href={el.link} key={i}>
                  <p>{el.name}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className={Style.sideBar_social}>
          <a href="#">
            <TiSocialFacebook />
          </a>
          <a href="#">
            <TiSocialLinkedin />
          </a>
          <a href="#">
            <TiSocialTwitter />
          </a>
          <a href="#">
            <TiSocialYoutube />
          </a>
          <a href="#">
            <TiSocialInstagram />
          </a>
        </div>

        <div className={Style.sideBar_button}>
          {currentAccount === "" ? (
            <Button btnName="Connect Wallet" handleClick={connectWallet} />
          ) : (
            <Button btnName="Upload NFT" handleClick={() => {}} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
