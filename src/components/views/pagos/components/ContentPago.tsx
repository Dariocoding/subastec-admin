import * as React from 'react';
import moment from 'moment-timezone';
import { PagoType } from '../types';

interface IContentPagoProps {
	pago: PagoType;
}

const ContentPago: React.FunctionComponent<IContentPagoProps> = ({ pago }) => (
	<>
		<ul>
			<li>
				<b>ID:</b> {pago.idpago}
			</li>
			<li>
				<b>IDTransacción:</b> {pago.transactionId}
			</li>

			<li>
				<b>Fecha Pago:</b> {moment(pago.date_created).format('DD/MM/YYYY')}
			</li>

			<li>
				<b>Referencia:</b> {pago.reference}
			</li>

			<li>
				<b>Estado:</b> {pago.transactionStatus}
			</li>

			<li>
				<b>Total Bids:</b> {pago.cantidadBidsTotal}
			</li>
		</ul>

		<h4 className="py-3 text-center">Usuario</h4>

		<ul>
			<li>
				<b>Nombre de usuario: </b> {pago.user.username}
			</li>
			<li>
				<b>Nombre: </b> {pago.user.nombres}
			</li>
			<li>
				<b>Apellido: </b> {pago.user.apellidos}
			</li>

			<li>
				<b>Correo: </b> {pago.user.email_user}
			</li>

			<li>
				<b>Teléfono: </b> {pago.user.telefono}
			</li>
		</ul>
	</>
);

export default ContentPago;
