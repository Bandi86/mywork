import express from "express";
import { nanoid } from "nanoid";
import { insertDBAvatar, multerAvatarUpload } from "../middleware/multer.js";
import verifySession from "../middleware/verify_session.js";
import { addSession, getUser } from "../services/auth/login.js";
import {
  createUser,
  isEmailTaken,
  validateEmail,
  validateFields,
  validatePassword,
  validateUsername,
} from "../services/auth/register.js";
import { comparePassword, hashPassword } from "../services/password.js";
import { convertDate } from "../services/timestamp.js";

const router = express.Router();

export const sessions = {};

// Regisztráció útvonala
router.post(
  "/register",
  multerAvatarUpload().single("file"),
  async (req, res) => {
    const { username, email, password } = req.body;

    const saltRounds = 10;
    const id = nanoid();
    let role = "";
    const created_at = Date.now();

    if (email.toLowerCase() === "susutechno@gmail.com") {
      role = "admin";
    } else {
      role = "user";
    }

    try {
      const validation = validateFields(req.body);
      if (!validation.success) {
        return res
          .status(400)
          .json({ success: false, message: validation.message });
      }

      const validationUser = validateUsername(req.body.username);
      if (!validationUser.success) {
        return res
          .status(400)
          .json({ success: false, message: validationUser.message });
      }

      const validationPassword = validatePassword(req.body.password);
      if (!validationPassword.success) {
        return res
          .status(400)
          .json({ success: false, message: validationPassword.message });
      }

      const validationEmail = validateEmail(req.body.email);
      if (!validationEmail.success) {
        return res
          .status(400)
          .json({ success: false, message: validationEmail.message });
      }

      const emailTaken = await isEmailTaken(email);
      if (emailTaken) {
        return res.status(409).json({
          success: false,
          message: "Email is already in use",
        });
      }

      const hashedPassword = await hashPassword(password, saltRounds);

      if (
        validation.success &&
        validationUser.success &&
        validationPassword.success &&
        validationEmail.success &&
        !emailTaken
      ) {
        insertDBAvatar(req, res);
        createUser(
          id,
          username,
          email,
          hashedPassword,
          role,          
          created_at
        )
          .then(() => {
            console.log(
              "Felhasználó létrehozva",
              "Felhasználónév",
              username,
              "Email",
              email,
              "Jelszó",
              "role",
              role,
              hashedPassword,
              "Idő",
              convertDate(created_at)
            );
            return res
              .status(200)
              .json({ success: true, message: "User created" });
          })
          .catch((error) => {
            console.error("Error during user creation:", error);
            return res
              .status(500)
              .json({
                success: false,
                message: "Registration Failed",
                error: error.message,
              });
          });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Registration Failed" });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      return res
        .status(500)
        .json({
          success: false,
          message: "Registration Failed",
          error: error.message,
        });
    }
  }
);

// Bejelentkezés útvonala
router.post("/login", (req, res) => {
  // Bejelentkezési logika

  const validation = validateFields(req.body);
  if (!validation.success) {
    return res
      .status(400)
      .json({ success: false, message: validation.message });
  }

  const { email, password } = req.body;

  getUser(email, (err, user) => {
    if (err) {
      console.error("Failed to get user:", err);
      return res
        .status(500)
        .json({ error: "Error during login", details: err.message });
    }
    if (!user) {
      return res
        .status(401)
        .json({ error: "No registered user found in database" });
    }

    const { id, password: hashedPassword, username, role } = user;
    comparePassword(password, hashedPassword, (compareErr, isMatch) => {
      if (compareErr) {
        console.error("Login error:", compareErr);
        return res
          .status(500)
          .json({ error: "Error during login", details: compareErr.message });
      }
      if (!isMatch) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      addSession(res, id, email, role, username);
    });
  });
});

router.post("/verify-session", verifySession);

export default router;
