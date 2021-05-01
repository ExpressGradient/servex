import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../../utils/sanityClient";

export default async function getJob(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const id: string | string[] = req.query.id;
        if (typeof id === "string") {
            const query: string = `
            *[_type == "job" && _id == "${id}"][0] {
                ...,
                "author": author -> {
                    ...,
                    "picture": picture.asset -> url
                }
            }
        `;
            const response = await dbClient.fetch(query);
            res.json(response);
        }
    } catch (e) {
        res.send(e);
    }
}
