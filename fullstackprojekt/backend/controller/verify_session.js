import {sessions} from "../controller/login.js"; 

export default function verifySession(req, res) {
  const { sessionID } = req.body;
  const sessionData = {...sessions[sessionID], sessionID};
  if (sessionID in sessions) {
    res.send(sessionData);
  } else {
    res.status(401).json({ error: "Hibás vagy lejárt sessionID" });
  }
}