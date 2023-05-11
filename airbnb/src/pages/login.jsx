import React, { useContext, useState } from "react";
import PageLayout from "../layout/pageLayout";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useGlobalContext } from "../context";

const Login = () => {
  const navigate = useNavigate();
  const { user, setUser } = useGlobalContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log("email", email);
    try {
      if (email && password) {
        const response = await axios.post("/login", {
          email,
          password,
        });
        console.log("user", data);
        setUser(response.data.userDoc);
        alert("logged in successfully!");
        navigate("/");
      }
    } catch (error) {
      alert(error);
    }
  };

  console.log("errors", errors);
  console.log(user);
  return (
    <PageLayout>
      <div className="flex flex-col h-screen">
        <h1 className="text-4xl text-center">Login</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-none h-[18%] flex flex-col w-[80%] md:w-[30%] p-2 mx-auto justify-evenly my-auto max-h-fit"
        >
          <fieldset className="border border-primary rounded-2xl px-4 py-8">
            <legend className="text-2xl text-primary ">Login</legend>
            <input
              {...register("email", { required: true })}
              aria-invalid={errors.email ? "true" : "false"}
              type="email"
              placeholder="your@email.com"
            />
            {errors?.email && (
              <p className="text-red-500" role="alert">
                Email is Required
              </p>
            )}
            <input
              {...register("password", { required: true })}
              aria-invalid={errors.password ? "true" : "false"}
              type="password"
              placeholder="********"
            />
            {errors?.password?.type === "required" && (
              <p className="text-red-500" role="alert">
                Password is Required
              </p>
            )}
            <button onClick={onSubmit} className="primary">
              Login
            </button>
            <span className="p-2">Don't have an account yet?..</span>
            <Link className="font-semibold" to="/register">
              Please sign up
            </Link>
          </fieldset>
        </form>
      </div>
    </PageLayout>
  );
};

export default Login;
