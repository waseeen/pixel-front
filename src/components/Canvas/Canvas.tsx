import { useAtom } from 'jotai';
import { hoveredTileAtom, selectedTileAtom, sizeAtom, tilesAtom } from '../../molecules/canvas';
import { useEffect, useRef } from 'react';

function convertTo2DArray<T>(arr: T[], x: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += x) {
    result.push(arr.slice(i, i + x));
  }
  return result;
}

const Canvas = () => {
  const [tiles] = useAtom(tilesAtom);
  const [size] = useAtom(sizeAtom);
  const [selectedTile, setSelectedTile] = useAtom(selectedTileAtom);
  const [, setHoveredTile] = useAtom(hoveredTileAtom);
  const tiles2d = convertTo2DArray(tiles, size.x);
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        tiles2d.forEach((row, r) => {
          row.forEach((tile, t) => {
            if (selectedTile === tile.number) {
              ctx.fillStyle = '#000000';
              if (tile.color === '#000000') {
                ctx.fillStyle = '#999999';
              }
              ctx.fillRect(t * 30, r * 30, 30, 30);
              ctx.fillStyle = tile.color;
              ctx.fillRect(t * 30 + 5, r * 30 + 5, 20, 20);
            } else {
              ctx.fillStyle = tile.color;
              ctx.fillRect(t * 30, r * 30, 30, 30);
            }
          });
        });
      }
    }
  }, [selectedTile, tiles2d]);
  return (
    <canvas
      ref={ref}
      id="canvas"
      width={size.x * 30}
      onClick={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = Math.ceil(e.nativeEvent.offsetX / 30);
        const y = Math.ceil(e.nativeEvent.offsetY / 30);
        setSelectedTile(x - 1 + (y - 1) * size.x);
      }}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const x = Math.ceil(e.nativeEvent.offsetX / 30);
        const y = Math.ceil(e.nativeEvent.offsetY / 30);
        setHoveredTile({ x: x, y: y });
      }}
      onMouseLeave={() => setHoveredTile(null)}
      height={size.y * 30}
    />
  );
};
export default Canvas;
