import React from "react";
import Link from "next/link";

// INTERNAL IMPORT
import Style from "./HelpCenter.module.css";

const HelpCenter = () => {
  const helpCenter = [
    {
      name: "About",
      link: "aboutus",
    },
    {
      name: "Contact Us",
      link: "contactus",
    },
    {
      name: "Sign Up",
      link: "signUp",
    },
    {
      name: "Log In",
      link: "login",
    },
    {
      name: "Subscription",
      link: "subscription",
    },
  ];

  return (
    <div className={Style.helpCenterMenu}>
      {helpCenter.map((el, i) => (
        <Link key={i} href={{ pathname: `${el.link}` }}>
          <a className={Style.helpCenterItem}>{el.name}</a>
        </Link>
      ))}
    </div>
  );
};

export default HelpCenter;
