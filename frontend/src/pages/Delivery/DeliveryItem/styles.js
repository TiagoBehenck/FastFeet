import styled from 'styled-components';

export const Container = styled.div`
	height: 57px;
	background: #fff;
	border-radius: 4px;

	padding-left: 25px;
	padding-right: 13px;

	display: grid;
	grid-template-columns: 0.5fr 1.5fr 1fr 1.5fr 1.5fr 1fr 1fr;

	> small:last-child {
		text-align: right;
	}

	> small {
		font-size: 16px;
		color: #666;
		text-align: left;

		margin: auto 0;
	}

	> section {
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
`;

export const Content = styled.div`
	padding: 10px;

	> div {
		display: flex;
		align-items: center;
		padding-bottom: 6px;

		button {
			background: none;
			border: none;

			display: flex;
		}

		svg {
			margin-right: 8px;
		}

		span {
			font-size: 16px;
			color: #999;
		}

		:nth-last-child(-n + 2) {
			padding-top: 6px;
			border-top: 1px solid #eee;
		}

		:nth-last-child(1) {
			padding-bottom: 0;
		}
	}
`;

export const Avatar = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	> img {
		height: 35px;
		width: 35px;
		border-radius: 50%;
		align-self: center;
	}

	> small {
		font-size: 16px;
		color: #666;
		text-align: left;

		margin: auto 0;
	}

	> small:last-child {
		margin: 0px 5px;
	}
`;
