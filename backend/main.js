import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(bodyParser.json());

// API: Submit Referral
app.post("/api/referrals", async (req, res) => {
  try {
    const { referrerName, referrerEmail, refereeName, refereeEmail, courseName, message } = req.body;

    const existingReferral = await prisma.referral.findFirst({
      where: { refereeEmail },
    });

    if (existingReferral) {
      return res.status(400).json({ error: "Referee email is already used in a referral." });
    }

    // Save to database
    const referral = await prisma.referral.create({
      data: {
        referrerName,
        referrerEmail,
        refereeName,
        refereeEmail,
        courseName,
        message,
      },
    });

    res.status(201).json({ message: "Referral submitted successfully!", referral });
  } catch (error) {
    console.error(error);

    if (error.code === "P2002") {
      return res.status(400).json({ error: "Email must be unique." });
    }

    res.status(500).json({ error: "Internal server error", details: error.message });
  }
});


// get to hit in browser to check 
app.get("/api/referrals", async (req, res) => {
  try {
    const referrals = await prisma.referral.findMany();
    res.json(referrals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "error", details: error.message });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
