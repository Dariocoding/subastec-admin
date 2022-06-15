import { useState, useEffect, useRef, Ref } from 'react';
export default function useComponentVisible() {
	const [isComponentVisible, setIsComponentVisible] = useState(false);
	const [eventTarget, setEventTarget] = useState<HTMLElement>(null);
	const ref: Ref<HTMLDivElement> = useRef(null);

	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if (ref.current && !ref.current.contains(target)) {
			setEventTarget(target);
			setIsComponentVisible(true);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
		// eslint-disable-next-line
	}, []);

	return { ref, isComponentVisible, eventTarget };
}
