import type { NextComponentType, NextPage } from "next";
import Link from "next/link";

import sty from "./Navbar.module.scss";
// import sty from "../styles/Navbar.module.scss";

export const Navbar: NextComponentType = () => {
  return (
    <div>
      <div className={sty.background}>
        <Link href={"/"}>
          <a className={sty.my7Link}>Home</a>
        </Link>
        <Link href={"/about"}>
          <a>About</a>
        </Link>
        <Link href={"/profile"}>
          <a>Profile</a>
        </Link>
      </div>
    </div>
  );
};
