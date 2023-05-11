import React, { useState } from "react";
import PageLayout from "../layout/pageLayout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/register", {
        firstName,
        lastName,
        email,
        password,
      });
      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log("Registration failed this email is already been used");
    }
  };

  return (
    <PageLayout>
      <div className="flex flex-col h-screen">
        <h1 className="text-4xl text-center">Register</h1>
        <form
          onSubmit={onSubmit}
          className="border border-none h-[18%] flex flex-col w-[80%] md:w-[30%] p-2 mx-auto justify-evenly my-auto max-h-fit"
        >
          <fieldset className="border border-primary rounded-2xl px-4 py-8">
            <legend className="text-2xl text-primary ">Register</legend>
            <label className="text-gray-600" htmlFor="firstName">
              FirstName
            </label>
            <input
              type="text"
              placeholder="firstname here..."
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
            <label className="text-gray-600" htmlFor="firstName">
              LastName
            </label>
            <input
              type="text"
              placeholder="lastName here..."
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="your@email.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button className="primary" onClick={onSubmit}>
              Login
            </button>
            <span className="p-2"> Already have an account?..</span>
            <Link className="font-semibold" to="/login">
              Login here
            </Link>
          </fieldset>
        </form>
      </div>
    </PageLayout>
  );
};

export default Register;
