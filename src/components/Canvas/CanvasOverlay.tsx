import { useAtom } from 'jotai';
import { hoveredTileAtom, selectedTileAtom } from '../../molecules/canvas';
import { useEffect, useRef } from 'react';
import env from '../../utils/env';
import { useTransformContext } from 'react-zoom-pan-pinch';
const getIndexByCoords = (x: number, y: number) => {
  return x + y * env.width;
};

const getCoordsByIndex = (index: number) => {
  const x = index % env.width;
  const y = Math.floor(index / env.width);
  return { x: x * env.pixelSize, y: y * env.pixelSize };
};

const Canvas = () => {
  const context = useTransformContext();
  const [selectedTile, setSelectedTile] = useAtom(selectedTileAtom);
  const [, setHoveredTile] = useAtom(hoveredTileAtom);
  const ref = useRef<HTMLCanvasElement>(null);

  const drawSelected = (index: number) => {
    const { x, y } = getCoordsByIndex(index);
    const ctx = ref.current?.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, env.width * env.pixelSize, env.height * env.pixelSize);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 4, y - 4, env.pixelSize + 8, env.pixelSize + 8);
    ctx.fillStyle = '#000000';
    ctx.fillRect(x - 3, y - 3, env.pixelSize + 6, env.pixelSize + 6);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x - 2, y - 2, env.pixelSize + 4, env.pixelSize + 4);
    ctx.fillStyle = '#000000';
    ctx.fillRect(x - 1, y - 1, env.pixelSize + 2, env.pixelSize + 2);

    ctx.clearRect(x, y, env.pixelSize, env.pixelSize);
  };

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.floor(e.nativeEvent.offsetX / env.pixelSize);
    const y = Math.floor(e.nativeEvent.offsetY / env.pixelSize);
    const tileIndex = getIndexByCoords(x, y);
    setSelectedTile(tileIndex);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.ceil(e.nativeEvent.offsetX / env.pixelSize);
    const y = Math.ceil(e.nativeEvent.offsetY / env.pixelSize);
    setHoveredTile({ x: x, y: y });
  };

  const handleMouseLeave = () => {
    setHoveredTile(null);
  };

  const width = env.width * env.pixelSize;
  const height = env.height * env.pixelSize;

  useEffect(() => {
    if (selectedTile !== null) {
      drawSelected(selectedTile);
    }
    console.log(context);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTile]);

  return (
    <canvas
      ref={ref}
      id="canvasOverlay"
      width={width}
      height={height}
      style={{ position: 'absolute', top: 0, left: 0 }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default Canvas;
