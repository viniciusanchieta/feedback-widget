import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "831a0e7301c484",
        pass: "e9c0a64296bad6"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Vinicius <contact@viniciusanchieta.dev>',
            to: 'Vinicius Cesar <vinicius.anchieta@outlook.com>',
            subject,
            html: body,
        })
    }
}