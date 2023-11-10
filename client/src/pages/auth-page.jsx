/* eslint-disable react/prop-types */
import authScreenAtom from "@/atoms/authScreenAtom";
import Login from "@/components/auth/login";
import Register from "@/components/auth/register";
import BackHome from "@/components/back-home";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

const AuthPage = ({ user }) => {
  const authScreen = useRecoilValue(authScreenAtom);

  const navigate = useNavigate();

  if (user) return navigate("/");

  return (
    <main className="h-screen w-full flex items-center justify-center relative">
      {authScreen === "LOGIN" ? <Login /> : <Register />}
      <div className="absolute top-5 left-5">
        <BackHome />
      </div>
    </main>
  );
};

export default AuthPage;
