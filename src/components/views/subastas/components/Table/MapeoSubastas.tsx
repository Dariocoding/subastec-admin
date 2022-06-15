import ButtonsTableSubasta from './ButtonsTableSubasta';
import moment from 'moment-timezone';
import { controlDecimal, formatter, SMONEY } from '../../../../utils';
import { SubastaTableType } from '../../types';

interface IMapSubasta {
	data: SubastaTableType[];
	eliminarSubasta(id: number): void;
	editarSubasta(id: number): void;
}

const MapeoSubastas = ({ data, eliminarSubasta, editarSubasta }: IMapSubasta) => {
	const newData = data.map(item => {
		item.options = (
			<ButtonsTableSubasta
				el={item}
				eliminarSubasta={eliminarSubasta}
				editarSubasta={editarSubasta}
			/>
		);

		if (item.date_created) {
			item.dateCreatedFormated = moment(item.date_created).format('DD/MM/YYYY');
		}

		if (item.fechaInicio) {
			item.fechaInicioFormated = moment(item.fechaInicio).format(
				'DD/MM/YYYY HH:mm:ss'
			);
		}

		if (item.fechaFinalizacion) {
			item.fechaFinalizacionFormated = moment(item.fechaFinalizacion).format(
				'DD/MM/YYYY HH:mm:ss'
			);
		}

		if (item.preciominimo) {
			item.precioText =
				controlDecimal(
					// @ts-ignore
					item.preciominimo?.toFixed(2)
						? // @ts-ignore
						  item.preciominimo.toFixed(2)
						: item.preciominimo
				) +
				' ' +
				SMONEY;
		}

		if (item.preciosubasta) {
			//@ts-ignore
			item.precioSubastaFormated = formatter.format(item.preciosubasta);
		} else {
			item.precioSubastaFormated = `0.01 $`;
		}

		return item;
	});
	return newData;
};

export default MapeoSubastas;
