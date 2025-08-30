import { Button, Input, Select, SelectItem } from "@heroui/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendRegisterData } from "../Services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { schema } from "../Schema/RegisterSchema";

//^register component

export default function Register() {
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  //navigate to login
  const navigate = useNavigate();

  //submition handler
  async function signUp(userData) {
    setLoading(true);

    const response = await sendRegisterData(userData);

    if (response.message) {
      navigate("/login");
    } else {
      setApiError(response.error);
    }

    setLoading(false);

    console.log(response);
  }

  return (
    <>
      <div className="bg-[#ffffffdb] rounded-3xl shadow-2xl py-10 px-6 min-w-md ">
        <h1 className="text-center text-4xl text-[#464c82] font-semibold mb-6">
          REGISTER
        </h1>

        <form onSubmit={handleSubmit(signUp)} className="flex flex-col gap-4 ">
          <Input
            isInvalid={Boolean(errors.name)}
            errorMessage={errors.name?.message}
            variant="underlined"
            label="Name"
            type="name"
            {...register("name")}
          />

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

          <Input
            isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)}
            errorMessage={errors.rePassword?.message}
            variant="underlined"
            label="RePassword"
            type="Password"
            {...register("rePassword")}
          />

          <div className="flex gap-3">
            <Input
              isInvalid={Boolean(
                errors.dateOfBirth && touchedFields.dateOfBirth
              )}
              errorMessage={errors.dateOfBirth?.message}
              variant="underlined"
              label="Date Of Birth"
              type="date"
              {...register("dateOfBirth")}
            />

            <Select
              isInvalid={Boolean(errors.gender && touchedFields.gender)}
              errorMessage={errors.gender?.message}
              variant="underlined"
              label="Select Your Gender"
              {...register("gender")}
            >
              <SelectItem key={"male"}>{"male"}</SelectItem>
              <SelectItem key={"female"}>{"Female"}</SelectItem>
            </Select>
          </div>

          <Button
            isLoading={loading}
            type="submit"
            className="px-6 py-3 rounded-2xl text-white font-semibold
             bg-gradient-to-r from-[#406882] to-[#27496d] 
             hover:from-[#27496d] hover:to-[#406882] 
             transition-all duration-300"
          >
            Register
          </Button>

          <div className="text-center text-gray-700 text-sm">
            Have an acount?{" "}
            <Link
              to="/login"
              className="hover:text-[#27496d] transition-colors text-[#406882] font-semibold"
            >
              Login
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
