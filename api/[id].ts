import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

export default async (req: NowRequest, res: NowResponse) => {
    try {
        const {data: rawContents} = await axios.get(`https://hastebin.com/raw/${req.query.id}`);
        return res.status(200).send(rawContents);
    } catch (err) {
        return res.status(500).send(`Unable to get contents of paste from HasteBin: ${err}`)
    }
};
