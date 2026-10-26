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

        // main method begins here - just logs for testing above :)
        return await this.transporter.sendMail({
            from: process.env.SMTP_USER_EMAIL,
            to,
            subject,
            html: htmlBody,
        });
    }
}

export const nodemailerInstance = new nodemailerService(nodemailerConfig);
