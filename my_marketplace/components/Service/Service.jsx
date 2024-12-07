import React from "react";
import Image from "next/image";

//INTERNAL IMPORT
import Style from "./Service.module.css";
import images from "../../img";

const Service = () => {
  return (
    <div className={Style.service}>
      <div className={Style.service_box}>
        <div className={Style.service_box_item}>
          <Image
            src={images.service1}
            alt="Filter & Discover"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 1</span>
          </p>
          <h3>Filter & Discover</h3>
          <p>
            Connect with your wallet, discover, buy NFTs, sell your NFTs, and
            earn money.
          </p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service2}
            alt="Buy NFTs"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 2</span>
          </p>
          <h3>Buy NFTs</h3>
          <p>
            Discover a wide variety of NFTs available for purchase and add them
            to your collection.
          </p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service3}
            alt="Connect Wallet"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 3</span>
          </p>
          <h3>Connect Wallet</h3>
          <p>
            Securely connect your wallet to manage and trade your NFTs
            seamlessly.
          </p>
        </div>
        <div className={Style.service_box_item}>
          <Image
            src={images.service1}
            alt="Start Trading"
            width={100}
            height={100}
          />
          <p className={Style.service_box_item_step}>
            <span>Step 4</span>
          </p>
          <h3>Start Trading</h3>
          <p>
            Begin trading NFTs and monetize your collection to maximize your
            profits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;
