import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontIcon from 'material-ui/FontIcon';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from 'app/actions/sidemenu';


import style from './style.scss';

const SideMenu = (props) => {
	return (
		<Drawer containerClassName={style.drawer}>
			{props.sideMenu.map((itm) => {
				return (
					<MenuItem key={itm.item} onTouchTap={ () => props.actions.addSideMenuEntry({ item: 'NewMenu' + Date.now(), icon: 'fa fa-exclamation-circle' }) } leftIcon={<FontIcon className={itm.icon} />}>{itm.item}</MenuItem>
				)
			})}
		</Drawer>
	)
}

const mapStateToProps = (state) => {
	return { sideMenu: state.mainpage.sidemenu }
}

const mapDispatchToProps = (dispatch) => {
	return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideMenu);