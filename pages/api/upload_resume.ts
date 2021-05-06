import { NextApiRequest, NextApiResponse } from "next";
import dbClient from "../../utils/sanityClient";

export default async function upload_resume(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const body = JSON.parse(req.body);
    const fileAsset = await dbClient.assets.upload(
        "file",
        Buffer.from(body.file),
        { filename: body.name, contentType: body.type }
    );
    await dbClient
        .patch(body.userId)
        .set({
            resume: {
                _type: "file",
                asset: {
                    _type: "reference",
                    _ref: fileAsset._id,
                },
            },
        })
        .commit();
    console.log(`Resume Uploaded for ${body.userId} user`);
    res.json(fileAsset);
}
