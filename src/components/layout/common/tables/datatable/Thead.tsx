import { FunctionComponent } from 'react';
import { HeadDataTable } from './interfaces';

interface ITheadProps {
	heading: HeadDataTable[];
}

const Thead: FunctionComponent<ITheadProps> = ({ heading }) => {
	if (!heading.length) return null;
	return (
		<thead className="bg-secondary">
			<tr>
				{heading.map(h => (
					<th
						key={h.name}
						className={
							h.center || h.name === 'ID'
								? 'text-center'
								: ''
						}
					>
						{h.name}
					</th>
				))}
			</tr>
		</thead>
	);
};

export default Thead;
