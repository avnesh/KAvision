const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ success: false, message: 'Method Not Allowed' })
        };
    }

    try {
        const { name, email, phone, company, projectType, message } = JSON.parse(event.body);

        // Validate required fields
        if (!name || !email || !message) {
            return {
                statusCode: 400,
                body: JSON.stringify({ success: false, message: 'Missing required fields' })
            };
        }

        // Configure Nodemailer Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: process.env.SMTP_PORT || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        const mailOptions = {
            from: `"${name}" <${email}>`, // Note: Some providers override 'from' to auth user
            to: process.env.Receiver_Email || process.env.SMTP_USER,
            subject: `New Inquiry from ${name} - ${company || 'Individual'}`,
            html: `
                <h3>New Contact Form Submission</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                <p><strong>Company:</strong> ${company || 'N/A'}</p>
                <p><strong>Project Type:</strong> ${projectType}</p>
                <br>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        };

        // Send Email
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true, message: 'Message sent successfully!' })
        };

    } catch (error) {
        console.error('Email Send Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, message: 'Failed to send message. Please try again later.' })
        };
    }
};
