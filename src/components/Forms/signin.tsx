import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Api/axios";
import { ReactSession } from "react-client-session";

ReactSession.setStoreType("localStorage");

interface formData {
  email?: string;
  password?: string;
  remember_me?: boolean;
}
const Signin: React.FC<formData> = () => {
  const [status, setStatus] = useState<boolean>(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
    remember_me: true,
  });
  const userRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (null !== userRef.current) {
      userRef.current.focus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //hangle change event
  const handleChange = (event: any): void => {
    const key: string = event.target.id;
    const value: any =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;

    setFormData({ ...formData, [key]: value });
  };

  //submission form function
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    Axios.post("/users", formData).then((response) => {
      if (Object.values(response.data).length > 1) {
        ReactSession.set("usertype", response.data?.usertype);
        ReactSession.set("sessionUser", response?.data);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        localStorage.setItem("authenticated", JSON.stringify(true));
        setStatus(true);
        setTimeout(() => {
          setStatus(null);
        }, 2500);
        setStatus(true);
        setTimeout(() => {
          navigate("/home/dashboard");
        }, 1000);
      } else {
        setStatus(false);
        setTimeout(() => {
          setStatus(null);
        }, 2500);
        setFormData({
          email: "",
          password: "",
        });
      }
    });
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
          <div className="form__status">Login details incorrect</div>
        ) : null}
      </form>
    </>
  );
};

export default Signin;
