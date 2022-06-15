import { useState, useEffect, useMemo, ReactNode, FunctionComponent } from 'react';
import Header from './Header';
import Table from './Table';
import PaginatedItems from './PaginatedItems';
import Tile from '../../Tile';
import TablePlaceholder from '../../placeholders/TablePlaceholder';
import { HeadDataTable } from './interfaces';

interface IDataTableProps {
	heading: HeadDataTable[];
	data: Array<any>;
	buttonHeader?: ReactNode;
	loading: boolean;
	bgHeader?: string;
	titulo?: any;
	canSearch?: boolean;
	showPagination?: boolean;
}

const DataTable: FunctionComponent<IDataTableProps> = props => {
	const { data, buttonHeader, loading, bgHeader, showPagination = true } = props;
	const itemsPerPage = 10;
	const [q, setQ] = useState('');
	const [currentItems, setCurrentItems] = useState(data);
	const [pageCount, setPageCount] = useState(0);
	const [itemOffset, setItemOffset] = useState(0);

	useEffect(() => {
		const endOffset = itemOffset + itemsPerPage;
		const newData = search(data);
		setCurrentItems(newData.slice(itemOffset, endOffset));
		setPageCount(Math.ceil(newData.length / itemsPerPage));
		// eslint-disable-next-line
	}, [itemOffset, itemsPerPage, data, q]);

	function search(rows: Array<any>) {
		const columns = rows[0] && Object.keys(rows[0]);
		return rows.filter(row =>
			columns.some(
				column =>
					row[column]
						?.toString()
						?.toLowerCase()
						?.indexOf(q.toLowerCase().trim()) > -1
			)
		);
	}

	const HeaderTable = useMemo(
		() => (
			<Header
				buttonHeader={buttonHeader}
				setQ={setQ}
				q={q}
				canSearch={props.canSearch}
			/>
		),
		[q, buttonHeader]
	);

	if (loading && !data.length) return <TablePlaceholder />;

	return (
		<Tile bgHeader={bgHeader}>
			{props.titulo}
			{HeaderTable}
			<div className="table-responsive pb-2">
				<Table
					heading={props.heading}
					data={currentItems}
					loading={loading}
				/>
				{showPagination ? (
					<div className="d-flex justify-content-md-between text-center justify-content-center flex-md-row flex-column">
						<small>
							Total registros: {Object.keys(data).length}
						</small>
						<PaginatedItems
							pageCount={pageCount}
							setItemOffset={setItemOffset}
							items={data}
							itemsPerPage={itemsPerPage}
						/>
					</div>
				) : null}
			</div>
		</Tile>
	);
};

export default DataTable;
