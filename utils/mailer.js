import nodemailer from "nodemailer";

export const sendEmail = async (to, subject, html) => {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    const info = await transporter.sendMail({
        from: `"Ecommerce App" <${testAccount.user}>`,
        to,
        subject,
        html,
    });

    console.log("Preview URL: " + nodemailer.getTestMessageUrl(info));
};
