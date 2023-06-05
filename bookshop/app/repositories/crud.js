function createFireBase(data, url) {
	return fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
}

function readFireBase(url) {
	return fetch(url);
}

function updateFireBase(data, url) {
	return fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
}

function removeFireBase(url) {
	if (!url) {
		return null;
	}

	return fetch(url, {
		method: 'DELETE',
	});
}

export { createFireBase, readFireBase, updateFireBase, removeFireBase };
