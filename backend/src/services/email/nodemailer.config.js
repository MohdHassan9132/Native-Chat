import dotenv from "dotenv";
dotenv.config();

export const nodemailerConfig = {
    service: "gmail",
    host: process.env.SMTP_HOST,
    auth: {
        user: process.env.SMTP_USER_EMAIL,
        pass: process.env.SMTP_APP_PASSWORD,
    },
    secure: true,
    port: process.env.SMTP_PORT,
};
