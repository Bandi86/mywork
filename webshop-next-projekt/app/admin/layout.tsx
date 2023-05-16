import Sidebar from './Sidebar';

const adminLayout = ({ children } : { children: React.ReactNode }) => {
  return (
		<div className='flex flex-row h-full'>
			<Sidebar />
			{children}
		</div>
	);
}

export default adminLayout