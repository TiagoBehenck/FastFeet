import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import { IconButton } from '~/components/Button';
import { SearchInput } from '~/components/Form';
import HeaderList from '~/components/HeaderList';
import api from '~/services/api';
import history from '~/services/history';

import RecipientItem from './RecipientItem';
import { Container, Content, Grid, Button } from './styles';

export default function Recipients() {
	const [recipient, setRecipient] = useState([]);
	const [page, setPage] = useState(1);

	async function loadRecipient() {
		const response = await api.get('/recipient', {
			params: {
				page,
			},
		});

		setRecipient(response.data);
	}

	useEffect(() => {
		loadRecipient();
	}, [page]); //eslint-disable-line

	async function handleSearchDelivery(e) {
		setPage(1);
		const response = await api.get('/recipient', {
			params: {
				q: e.target.value,
				page,
			},
		});

		setRecipient(response.data);
	}

	return (
		<Container>
			<Content>
				<HeaderList title="Gerenciando encomendas">
					<SearchInput
						onChange={handleSearchDelivery}
						type="text"
						placeholder="Buscar por encomendas"
					/>
					<IconButton
						Icon={MdAdd}
						title="CADASTRAR"
						action={() => history.push('/recipient/form')}
						type="button"
					/>
				</HeaderList>
				<Grid>
					<section>
						<strong>ID</strong>
						<strong>Nome</strong>
						<strong>Endereço</strong>
						<strong>Ações</strong>
					</section>
					{recipient.map(recipients => (
						<RecipientItem
							updateRecipient={loadRecipient}
							key={recipients.id}
							data={recipients}
						/>
					))}
				</Grid>
				<section>
					<Button
						disabled={page === 1}
						onClick={() => setPage(page - 1)}
						type="button"
					>
						VOLTAR
					</Button>
					<Button
						disabled={recipient.length < 5}
						type="button"
						onClick={() => setPage(page + 1)}
					>
						PRÓXIMO
					</Button>
				</section>
			</Content>
		</Container>
	);
}
