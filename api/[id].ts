import { NowRequest, NowResponse } from "@vercel/node";
import axios from "axios";

const getRawContentsFromHasteBin = async (id: string): Promise<string> => {
    const resp = await axios.get(`https://hastebin.com/raw/${id}`);
    return resp.data;
};



export default async (req: NowRequest, res: NowResponse) => {
    try {
        if (req.method?.toLowerCase() === "get") {
            const rawContents = await getRawContentsFromHasteBin(req.query.id.toString());
            return res.status(200).send(rawContents);
        }
        return res.status(500).send(`Unsupported method: ${req.method}`);
    } catch (err) {
        return res.status(500).send(`Unable to get contents of paste from HasteBin: ${err}`)
    }
};
