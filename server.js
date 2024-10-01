import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config(); // Load environment variables from .env file

const app = express();
app.use(express.json()); // Use express's built-in body parser


app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from your frontend URL
    methods: ['POST', 'GET', 'OPTIONS']
}));


// In-memory store to track subscriptions (consider using a database later)
let subscribers = {};

// Nodemailer configuration for sending email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // Use environment variables for sensitive info
        pass: process.env.EMAIL_PASSWORD
    }
});

// Endpoint to handle subscriptions
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    if (subscribers[email]) {
        return res.status(409).json({ message: 'You have already subscribed!' });
    }

    subscribers[email] = true;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: '🎉 Welcome to HandiCraft MarketPlace! 🎉',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h1 style="color: #ff6600;">Welcome to HandiCraft MarketPlace!</h1>
                <p>Hi there,</p>
                <p>Thank you for subscribing to our newsletter. We're thrilled to have you on board!</p>
                <p>At HandiCraft MarketPlace, we bring you the finest handmade crafts from talented artisans around the globe. Stay tuned for:</p>
                <ul>
                    <li>✨ New arrivals</li>
                    <li>🎁 Exclusive offers</li>
                    <li>📰 Crafting tips and stories</li>
                </ul>
                <p>To get started, here are some things you can do:</p>
                <ol>
                    <li><a href="http://localhost:5173/shop" style="color: #ff6600;">Browse our latest collections</a></li>
                    <li><a href="http://localhost:5173/blog" style="color: #ff6600;">Read our blog for crafting inspiration</a></li>
                    <li><a href="http://localhost:5173/dashboard" style="color: #ff6600;">Update your profile and preferences</a></li>
                </ol>
                <p>Feel free to <a href="http://localhost:5173/contact" style="color: #ff6600;">contact us</a> if you have any questions or need assistance.</p>
                <p>Best regards,</p>
                <p><strong>The HandiCraft MarketPlace Team</strong></p>
                <div style="margin-top: 20px; padding: 10px; border-top: 1px solid #ddd;">
                    <p style="font-size: 0.9em; color: #777;">Follow us on:</p>
                    <p>
                        <a href="https://www.facebook.com" style="color: #3b5998; text-decoration: none; margin-right: 10px;">Facebook</a> |
                        <a href="https://www.twitter.com" style="color: #1da1f2; text-decoration: none; margin-right: 10px;">Twitter</a> |
                        <a href="https://www.instagram.com" style="color: #e1306c; text-decoration: none;">Instagram</a>
                    </p>
                </div>
                <div style="margin-top: 20px; padding: 10px; border-top: 1px solid #ddd;">
                    <p style="font-size: 0.8em; color: #777;">If you did not subscribe to this newsletter or wish to unsubscribe, please <a href="http://localhost:5173/unsubscribe" style="color: #ff6600;">click here</a>.</p>
                </div>
            </div>
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Thank you for subscribing! A confirmation email has been sent.' });
    });
});



// Start the server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
