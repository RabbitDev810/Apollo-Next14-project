import { withIronSession } from "next-iron-session";
const mysql = require("mysql2");
var bcrypt = require("bcryptjs");

export default withIronSession(
  async (req, res) => {
    if (req.method == "POST") {
      const { username, password } = req.body;

      const connection = mysql.createConnection({
        uri: process.env.DATABASE_URL,
        timezone: "z",
      }); // create connection with UTC timezone
      var [results, fields, err] = await connection
        .promise()
        .query(`SELECT * FROM users WHERE username=?;`, [username]);

      if (results.length == 0) {
        console.log("No account");
        return res
          .status(403)
          .json({ success: false, error: "Invalid username or password" });
      }

      if (bcrypt.compareSync(password, results[0].password_hash.toString())) {
        var access_level = results[0].access_level;
        var subscription_expired = false;
        var now = new Date();
        console.log(now, results[0].subscription_expires);
        if (now > results[0].subscription_expires) {
          access_level = 0;
        }
        req.session.set("user", { username, id: results[0].id, access_level, expire: results[0].subscription_expires });
        console.log(req.session.get("user"));
        await req.session.save();
        return res.status(201).send();
      }

      return res
        .status(403)
        .json({ success: false, error: "Invalid username or password" });
    }
    return res.status(404).send("");
  },
  {
    cookieName: "Apollo",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
    password: process.env.APPLICATION_SECRET,
  }
);
