import React from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';

import PropTypes from 'prop-types';

import More from '~/components/MorePopUp';
import api from '~/services/api';
import history from '~/services/history';
import { colors } from '~/styles/colors';

import { Container, Content } from './styles';

export default function RecipientItem({ data, updateRecipient }) {
	async function handleDelete() {
		const confirm = window.confirm('Você tem certeza que deseja deletar isso?');

		if (!confirm) {
			toast.error('Destinatário não apagado!');
			return;
		}

		try {
			await api.delete(`/recipient/${data.id}`);
			updateRecipient();
			toast.success('Destinatário apagado com sucesso!');
		} catch (err) {
			toast.error(
				'Esse destinatário não pode ser apagado, pois ainda tem encomenda para receber!'
			);
		}
	}

	return (
		<Container>
			<small>#{data.id}</small>
			<small>{data.name}</small>
			<small>
				{data.street}, {data.number}, {data.city} - {data.state}
			</small>
			<More>
				<Content>
					<div>
						<button
							onClick={() => history.push(`/recipient/form/${data.id}`)}
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

RecipientItem.propTypes = {
	data: PropTypes.shape({
		id: PropTypes.number.isRequired,
		name: PropTypes.string.isRequired,
		street: PropTypes.string.isRequired,
		number: PropTypes.number.isRequired,
		city: PropTypes.string.isRequired,
		state: PropTypes.string.isRequired,
	}).isRequired,
	updateRecipient: PropTypes.func.isRequired,
};
