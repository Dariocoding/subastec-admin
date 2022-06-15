import { ContactoType } from './types';
import moment from 'moment-timezone';
interface IModalContactoProps {
	contacto: ContactoType;
}

const ModalContacto: React.FunctionComponent<IModalContactoProps> = ({ contacto }) => (
	<div className="text-center">
		<h5>Nombre: {contacto.nombre}</h5>
		{/*@ts-ignore */}
		<h6>
			Fecha de Envio del mensaje:{' '}
			{moment(contacto.date_created).format('DD/MM/YYYY')}
		</h6>
		<h6>Dispositivo: {contacto.dispositivo}</h6>
		<h6>Correo: {contacto.email}</h6>
		<h6>Teléfono: {contacto.telefono}</h6>
		<h6 className="font-weight-bold">Sistema operativo / Navegador:</h6>

		<ul className="text-left">
			<li>
				<b>Navegador:</b> {contacto.useragent_browser}
			</li>
			<li>
				<b>Versión:</b> {contacto.useragent_version}
			</li>
			<li>
				<b>Plataforma:</b> {contacto.useragent_platform}
			</li>
			<li>
				<b>Operative System:</b> {contacto.useragent_os}
			</li>
		</ul>

		<h4>Mensaje</h4>
		<p className="text-left mt-4">{contacto.mensaje}</p>
	</div>
);

export default ModalContacto;
