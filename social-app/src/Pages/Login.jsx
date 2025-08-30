import { Button, Input } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "../Schema/LoginSchema";
import { Link, useNavigate } from "react-router-dom";
import { sendLoginData } from "../Services/authServices";
import { AuthContext } from "../Context/AuthContext";

//^login component

export default function Login() {
  //state
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  //error handling and validation
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  //navigate to feedpage
  const navigate = useNavigate();

  //context for user authentication
  const { setIsLoggedIn } = useContext(AuthContext);

  //submition handler
  async function login(userData) {
    setLoading(true);
    const response = await sendLoginData(userData);

    if (response.message) {
      localStorage.setItem("token", response.token);
      setIsLoggedIn(response.token);
      navigate("/");
    } else {
      setApiError(response.error);
    }

    setLoading(false);
  }

  return (
    <>
      <div className="bg-[#ffffffdb] rounded-3xl shadow-2xl py-10 px-6 min-w-md ">
        <h1
          className="text-center text-4xl text-[#464c82]
 font-semibold mb-6"
        >
          LOGIN
        </h1>

        <form onSubmit={handleSubmit(login)} className="flex flex-col gap-4 ">
          <Input
            isInvalid={Boolean(errors.email && touchedFields.email)}
            errorMessage={errors.email?.message}
            variant="underlined"
            label="Email"
            type="email"
            {...register("email")}
          />

          <Input
            isInvalid={Boolean(errors.password && touchedFields.password)}
            errorMessage={errors.password?.message}
            variant="underlined"
            label="Password"
            type="password"
            {...register("password")}
          />

          <Button
            isLoading={loading}
            type="submit"
            className="px-6 py-3 rounded-2xl text-white font-semibold
             bg-gradient-to-r from-[#826840] to-[#27496d] 
             hover:from-[#27496d] hover:to-[#406882] 
             transition-all duration-300"
          >
            Login
          </Button>
          <div className="text-center text-gray-700 text-sm">
            New here?{" "}
            <Link
              to="/register"
              className="hover:text-[#27496d] transition-colors text-[#406882] font-semibold"
            >
              Create an account
            </Link>
          </div>
          {apiError && (
            <span className="text-center text-red-600">{apiError}</span>
          )}
        </form>
      </div>
    </>
  );
}
