import { BiPackage } from 'react-icons/bi';
import { FaPlus } from 'react-icons/fa';
import { DeleteInfo, RADMIN } from '../../utils';
import clienteAxios from '../../../config/axios';

// COMPONENTS
import PageComponent from '../../layout/app/Content/PageComponent';
import CardBid from './components/CardBid';
import Tile from '../../layout/common/Tile';
import FormCreatePaqueteBid from './components/FormCreatePaqueteBid';
import FormUpdatePaqueteBid from './components/FormUpdatePaqueteBid';

// HOOKS
import useValidarPermisosPagina from '../../../hooks/useValidarPermisosPagina';
import useRequestData from '../../../hooks/useRequestData';
import { useModal } from '../../../context/modal/ModalState';
import { useLoader } from '../../../context/loaderpage/LoaderPageState';
import { PaqueteBidType } from './types';

const Contactos = () => {
	const { setLoader } = useLoader();
	const { setModal } = useModal();
	useValidarPermisosPagina({
		rolesPermisos: [RADMIN],
		urlReturn: '/home',
	});

	const [data, , , setDatos] = useRequestData<PaqueteBidType[]>([], {
		url: '/paquete-bids',
	});

	function CreatePaqueteBid() {
		const addPaquete = (paquete: PaqueteBidType) => setDatos([paquete, ...data]);
		setModal({
			bgHeader: 'primary',
			content: <FormCreatePaqueteBid addPaquete={addPaquete} />,
			size: 'xl',
			titulo: 'Crear Paquete de Bid',
		});
	}

	async function updatePaquete(id: number) {
		try {
			setLoader(true, 'Buscando paquete...');
			const response = await clienteAxios.get('/paquete-bids/' + id);
			const editPaquete = (paquete: PaqueteBidType) =>
				setDatos(
					data.map(pkg =>
						pkg.idpaquete === paquete.idpaquete ? paquete : pkg
					)
				);

			setModal({
				titulo: 'Editar paquete de Bid',
				size: 'xl',
				bgHeader: 'secondary',
				content: (
					<FormUpdatePaqueteBid
						paqueteBid={response.data}
						editPaquete={editPaquete}
					/>
				),
			});
		} catch (error) {
		} finally {
			setLoader(false);
		}
	}

	function deletePaquete(id: number) {
		DeleteInfo({
			title: '¿Estás seguro de eliminar este paquete?',
			text: 'No lo podrás recuperar',
			urlDelete: 'paquete-bids/' + id,
			callback() {
				setDatos(data.filter(pkg => pkg.idpaquete !== id));
			},
		});
	}

	return (
		<PageComponent
			titulo={'Paquete de Bids'}
			Icon={BiPackage}
			btnBackUrl={'/settings'}
			btnBackText={'Ir a configuraciones'}
			breadCrumb={[
				{ titulo: 'Configuración', link: '/settings' },
				{ titulo: 'Paquete Bids' },
			]}
		>
			<div className="row justify-content-center">
				<div className="col-md-6">
					<Tile>
						<button
							onClick={CreatePaqueteBid}
							className="btn btn-primary btn-block btn-lg"
						>
							Crear Paquete de Bid <FaPlus size={16} />
						</button>
					</Tile>
				</div>
			</div>
			<div className="row">
				{data.map((paqueteBid, index) => (
					<div
						className="col-xl-3 col-lg-4 col-md-6 col-12"
						key={index}
					>
						<CardBid
							{...paqueteBid}
							isEditable={true}
							handleEditar={updatePaquete}
							handleEliminar={deletePaquete}
						/>
					</div>
				))}
			</div>
		</PageComponent>
	);
};

export default Contactos;
