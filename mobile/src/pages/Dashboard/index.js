import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { parseISO, format } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import { signOut } from '~/store/modules/auth/actions';

import NamePhoto from '~/components/NamePhoto';
import Delivery from '~/components/Delivery';

import {
  Container,
  Profile,
  Action,
  Avatar,
  TitleProfile,
  Welcome,
  Name,
  Menu,
  TitleMenu,
  Options,
  Option,
  List,
  NoDelivery,
  TitleNoDelivery,
} from './styles';

import colors from '~/styles/colors';

export default function Dashboard() {
  const [deliveries, setDeliveries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeDeliveries, setTypeDeliveries] = useState('PENDENTES');

  const dispatch = useDispatch();
  const profile = useSelector(state => state?.user?.profile);
  const auth = useSelector(state => state.auth);

  function handleLogout() {
    dispatch(signOut());
  }

  function handlePending() {
    setTypeDeliveries('PENDENTES');
  }

  function handleDelivered() {
    setTypeDeliveries('ENTREGUES');
  }

  useEffect(() => {
    async function loadDeliveries() {
      if (!auth.id) return;

      try {
        const response =
          typeDeliveries === 'PENDENTES'
            ? await api.get(`/deliverymen/${auth.id}`)
            : await api.get(`/deliverymen/${auth.id}/deliveries`);

        const data = response.data.map(delivery => ({
          ...delivery,
          start_date_formated: delivery.start_date
            ? format(parseISO(delivery?.start_date), 'dd/MM/yyyy')
            : '--/--/--',
          end_date_formated: delivery.end_date
            ? format(parseISO(delivery?.end_date), 'dd/MM/yyyy')
            : '--/--/--',
        }));
        setDeliveries(data);
      } catch (error) {
        console.log(error);
      }
    }

    loadDeliveries();
  }, [auth.id, typeDeliveries]);

  async function handleLoadMore() {
    try {
      const response =
        typeDeliveries === 'PENDENTES'
          ? await api.get(`/deliverymen/${auth.id}`, {
              params: {
                page: currentPage + 1,
              },
            })
          : await api.get(`/deliverymen/${auth.id}/deliveries`, {
              params: {
                page: currentPage + 1,
              },
            });

      const data = response.data.map(delivery => ({
        ...delivery,
        start_date_formated: delivery.start_date
          ? format(parseISO(delivery?.start_date), 'dd/MM/yyyy')
          : '--/--/--',
        end_date_formated: delivery.end_date
          ? format(parseISO(delivery?.end_date), 'dd/MM/yyyy')
          : '--/--/--',
      }));
      setCurrentPage(currentPage + 1);
      setDeliveries([...deliveries, ...data]);
    } catch (error) {
      console.log('Error', 'Erro 500: Problema internal com o servidor');
    }
  }

  return (
    <Container>
      <Profile>
        <Action>
          {profile?.avatar ? (
            <Avatar source={{ uri: profile?.avatar?.url }} />
          ) : (
            <>{profile?.name && <NamePhoto name={profile?.name} />}</>
          )}
        </Action>
        <TitleProfile>
          <Welcome>Bem vindo de volta,</Welcome>
          <Name>{profile?.name}</Name>
        </TitleProfile>
        <Action>
          <Icon
            onPress={handleLogout}
            name="exit-to-app"
            color={colors.danger}
            size={25}
          />
        </Action>
      </Profile>

      <Menu>
        <TitleMenu>Entregas</TitleMenu>
        <Options>
          <Option
            style={{
              marginRight: 15,
            }}
            onPress={handlePending}
            selected={typeDeliveries === 'PENDENTES'}
          >
            Pendentes
          </Option>
          <Option
            selected={typeDeliveries === 'ENTREGUES'}
            onPress={handleDelivered}
          >
            Entregues
          </Option>
        </Options>
      </Menu>

      {deliveries.length > 0 ? (
        <List
          data={deliveries}
          keyExtractor={item => String(item.id)}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          renderItem={({ item }) => <Delivery data={item} />}
        />
      ) : (
        <NoDelivery>
          <Icon name="mood-bad" size={64} />
          <TitleNoDelivery>Sem encomendas</TitleNoDelivery>
        </NoDelivery>
      )}
    </Container>
  );
}
