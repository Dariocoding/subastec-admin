import { FaCheck } from 'react-icons/fa';
import useSound from 'use-sound';
import CheckboxContainer from './Container';
import Border from './Border';
import Label from './Label';
import Indicator from './Indicator';
import { FunctionComponent } from 'react';

const sounds = require('../../../../../Assets/sounds/sounds.wav');

interface ICheckboxProps {
	isChecked: boolean;
	onChange(isChecked: boolean): void;
	label?: string;
	width?: number;
	height?: number;
}

const Checkbox: FunctionComponent<ICheckboxProps> = props => {
	const { isChecked, onChange, label, width = 16, height = 16 } = props;
	const [play] = useSound(sounds, {
		sprite: { in: [500, 1000], out: [1500, 2000] },
	});
	return (
		<CheckboxContainer
			onClick={() => {
				play({ id: isChecked ? 'in' : 'out' });
				onChange(!isChecked);
			}}
		>
			<Border width={width} height={height}>
				<Indicator
					isChecked={isChecked}
					width={width - 1}
					height={height - 1}
				>
					<FaCheck className={'text-light'} size={height / 2} />
				</Indicator>
			</Border>
			<Label>{label}</Label>
		</CheckboxContainer>
	);
};

export default Checkbox;
