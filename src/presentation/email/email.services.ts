import nodemailer from 'nodemailer';

process.loadEnvFile();

export interface SendMailOptions {
    to: string | string[];
    subject: string;
    body: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string
}

export class EmailService {

    private transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MAILER_EMAIL,
            pass: process.env.MAILER_SECRET_KEY
        }
    })

    async sendEmail(options: SendMailOptions): Promise<boolean> {
        const { to, body, subject, attachments = [] } = options

        await this.transport.sendMail({
            to: to,
            subject: subject,
            html: body,
            attachments: attachments
        })

        return true;
    }

    async sentEmailWithAttachment(to: string | string[]): Promise<boolean> {
        const attachments: Attachment[] = [
            {
                filename: 'log-all.log',
                path: './logs/log-all.log'
            },
            {
                filename: 'log-high.log',
                path: './logs/log-high.log'
            },
            {
                filename: 'log-medium.log',
                path: './logs/log-medium.log'
            }
        ]

        const subject = 'Envío de logs del sistema - Archivos adjuntos'
        const body = `<p>Adjunto los logs del sistema.</p>`

        return this.sendEmail({
            to,
            subject,
            body,
            attachments
        });
    }
}
