import React from "react";
import Image from "next/image";

// INTERNAL IMPORT
import Style from "./LikeProfile.module.css";
import images from "../../img";

const LikeProfile = () => {
  const imageArray = [images.user1, images.user2, images.user3, images.user4];

  return (
    <div className={Style.like}>
      {imageArray.map((el, i) => (
        <div className={Style.like_box} key={i}>
          <Image
            src={el}
            width={20}
            height={20}
            alt={`Profile ${i + 1}`}
            className={Style.like_box_img}
          />
        </div>
      ))}
    </div>
  );
};

export default LikeProfile;
