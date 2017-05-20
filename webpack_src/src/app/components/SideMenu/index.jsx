import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon'

import style from './style.scss';

const SideMenu = ({ sideMenu, ...props }) => {
	return (
		<Drawer containerClassName={style.drawer}>
			{sideMenu.map((itm)=>{ return (
			<MenuItem key={itm.item} leftIcon ={<FontIcon className={itm.icon} />}>{itm.item}</MenuItem>
			)
			})}
		</Drawer>
	)
}

export default SideMenu