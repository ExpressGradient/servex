import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../utils/sanityClient";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

async function getUserImage(req: NextApiRequest, res: NextApiResponse) {
    try {
        const body = JSON.parse(req.body);
        const _id = body._id;

        const query: string = `*[_type == "user" && _id == "${_id}"] {
          pictureURL,
          "picture": picture.asset -> url
        }`;
        const result = await dbClient.fetch(query);

        res.json({
            picture: result[0].hasOwnProperty("picture")
                ? result[0].picture
                : result[0].pictureURL,
        });
    } catch (error) {
        console.log("Error in fetching User Image ", error);
        res.send(error);
    }
}

export default withApiAuthRequired(getUserImage);
