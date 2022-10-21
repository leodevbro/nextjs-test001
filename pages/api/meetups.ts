// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { IOneMeetup } from "components/meetups/MeetupList";
import type { NextApiRequest, NextApiResponse } from "next";

import { MongoClient, ServerApiVersion } from "mongodb";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    
  }

  // res.status(200).json({ name: "John Doe" });
}
