import Router, { useRouter } from "next/router";
import { NextPage } from "next/types";
import { MouseEventHandler, useCallback } from "react";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.scss";

const MeetupItem: NextPage<{
  id: string;
  image: string;
  title: string;
  address: string;
}> = (props) => {
  const router = useRouter();

  const showDetailsFn: MouseEventHandler<HTMLButtonElement> =
    useCallback(() => {
      router.push(`/meetups/${props.id}`);
    }, [props.id, router]);

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <picture>
            <img src={props.image} alt={props.title} />
          </picture>
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsFn}>Show Details</button>
        </div>
      </Card>
    </li>
  );
};

export default MeetupItem;
