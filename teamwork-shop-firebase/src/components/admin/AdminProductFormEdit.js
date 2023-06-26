export default function AdminProductFormEdit(props) {
	const handleInputChange = (e) => {
		const { name, value } = e.target;

		if (name === 'id') {

			props.callback(name, e);
			
		} else if (name === 'title') {
			
			props.callback(name, e);
					
        } else if (name === 'price') {
			 
				props.callback(name, e);
			
		}
			
	};

	return (
		<>
			<form>
				<label htmlFor='id'>Cikkszám</label>
				<input
					value={props.stateVar.id}
					name='id'
					onChange={handleInputChange}
				/>
				<label htmlFor='title'>Termék megnevezés</label>
				<input
					value={props.stateVar.title}
					name='title'
					onChange={handleInputChange}
				/>
				<label htmlFor='price'>Ár</label>
				<input
					value={props.stateVar.price}
					name='price'
					onChange={handleInputChange}
				/>
			</form>
		</>
	);
}
