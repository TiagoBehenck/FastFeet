import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import logo from '~/assets/logo.svg';
import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Navigation, Profile } from './styles';

export default function Header() {
	const dispatch = useDispatch();
	const profile = useSelector(state => state.user.profile);

	function handleSingOut() {
		dispatch(signOut());
	}
	return (
		<Container>
			<Content>
				<nav>
					<img src={logo} alt="FastFeet" />
					<Navigation>
						<NavLink to="/delivery">ENCOMENDAS</NavLink>
						<NavLink to="/deliveryman">ENTREGADORES</NavLink>
						<NavLink to="/recipient">DESTINATÁRIOS</NavLink>
						<NavLink to="/problem">PROBLEMAS</NavLink>
					</Navigation>
				</nav>

				<aside>
					<Profile>
						<strong>{profile.name}</strong>
						<button type="button" onClick={handleSingOut}>
							sair do sistema
						</button>
					</Profile>
				</aside>
			</Content>
		</Container>
	);
}
