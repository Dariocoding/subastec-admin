import { ReactNode } from 'react';

interface TrVerInfoInterface {
	label: string;
	value: string | number | JSX.Element | JSX.Element[] | ReactNode;
}
const TrVerInfo = ({ label, value }: TrVerInfoInterface) => (
	<tr>
		<td className="text-right h4">
			<span style={{ fontWeight: 600 }}>{label}:</span>
		</td>
		<td>{value}</td>
	</tr>
);

export default TrVerInfo;
