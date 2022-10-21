import { IOneMeetup } from "components/meetups/MeetupList";
import NewMeetupForm from "components/meetups/NewMeetupForm";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";

export type tyAddMeetupFn = (meetUpInfo: Omit<IOneMeetup, "id">) => any;

export const NewMeetup: NextPage = () => {
  const router = useRouter();

  const addMeetup: tyAddMeetupFn = useCallback(
    async (meetupData) => {
      try {
        const response = await fetch(`/api/${"new-meetup"}`, {
          method: "POST",
          body: JSON.stringify(meetupData),
          headers: {
            "Content-Type": "Application/json",
          },
        });

        const data = await response.json();

        console.log(data);

        router.push("/meetups");
      } catch (err) {
        console.log(err);
      }
    },
    [router]
  );

  return (
    <div>
      <h1>new meetup</h1>
      <NewMeetupForm onAddMeetup={addMeetup} />
    </div>
  );
};

export default NewMeetup;
