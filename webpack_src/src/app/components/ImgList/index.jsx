import React from 'react';
import { connect } from 'react-redux';

import style from './style.scss'

const ImgList = (props) => {

	return (
		<div className={style.restolist}>
			{props.tilesData.map((tile) => (
				<div
					className={style.restoitem}
					key={tile.idx}
					style={{ backgroundImage: `url('${tile.img}')` }}
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
