import styled from 'styled-components';

const ModalWrapper = styled.div<{ position?: 'start' | 'center' | 'end' }>`
	margin-top: ${props => (props.position === 'start' ? '20px' : 0)};
	width: 100%;
	max-height: 90vh;
	position: relative;
	background-color: #fff;
	z-index: 1500;
	box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
	overflow: auto;
	border-radius: 10px;

	&.sm {
		width: 500px;
	}

	&.md {
		width: 750px;

		@media (max-width: 992px) {
			width: 600px;
		}
	}

	&.xl {
		width: 1300px;

		@media (max-width: 1400px) {
			width: 1200px;
		}

		@media (max-width: 1250px) {
			width: 900px;
		}
	}

	&.md,
	&.xl {
		@media (max-width: 992px) {
			width: 600px;
		}

		@media (max-width: 768px) {
			width: 500px;
		}
	}

	&.sm,
	&.md,
	&.xl {
		@media (max-width: 576px) {
			width: 320px;
		}
	}
`;

export default ModalWrapper;
