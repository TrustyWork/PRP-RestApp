import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';


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
      <div style={styles.root}>
        <GridList style={styles.gridList} cols={2.2}>
          {tilesData.map((tile,idx) => (
            <GridTile
              key={idx}
              titleBackground="url('http://placehold.it/350x350')"
            >
              <img src={tile.img} />
            </GridTile>
          ))}
        </GridList>
      </div>);
  };

//}
export default ImgList;