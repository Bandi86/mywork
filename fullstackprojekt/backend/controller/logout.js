import router from "../routes/auth.js";

export default function logoutUser(req, res) {
  router.get("/logout", (req, res) => {
    console.log(req.query.sessionID);
    delete sessions[req.query.sessionID];
    res.send("Logout successful");
    console.log("Logout successful");
  });
}