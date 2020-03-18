import React, { useState, useEffect } from 'react';

import HeaderList from '~/components/HeaderList';
import api from '~/services/api';

import ProblemItem from './ProblemItem';
import { Container, Content, Grid, Button } from './styles';

export default function Problems() {
	const [page, setPage] = useState(1);
	const [problems, setProblems] = useState([]);

	async function loadProblems() {
		const response = await api.get('/problem', {
			params: {
				page,
			},
		});

		setProblems(response.data);
	}
	useEffect(() => {
		loadProblems();
	}, [page]); //eslint-disable-line

	return (
		<Container>
			<Content>
				<HeaderList title="Problemas na entrega" />
				<Grid>
					<section>
						<strong>Encomenda</strong>
						<strong>Problema</strong>
						<strong>Ações</strong>
					</section>
					{problems.map(problem => (
						<ProblemItem
							updateProblems={loadProblems}
							key={problem._id}
							data={problem}
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
						disabled={problems.length < 5}
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
