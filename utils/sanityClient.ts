import sanityClient from "@sanity/client";

const dbClient = sanityClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: "expressgradient",
    token: process.env.SANITY_TOKEN,
    useCdn: false,
});

export default dbClient;
