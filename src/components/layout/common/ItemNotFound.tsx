import Tile from './Tile';

const ItemNotFound = ({ mensaje }: { mensaje: string }) => (
	<Tile>
		<h4 className="text-center">{mensaje}</h4>
	</Tile>
);

export default ItemNotFound;
