/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import UserMenu from "./user-menu";
import useLogout from "@/hooks/use-logout";
import Loader from "./loader";

const Navbar = ({ user }) => {
  const { isLoading, logout } = useLogout();

  return (
    <header className="fixed top-0 inset-0 h-20 border-b z-[50]">
      {isLoading && <Loader />}
      <nav className="h-full w-full flex items-center justify-between max-w-7xl mx-auto backdrop-blur-xl lg:px-13 sm:px-10 px-6">
        <section className="flex items-center  h-full">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="logo" className="w-10 h-10" />
            <p className="text-xl font-medium hidden md:block">
              MERN Photo Albumn
            </p>
          </Link>
        </section>
        {user ? (
          <section className="flex items-center gap-3">
            <ModeToggle />
            <UserMenu logout={logout} />
          </section>
        ) : (
          <section className="flex items-center gap-3">
            <ModeToggle />
            <Link to="/auth">
              <Button variant="ghost">Sign in</Button>
            </Link>
          </section>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
