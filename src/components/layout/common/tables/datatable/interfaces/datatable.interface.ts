export type HeadDataTable = {
	center?: boolean;
	name: string;
	dataKey: string;
};

export interface HeadingDataTableInterface {
	heading: HeadDataTable[];
	data: Array<any>;
	loading: boolean;
}
