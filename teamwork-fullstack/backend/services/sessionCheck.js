export default function sessionCheck(id, sessions) {
    const sessionID = id
    const existingSession = sessions[sessionID] != undefined;

    if (existingSession || sessions[sessionID].role == "admin") return true
    else return false
}