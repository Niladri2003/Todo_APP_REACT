const Clerk = require('@clerk/clerk-sdk-node');

exports.clerkClient = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

clerkClient.sessions
    .getSessionList()
    .then((sessions) => console.log(sessions))
    .catch((error) => console.error(error));