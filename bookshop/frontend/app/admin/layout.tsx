import AdminMenu from './AdminMenu';

const adminLayout = ({ children } : { children: React.ReactNode }) => {
  return (
		<div className='flex flex-col h-full'>
			<AdminMenu />
			{children}
		</div>
	);
}

export default adminLayout