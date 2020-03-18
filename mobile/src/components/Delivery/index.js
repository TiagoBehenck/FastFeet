import React from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { useNavigation } from '@react-navigation/native';

import Progress from '~/components/DeliveryProgress';
import colors from '~/styles/colors';

import {
  Container,
  TitleContainer,
  Title,
  Details,
  Detail,
  TitleDetail,
  TextDetail,
  TextLink,
  Withdraw,
} from './styles';

export default function Delivey({ data }) {
  const navigation = useNavigation();

  async function handleDeliveryWithdraw() {
    async function delievryWithdraw() {
      try {
        await api.patch(
          `/deliveryman/${auth.id}/deliveries/${delivery.id}/withdraw`,
          {
            start_date: new Date(),
          }
        );
      } catch (err) {
        Alert.alert('Horário de retirda inválida.');
      }
    }
    Alert.alert(
      'Confirmação de retirada',
      'Confirma que deseja realizar a retirada desta encomenda?',
      [
        {
          text: 'Cancelar',
          style: 'destructive',
        },
        {
          text: 'Confirmar',
          onPress: delievryWithdraw,
        },
      ],
      {
        cancelable: false,
      }
    );
    navigation.navigate('Entregas');
  }

  return (
    <Container>
      <TitleContainer>
        <Icon name="local-shipping" color={colors.primary} size={20} />
        <Title>Encomenda 0{data.id}</Title>
      </TitleContainer>

      <Progress status={data.status} />

      <Details>
        <Detail>
          <TitleDetail>Data</TitleDetail>
          <TextDetail>{data.start_date_formated}</TextDetail>
        </Detail>
        <Detail>
          <TitleDetail>Cidade</TitleDetail>
          <TextDetail>{data.recipient.city}</TextDetail>
        </Detail>
        <Detail>
          <TextLink
            onPress={() => navigation.navigate('Detalhes', { delivery: data })}
          >
            Ver detalhes
          </TextLink>
        </Detail>
      </Details>
      {data.status === 'PENDENTE' ? (
        <Withdraw onPress={handleDeliveryWithdraw}>Realizar retirada</Withdraw>
      ) : null}
    </Container>
  );
}
