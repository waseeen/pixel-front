import { Box } from '@chakra-ui/react';
import { Colors } from '../../types/Colors';
import { Tile } from '../../types/Tile';
import classes from './Tile.module.css';
import React from 'react';

const TileBlock = ({
  tile,
  selected,
  onClick,
  style,
}: {
  tile: Tile;
  onClick: (tile: Tile) => void;
  selected?: boolean;
  style?: React.CSSProperties;
}) => {
  const darkColors = [
    Colors.Black,
    Colors.Maroon,
    Colors.Olive,
    Colors.Green,
    Colors.Teal,
    Colors.Navy,
    Colors.Purple,
    Colors.Gray,
    Colors.Red,
    Colors.Blue,
  ];
  const selectedBlack = darkColors.includes(tile.color);
  const cl =
    classes.tile +
    (selected ? (' ' + selectedBlack ? classes.tile_black__selected : classes.tile__selected) : '');
  return (
    <Box
      className={cl}
      style={{ backgroundColor: tile.color, ...style }}
      onClick={() => onClick(tile)}
    />
  );
};
export default TileBlock;
