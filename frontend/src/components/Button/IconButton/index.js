import React from 'react';

import PropTypes from 'prop-types';

import Button from './styles';

export default function IconButton({
	title,
	Icon,
	action,
	background,
	color,
	...rest
}) {
	return (
		<Button onClick={action} background={background} color={color} {...rest}>
			<Icon color={color || '#fff'} size={24} />
			{title}
		</Button>
	);
}

IconButton.propTypes = {
	title: PropTypes.string.isRequired,
	Icon: PropTypes.func.isRequired,
	action: PropTypes.func.isRequired,
	background: PropTypes.string,
	color: PropTypes.string,
};

IconButton.defaultProps = {
	background: '',
	color: '',
};
