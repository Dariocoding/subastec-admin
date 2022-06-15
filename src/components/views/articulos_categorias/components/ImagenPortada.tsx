interface IImagenPortadaProps {
	imagenModal: string;
}

const ImagenPortada: React.FunctionComponent<IImagenPortadaProps> = ({ imagenModal }) => (
	<div className="text-center">
		<img
			style={{ userSelect: 'none' }}
			className="img-fluid"
			src={imagenModal}
			alt="Imagen actual"
		/>
	</div>
);

export default ImagenPortada;
