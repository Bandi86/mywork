import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	AiFillBackward,
	AiFillFastBackward,
	AiFillForward,
	AiOutlineFastForward,
} from 'react-icons/ai';
import { AdminProductsContext } from '../../context/AdminContexts';

export default function AdminPagination(props) {
	const navigate = useNavigate();
	const { adminProductsFilteredSorted, setAdminProductsFilteredSorted } = useContext(AdminProductsContext);
	const pageSize = 9;
	const pageCount = Math.ceil(adminProductsFilteredSorted.length / pageSize);
	const { rendezes, currentPage } = useParams();
	const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);
	
	useEffect(() =>{
		setCurrentPageNumber(currentPage)
	},[adminProductsFilteredSorted, setAdminProductsFilteredSorted])

	function fastBackward() {
		setCurrentPageNumber(1);
		if (rendezes === undefined) {
			navigate(`${props.page}/1`);
		} else navigate(`${props.page}/${rendezes}/1`);
	}
	function backward() {
		if (currentPage > 1) {
			const prevPage = +currentPageNumber - 1;
			setCurrentPageNumber(prevPage);
			if (rendezes === undefined) {
				navigate(`${props.page}/${prevPage}`);
			} else navigate(`${props.page}/${rendezes}/${prevPage}`);
		}
	}

	function forward() {
		if (currentPage < pageCount) {
			const nextPage = +currentPageNumber + 1;
			setCurrentPageNumber(nextPage);
			if (rendezes === undefined) {
				navigate(`${props.page}/${nextPage}`);
			} else navigate(`${props.page}/${rendezes}/${nextPage}`);
		}
	}

	function fastForward() {
		setCurrentPageNumber(pageCount);
		if (rendezes === undefined) {
			navigate(`${props.page}/${pageCount}`);
		} else navigate(`${props.page}/${rendezes}/${pageCount}`);
	}

	const AdminPaginationRender = () => {
		if (adminProductsFilteredSorted.length === 0) {
			return null;
		}

		const isFirstPage = currentPageNumber === 1;
		const isLastPage = currentPageNumber === pageCount;
		const showNavigationButtons = pageCount > 1 && adminProductsFilteredSorted.length > 9;

		const fastBackButtonProps = {
			onClick: fastBackward,
		};

		const backButtonProps = {
			onClick: backward,
		};

		const forwardButtonProps = {
			onClick: forward,
		};
		const fastForwardButtonProps = {
			onClick: fastForward,
		};

		return (
			<div className='page-turner'>
				{showNavigationButtons && (
					<>
						{isFirstPage ? (
							<>
								<AiFillFastBackward
									{...fastBackButtonProps}
									className='grey'
								/>
								<AiFillBackward
									{...backButtonProps}
									className='grey'
								/>
							</>
						) : (
							<>
								<AiFillFastBackward
									{...fastBackButtonProps}
									className='black'
								/>
								<AiFillBackward
									{...backButtonProps}
									className='black'
								/>
							</>
						)}
						<span>
							{currentPageNumber} / {pageCount}
						</span>
						{isLastPage ? (
							<>
								<AiFillForward
									{...forwardButtonProps}
									className='grey'
								/>
								<AiOutlineFastForward
									{...fastForwardButtonProps}
									className='grey'
								/>
							</>
						) : (
							<>
								<AiFillForward
									{...forwardButtonProps}
									className='black'
								/>
								<AiOutlineFastForward
									{...fastForwardButtonProps}
									className='black'
								/>
							</>
						)}
					</>
				)}
				{!showNavigationButtons && (
					<span>
						{currentPageNumber} / {pageCount}
					</span>
				)}
			</div>
		);
	};

	return <>{AdminPaginationRender()}</>;
}
