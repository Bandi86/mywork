import React from 'react'

const Footer = () => {
	return (
		<footer
			className='bg-wh-900 text-wh-50 py-5 px-10 border-t border-indigo-300
        bg-[#459c98]'
		>
			<div className='justify-evenly mx-auto gap-16 sm:flex text-center'>
				{/* First Column */}
				<div className='mt-16 basis-1/3 sm:mt-0'>
					<h4 className='font-bold'>Blog Of Future</h4>
					<p className='my-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
					<p>Copy Right</p>
				</div>
				{/* Second Column */}
				<div className='mt-16 basis-1/3 sm:mt-0'>
					<h4 className='font-bold'>Links</h4>
					<p className='my-5'>Massa orc senectus</p>
					<p className='my-5'>Copy Right</p>
					<p>Ullamcorper vivamus</p>
				</div>
				{/* Third Column */}
				<div className='mt-16 basis-1/3 sm:mt-0'>
					<h4 className='font-bold'>Contact us</h4>
					<p className='my-5'>Massa orc senectus</p>
					<p className='my-5'>Copy Right</p>
					<p>0000555555121212</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer