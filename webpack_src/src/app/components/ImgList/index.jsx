import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';



const ImgList = ({tilesData, ...props}) => {
  
  //const GridListExampleSingleLine = () => {
    return (
      <div style={{}}>
        <GridList style={{}} cols={2.2}>
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