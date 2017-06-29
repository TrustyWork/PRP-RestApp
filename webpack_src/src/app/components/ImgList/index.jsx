import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles.scss'

const ImgList = (props) => {

	return (
		<div className={styles.restolist}>
			{props.tilesData.map((tile) => (
				<div
					className = {styles.restoitem}
					key={tile.idx}
					style={{backgroundImage:`url('${tile.img}')`}}
				>
					<div>text</div>
				</div>
			))}

		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		tilesData: state.mainpage.content.imglist
	}
}


export default connect(mapStateToProps)(ImgList);
