import { useEffect, useRef } from 'react';

type IAppProps = () => void;

const useOnOutsideClick = (handleOutsideClick: IAppProps) => {
	const innerBorderRef = useRef<HTMLDivElement>();

	const onClick = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (innerBorderRef.current && !innerBorderRef.current.contains(target)) {
			handleOutsideClick();
		}
	};

	useMountEffect(() => {
		document.addEventListener('click', onClick, true);
		return () => {
			document.removeEventListener('click', onClick, true);
		};
	});

	return { innerBorderRef };
};

export default useOnOutsideClick;
// eslint-disable-next-line
const useMountEffect = (fun: () => void) => useEffect(() => fun(), []);
