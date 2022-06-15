import { FunctionComponent } from 'react';
import ReactPaginate from 'react-paginate';

interface IPaginatedItemsProps {
	itemsPerPage: number;
	items: Array<any>;
	setItemOffset(newValue: number): void;
	pageCount: number;
}

const PaginatedItems: FunctionComponent<IPaginatedItemsProps> = props => {
	const { itemsPerPage, items, setItemOffset, pageCount } = props;

	const handlePageClick = (event: { selected: number }) => {
		const newOffset = (event.selected * itemsPerPage) % items.length;
		setItemOffset(newOffset);
	};
	return (
		<ReactPaginate
			nextLabel="Siguiente"
			onPageChange={handlePageClick}
			pageRangeDisplayed={1}
			pageCount={pageCount}
			previousLabel="Anterior"
			renderOnZeroPageCount={null}
			pageClassName="page-item"
			pageLinkClassName="page-link"
			previousClassName="page-item"
			previousLinkClassName="page-link"
			nextClassName="page-item"
			nextLinkClassName="page-link"
			breakLabel="..."
			breakClassName="page-item"
			breakLinkClassName="page-link"
			containerClassName="pagination pagination-sm mt-md-0 mt-3 justify-content-center justify-content-md-end"
			activeClassName="active"
		/>
	);
};

export default PaginatedItems;
