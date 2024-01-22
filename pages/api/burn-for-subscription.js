import { withIronSession } from "next-iron-session";
const {checkAuth} = require("./auth/helper")
const {MongoClient} = require("mongodb")

const uri = "mongodb+srv://hive-user:A6yOL73t2KdEMOXV4kJ7hRHLYL6BVRsCYpOTOyokeKWY0zWEJX2@hive-tools.wjc2q.mongodb.net/Hive-Tools?retryWrites=true&w=majority";
const client = new MongoClient(uri)

const handler = async function (req, res) {
    const {tier, time, address} = req.body

    try {
        console.log(tier)
        console.log(time)
        console.log(address)
        /*
        await client.connect()
        var db = client.db("Hive-Tools")
        var count = await db.collection("TelegramTokenData").count()
        client?.close()
        */
        res.status(200).json(count);
    } catch(e) {
        client.close()
        res.status(200).json({count: 1051})
    }
} 

export default withIronSession(checkAuth(handler), {
    password: process.env.APPLICATION_SECRET,
    cookieName: "Apollo",
    // if your localhost is served on http:// then disable the secure flag
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    },
});
