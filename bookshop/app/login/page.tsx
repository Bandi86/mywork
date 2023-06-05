import React from 'react'
import LoginForm from '../components/Auth/LoginForm';

const page = () => {
    return (
			<div className='bg-[#f4f3ec] min-h-full p-4'>
				<div className='items-center'>
					<LoginForm />
				</div>
			</div>
		);
}

export default page