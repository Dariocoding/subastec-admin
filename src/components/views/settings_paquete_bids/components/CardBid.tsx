import styled from 'styled-components';
import Tile from '../../../layout/common/Tile';
import { PaqueteBidType } from '../types';

const CardTitle = styled.div<{ background: string }>`
	font-weight: 600;
	text-align: center;
	color: ${props => (props.background ? '#fff' : '#000')};
	background: ${props => props.background};
	padding: 20px 5px;
`;

const CardBody = styled.div`
	font-weight: 600;
	text-align: center;
	padding: 40px 5px;
	span {
		color: #3584b9;
	}
`;

const CardFooter = styled.div`
	background: #3584b9;
	padding: 10px 7px;
	display: flex;
	justify-content: end;
	color: #fff;
	span {
		background: #21699a;
		border-radius: 35px;
		padding: 4px 10px;
	}
`;

const CardActions = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	button {
		margin-top: 0px !important;
		border-radius: 0px !important;
	}
`;

interface ICardBidProps extends PaqueteBidType {
	handleEditar?(id: number): void;
	handleEliminar?(id: number): void;
	isEditable?: boolean;
}
const CardBid: React.FunctionComponent<ICardBidProps> = props => (
	<Tile className="p-0 radius-3 rounded-lg">
		<CardTitle background={props.background}>
			{props.cantidadBids} <br /> Bids
		</CardTitle>
		<CardBody>
			{props.cantidadBids} {props.bonus ? <span>+{props.bonus}Bids</span> : null}
		</CardBody>
		<CardFooter>
			<span>{props.price}$</span>
		</CardFooter>
		{props.isEditable ? (
			<CardActions>
				<button
					onClick={() => props.handleEditar(props.idpaquete)}
					className="btn btn-sm btn-primary btn-block"
				>
					Editar Paquete
				</button>
				<button
					onClick={() => props.handleEliminar(props.idpaquete)}
					className="btn btn-sm btn-danger btn-block"
				>
					Eliminar Paquete
				</button>
			</CardActions>
		) : null}
	</Tile>
);

export default CardBid;
