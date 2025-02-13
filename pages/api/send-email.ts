// pages/api/send-email.js
import nodemailer from 'nodemailer';

interface req {
    method: string; 
    body: { 
        name: string; 
        email: string; 
        subject: string; 
        message: string; 
    };
}

interface res {
    status: (arg0: number) => { 
        (): any; 
        new(): any; 
        json: { 
            (arg0: { 
                message?: string;
                error?: string;
            }): void; 
            new(): any;
        }; 
    };
}

export default async function handler(req: req, res: res) {
  if (req.method === 'POST') {
    const { name, email, subject, message } = req.body;

    console.log(req.body)
    // Configure the email transport using nodemailer
    /* const transporter = nodemailer.createTransport({
      service: 'gmail', // You can use other services
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    }); */

    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.es',
      port: 465,
      secure: true, // upgrade later with STARTTLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      /* tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false,
      }, */
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      // to: process.env.EMAIL_USER,
      to: 'danijmj@gmail.com',
      subject: `Contact message from ${name}: ${subject}`,
      text: `You've recived a contact message from "${name}", with the email ${email} and with the next message: \n
${message}`
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to send email: ' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
