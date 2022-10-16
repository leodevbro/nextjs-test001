import { NextPage } from "next/types";
import { ReactNode } from "react";
import classes from "./Card.module.scss";

export const Card: NextPage<{ children: ReactNode }> = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
