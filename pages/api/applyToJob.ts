import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../utils/sanityClient";
import { nanoid } from "nanoid";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

async function applyToJob(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { jobId, userId } = JSON.parse(req.body);

        const query: string = `
            *[_type == "job" && _id == "${jobId}"] {
                "applicants": applicants[] -> _id
            }
        `;
        const fetchResponse = await dbClient.fetch(query);

        if (fetchResponse[0].applicants.includes(userId)) {
            res.json(fetchResponse);
        } else {
            const response = await dbClient
                .patch(jobId)
                .setIfMissing({ applicants: [] })
                .append("applicants", [
                    {
                        _key: nanoid(),
                        _type: "reference",
                        _ref: userId,
                    },
                ])
                .commit();
            res.json(response);
        }
    } catch (e) {
        res.send(e);
    }
}

export default withApiAuthRequired(applyToJob);
