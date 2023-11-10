import userAtom from "@/atoms/userAtom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useSetRecoilState(userAtom);

  const logout = async () => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) return toast.error("Something went wrong");

      localStorage.removeItem("user");
      setUser(null);
      toast("Logged out successfully");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { logout, isLoading };
};

export default useLogout;
