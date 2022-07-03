import * as React from 'react';
import { PujaTableType, PujaType, SubastaType } from '../../types';
import DetailSubasta from './DetailSubasta';
import DataTablePuja from './DataTablePujas';
import DoughnutPujas from './DoughnutPujas';
import { useSocket } from '../../../../../context/socket/SocketContext';

interface IDetalleSubastaContentProps {
	pujas: PujaTableType[];
	subasta: SubastaType;
	isLoading: boolean;
	setSubasta(value: SubastaType): void;
	setPujas(pujas: PujaType[]): void;
}

type ReqPujaType = { puja: PujaType; preciosubasta: number };

const DetalleSubastaContent: React.FunctionComponent<IDetalleSubastaContentProps> = props => {
	const { subasta, isLoading } = props;
	const [hanPujado, setHanPujado] = React.useState(false);
	const { Socket } = useSocket();

	React.useEffect(() => {
		Socket.on(`subasta-${subasta.idsubasta}-puja`, (body: ReqPujaType) => {
			props.setSubasta({
				...subasta,
				preciosubasta: body.preciosubasta,
			});
			props.setPujas([body.puja, ...props.pujas]);
			setHanPujado(true);
			setTimeout(() => setHanPujado(false), 750);
		});
		// eslint-disable-next-line
	}, [subasta]);

	return (
		<React.Fragment>
			<div className="form-row">
				<div className="col-lg-4">
					<DetailSubasta
						subasta={subasta}
						setSubasta={props.setSubasta}
						hanPujado={hanPujado}
					/>
				</div>
				<div className="col-lg-8">
					<DoughnutPujas pujas={props.pujas} />
				</div>
			</div>
			<DataTablePuja isLoading={isLoading} pujas={props.pujas} />
		</React.Fragment>
	);
};

export default DetalleSubastaContent;
