import * as React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Tile from '../../../../layout/common/Tile';
import { PujaType } from '../../types';
import { getRandomColor } from '../../../../utils';
import { FaChartArea, FaChartPie } from 'react-icons/fa';

interface IDoughnutPujasProps {
	pujas: PujaType[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutPujas: React.FC<IDoughnutPujasProps> = props => {
	const { pujas } = props;

	if (!pujas.length) return null;
	const pujasAutomaticas = pujas.filter(p => p.modalidad === 'A');
	const pujasManuales = pujas.filter(p => p.modalidad === 'M');

	const dataDoughnut = ((): ChartData<'doughnut'> => ({
		labels: ['Pujas Automáticas', 'Pujas Manuales'],
		datasets: [
			{
				data: [pujasAutomaticas.length, pujasManuales.length],
				backgroundColor: ['#1f439a', '#dc3545'],
				borderWidth: 0,
			},
		],
	}))();

	return (
		<Tile className="d-flex justify-content-center">
			<h4>
				Estadistica de Pujas Manuales y Automáticas <FaChartPie />
			</h4>
			<span>
				<Doughnut
					data={dataDoughnut}
					width={300}
					height={300}
					options={{
						maintainAspectRatio: false,
						responsive: true,
					}}
				/>
			</span>
		</Tile>
	);
};

export default DoughnutPujas;
