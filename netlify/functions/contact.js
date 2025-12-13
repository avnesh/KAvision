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

        // Map project types to readable labels
        const projectTypeLabels = {
            'manual': 'Manual Testing Only',
            'automation': 'Automation Testing Only',
            'full-package': 'Manual + Automation (Full Package)',
            'consulting': 'QA Strategy/Consulting'
        };
        const readableProjectType = projectTypeLabels[projectType] || projectType;

        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: process.env.Receiver_Email || process.env.SMTP_USER,
            subject: `New Inquiry from ${name} - ${company || 'Individual'}`,
            text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
Phone: ${phone || 'N/A'}
Company: ${company || 'N/A'}
Project Type: ${readableProjectType}

Message:
${message}
            `,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #154483; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Contact Form Submission</h2>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 150px;">Name:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">
                                <a href="mailto:${email}" style="color: #154483; text-decoration: none;">${email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${phone || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${company || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">Project Type:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #eee;">${readableProjectType}</td>
                        </tr>
                    </table>

                    <div style="margin-top: 20px;">
                        <p style="font-weight: bold; margin-bottom: 10px;">Message:</p>
                        <div style="background-color: #f9fafb; padding: 15px; border-radius: 5px; border: 1px solid #eee;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; font-size: 12px; color: #888; text-align: center;">
                        Sent via KA Vision Website Contact Form
                    </div>
                </div>
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
