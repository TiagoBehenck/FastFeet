import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/MorePopUp';
import NamePhoto from '~/components/NamePhoto';
import api from '~/services/api';
import history from '~/services/history';
import { statusColors, colors } from '~/styles/colors';

import DeliveryModal from '../Modal';
import Status from './DeliveryStatus';
import { Container, Content, Avatar } from './styles';

export default function DeliveryItem({ data, updateDeliveries }) {
	async function handleDelete() {
		const confirm = window.confirm('Você tem certeza que deseja deletar isso?');

		if (!confirm) {
			toast.error('Encomenda não apagada!');
			return;
		}

		try {
			await api.delete(`/delivery/${data.id}`);
			updateDeliveries();
			toast.success('Encomenda apagada com sucesso!');
		} catch (err) {
			toast.error('Essa encomenda não pode ser deletada!');
		}
	}

	return (
		<Container>
			<small>#{data.id}</small>
			<small>{data.recipient.name}</small>
			<small>
				{data.deliveryman.avatar ? (
					<Avatar>
						<img src={data?.deliveryman?.avatar?.url} alt="Avatar" />
						<small>{data.deliveryman.name}</small>
					</Avatar>
				) : (
					<Avatar>
						<NamePhoto name={data.deliveryman.name} />
						<small>{data.deliveryman.name}</small>
					</Avatar>
				)}
			</small>
			<small>{data.recipient.city}</small>
			<small>{data.recipient.state}</small>
			<Status
				text={data.status}
				color={statusColors[data.status].color}
				background={statusColors[data.status].background}
			/>
			<More>
				<Content>
					<div>
						<DeliveryModal data={data} />
					</div>
					<div>
						<button
							onClick={() => history.push(`/delivery/form/${data.id}`)}
							type="button"
						>
							<MdEdit color={colors.info} size={15} />
							<span>Editar</span>
						</button>
					</div>
					<div>
						<button onClick={handleDelete} type="button">
							<MdDeleteForever color={colors.danger} size={15} />
							<span>Excluir</span>
						</button>
					</div>
				</Content>
			</More>
		</Container>
	);
}

DeliveryItem.propTypes = {
	updateDeliveries: PropTypes.func.isRequired,
	data: PropTypes.shape({
		id: PropTypes.number,
		product: PropTypes.string,
		name: PropTypes.string,
		city: PropTypes.string,
		state: PropTypes.string,
		status: PropTypes.string,
		deliveryman: PropTypes.shape({
			avatar: PropTypes.string,
			name: PropTypes.string,
		}).isRequired,
		recipient: PropTypes.shape({
			name: PropTypes.string,
			city: PropTypes.string,
			state: PropTypes.string,
		}).isRequired,
	}).isRequired,
};
