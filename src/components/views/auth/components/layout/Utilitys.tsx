import styled from 'styled-components';

const Utility = styled.div`
	display: flex;
	padding: 1px;
	justify-content: space-between;
	align-items: center;
`;

interface IUtilitysProps {
	components: React.ReactNode[];
	center?: boolean;
	margin?: string;
}

const Utilitys: React.FunctionComponent<IUtilitysProps> = props => (
	<Utility
		className={`${props.center ? 'justify-content-center' : ''} ${
			props.margin ? props.margin : ''
		}`}
	>
		{props.components.map((c, i) => (
			<span key={i}>{c}</span>
		))}
	</Utility>
);

export default Utilitys;
