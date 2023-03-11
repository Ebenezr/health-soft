import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Api/axios";
import { ReactSession } from "react-client-session";
import { useMutation, useQueryClient } from "@tanstack/react-query";

ReactSession.setStoreType("localStorage");

interface formData {
  email?: string;
  password?: string;
  remember_me?: boolean;
}
const Signin: React.FC<formData> = () => {
  const queryClient = useQueryClient();
  const [status, setStatus] = useState<boolean>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
    remember_me: true,
  });
  const userRef = React.useRef<HTMLInputElement>(null);

  //handle change event
  const handleChange = (event: any): void => {
    const key: string = event.target.id;
    const value: any =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData({ ...formData, [key]: value });
  };

  //login post request
  const logIn = async (formData) => {
    await Axios.post(`/login`, formData).then((res) => {
      localStorage.setItem("user", JSON.stringify(res?.data?.name));
      localStorage.setItem("token", JSON.stringify(res?.data?.token));
      localStorage.setItem("role", JSON.stringify(res?.data?.role));
    });
  };

  const {
    mutate: post,
    isLoading,
    isSuccess,
  } = useMutation(logIn, {
    onMutate: () => {},
    onSuccess: (data) => {
      localStorage.setItem("authenticated", JSON.stringify(true));
      setStatus(true);
      setTimeout(() => {
        setStatus(null);
      }, 2500);
      setStatus(true);
      setTimeout(() => {
        navigate("/home/patients");
      }, 1000);
    },
    onError: (error: any) => {
      setStatus(false);
      setTimeout(() => {
        setStatus(null);
      }, 2500);
      setFormData({
        email: "",
        password: "",
      });
    },
  });

  //submission form function
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    post(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h4>Sign in to start your session</h4>
        <label>
          Email
          <input
            className="inputs"
            type="email"
            placeholder="Email"
            id="email"
            autoComplete="off"
            required
            onChange={handleChange}
            ref={userRef}
            value={formData?.email}
          />
        </label>
        <label>
          Password
          <input
            className="inputs"
            type="password"
            placeholder="******"
            id="password"
            required
            value={formData?.password}
            onChange={handleChange}
          />
        </label>
        <div className="nav">
          <span>
            <input
              type="checkbox"
              id="remember_me"
              checked={formData?.remember_me}
              onChange={handleChange}
            />
            <h3>
              <strong>Remeber Me</strong>
            </h3>
          </span>
          <button className="btn-pry" type="submit">
            Sign In
          </button>
        </div>
        <span className="misc">
          <p onClick={() => navigate("recover")}>I forgot my password</p>
        </span>
        {status ? (
          <div className="form__status active">Login Succesfuly</div>
        ) : status === false ? (
          <div className="form__status">Incorect Email or Password!</div>
        ) : null}
        {isLoading ? (
          <div className="form__status loading">Signing you in...</div>
        ) : null}
      </form>
    </>
  );
};

export default Signin;
