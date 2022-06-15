import TBody from './Tbody';
import Thead from './Thead';
import { HeadDataTable } from './interfaces';
import { FunctionComponent } from 'react';

interface ITableProps {
	heading: HeadDataTable[];
	data: Array<any>;
	loading: boolean;
}

const Table: FunctionComponent<ITableProps> = ({ heading, data, loading }) => (
	<table className="table table-hover table-bordered">
		<Thead heading={heading} />
		<TBody heading={heading} data={data} loading={loading} />
	</table>
);

export default Table;
