import React from 'react';
import { connect } from 'react-redux';

import style from './style.scss';

const SideMenu = (props) => {
	return (
		<ul className={style.list}>
			{props.sideMenu.map((itm) => {
				return (
						<li className={style.menuitem} key={itm.item}>
							<span><i className={itm.icon}></i></span> {/*Menu icon*/}
							<span>{itm.item}</span> {/*Menu text*/}
						</li>
				)
			})}
		</ul>
	)
}

const mapStateToProps = (state) => {
	return { sideMenu: state.mainpage.sidemenu }
}

export default connect(mapStateToProps)(SideMenu);