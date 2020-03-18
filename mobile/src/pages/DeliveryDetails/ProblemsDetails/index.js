import React, { useEffect, useState } from 'react';

import { useRoute } from '@react-navigation/native';

import Problem from '~/components/Problem';

import { Container, Background, Content, Title, List } from './styles';
import { format, parseISO } from 'date-fns';
import api from '~/services/api';

export default function ProblemDelivery() {
  const route = useRoute();
  const { id } = route.params;
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      try {
        const response = await api.get(`/delivery/${id}/problems`);

        const data = response.data.map(problem => ({
          ...problem,
          created_at_formated: format(
            parseISO(problem.created_at),
            'dd/MM/yyyy'
          ),
        }));
        setProblems(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadDeliveries();
  }, [id]);

  return (
    <Container>
      <Background />
      <Content>
        <Title>Encomenda {id}</Title>
        <List
          data={problems}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Problem data={item} />}
        />
      </Content>
    </Container>
  );
}
