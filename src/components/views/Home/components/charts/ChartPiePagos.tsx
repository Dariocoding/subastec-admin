import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { APP_SEARCHER, INPUT_SEARCH } from './stylesSearch';
import clienteAxios from '../../../../../config/axios';
import Tile from '../../../../layout/common/Tile';
import { getRandomColor } from '../../../../utils';

ChartJS.register(ArcElement, Tooltip, Legend);

export type ChartDougnugtDataType = {
	year?: number;
	mes?: string;
	paquetespago?: Array<{
		cantidad: string;
		cantidad_bids: number;
		idpaquete: number;
		total: number;
	}>;
};

interface IChartPiePagosProps {
	dataChartPaquetesMesPago: ChartDougnugtDataType;
	setDataChartPaquetesMesPago(value: ChartDougnugtDataType): void;
}

const ChartPiePagos: React.FunctionComponent<IChartPiePagosProps> = props => {
	const { dataChartPaquetesMesPago, setDataChartPaquetesMesPago } = props;
	const { year, mes, paquetespago } = dataChartPaquetesMesPago;
	const [startDate, setStartDate] = React.useState(new Date());

	const data = ((): ChartData<'doughnut'> => ({
		labels: paquetespago
			? paquetespago.map(pqb => pqb.cantidad_bids + 'Bids' + ` (${pqb.cantidad})`)
			: [],
		datasets: [
			{
				data: paquetespago ? paquetespago.map(t => t.total / 100) : [],
				backgroundColor: paquetespago
					? paquetespago.map(pqb => getRandomColor())
					: [],
				borderWidth: 0,
			},
		],
	}))();
	async function handleChangeDate(date: Date) {
		setStartDate(date);

		const year = date.getFullYear();
		const month = date.getMonth() + 1;

		try {
			const request = await clienteAxios.get(
				`/dashboard/findPaquetesBidPagoMes/${month}/${year}`
			);

			setDataChartPaquetesMesPago(request.data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Tile>
			<h5 className="text-center mb-3">
				Tipos Pago de: {year} - {mes}
			</h5>
			<APP_SEARCHER>
				<div>
					<INPUT_SEARCH
						selected={startDate}
						onChange={handleChangeDate}
						dateFormat="MM/yyyy"
						showMonthYearPicker
						showFullMonthYearPicker
						showFourColumnMonthYearPicker
						//@ts-ignore
						value={startDate}
						onKeyDown={e => e.preventDefault()}
					/>
				</div>
			</APP_SEARCHER>
			<div>
				{paquetespago && paquetespago.length ? (
					<Doughnut
						data={data}
						width={300}
						height={300}
						options={{
							maintainAspectRatio: false,
							responsive: true,
						}}
					/>
				) : (
					<h6 className="text-center">No se encontraron datos</h6>
				)}
			</div>
		</Tile>
	);
};

export default ChartPiePagos;
