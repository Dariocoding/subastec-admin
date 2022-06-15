import * as React from 'react';
import TablePlaceholder from '../../../../layout/common/placeholders/TablePlaceholder';
import ItemNotFound from '../../../../layout/common/ItemNotFound';
import { PujaTableType, SubastaType } from '../../types';
import DetailSubasta from './DetailSubasta';
import DataTablePuja from './DataTablePujas';
import DoughnutPujas from './DoughnutPujas';

interface IDetalleSubastaContentProps {
	pujas: PujaTableType[];
	subasta: SubastaType;
	isLoading: boolean;
	setSubasta(value: SubastaType): void;
}

const DetalleSubastaContent: React.FunctionComponent<IDetalleSubastaContentProps> = props => {
	const { subasta, isLoading } = props;

	if (isLoading) return <TablePlaceholder />;

	if (!subasta) return <ItemNotFound mensaje="Subasta no encontrada" />;

	return (
		<React.Fragment>
			<div className="form-row">
				<div className="col-lg-4">
					<DetailSubasta
						subasta={subasta}
						setSubasta={props.setSubasta}
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
