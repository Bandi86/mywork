import { read } from '../../services/productServices';
import { useEffect, useState } from 'react';

export default function AdminCategoryList() {
	const [categoryNames, setCategoryNames] = useState([]);

	useEffect(() => {
		read('categories')
			.then((res) => res.json())
			.then((json) => {
				const catName = [];
				Object.values(json).map((c) => {
					catName.push(c.name);
				});
				setCategoryNames(catName);
			});
	}, []);

	function createCategoryOptions() {
		return categoryNames.map((categoryName) => {
			return <option key={categoryName} value={categoryName}>{categoryName}</option>;
		});
	}

	return <>{createCategoryOptions()}</>;
}
