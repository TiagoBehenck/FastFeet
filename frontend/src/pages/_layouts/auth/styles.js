import styled from 'styled-components';

import { colors } from '~/styles/colors';

export const Wrapper = styled.div`
	height: 100%;

	background: #7159c1;

	display: flex;
	justify-content: center;
	align-items: center;
`;

export const Content = styled.div`
	width: 100%;
	max-width: 360px;
	text-align: center;

	background: #fff;
	border-radius: 4px;

	padding: 60px 30px;

	img {
		width: 100%;
		height: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		margin-top: 30px;

		strong {
			align-self: flex-start;
			margin: 0 0 10px;
			font-weight: bold;
		}

		input {
			border: 1px solid rgba(0, 0, 0, 0.1);
			border-radius: 4px;
			margin-bottom: 15px;
			border-radius: 4px;
			height: 44px;
			padding: 0 15px;
			margin: 0 0 10px;
		}

		span {
			color: ${colors.danger};
			align-self: flex-start;
			margin: 0 0 10px;
			font-weight: bold;
		}
	}
`;
