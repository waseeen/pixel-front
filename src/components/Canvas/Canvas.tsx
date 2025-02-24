import { useAtom } from 'jotai';
import { hoveredTileAtom, selectedTileAtom, sizeAtom, tilesAtom } from '../../molecules/canvas';
import { useCallback, useEffect, useRef } from 'react';
import { Tile } from '../../types/Tile';
import socket from '../../api/ws';

const Canvas = () => {
  const [tiles, setTiles] = useAtom(tilesAtom);
  const [size] = useAtom(sizeAtom);
  const [selectedTile, setSelectedTile] = useAtom(selectedTileAtom);
  const [, setHoveredTile] = useAtom(hoveredTileAtom);
  const ref = useRef<HTMLCanvasElement>(null);

  const drawTile = (
    ctx: CanvasRenderingContext2D,
    tile: Tile,
    x: number,
    y: number,
    isSelected: boolean,
  ) => {
    ctx.fillStyle = isSelected ? '#000000' : tile.color;
    if (isSelected && tile.color === '#000000') {
      ctx.fillStyle = '#999999';
    }
    ctx.fillRect(x * 30, y * 30, 30, 30);

    if (isSelected) {
      ctx.fillStyle = tile.color;
      ctx.fillRect(x * 30 + 5, y * 30 + 5, 20, 20);
    }
  };

  const updateTile = useCallback(
    (tile: Tile) => {
      const canvas = ref.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const x = tile.number % size.x;
      const y = Math.floor(tile.number / size.x);
      drawTile(ctx, tile, x, y, tile.number === selectedTile);
    },
    [size, selectedTile],
  );

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    tiles.forEach((tile, i) => {
      const x = i % size.x;
      const y = Math.floor(i / size.x);
      drawTile(ctx, tile, x, y, i === selectedTile);
    });
  }, [tiles, size, selectedTile]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.floor(e.nativeEvent.offsetX / 30);
    const y = Math.floor(e.nativeEvent.offsetY / 30);
    const tileIndex = x + y * size.x;

    setSelectedTile(tileIndex);

    // Рисуем выделенную клетку
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    tiles.forEach((tile, i) => {
      const tileX = i % size.x;
      const tileY = Math.floor(i / size.x);
      drawTile(ctx, tile, tileX, tileY, i === tileIndex);
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.ceil(e.nativeEvent.offsetX / 30);
    const y = Math.ceil(e.nativeEvent.offsetY / 30);
    setHoveredTile({ x: x, y: y });
  };

  const handleMouseLeave = () => {
    setHoveredTile(null);
  };

  useEffect(() => {
    const editTile = (e: MessageEvent) => {
      const body = JSON.parse(e.data);
      if (body.type === 'UPDATE') {
        const payload = body.payload as Tile;
        updateTile(payload);

        setTiles((prevTiles) => {
          const newTiles = [...prevTiles];
          newTiles[payload.number] = {
            ...newTiles[payload.number],
            color: payload.color,
          };
          return newTiles;
        });
      }
    };

    socket.addEventListener('message', editTile);

    return () => {
      socket.removeEventListener('message', editTile);
    };
  }, [setTiles, selectedTile, updateTile]);

  return (
    <canvas
      ref={ref}
      id="canvas"
      width={size.x * 30}
      height={size.y * 30}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    />
  );
};

export default Canvas;
