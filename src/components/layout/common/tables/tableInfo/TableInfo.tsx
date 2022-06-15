import TrVerInfo from './TrVerInfo';
import Tile from '../../Tile';
import ItemNotFound from '../../ItemNotFound';
import { ReactNode } from 'react';

export type InfoTableInterface = Array<{
	label: string;
	value: string | number | JSX.Element | JSX.Element[];
}>;

interface TableInfoInterface {
	info: InfoTableInterface;
	bgHeader?: string;
	children?: JSX.Element | JSX.Element[] | ReactNode;
	titulo?: JSX.Element | string;
	cargando?: boolean;
	notFoundErrorText?: string;
}

const TableInfo = ({
	info,
	bgHeader,
	children,
	titulo,
	cargando,
	notFoundErrorText,
}: TableInfoInterface): JSX.Element => {
	if (cargando) return null;

	if (!info.length) return <ItemNotFound mensaje={notFoundErrorText} />;
	return (
		<Tile bgHeader={bgHeader}>
			<>
				{titulo && <h4 className="text-center mb-3">{titulo}</h4>}
				<table className="table table-bordered h4">
					<tbody>
						{info.map(({ label, value }) => (
							<TrVerInfo
								label={label}
								value={value}
								key={label}
							/>
						))}
					</tbody>
				</table>
				{children}
			</>
		</Tile>
	);
};

export default TableInfo;
