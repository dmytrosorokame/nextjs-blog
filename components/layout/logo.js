import React from "react";
import Link from "next/link";
import classes from "./logo.module.css";

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <div className={classes.logo}>Dmytro's Next Blog</div>
      </a>
    </Link>
  );
};

export default Logo;
