import React from "react";
import { DiJqueryLogo } from "react-icons/di";
import {
  TiSocialFacebook,
  TiSocialLinkedin,
  TiSocialTwitter,
  TiSocialYoutube,
  TiSocialInstagram,
} from "react-icons/ti";
import { RiSendPlaneFill } from "react-icons/ri";

// INTERNAL IMPORT
import Style from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={Style.footer}>
      <div className={Style.footer_box}>
        <div className={Style.footer_box_social}>
          <a href="/">
            <DiJqueryLogo className={Style.footer_box_social_logo} />
          </a>
          <p>
            Join the world’s leading platform for buying, selling, and
            discovering exclusive NFTs. Redefining the digital collectibles
            space.
          </p>
          <div className={Style.footer_social}>
            <a href="#" aria-label="Facebook">
              <TiSocialFacebook />
            </a>
            <a href="#" aria-label="LinkedIn">
              <TiSocialLinkedin />
            </a>
            <a href="#" aria-label="Twitter">
              <TiSocialTwitter />
            </a>
            <a href="#" aria-label="YouTube">
              <TiSocialYoutube />
            </a>
            <a href="#" aria-label="Instagram">
              <TiSocialInstagram />
            </a>
          </div>
        </div>

        <div className={Style.footer_box_discover}>
          <h3>Discover</h3>
          <ul>
            <li><a href="#">Marketplace</a></li>
            <li><a href="#">Collections</a></li>
            <li><a href="#">Community</a></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        <div className={Style.footer_box_help}>
          <h3>Help Center</h3>
          <ul>
            <li><a href="#">FAQs</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        <div className={Style.subscribe}>
          <h3>Subscribe</h3>
          <div className={Style.subscribe_box}>
            <input type="email" placeholder="Enter your email *" />
            <RiSendPlaneFill className={Style.subscribe_box_send} />
          </div>
          <div className={Style.subscribe_box_info}>
            <p>
              Stay updated with the latest trends in the NFT marketplace.
              Subscribe to our newsletter for exclusive insights.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
