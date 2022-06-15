import { useState } from 'react';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { APP_SEARCHER, INPUT_SEARCH } from './stylesSearch';
import { Line } from 'react-chartjs-2';
import Tile from '../../../../layout/common/Tile';
import clienteAxios from '../../../../../config/axios';
import { SMONEY, meses } from '../../../../utils';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export type LineChartDataType = {
	year?: number;
	mes?: string;
	ventas?: Array<{ cantidad: number; total: number; dia: number }>;
	total?: number;
};

interface ILineChartProps {
	dataLineVentasMes: LineChartDataType;
	setDataLineVentasMes(values: LineChartDataType): void;
	label: string;
	subtitle: string;
}

//@ts-ignore
const LineChart: React.FunctionComponent<ILineChartProps> = props => {
	const { dataLineVentasMes, setDataLineVentasMes, label, subtitle } = props;
	const { year, mes, ventas, total } = dataLineVentasMes;
	const [startDate, setStartDate] = useState(new Date());

	async function handleChangeDate(date: Date) {
		setStartDate(date);

		const year = date.getFullYear();
		const month = date.getMonth() + 1;

		try {
			const request = await clienteAxios.get(
				`/dashboard/findVentasMes/${month}/${year}`
			);
			setDataLineVentasMes(request.data);
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Tile>
			<div className="text-center mb-3">
				<h5>
					{label} {year} - {mes}
				</h5>
				<h6>
					{subtitle} {total}
					{SMONEY}
				</h6>
			</div>

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
						//@ts-ignore
						onKeyDown={e => e.preventDefault()}
					/>
				</div>
			</APP_SEARCHER>
			{ventas && (
				<Line
					options={{
						responsive: true,
						plugins: {
							legend: {
								display: false,
							},
						},
					}}
					data={{
						labels: ventas.map(v => v.dia),
						datasets: [
							{
								label: 'Venta',
								//@ts-ignore
								data: ventas.map(v =>
									v.total ? v.total : 0
								),
								borderColor: 'rgb(255, 99, 132)',
								backgroundColor:
									'rgba(255, 99, 132, 0.5)',
							},
						],
					}}
				/>
			)}
		</Tile>
	);
};

export default LineChart;
