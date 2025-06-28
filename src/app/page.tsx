"use client";

import SectionContainer from "@/components/SectionContainer";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { LOGIN } from "./clientRequest/mutation/loginReq";
import { useMutation, useLazyQuery } from "@apollo/client";
import { USERS_QUERY } from "./clientRequest/query/usersReq";
import { setAccessToken } from "./lib/token";
import { useAuth } from "./hooks/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [login] = useMutation(LOGIN) //testing
  const [getAllUsers] = useLazyQuery(USERS_QUERY) //testing
  // const users = [
  //   { username: "admin", password: "admin123", role: "admin" },
  //   { username: "teacher", password: "teacher123", role: "teacher" },
  //   { username: "student", password: "student123", role: "student" },
  // ]; 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const foundUser = users.find(
    //   (user) =>
    //     user.username === form.username && user.password === form.password
    // );

    // if (foundUser) {
    //   router.push(`/${foundUser.role}`);
    // } else {
    //   setError("Invalid username or password");
    // }
    //comment ko lang muna Josh pang testing
    try {
      const {data} = await login({variables: {
        data: {
          email: form.username,
          password: form.password
        }
      }});

      const token = data?.login?.token;
      if(!token) {
        setError("No access token returned. Check the fking server");
        return
      }
      setAccessToken(token)

      const {data: userData} = await getAllUsers()
      console.log(userData)

    } catch (err) {
      console.error(err)
    }

  };

  return (
    <SectionContainer background="mt-1 h-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-[632px] h-[580px] p-8 bg-white shadow-md shadow-text rounded-lg">
          <h1 className="title mb-24 text-center">Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block subtitle">Username</label>
              <input
                name="username"
                placeholder="Enter username"
                value={form.username}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-[#CAD3DD] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block subtitle">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-[#CAD3DD] rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-highlight2 description text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>

            <div className="caption text-highlight1 text-center">
              <em>forgot password?</em>
            </div>

            <div className="font-bold text-center mt-20">
              Dont have an account?{" "}
              <span className="description text-highlight2">
                <em>Sign Up Now</em>
              </span>
            </div>
          </form>
        </div>
      </div>
    </SectionContainer>
  );
}
