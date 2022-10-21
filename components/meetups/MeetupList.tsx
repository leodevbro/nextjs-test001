import { NextPage } from "next/types";
import MeetupItem from "./MeetupItem";
import classes from "./MeetupList.module.scss";

export interface IOneMeetup {
  id: string;
  image: string;
  title: string;
  address: string;
  description: string;
}

const MeetupList: NextPage<{
  meetups: IOneMeetup[];
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
