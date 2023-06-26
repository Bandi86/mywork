import { API_URL } from '../repositories/API_repo';
import formatData from './formatData';
import {
	createFireBase,
	readFireBase,
	removeFireBase,
	updateFireBase,
} from '../repositories/Crud';

function create(data, path) {
	if (!path) return null;
	const url = `${API_URL}${path}.json`;
	return createFireBase(data, url).then((res) => res.json());
}

function read(path, setter) {
	if (!path) return null;
	const url = `${API_URL}${path}.json`;

	if (!setter) return readFireBase(url);
	return readFireBase(url)
		.then((res) => res.json())
		.then((json) => setter(formatData(json)));
}

function update(data, path, id) {
	if (!id || !path) return null;

	const url = `${API_URL}${path}/${id}.json`;
	return updateFireBase(data, url).then((res) => res.json());
}

function remove(id, path) {
	if (!id || !path) return null;
	const url = `${API_URL}${path}/${id}.json`;
	return removeFireBase(url).then((res) => res.json());
}

function removeItemAndNavigate(dbID, path, navigate, navigatePath) {
	return remove(dbID, path).then((res) => navigate(navigatePath));
}

function updateItemAndNavigate(dbID, data, path, navigate, navigatePath) {
	return update(data, path, dbID).then((res) => navigate(navigatePath));
}

export { create, read, update, remove, removeItemAndNavigate, updateItemAndNavigate };
