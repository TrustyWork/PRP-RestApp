import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

import style from './style.scss'


const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(255, 255, 255)',
  },
};


const ImgList = ({tilesData, ...props}) => {

  //const GridListExampleSingleLine = () => {
    return (
      <div className={style.custom}>
        <div style={styles.root}>
          <GridList style={styles.gridList} cols={2.2}>
            {tilesData.map((tile,idx) => (
              <GridTile
                key={idx}
                title={<div>text</div>}
                titleStyle={styles.titleStyle}
                titleBackground="rgba(0,0,0,0.4)"
              >
                <img src={tile.img} />
              </GridTile>
            ))}
          </GridList>
        </div>
    </div>
    );
  };

//}
export default ImgList;
