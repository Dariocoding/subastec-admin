import * as React from 'react';
import styled from 'styled-components';
import Tile from '../../../layout/common/Tile';
import { SubastaType } from '../../subastas/types';
import { SubastaDestacadaType } from '../types';
import { Checkbox } from '../../../layout/common/forms';
import { PF } from '../../../utils';
import moment from 'moment-timezone';
import { toast } from 'react-toastify';
import clienteAxios from '../../../../config/axios';

interface ICardSubastaProps {
	subasta: SubastaType;
	subastasDestacadas: SubastaDestacadaType[];
	setSubastasDestacadas(value: SubastaDestacadaType[]): void;
}

const StyledSubastaPaqueteBd = styled.div<{ background: string }>`
	height: 150px;
	width: 150px;
	border-radius: 10px;
	background-image: ${props => props.background};
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	color: #fff;
	font-weight: 600;
	background-size: 100%;
	background-repeat: no-repeat;
	background-position: 50% 50%;
`;

const DetailsSubasta = styled.div`
	margin-left: 10px;
	display: flex;
	justify-content: start;
	align-items: center;
	h4,
	h6 {
		margin-bottom: 4px;
	}
`;

const CardSubasta: React.FunctionComponent<ICardSubastaProps> = props => {
	const { subasta, subastasDestacadas, setSubastasDestacadas } = props;
	const isChecked = subastasDestacadas.find(s => s.subastaid === subasta.idsubasta)
		? true
		: false;

	const onChangeChecked = async () => {
		if (isChecked) {
			await toast.promise(
				async () => {
					await clienteAxios.delete(
						`subastas-destacadas/${subasta.idsubasta}`
					);
				},
				{
					pending: 'Eliminando subasta de destacados...',
					success: 'Subasta eliminada de destacados',
					error: 'Ha ocurrido un error',
				}
			);
			setSubastasDestacadas([
				...subastasDestacadas.filter(
					s => s.subastaid !== subasta.idsubasta
				),
			]);
		} else {
			await toast.promise(
				async () => {
					await clienteAxios.post('subastas-destacadas', {
						subastaid: subasta.idsubasta,
					});
				},
				{
					pending: 'Destacando subasta...',
					success: 'Subasta agregada a destacada',
					error: 'Ha ocurrido un error',
				}
			);
			setSubastasDestacadas([
				...subastasDestacadas,
				{ subastaid: subasta.idsubasta },
			]);
		}
	};

	return (
		<Tile>
			<div className="row">
				<div className="col-lg-8 d-flex">
					{subasta.paqueteBidId ? (
						<StyledSubastaPaqueteBd
							background={subasta.paqueteBid.background}
						>
							<h5>
								{subasta.titulo}{' '}
								{subasta.paqueteBid.bonus
									? ` + ${subasta.paqueteBid.bonus}`
									: null}
							</h5>
						</StyledSubastaPaqueteBd>
					) : (
						<StyledSubastaPaqueteBd
							background={`url("${
								PF + subasta.fotoSubasta
							}")`}
						/>
					)}
					<DetailsSubasta>
						<div>
							<h4>
								{subasta.titulo}{' '}
								{subasta.paqueteBid?.bonus
									? ` + ${subasta.paqueteBid.bonus}`
									: null}
							</h4>
							<h6>
								<b>Fecha de creacion:</b>{' '}
								{moment(
									subasta.date_created
								).format('DD/MM/YYYY')}
							</h6>

							<h6>
								<b>Fecha de Inicio:</b>{' '}
								{moment(subasta.fechaInicio).format(
									'DD/MM/YYYY'
								)}
							</h6>

							<h6>
								<b>Fecha de Finalización:</b>{' '}
								{moment(
									subasta.fechaFinalizacion
								).format('DD/MM/YYYY')}
							</h6>
						</div>
					</DetailsSubasta>
				</div>

				<div className="col-lg-4 d-flex justify-content-center">
					<Checkbox
						isChecked={isChecked}
						onChange={onChangeChecked}
						width={25}
						height={25}
					/>
				</div>
			</div>
		</Tile>
	);
};

export default CardSubasta;
