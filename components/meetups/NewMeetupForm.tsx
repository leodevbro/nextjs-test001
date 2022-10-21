import { NextPage } from "next/types";
import { tyAddMeetupFn } from "pages/meetups/new-meetup";
import { FormEventHandler, ReactNode, useRef } from "react";

import Card from "../ui/Card";
import { IOneMeetup } from "./MeetupList";
import classes from "./NewMeetupForm.module.scss";

const NewMeetupForm: NextPage<{
  onAddMeetup: tyAddMeetupFn;
}> = (props) => {
  const titleInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement | null>(null);

  const submitHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    if (
      !titleInputRef.current ||
      !imageInputRef.current ||
      !addressInputRef.current ||
      !descriptionInputRef.current
    ) {
      return;
    }

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;

    const meetupData: Omit<IOneMeetup, "id"> = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  };

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input type="text" required id="title" ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input type="url" required id="image" ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input type="text" required id="address" ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows={5}
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
};

export default NewMeetupForm;
