import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();


router.post("/apply", async (req, res) => {
    const { name, email, phone, salary, resume, coverLetter, position } = req.body;


    if (!name || !email || !resume) {
        return res.status(400).json({ message: "Please provide Name, Email, and Resume Link." });
    }

    try {

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "your-email@gmail.com",
                pass: "your-app-password"
            }
        });


        const mailOptions = {
            from: `"${name}" <${email}>`,
            to: "your-email@gmail.com",
            subject: `New Application: ${position} - ${name}`,
            html: `
                <h2>New Career Application</h2>
                <p><strong>Position:</strong> ${position}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone || "N/A"}</p>
                <p><strong>Expected Salary:</strong> ${salary || "N/A"}</p>
                <p><strong>Resume Link:</strong> <a href="${resume}">${resume}</a></p>
                <br/>
                <h3>Cover Letter:</h3>
                <p>${coverLetter || "N/A"}</p>
            `
        };


        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Application submitted successfully!" });

    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: "Failed to send application. Please try again later." });
    }
});

export default router;
