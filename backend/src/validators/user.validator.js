import * as z from "zod";
import { ApiError } from "../utils/api.error.js";

const nameSchema = z
  .string()
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must be at most 30 characters");

const validateName = (name) => {

  const result = nameSchema.safeParse(name);

  if (!result.success) {
    throw new ApiError(400,result.error.issues[0].message);
  }

  return result.data;
};

const phoneNumbeSchema = z.string().regex(
  /^\+?[1-9]\d{1,14}$/, 
  { message: "Invalid phone number format. Use E.164 format (e.g., +919876543210)" }
);

const validatePhoneNumber = (phoneNumber)=>{
  const result = phoneNumbeSchema.safeParse(phoneNumber)
  if(!result.success){
    throw new ApiError(400,result.error.issues[0].message)
  }
  return result.data;
}

const bioSchema = z.string().min(10).max(60).regex(/^[A-Za-z0-9@_ .,!?'-]+$/)

const validateBio = (bio)=>{
  const result = bioSchema.safeParse(bio)
  if(!result.success){
    throw new ApiError(400,result.error.issues[0].message)
  }
  return result.data
}
const emailSchema = z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
const validateEmail = (email)=>{
  const result = emailSchema.safeParse(email)
  if(!result.success){
    throw new ApiError(400,result.error.issues[0].message)
  }
  return result.data
}


export {
  validateName,
  validatePhoneNumber,
  validateBio,
  validateEmail
};