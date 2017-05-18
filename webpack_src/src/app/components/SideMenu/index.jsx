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
		return (
			<Drawer containerClassName={style.red} open={this.state.open} >
				<MenuItem leftIcon={<ActionGrade />} >Popular</MenuItem>
				<MenuItem>Favorites</MenuItem>
			</Drawer>
		)
	}
}

export default SideMenu