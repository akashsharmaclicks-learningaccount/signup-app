const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      res.status(201).json({
        message: "User registered successfully",
      });
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
