import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "@/components/navbar";
import userAtom from "@/atoms/userAtom";
import HomePage from "@/pages/home-page";
import AuthPage from "@/pages/auth-page";

const App = () => {
  const [showNavbar, setShowNavbar] = useState(null);

  const location = useLocation();
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    if (location.pathname === "/auth") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [location.pathname]);

  return (
    <>
      {showNavbar && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage user={user} />} />
      </Routes>
    </>
  );
};

export default App;
