import express from "express";
import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
} from "@simplewebauthn/server";
import { verifyRegistrationResponse } from "@simplewebauthn/server";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const challenges = {
  JHGJHJHJK878BMNBMN: "",
};

app.get("/", (req, res) => {
  return res.json({ message: "Passkey server is running..." });
});

app.get("/auth/passkeys/register/options", async (req, res) => {
  const options = await generateRegistrationOptions({
    rpName: "PassKey Test",

    rpID: "localhost",

    userID: new TextEncoder().encode("123456"),

    userName: "rubel@example.com",

    userDisplayName: "Md Rubel Ahmed Rana",

    attestationType: "none",

    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
    },
  });
  console.log(options);
  challenges.JHGJHJHJK878BMNBMN = options.challenge;
  return res.status(200).json(options);
});

app.post("/auth/passkeys/register/verify", async (req, res) => {
  const expectedChallenge = challenges.JHGJHJHJK878BMNBMN;
  console.log({ expectedChallenge });
  const verification = await verifyRegistrationResponse({
    response: req.body,

    expectedChallenge,

    expectedOrigin: "http://localhost:3000",

    expectedRPID: "localhost",
  });

  console.log(verification);

  return res.status(200).json(verification);
});

// login Flow
app.get("/auth/passkeys/login/options", async (req, res) => {
  const options = await generateAuthenticationOptions({
    rpID: "localhost",
    userVerification: "preferred",
  });

  console.log(options);

  return res.status(200).json(options);
});

app.post("/auth/passkeys/login/verify", (req, res) => {
  return res
    .status(200)
    .json({ message: "Passkey login successful", data: req.body });
});

app.listen(5000, () => {
  console.log(`Passkey server is running...`);
});
