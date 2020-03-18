import React from 'react';

import { Container, Date, Description } from './styles';

export default function Problem({ data }) {
  return (
    <Container>
      <Description>{data.description}</Description>
      <Date>{data.created_at_formated}</Date>
    </Container>
  );
}
 