// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IOneMeetup } from "components/meetups/MeetupList";
import type { NextApiRequest, NextApiResponse } from "next";
import { Document } from "bson";

import { Collection, Db, MongoClient, ServerApiVersion } from "mongodb";

const un = "leodevbro";
const pw = "bauntuna7";
const bName = "meetupClub";

const uri = `mongodb+srv://${un}:${pw}@cluster0.prkhahm.mongodb.net/${bName}?retryWrites=true&w=majority`;

export const gloBack: {
  vvv: null | {
    client: MongoClient;
    db: Db;
    meetupsCollection: Collection<Document>;
  };
} = {
  vvv: null,
};

export const getDbConnection = async () => {
  let myClient = null;
  try {
    myClient = await MongoClient.connect(uri);
  } catch (err) {
    console.log(err);
  }

  if (!myClient) {
    return null;
  }

  const myDb = myClient.db();

  const myMeetupsCollection = myDb.collection("meetups");

  return {
    client: myClient,
    db: myDb,
    meetupsCollection: myMeetupsCollection,
  };
};

export const refreshConnection = async () => {
  if (!gloBack.vvv) {
    const connection = await getDbConnection();
    gloBack.vvv = connection;
    return connection;
  }
  return null;
};

refreshConnection();

//
// ======================================
//

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await refreshConnection();

  if (req.method === "POST" && gloBack.vvv) {
    const data = req.body as IOneMeetup;

    // const { address, description, id???, image, title } = data;

    try {
      const result = await gloBack.vvv.meetupsCollection.insertOne(data);
      console.log(result);
    } catch (err) {
      console.log(err);
    }

    // gloBack.v.client.close();

    res.status(200).json({ message: "meetup inserted" });
  }

  console.log("gareeeet", gloBack.vvv);

  // res.status(200).json({ name: "John Doe" });
}
