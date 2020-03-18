import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '~/pages/Dashboard';
import DeliveryDetails from '~/pages/DeliveryDetails';
import SendProblem from '~/pages/DeliveryDetails/SendProblem';
import ProblemsDetails from '~/pages/DeliveryDetails/ProblemsDetails';
import DeliveryConfirmPhoto from '~/pages/DeliveryDetails/DeliveryConfirmPhoto';

import colors from '~/styles/colors';

const Stack = createStackNavigator();

export default function DeliveryRoutes() {
  return (
    <Stack.Navigator initialRouteName="Entregas">
      <Stack.Screen
        name="Entregas"
        options={{ headerShown: false }}
        component={Dashboard}
      />
      <Stack.Screen
        name="Detalhes"
        options={{
          title: 'Detalhes da encomenda',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        component={DeliveryDetails}
      />
      <Stack.Screen
        name="Problem"
        options={{
          title: 'Informar problema',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        component={SendProblem}
      />
      <Stack.Screen
        name="ProblemsDetails"
        options={{
          title: 'Visualizar problemas',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        component={ProblemsDetails}
      />
      <Stack.Screen
        name="Photo"
        options={{
          title: 'Confirmar entrega',
          headerBackTitleVisible: false,
          headerTransparent: true,
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: colors.primary,
          },
        }}
        component={DeliveryConfirmPhoto}
      />
    </Stack.Navigator>
  );
}
