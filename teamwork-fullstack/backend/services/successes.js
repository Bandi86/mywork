// NEED TO CREATE FUNCTIONS HANDLING SUCCESSFUL REQUEST

export function successes(res, code, result ) {
    if (result) {
        console.log('SQL result:', result);
        res.status(code).json({ success: true, resdata: result })
    }
    else {
        console.log('SQL result: OK');
        res.status(code).json({ success: true })
    }
}