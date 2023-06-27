import { sessions } from "./login.js";

export default function logoutUser(req, res) {
  const { sessionID } = req.params;
  console.log("logoutUser", sessionID);
  
  if (!sessionID) {
    res.status(400).json({ success: false, message: "SessionID is missing" });
    return;
  } else {
    delete sessions[sessionID];
    res.status(200).json({ success: true, message: "Logout Done" });
  }
}




