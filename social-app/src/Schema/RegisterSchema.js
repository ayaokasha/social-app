

import * as zod from "zod";



//zod schema for validation
export const schema = zod
  .object({
    name: zod
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters")
      .max(20, "Name must be at most 20 characters"),

    email: zod
      .string()
      .nonempty("Email is required")
      .regex(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format"
      ),

    password: zod
      .string()
      .nonempty("Password is required")
      .min(8, "Min 8 chars")
      .regex(/[a-z]/, "1 lowercase")
      .regex(/[A-Z]/, "1 uppercase")
      .regex(/[0-9]/, "1 number")
      .regex(/[^a-zA-Z0-9]/, "1 special char"),

    rePassword: zod.string().nonempty("RePassword Is Required"),

    dateOfBirth: zod.coerce.date("Age Is Required").refine((value) => {
      const today = new Date().getFullYear();
      const userAge = value.getFullYear();
      const age = today - userAge;
      return age >= 18;
    }, "You must be at least 18 years old"),

    gender: zod.string().nonempty("Gender Is Required"),
  })
  .refine((data) => data.password === data.rePassword, {
    path: ["rePassword"],
    message: "Passwords must match",
  });