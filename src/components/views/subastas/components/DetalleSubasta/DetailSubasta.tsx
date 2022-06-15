import * as React from 'react';
import Tile from '../../../../layout/common/Tile';
import { PF, formatter, handleError } from '../../../../utils';
import { SubastaType } from '../../types';
import styled from 'styled-components';
import moment from 'moment-timezone';
import { useLoader } from '../../../../../context/loaderpage/LoaderPageState';
import { useModal } from '../../../../../context/modal/ModalState';
import clienteAxios from '../../../../../config/axios';
import { FaPen } from 'react-icons/fa';
import FormEditarSubasta from '../forms/FormEditarSubasta';

const StyledPaqueteBid = styled.div<{ background: string }>`
	background: ${props => props.background};
	width: 100px;
	height: 100px;
	border-radius: 10px;
	margin: 10px auto;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #fff;
	flex-direction: column;
`;

interface IDetailSubastaProps {
	subasta: SubastaType;
	setSubasta(value: SubastaType): void;
}

const DetailSubasta: React.FC<IDetailSubastaProps> = props => {
	const { subasta } = props;
	const { setLoader } = useLoader();
	const { setModal } = useModal();

	async function editarSubasta() {
		try {
			setLoader(true, 'Cargando subasta...');
			const [productos, paqueteBids, paqueteActual] = await Promise.all([
				clienteAxios('productos/selectProductosIdName'),
				clienteAxios('paquete-bids'),
				clienteAxios(`/subastas/${subasta.idsubasta}`),
			]);

			const setSubasta = (subasta: SubastaType) => {
				props.setSubasta({ ...props.subasta, ...subasta });
			};

			setModal({
				titulo: 'Editar Subasta',
				bgHeader: 'secondary',
				size: 'xl',
				content: (
					<FormEditarSubasta
						subasta={paqueteActual.data}
						setSubasta={setSubasta}
						productos={productos.data}
						paqueteBids={paqueteBids.data}
					/>
				),
			});
		} catch (e) {
			handleError(e);
		} finally {
			setLoader(false);
		}
	}

	return (
		<Tile className="text-center">
			{subasta.producto ? (
				<img
					src={PF + subasta.fotoSubasta}
					className={'user-img rounded-circle'}
					alt=""
				/>
			) : (
				<StyledPaqueteBid background={subasta.paqueteBid.background}>
					<span>{subasta.paqueteBid.cantidadBids} Bids</span>
					{subasta.paqueteBid.bonus ? (
						<small>{subasta.paqueteBid.bonus} BONUS</small>
					) : null}
				</StyledPaqueteBid>
			)}
			<h4>{subasta.titulo}</h4>

			<DetailSubastaContent titulo="ID Subasta" text={subasta.idsubasta} />
			<DetailSubastaContent titulo="Costo Puja" text={subasta.costopuja} />

			<DetailSubastaContent
				titulo="Precio minimo"
				text={`${formatter
					//@ts-ignore
					.format(subasta.preciominimo)
					.replace('$', '')} USD`}
			/>
			<DetailSubastaContent
				titulo="Precio Subasta"
				text={`${formatter
					//@ts-ignore
					.format(
						subasta.preciosubasta ? subasta.preciosubasta : 0.01
					)
					.replace('$', '')} USD`}
			/>

			<DetailSubastaContent
				titulo="Fecha creación"
				text={moment(subasta.date_created).format('DD/MM/YYYY')}
			/>

			<DetailSubastaContent
				titulo="Fecha inicio"
				text={moment(subasta.fechaInicio).format('DD/MM/YYYY H:m:s')}
			/>

			<DetailSubastaContent
				titulo="Fecha finalización"
				text={moment(subasta.fechaFinalizacion).format('DD/MM/YYYY H:m:s')}
			/>

			<button className="btn btn-primary mt-2" onClick={editarSubasta}>
				Editar Subasta <FaPen />
			</button>
		</Tile>
	);
};

export default DetailSubasta;

type DetailSubastaType = {
	titulo: React.ReactNode;
	text: string | number | Date;
};

const DetailSubastaContent: React.FC<DetailSubastaType> = props => (
	<h6>
		<>
			<b>{props.titulo}:</b> {props.text}
		</>
	</h6>
);
