interface RolType {
	idrol: number;
	nombrerol: string;
	users?: UserType[];
}

export interface UserType {
	iduser?: number;
	username?: string;
	nombres?: string;
	apellidos?: string;
	hashedRt?: string;
	email_user?: string;
	telefono?: string;
	password?: string;
	token?: string;
	image_profile?: string;
	status?: number;
	date_created?: Date;
	facebookID?: string;
	googleID?: string;
	bids?: number;
	rolid?: number;
	rol?: RolType;
	pagos?: any[];
	favoritos?: any[];
}

export interface UserTypeTable extends UserType {
	options?: React.ReactNode;
	fotoperfilHtml?: React.ReactNode;
}

export interface ChangePasswordType {
	password?: string;
	passwordConfirm?: string;
}
