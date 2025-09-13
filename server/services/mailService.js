const nodemailer = require( "nodemailer" );

class MailService {
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false,
            requireTLS: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            },
            debug: true,        
            logger: true
        });
    }

    async sendActivationMail( to, link ){
        const result = await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: "Активация аккаунта на " + process.env.API_URL,
            text: "",
            html: `
                <div>
                    <h1>Для активации аккаунта перейдите по <a href="${ link }">ссылке</a></h1>
                </div>
            `
        });

        return result;
    }
}

module.exports = new MailService();