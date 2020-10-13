import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

const postRawContentsToHasteBin = async (contents: string): Promise<string> => {
  const resp = await axios.post("https://hastebin.com/documents", contents);
  return `https://hastebin.com/${resp.data.code}`;
};

export default async (req: NowRequest, res: NowResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS,POST");
  try {
    if (req.method?.toLowerCase() === "post") {
      const rawContents = await postRawContentsToHasteBin(req.body);
      return res.status(200).send(rawContents);
    }
    return res.status(500).send(`Unsupported method: ${req.method}`);
  } catch (err) {
    return res
      .status(500)
      .send(`Unable to create paste on HasteBin: ${err}`);
  }
};
