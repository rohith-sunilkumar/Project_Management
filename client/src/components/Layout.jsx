import Navbar from "../pages/Navbar.jsx";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="p-6">{children}</div>
    </div>
  );
};

export default Layout;