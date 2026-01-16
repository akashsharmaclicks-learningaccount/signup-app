const db = require("../config/db");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  // 1️⃣ Check required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      error: "All fields are required",
    });
  }

  // 2️⃣ Email format validation (simple)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid email format",
    });
  }

  // 3️⃣ Password length check
  if (password.length < 6) {
    return res.status(400).json({
      error: "Password must be at least 6 characters long",
    });
  }

  try {
    // 4️⃣ Check if email already exists
    const checkEmailSql = "SELECT id FROM users WHERE email = ?";
    db.query(checkEmailSql, [email], async (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.length > 0) {
        return res.status(409).json({
          error: "Email already registered",
        });
      }

      // 5️⃣ Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertSql =
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

      db.query(insertSql, [name, email, hashedPassword], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        res.status(201).json({
          message: "User registered successfully",
        });
      });
    });
  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
    });
  }
};
