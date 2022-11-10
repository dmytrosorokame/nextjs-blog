import React from "react";
import Link from "next/link";
import Logo from "./logo";
import classes from "./main-navigation.module.css";

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Logo />
      <nav>
        <ul>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
          <li>
            <Link href="/contacts">Contacts</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
