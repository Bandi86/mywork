export default function databaseError(err) {
    console.log(err);
    res.status(500).json({ message: "Database error" });
}
