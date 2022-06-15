import { useEffect, useState, Fragment } from 'react';
import clienteAxios from '../../../../config/axios';

import DataWidgetsAdmin from './widgets/DataWidgetsAdmin';
import ItemWidget from './widgets/ItemWidget';

import ChartPiePagos from './charts/ChartPiePagos';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import TablePlaceholder from '../../../layout/common/placeholders/TablePlaceholder';
import DataTableSubata from '../../subastas/components/Table/DataTableSubata';

const today = new Date();
const yearActual = today.getFullYear();
const mesActual = today.getMonth() + 1;

const DashboardAdministrador = () => {
	const [totalProductos, setTotalProductos] = useState(0);
	const [totalUsuarios, setTotalUsuarios] = useState(0);
	const [totalPagos, setTotalPagos] = useState(0);
	const [totalSubastas, setTotalSubastas] = useState(0);
	const [dataChartPaquetesMesPago, setDataChartPaquetesMesPago] = useState({});
	const [dataLineVentasMes, setDataLineVentasMes] = useState({});
	const [dataVentasYear, setDataVentasYear] = useState({});
	const [loading, setLoading] = useState(true);

	const DataWidgets = DataWidgetsAdmin({
		totalProductos,
		totalUsuarios,
		totalPagos,
		totalSubastas,
	});

	useEffect(() => {
		async function getDatos() {
			const [
				responseTotalProductos,
				responseTotalUsuarios,
				responseTotalPagos,
				responseTotalSubastas,
				responsePaquetesBidPagosMes,
				responseVentasMes,
				responseVentasYear,
			] = await Promise.all([
				// WIDGETS
				clienteAxios('/dashboard/getTotalProductos'),
				clienteAxios('/dashboard/getTotalUsuarios'),
				clienteAxios('/dashboard/getTotalPagos'),
				clienteAxios(`/dashboard/getTotalSubastas/`),

				// DOUGNUGHT
				clienteAxios(
					`/dashboard/findPaquetesBidPagoMes/${mesActual}/${yearActual}`
				),

				// LINECHART
				clienteAxios(`/dashboard/findVentasMes/${mesActual}/${yearActual}`),

				// BARCHART
				clienteAxios(`/dashboard/findVentasYear/${yearActual}`),
			]);
			setTotalProductos(responseTotalProductos.data.total);
			setTotalUsuarios(responseTotalUsuarios.data.total);
			setTotalPagos(responseTotalPagos.data.total);
			setTotalSubastas(responseTotalSubastas.data.total);
			setDataChartPaquetesMesPago(responsePaquetesBidPagosMes.data);
			setDataLineVentasMes(responseVentasMes.data);
			setDataVentasYear(responseVentasYear.data);
			setLoading(false);
		}

		getDatos();
		// eslint-disable-next-line
	}, []);
	if (loading) return <TablePlaceholder />;
	return (
		<Fragment>
			<div className="row px-2">
				{DataWidgets.map(widget => (
					<ItemWidget {...widget} key={widget.path} />
				))}
			</div>

			<div className="form-row">
				<div className="col-lg-6">
					<ChartPiePagos
						dataChartPaquetesMesPago={dataChartPaquetesMesPago}
						setDataChartPaquetesMesPago={
							setDataChartPaquetesMesPago
						}
					/>
				</div>

				<div className="col-lg-12">
					<DataTableSubata
						urlRequest={
							'dashboard/findTopTenSubastasMasPujadas'
						}
						canSearch={false}
						titulo={<h4>Top 10 subastas más pujadas</h4>}
						showPagination={false}
						heading={[
							{
								name: 'ID',
								dataKey: 'idsubasta',
								center: true,
							},
							{
								name: 'Título',
								dataKey: 'titulo',
								center: true,
							},
							{
								name: 'Fecha Inicio',
								dataKey: 'fechaFinalizacionFormated',
								center: true,
							},
							{
								name: 'Fecha Finalización',
								dataKey: 'fechaFinalizacionFormated',
								center: true,
							},
							{
								name: 'Total Pujas',
								dataKey: 'totalPujas',
								center: true,
							},
							{
								name: 'Precio Subasta',
								dataKey: 'precioSubastaFormated',
								center: true,
							},

							{
								name: 'Acciones',
								dataKey: 'options',
								center: true,
							},
						]}
					/>
				</div>
			</div>

			<LineChart
				dataLineVentasMes={dataLineVentasMes}
				setDataLineVentasMes={setDataLineVentasMes}
				label="Ventas Mes:"
				subtitle={'Total Ventas:'}
			/>

			<BarChart
				setDataVentasYear={setDataVentasYear}
				dataVentasYear={dataVentasYear}
			/>
		</Fragment>
	);
};

export default DashboardAdministrador;
