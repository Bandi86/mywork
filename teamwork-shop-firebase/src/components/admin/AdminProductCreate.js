import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { useState } from 'react';
import { app } from '../../repositories/API_repo';
import { create, update } from '../../services/productServices';
import AdminImageForm from './AdminImageForm';
import AdminProductForm from './AdminProductForm';

export default function AdminProductCreate() {
	const [productAttr, setProductAttr] = useState({
		title: '',
		id: '',
		price: '',
		categoryId: '',
		image: '',
		description: '',
		attr1: '',
		attr2: '',
		attr3: '',
	});

	const [file, setFile] = useState(null);
	const [uploadedUrl, setUploadedUrl] = useState(null);
	const [prodId, setprodId] = useState(null);

	function setProduct(productKey, e) {
		setProductAttr({ ...productAttr, [productKey]: e.target.value });
	}

	function fileChange(e) {
		setFile(e.target.files[0]);
	}

	function addNewProduct() {
		create(productAttr, 'termekek')
			.then((res) => {
				const prodId = res.name;
				setprodId(prodId);
				return prodId;
			})
			.then((prodId) => fileUpload(file, prodId));
	}

	function fileUpload(file, id) {
		if (!file) {
			return;
		}
		const storage = getStorage(app);
		const fileRef = ref(storage, 'images/' + file.name);
		uploadBytes(fileRef, file)
			.then((uploadResult) => {
				return getDownloadURL(uploadResult?.ref)
					.then((url) => {
						setUploadedUrl(url);
						return url;
					})
					.then((upUrl) => {
						return update({ ...productAttr, image: upUrl }, 'termekek', id);
					});
			})
			.then((res) => {
				setProductAttr({
					title: '',
					id: '',
					price: '',
					categoryId: '',
					image: '',
					description: '',
					attr1: '',
					attr2: '',
					attr3: '',
				});
				setFile(null);
			});
	}

	return (
		<>
			<AdminProductForm
				stateVar={productAttr}
				callback={setProduct}
			/>
			<AdminImageForm callback={fileChange} />
			<button
				className='newproduct-btn'
				onClick={addNewProduct}
			>
				Termék feltöltése
			</button>

			<div>
				Feltöltött kép:
				<br />
				{uploadedUrl && (
					<img
						src={uploadedUrl}
						alt=''
						style={{ width: '10rem' }}
					/>
				)}
			</div>
		</>
	);
}
