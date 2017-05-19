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
    color: 'rgb(0, 188, 212)',
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
                title={tile.title}                
                titleStyle={styles.titleStyle}
                titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
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
