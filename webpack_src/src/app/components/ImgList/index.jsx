import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';



const ImgList = (props) => {
  const tilesData = [
    {
      img: 'http://placehold.it/350x350',
      title: 'Breakfast',
      author: 'jill111',
    },
    {
      img: 'http://placehold.it/350x350',
      title: 'Tasty burger',
      author: 'pashminu',
    },
    {
      img: 'http://placehold.it/350x350',
      title: 'Camera',
      author: 'Danson67',
    },
    {
      img: 'http://placehold.it/350x350',
      title: 'Morning',
      author: 'fancycrave1',
    },
    {
      img: 'http://placehold.it/350x350',
      title: 'Hats',
      author: 'Hans',
    }
  ];
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