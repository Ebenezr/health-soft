import Footer from "./Footer";
import Header from "./Header";
import Routing from "./_routes";

const Layout: React.FC = () => {
  return (
    <section className="container__main">
      <Header />
      <div className="view__main">
        <Routing />
      </div>
      <Footer />
    </section>
  );
};

export default Layout;
