import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
import { nodemailerConfig } from "./nodemailer.config.js";

class emailService {
    async sendEmail(to, from, subject, htmlBody) {
        throw new Error(`This method must be implemented specifically!`);
    }
}

class nodemailerService extends emailService {
    constructor(config) {
        super();
        this.transporter = nodemailer.createTransport(config);
    }

    async sendEmail(to, subject, htmlBody) {
        console.log("sendEmail method started...");
        console.log("ENV EMAIL: ", process.env.SMTP_USER_EMAIL);
        console.log("ENV APP PASSWORD: ", process.env.SMTP_APP_PASSWORD);

        // main method begins here - just logs for testing above :)
        await this.transporter.sendMail({
            from: process.env.SMTP_USER_EMAIL,
            to,
            subject,
            html: htmlBody,
        });
        console.log("Email was sent successfully by nodemailer");
    }
}

export const nodemailerInstance = new nodemailerService(nodemailerConfig);
