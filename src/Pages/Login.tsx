import { Outlet } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <section id="login">
      <div className="container__login">
        <h2>
          Healthsoft<span>System</span>
        </h2>
        <Outlet />
      </div>
    </section>
  );
};
export default Login;
