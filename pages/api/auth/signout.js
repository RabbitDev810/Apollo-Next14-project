import { withIronSession } from "next-iron-session";

const handler = function (req, res, session) {
  req.session.destroy();
  res.send("Logged out");
}

export default withIronSession(handler, {
  password: process.env.APPLICATION_SECRET,
  cookieName: "Apollo",
  // if your localhost is served on http:// then disable the secure flag
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});