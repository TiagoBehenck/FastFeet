import React from 'react';
import Loadable from 'react-loadable';
import { Switch } from 'react-router-dom';

import Delivery from '~/pages/Delivery';
import DeliveryForm from '~/pages/Delivery/Form';
import Deliveryman from '~/pages/Deliveryman';
import DeliverymanForm from '~/pages/Deliveryman/Form';
import Problems from '~/pages/Problems';
import Recipient from '~/pages/Recipient';
import RecipientForm from '~/pages/Recipient/Form';
import SingIn from '~/pages/SingIn';

import Route from './Route';

const DeliveryComponent = Loadable({
	loader: () => import('~/pages/Delivery'),
	loading: Delivery,
});

const DeliveryManComponent = Loadable({
	loader: () => import('~/pages/Deliveryman'),
	loading: Deliveryman,
});

const RecipientComponent = Loadable({
	loader: () => import('~/pages/Recipient'),
	loading: Recipient,
});

const ProblemComponent = Loadable({
	loader: () => import('~/pages/Problems'),
	loading: Problems,
});

export default function Routes() {
	return (
		<Switch>
			<Route path="/" exact component={SingIn} />

			<Route path="/delivery" exact component={DeliveryComponent} isPrivate />
			<Route path="/delivery/form" exact component={DeliveryForm} isPrivate />
			<Route
				path="/delivery/form/:id"
				exact
				component={DeliveryForm}
				isPrivate
			/>

			<Route
				path="/deliveryman"
				exact
				component={DeliveryManComponent}
				isPrivate
			/>
			<Route
				path="/deliveryman/form"
				exact
				component={DeliverymanForm}
				isPrivate
			/>
			<Route
				path="/deliveryman/form/:id"
				exact
				component={DeliverymanForm}
				isPrivate
			/>

			<Route path="/recipient" exact component={RecipientComponent} isPrivate />
			<Route path="/recipient/form" exact component={RecipientForm} isPrivate />
			<Route
				path="/recipient/form/:id"
				exact
				component={RecipientForm}
				isPrivate
			/>

			<Route path="/problem" exact component={ProblemComponent} isPrivate />
		</Switch>
	);
}
