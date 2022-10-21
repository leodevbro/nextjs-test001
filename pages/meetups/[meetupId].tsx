import { IOneMeetup } from "components/meetups/MeetupList";
import { ObjectId } from "mongodb";
import type {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  NextPage,
} from "next";
import { gloBack, refreshConnection } from "pages/api/new-meetup";

const qProp = "meetupId";

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;

  const mId = params ? (params[qProp] as string) : null;

  // console.log("mId", mId);

  await refreshConnection();
  const meetups = await gloBack.vvv?.meetupsCollection
    .find(new ObjectId(mId || "-"))
    .toArray();
  // console.log(meetups);

  const fetchedMeetup = meetups && meetups[0] ? meetups[0] : null;

  if (!fetchedMeetup) {
    return {
      props: {
        meetup: null,
      },
    };
  }

  const theMeetup: IOneMeetup = {
    address: fetchedMeetup.address,
    description: fetchedMeetup.description,
    image: fetchedMeetup.image,
    title: fetchedMeetup.title,
    id: fetchedMeetup._id.toString(),
  };

  // console.log("theMeetup:", theMeetup);

  return {
    props: {
      meetup: theMeetup,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  await refreshConnection();
  const meetups = await gloBack.vvv?.meetupsCollection.find({}).toArray();

  const myPaths = meetups?.map((item) => {
    return {
      params: {
        [qProp]: item._id.toString(),
      },
    };
  });

  // console.log("myPaths:", myPaths);

  return {
    paths: myPaths || [],
    fallback: false,
  };
};

export const OneMeetup: NextPage<{ meetup: IOneMeetup }> = ({ meetup }) => {
  let prop0: IOneMeetup = {
    address: "address 1",
    id: "1",
    image: `https://images.pexels.com/photos/15286/pexels-photo.jpg`,
    description: "desscccrrr",
    title: "title1",
  };

  // console.log("haaaaaaaaaaa:", meetup);
  if (!meetup) {
    return <p>whaaaat?????</p>
  }

  return (
    <div>
      <h1>{meetup.title}</h1>

      <div>
        <picture style={{ display: "block" }}>
          <img
            style={{ width: "100%" }}
            alt="good meetup"
            // src={`https://images.pexels.com/photos/15286/pexels-photo.jpg`}
            src={meetup.image}
          />
        </picture>
      </div>

      <address>{meetup.address}</address>
      <p>{meetup.description}</p>
    </div>
  );
};

export default OneMeetup;
