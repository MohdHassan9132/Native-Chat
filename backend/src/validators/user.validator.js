import * as z from "zod";
import { ApiError } from "../utils/api.error.js";

const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 50 characters");

const validateName = (name) => {

  const result = nameSchema.safeParse(name);

  if (!result.success) {
    throw new ApiError(400,result.error.issues[0].message);
  }

  return result.data;
};

const phoneNumbeSchema = z.string().length(10,"Phone Number should of 10 Numbers")

const validatePhoneNumber = (phoneNumber)=>{
  const result = phoneNumbeSchema.safeParse(phoneNumber)
  if(!result.success){
    throw new ApiError(400,result.error.issues[0].message)
  }
  return result.data;
}

export {
  validateName,
  validatePhoneNumber
};