export function sqlError(res, err, code) {
    console.log('SQL error:', err);
    res.status(code).json({ success: false })

}

export function sessionError(res, message) {
    res.send(message)
}