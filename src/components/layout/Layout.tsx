
import NavBar from "./NavBar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow pt-16">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
