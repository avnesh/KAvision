const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from root

// Email Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // Can be configured via env
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS 
    }
});

// Setup Transporter Verification
transporter.verify(function (error, success) {
    if (error) {
        console.log('SMTP Connection Error:', error);
    } else {
        console.log('Server is ready to send emails');
    }
});

// Contact Route
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, company, projectType, message } = req.body;

    const mailOptions = {
        from: `"${name}" <${email}>`, // sender address (might need to be authenticated user depending on provider)
        to: process.env.Receiver_Email || process.env.SMTP_USER, // list of receivers
        subject: `New Inquiry from ${name} - ${company || 'Individual'}`, // Subject line
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

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } catch (error) {
        console.error('Email Send Error:', error);
        res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
