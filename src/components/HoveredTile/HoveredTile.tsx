import { Flex } from '@chakra-ui/react';
import classes from './HoveredTile.module.css';
import { hoveredTileAtom /*, selectedTileAtom */ } from '../../molecules/canvas';
import { useAtomValue } from 'jotai';
// import env from '../../utils/env';

// const getCoordsByIndex = (index: number, size: { x: number; y: number }) => {
//   const x = index % size.x;
//   const y = Math.floor(index / size.x);
//   return { x, y };
// };

const HoveredTile = () => {
  const hoveredTile = useAtomValue(hoveredTileAtom);
  // const selectedTile = useAtomValue(selectedTileAtom);
  // const coords = selectedTile
  //   ? getCoordsByIndex(selectedTile, { x: env.width, y: env.height })
  //   : null;

  if (hoveredTile === null) return null;
  return (
    <Flex className={classes.hoveredTile} justifyContent="space-between" alignItems={'center'}>
      x: {hoveredTile ? hoveredTile.x : 'null'}
      <br />
      y: {hoveredTile ? hoveredTile.y : 'null'}
      <br />
      {/* selected:
      <br />
      x: {coords ? coords.x : 'null'}
      <br />
      y: {coords ? coords.y : 'null'} */}
    </Flex>
  );
};

export default HoveredTile;
