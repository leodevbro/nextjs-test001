import type { NextComponentType, NextPage } from "next";
import Link from "next/link";
import { FC, ReactNode } from "react";
import { Navbar } from "./Navbar";

// import sty from "./Navbar.module.scss";
// import sty from "../styles/Navbar.module.scss";

export const PermanentLayout: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );
};
