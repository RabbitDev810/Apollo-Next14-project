const mysql = require("mysql2");
var bcrypt = require("bcryptjs");

export default async function handler(req, res) {
  try {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const { username, password } = req.body;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    var [results] = await connection
      .promise()
      .query(`SELECT * FROM users WHERE username=?;`, [username]);

    if (results.length > 0) {
      res.status(500).json({ success: false, error: "Username already exists" });
    } else {
      connection.execute(
        `INSERT INTO users (username, password_hash, access_level, subscription_expires) VALUES (?, ?, 0, CURRENT_TIMESTAMP());`, [username, hash]
      );
      connection.end();
      res.status(200).json({ success: true });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, error: e });
  }
}
