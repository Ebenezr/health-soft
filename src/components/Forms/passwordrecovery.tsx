import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../../Api/axios";

interface formData {
  email?: string;
  password?: string;
  cpassword?: string;
  className?: string;
}
const PasswordRecovery: React.FC<formData> = () => {
  //  const [validemail, setvalidEmail] = useState(true);
  const [status, setStatus] = useState<boolean>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<formData>({
    email: "",
    password: "",
    cpassword: "",
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
    const value: any = event.target.value;

    setFormData({ ...formData, [key]: value });
  };

  //submission form function
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (formData.password !== formData.cpassword) {
      return alert("passwords do not match");
    }

    Axios.patch(`/passwordreset/email="${formData?.email}"`, formData).then(
      (response) => {
        if (Object.values(response.data).length > 1) {
          setStatus(true);
          setTimeout(() => {
            navigate("/login");
          }, 1000);

          setTimeout(() => {
            setStatus(null);
          }, 2500);
        } else {
          setStatus(false);
          setTimeout(() => {
            setStatus(null);
          }, 2500);
        }
      }
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h4>Recover Account!</h4>
        <label className="required">Email</label>
        <input
          className={"inputs"}
          type="email"
          placeholder="Email"
          id="email"
          autoComplete="off"
          required
          onChange={handleChange}
          ref={userRef}
          value={formData?.email}
        />

        <label className="required">Password</label>
        <input
          className="inputs"
          type="password"
          placeholder="******"
          id="password"
          required
          value={formData?.password}
          onChange={handleChange}
        />

        <label className="required">Cornfirn Password</label>
        <input
          className="inputs"
          type="password"
          placeholder="******"
          id="cpassword"
          required
          value={formData?.cpassword}
          onChange={handleChange}
        />
        <div className="nav">
          <button className="btn-pry" type="submit">
            Reset password
          </button>
        </div>
        <span className="misc">
          <p onClick={() => navigate("/login")}>Back to login Page</p>
        </span>
        {status ? (
          <div className="form__status active">Password reset success</div>
        ) : status === false ? (
          <div className="form__status">Acount with email not found!</div>
        ) : null}
      </form>
    </>
  );
};

export default PasswordRecovery;
