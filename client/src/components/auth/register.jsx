import authScreenAtom from "@/atoms/authScreenAtom";
import userAtom from "@/atoms/userAtom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { registerValidator } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Loader from "../loader";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);

  const setUser = useSetRecoilState(userAtom);
  const setAuthScreen = useSetRecoilState(authScreenAtom);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerValidator),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values) {
    try {
      setIsLoading(true);
      const res = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (data.error) return toast.error(data.error);

      setUser(data);
      toast("Account created successfully!");
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      {isLoading && <Loader />}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full max-w-[300px] mx-auto"
      >
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-semibold">Create an account</h1>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full mt-2">
          <h1 className="text-sm font-medium">
            Already have an account?{" "}
            <span
              onClick={() => setAuthScreen("LOGIN")}
              className="text-sm font-semibold hover:underline text-muted-foreground cursor-pointer ml-1"
            >
              Login
            </span>
          </h1>
        </div>
        <Button disabled={isLoading} className="my-3" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default Register;
