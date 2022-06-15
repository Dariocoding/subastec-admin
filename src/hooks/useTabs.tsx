import { useState } from 'react';
import { Tab, Tabset } from 'react-rainbow-components';
import styled from 'styled-components';

const CustomTabSet = styled(Tabset)`
	margin-bottom: 10px;
	ul {
		display: flex;
		justify-content: center;

		li span {
			font-size: 16px;
			font-weight: 700;
		}
	}
`;

interface UseTabsProps {
	arrValues: Array<{ label: string; name: string }>;
	initialSelected?: string;
}

const useTabs = (props: UseTabsProps) => {
	const { arrValues, initialSelected } = props;
	const [selectedTab, setSelectedTab] = useState(
		initialSelected ? initialSelected : arrValues[0].name
	);

	const handleOnSelect = (e: any, selected: string) => setSelectedTab(selected);

	return {
		selectedTab,
		Tabset: ({ onChange }: { onChange(value: string): void }) => (
			<CustomTabSet
				onSelect={(e, selected) => {
					handleOnSelect(e, selected);
					if (onChange) return onChange(selected);
				}}
				activeTabName={selectedTab}
			>
				{arrValues.map(({ label, name }, index) => (
					<Tab label={label} name={name} key={index} />
				))}
			</CustomTabSet>
		),
	};
};

export default useTabs;
