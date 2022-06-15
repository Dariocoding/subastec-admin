import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PF } from '../../../utils';
import { ImagenesType } from '../types';

interface ITileImagenProps {
	showModal: boolean;
	setImagenActualVerModal(value: string): void;
	setShowModal(value: boolean): void;
	imagenes: ImagenesType[];
}
const TileImagen: React.FunctionComponent<ITileImagenProps> = props => {
	const { setImagenActualVerModal, setShowModal, imagenes } = props;

	function handleClickImage(img: string) {
		setShowModal(true);
		setImagenActualVerModal(PF + img);
	}

	return (
		<div className="row justify-content-center">
			{imagenes.map(({ filename, id }) => (
				<div key={id} className="col-lg-6 p-4">
					<LazyLoadImage
						className="img-fluid"
						src={PF + filename}
						style={{ cursor: 'pointer' }}
						effect={'blur'}
						alt="Producto Imagen"
						onClick={() => handleClickImage(filename)}
					/>
				</div>
			))}
		</div>
	);
};

export default TileImagen;
