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
  const selectedOutline = darkColors.includes(tile.color)
    ? classes.tile_black__selected
    : classes.tile__selected;
  const cl = classes.tile + (selected ? ' ' + selectedOutline : '');
  return (
    <Box
      className={cl}
      style={{ backgroundColor: tile.color, ...style }}
      onClick={() => onClick(tile)}
    />
  );
};
export default TileBlock;
