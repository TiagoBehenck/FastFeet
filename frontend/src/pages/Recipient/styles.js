import styled from 'styled-components';

import { SimpleButton } from '~/components/Button';

export const Container = styled.div`
	display: flex;
	justify-content: center;

	padding: 0 120px;
`;

export const Content = styled.div`
	width: 100%;
	max-width: 1200px;

	> section {
		display: flex;
		justify-content: space-between;
		margin-top: 100px;
	}
`;

export const Grid = styled.div`
	height: 400px;
	> section {
		display: grid;

		padding-left: 25px;
		padding-right: 13px;

		grid-template-columns: 0.5fr 1.5fr 2fr 1fr;

		strong:last-child {
			text-align: right;
		}

		strong {
			font-size: 16px;
			color: #444;
		}

		margin-bottom: 15px;
	}

	> div + div {
		margin-top: 20px;
	}
`;

export const Button = styled(SimpleButton)`
	padding: 0 16px;
	height: 36px;

	font-size: 14px;
	font-weight: bold;

	color: #fff;
	border: 0;
	border-radius: 4px;

	display: flex;
	text-align: center;
	align-items: center;

	&:disabled {
		cursor: not-allowed;
		background: #666;
	}
`;
