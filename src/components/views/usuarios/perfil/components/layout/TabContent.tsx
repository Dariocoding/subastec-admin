import { useContext } from 'react';
import { IconType } from 'react-icons/lib';
import authContext from '../../../../../../context/autenticacion/authContext';

interface ITabContentProps {
	itemActual: string;
	Icon: IconType;
	content?: React.ReactNode;
}

const TabContent: React.FunctionComponent<ITabContentProps> = ({ itemActual, Icon, content }) => {
	const { usuario } = useContext(authContext);
	return (
		<div className="tab-pane active" id="user-timeline">
			<div className="timeline-post">
				<h4 className="mb-3 text-center">
					<>
						{itemActual} <Icon />
					</>
				</h4>
				{Object.keys(usuario).length && content}
			</div>
		</div>
	);
};

export default TabContent;
