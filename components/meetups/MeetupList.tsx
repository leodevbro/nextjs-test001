import { NextPage } from "next/types";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.scss";

const MeetupList: NextPage<{
  meetups: { id: string; image: string; title: string; address: string }[];
}> = (props) => {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
};

export default MeetupList;
