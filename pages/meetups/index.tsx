import MeetupList, { IOneMeetup } from "components/meetups/MeetupList";
import { WithId } from "mongodb";
import type { GetServerSideProps, GetStaticProps, NextPage } from "next";
import { gloBack, refreshConnection } from "pages/api/new-meetup";
import { useEffect, useState } from "react";
import { Document } from "bson";
import Head from "next/head";

const myMeetups: IOneMeetup[] = [
  {
    id: "1",
    image: "https://images.pexels.com/photos/15286/pexels-photo.jpg",
    title: "m1",
    address: "Tbilisi",
    description: "this is a good meetup",
  },

  {
    id: "2",
    image:
      "https://cdn.theatlantic.com/media/img/photo/2020/08/arkansas-photos/a01_998835880-1/original.jpg",
    title: "m2",
    address: "Batumi",
    description: "this is a cool meetup",
  },
];

interface IFetchedMeetup extends WithId<Document> {
  id: string;
  image: string;
  title: string;
  address: string;
  description: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  // const { req, res } = context;
  // console.log(req, res);

  await refreshConnection();

  if (!gloBack.vvv) {
    return {
      props: {
        meetups: myMeetups,
      },
      // revalidate: 10 // for static
    };
  }

  const myArr = await gloBack.vvv.meetupsCollection.find().toArray();

  const realArray: IOneMeetup[] = (myArr as IFetchedMeetup[]).map((x) => {
    return {
      address: x.address,
      description: x.description,
      image: x.image,
      title: x.title,
      id: x._id.toString(),
    };
  });
  console.log(myArr && myArr[0]);

  return {
    props: {
      meetups: realArray || myMeetups,
    },
    // revalidate: 10 // for static
  };
};

export const AllMeetups: NextPage<{ meetups: IOneMeetup[] }> = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState<IOneMeetup[]>([]);

  // useEffect(() => {
  //   setLoadedMeetups(() => myMeetups);
  // }, []);

  return (
    <div>
      <Head>
        <title>t1</title>
        <meta
          name="description"
          content="good page"
        />
      </Head>
      <h1>all meetups</h1>

      <MeetupList meetups={props.meetups} />
    </div>
  );
};

export default AllMeetups;
