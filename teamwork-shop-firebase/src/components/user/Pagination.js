import { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	AiFillBackward,
	AiFillFastBackward,
	AiFillForward,
	AiOutlineFastForward,
} from 'react-icons/ai';
import './pagination.css';
import { ProductsContext } from '../../context/UserContexts';
import { range } from '../../services/rangeService';

export default function Pagination(props) {
	const navigate = useNavigate();
	const { productsFilteredSorted, setproductsFilteredSorted } =
		useContext(ProductsContext);
	const pageSize = 9;
	const pageCount = Math.ceil(productsFilteredSorted.length / pageSize);
	const { rendezes, currentPage } = useParams();
	const [currentPageNumber, setCurrentPageNumber] = useState(currentPage);
	const [previousPages, setPreviousPages] = useState([]);
	const [nextPages, setNextPages] = useState([]);

	useEffect(() => {
		setCurrentPageNumber(currentPage);
		const pagesToShow = 3; // A megjelenítendő oldalak száma

		// Előző oldalak frissítése
		const previous = [];
		for (
			let i = currentPageNumber - 1;
			i >= currentPageNumber - pagesToShow && i >= 1;
			i--
		) {
			previous.unshift(i);
		}
		setPreviousPages(previous);

		// Következő oldalak frissítése
		const next = [];
		for (
			let i = currentPageNumber + 1;
			i <= currentPageNumber + pagesToShow && i <= pageCount;
			i++
		) {
			next.push(i);
		}
		setNextPages(next);
	}, [currentPageNumber, currentPage, pageCount]);

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

	const PaginationRender = () => {
		if (productsFilteredSorted.length === 0) {
			return null;
		}

		const isFirstPage = currentPageNumber == 1;
		const isLastPage = currentPageNumber == pageCount;
		const showNavigationButtons = pageCount > 1 && productsFilteredSorted.length > 9;

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

		const pgCnt = Number(currentPageNumber);
		const rangeB = range(pgCnt - 3, pgCnt - 1, 1).filter((x) => x > 0);
		const rangeF = range(pgCnt + 1, pgCnt + 3, 1).filter((x) => x <= pageCount);

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

						{/* Megjelenítés az előző oldalakhoz */}
						{rangeB.map((x, index) => {
							return (
								<button
									key={x}
									onClick={() => {
										const page = x;
										setCurrentPageNumber(page);
										if (rendezes === undefined) {
											navigate(`${props.page}/${page}`);
										} else {
											navigate(`${props.page}/${rendezes}/${page}`);
										}
									}}
								>
									{x}
								</button>
							);
						})}

						{/* Aktuális oldal gomb */}
						<button id='current-button'>{currentPageNumber}</button>

						{/* Megjelenítés a következő oldalakhoz */}
						{rangeF.map((x, index) => {
							return (
								<button
									key={x}
									onClick={() => {
										const page = x;
										setCurrentPageNumber(page);
										if (rendezes === undefined) {
											navigate(`${props.page}/${page}`);
										} else {
											navigate(`${props.page}/${rendezes}/${page}`);
										}
									}}
								>
									{x}
								</button>
							);
						})}

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
			</div>
		);
	};

	return <>{PaginationRender()}</>;
}
