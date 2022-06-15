export interface useRequestInterface<T> {
	url: string;
	onCompleteData?(values?: T): T | void;
	recieveDataFromCompleteData?: boolean;
}
