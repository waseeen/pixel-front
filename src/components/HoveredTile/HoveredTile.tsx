import { Flex } from '@chakra-ui/react';
import classes from './HoveredTile.module.css';
import { hoveredTileAtom } from '../../molecules/canvas';
import { useAtom } from 'jotai';

const HoveredTile = () => {
  const [hoveredTile] = useAtom(hoveredTileAtom);
  if (hoveredTile === null) return null;
  return (
    <Flex className={classes.hoveredTile} justifyContent="space-between" alignItems={'center'}>
      x: {hoveredTile.x} y: {hoveredTile.y}
    </Flex>
  );
};

export default HoveredTile;
