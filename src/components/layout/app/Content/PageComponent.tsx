import BreadCrumb from './BreadCrumb';
import AppTitle from './AppTitle';
import { IBreadCrumbProps } from './BreadCrumb';
import { IAppTitleProps } from './AppTitle';
import * as React from 'react';
import Layout from '../Layout';

export interface IPageComponentProps extends IAppTitleProps, IBreadCrumbProps {
	children?: React.ReactNode;
	showTitle?: boolean;
}

const PageComponent: React.FunctionComponent<IPageComponentProps> = props => {
	const {
		btnBackUrl,
		btnBackText,
		titulo,
		Icon,
		descripcion,
		breadCrumb,
		showTitle = true,
	} = props;

	return (
		<div className="app-content">
			{showTitle ? (
				<div className="app-title">
					<AppTitle
						btnBackUrl={btnBackUrl}
						btnBackText={btnBackText}
						titulo={titulo}
						descripcion={descripcion}
						Icon={Icon}
					/>
					<BreadCrumb breadCrumb={breadCrumb} />
				</div>
			) : null}
			{props.children}
		</div>
	);
};

export default PageComponent;
