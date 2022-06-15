import { ReactNode } from 'react';

interface TileInterface {
	children?: ReactNode;
	bgHeader?: string;
	className?: string;
}

const Tile = ({ children, bgHeader, className }: TileInterface): JSX.Element => (
	<>
		{bgHeader && <div className={`tile mb-0 ${bgHeader} rounded-0`}></div>}
		<div className={`tile ${className}`}>
			<div className="tile-body">{children}</div>
		</div>
	</>
);

export default Tile;
