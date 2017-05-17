import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import AuthForm from '../AuthForm';

import style from './style.scss';

class SideMenu extends Drawer {

	constructor(props) {
		super(props);
		this.state = { open: true };
	}

	render() {
		console.log(style);
		return (
			<Drawer containerClassName={style.red} open={this.state.open} >
				<MenuItem leftIcon={<ActionGrade />} >Popular</MenuItem>
				<MenuItem>Favorites</MenuItem>
				<AuthForm />
			</Drawer>
		)
	}
}

export default SideMenu