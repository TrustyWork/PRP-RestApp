import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import styles from './styles.scss'


// const styles = {
// 	root: {
// 		display: 'flex',
// 		flexWrap: 'wrap',
// 		justifyContent: 'space-around',
// 	},
// 	gridList: {
// 		display: 'flex',
// 		flexWrap: 'nowrap',
// 		overflowX: 'auto',
// 	},
// 	titleStyle: {
// 		color: 'rgb(255, 255, 255)',
// 	},
// };


const ImgList = (props) => {

	//const GridListExampleSingleLine = () => {
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
	//		<div className={style.custom}>
	//			<div style={styles.root}>
	//				<GridList  style={styles.gridList} cols={2.2}>
	//					{props.tilesData.map((tile) => (
	//						<GridTile
	//							key={tile.idx}
	//							title={<div>text</div>}
	//							titleStyle={styles.titleStyle}
	//							titleBackground="rgba(0,0,0,0.4)"
	//						>
	//							<img src={tile.img} />
	//						</GridTile>
	//					))}
	//				</GridList>
	//			</div>
	//		</div>
	//	);
};

//}

const mapStateToProps = (state) => {
	return {
		tilesData: state.mainpage.content.imglist
	}
}


export default connect(mapStateToProps)(ImgList);
