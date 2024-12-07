import React, { useState, useContext } from "react";
import Image from "next/image";
import { DiJqueryLogo } from "react-icons/di";
import { MdNotifications } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { CgMenuRight } from "react-icons/cg";
import { useRouter } from "next/router";

// INTERNAL IMPORT
import Style from "./NavBar.module.css";
import { Discover, HelpCenter, Notification, Profile, SideBar } from "./index";
import { Button, Error } from "../componentsindex";
import images from "../../img";

// SMART CONTRACT CONTEXT
import { NFTMarketplaceContext } from "../../Context/NFTMarketplaceContext";

const NavBar = () => {
  // State variables for dropdowns and sidebar
  const [discover, setDiscover] = useState(false);
  const [help, setHelp] = useState(false);
  const [notification, setNotification] = useState(false);
  const [profile, setProfile] = useState(false);
  const [openSideMenu, setOpenSideMenu] = useState(false);

  const router = useRouter();

  // Smart contract context
  const { currentAccount, connectWallet, openError } = useContext(
    NFTMarketplaceContext
  );

  // Dropdown handlers
  const openMenu = (e) => {
    const btnText = e.target.innerText;
    setDiscover(btnText === "Discover");
    setHelp(btnText === "Help Center");
    setNotification(false);
    setProfile(false);
  };

  const toggleNotification = () => {
    setNotification(!notification);
    setDiscover(false);
    setHelp(false);
    setProfile(false);
  };

  const toggleProfile = () => {
    setProfile(!profile);
    setHelp(false);
    setDiscover(false);
    setNotification(false);
  };

  const toggleSideBar = () => {
    setOpenSideMenu(!openSideMenu);
  };

  return (
    <div className={Style.navbar}>
      <div className={Style.navbar_container}>
        {/* Left Section */}
        <div className={Style.navbar_container_left}>
          <div className={Style.logo}>
            <DiJqueryLogo onClick={() => router.push("/")} />
          </div>
          <div className={Style.navbar_container_left_box_input}>
            <div className={Style.navbar_container_left_box_input_box}>
              <input type="text" placeholder="Search NFT" />
              <BsSearch className={Style.search_icon} />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className={Style.navbar_container_right}>
          {/* Discover */}
          <div className={Style.navbar_container_right_discover}>
            <p onClick={(e) => openMenu(e)}>Discover</p>
            {discover && (
              <div className={Style.navbar_container_right_discover_box}>
                <Discover />
              </div>
            )}
          </div>

          {/* Help Center */}
          <div className={Style.navbar_container_right_help}>
            <p onClick={(e) => openMenu(e)}>Help Center</p>
            {help && (
              <div className={Style.navbar_container_right_help_box}>
                <HelpCenter />
              </div>
            )}
          </div>

          {/* Notification */}
          <div className={Style.navbar_container_right_notify}>
            <MdNotifications
              className={Style.notify}
              onClick={toggleNotification}
            />
            {notification && <Notification />}
          </div>

          {/* Connect or Create Button */}
          <div className={Style.navbar_container_right_button}>
            {currentAccount === "" ? (
              <Button btnName="Connect" handleClick={connectWallet} />
            ) : (
              <Button
                btnName="Create"
                handleClick={() => router.push("/uploadNFT")}
              />
            )}
          </div>

          {/* Profile */}
          <div className={Style.navbar_container_right_profile}>
            <Image
              src={images.user1}
              alt="Profile"
              width={40}
              height={40}
              className={Style.profile_image}
              onClick={toggleProfile}
            />
            {profile && <Profile currentAccount={currentAccount} />}
          </div>

          {/* Sidebar Menu Button */}
          <div className={Style.navbar_container_right_menuBtn}>
            <CgMenuRight className={Style.menuIcon} onClick={toggleSideBar} />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {openSideMenu && (
        <SideBar
          setOpenSideMenu={setOpenSideMenu}
          currentAccount={currentAccount}
          connectWallet={connectWallet}
        />
      )}

      {openError && <Error />}
    </div>
  );
};

export default NavBar;
