import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
    async login(req: NextApiRequest, res: NextApiResponse) {
        try {
            if (req.query.hasOwnProperty("visit")) {
                const visit: string = `${process.env.AUTH0_BASE_URL}/${req.query.visit}`;
                await handleLogin(req, res, { returnTo: visit });
            } else {
                await handleLogin(req, res);
            }
        } catch (e) {
            res.status(e.status || 400).end(e.message);
        }
    },
});
