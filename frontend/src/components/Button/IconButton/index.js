import React from 'react';

import PropTypes from 'prop-types';

import Button from './styles';

export default function IconButton({
	title,
	Icon,
	action,
	background,
	marginLeft,
	...rest
}) {
	return (
		<Button
			onClick={action}
			background={background}
			marginLeft={marginLeft}
			{...rest}
		>
			<Icon color="#fff" size={24} />
			{title}
		</Button>
	);
}

IconButton.propTypes = {
	title: PropTypes.string.isRequired,
	Icon: PropTypes.func.isRequired,
	action: PropTypes.func.isRequired,
	background: PropTypes.string,
};

IconButton.defaultProps = {
	background: '',
};
