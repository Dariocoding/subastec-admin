import { ReactNode } from 'react';
import { HeadDataTable } from './interfaces';

interface TBodyItemInterface extends HeadDataTable {
	value: ReactNode;
}

const TBodyItem = ({ center, name, value }: TBodyItemInterface) => (
	<td className={`${center || name === 'ID' ? 'text-center' : ''}`}>{value}</td>
);

export default TBodyItem;
