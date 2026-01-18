import { useState } from "react";
import { loginUser } from "../services/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [userName, setUserName] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      setMessage(res.data.message);
      setFormData({ email: "", password: "" });
      console.log("Data received:", res.data);
      setUserName(res.data.user.name);
      setIsError(false);
    } catch (error) {
      setMessage(error.response?.data?.error || "Login failed");
      setIsError(true);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br />

        <button type="submit">Login</button>
      </form>

      {message && (
        <p className={isError ? "error-message" : "success-message"}>
          {message}
        </p>
      )}
      {userName && <p>Welcome, {userName}!</p>}
    </div>
  );
};

export default Login;
