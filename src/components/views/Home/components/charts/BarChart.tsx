import { useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { meses } from '../../../../utils';
import { APP_SEARCHER, INPUT_SEARCH } from './stylesSearch';
import clienteAxios from '../../../../../config/axios';
import Tile from '../../../../layout/common/Tile';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
	},
};

export type BarChartData = {
	year?: number;
	ventas?: Array<{ no_mes: number; venta: number }>;
};

interface IBarChartProps {
	dataVentasYear: BarChartData;
	setDataVentasYear(value: BarChartData): void;
}

const BarChart: React.FunctionComponent<IBarChartProps> = props => {
	const { setDataVentasYear, dataVentasYear } = props;
	const { year, ventas } = dataVentasYear;
	const [startDate, setStartDate] = useState(new Date());

	async function handleChangeDate(date: Date) {
		setStartDate(date);

		const year = date.getFullYear();

		try {
			const url = `/dashboard/findVentasYear/${year}`;
			const request = await clienteAxios.get(url);
			setDataVentasYear(request.data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Tile>
			<h5 className="text-center mb-3">Ventas del año: {year}</h5>
			<APP_SEARCHER>
				<div>
					<INPUT_SEARCH
						selected={startDate}
						onChange={handleChangeDate}
						dateFormat="yyyy"
						showYearPicker
						//@ts-ignore
						value={startDate}
						onKeyDown={e => e.preventDefault()}
					/>
				</div>
			</APP_SEARCHER>
			{ventas && (
				<Bar
					options={options}
					data={{
						labels: meses,
						datasets: [
							{
								label: 'Venta Mes',
								data: ventas.map(v => v.venta),
								backgroundColor:
									'rgba(53, 162, 235, 0.5)',
							},
						],
					}}
				/>
			)}
		</Tile>
	);
};

export default BarChart;
