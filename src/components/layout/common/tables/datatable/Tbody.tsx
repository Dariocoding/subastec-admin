import { FunctionComponent } from 'react';
import { HeadDataTable } from './interfaces';
import { getIn } from 'formik';
import TBodyItem from './TBodyItem';

interface ITBodyProps {
	heading: HeadDataTable[];
	data: any[];
	loading: boolean;
}

const TBody: FunctionComponent<ITBodyProps> = ({ heading, data, loading }) => {
	const TrMensaje = ({ mensaje }: { mensaje: string }) => (
		<tr>
			<td className="text-center" colSpan={Object.keys(heading).length}>
				{mensaje}
			</td>
		</tr>
	);

	return (
		<tbody>
			{Object.keys(data).length ? (
				data.map((row, index) => (
					<tr key={index}>
						{heading.map(head => (
							<TBodyItem
								key={head.name}
								center={head.center}
								name={head.name}
								dataKey={head.dataKey}
								value={getIn(row, head.dataKey)}
							/>
						))}
					</tr>
				))
			) : loading ? (
				<TrMensaje mensaje={'Cargando datos...'} />
			) : (
				<TrMensaje mensaje={'No hay datos actualmente...'} />
			)}
		</tbody>
	);
};

export default TBody;
