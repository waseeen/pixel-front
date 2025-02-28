import { useAtom } from 'jotai';
import { cooldownAtom, sizeAtom } from '../../molecules/canvas';
import { useEffect, useRef } from 'react';
import { Tile } from '../../types/Tile';
import socket from '../../api/ws';
import { MessageType } from '../../types/Message';
import env from '../../utils/env';

const getCoordsByIndex = (index: number, size: { x: number; y: number }) => {
  const x = index % size.x;
  const y = Math.floor(index / size.x);
  return { x, y };
};

const Canvas = () => {
  const inited = useRef(false);
  const ref = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useAtom(sizeAtom);
  const [, setCooldown] = useAtom(cooldownAtom);

  const setup = async (): Promise<void> => {
    const req = await fetch(env.backendUrl);
    const body: { payload: { size: [number, number]; tiles: Tile[]; cooldown: number } } =
      await req.json();
    const { size, tiles, cooldown } = body.payload;
    const [x, y] = size;
    setSize({ x, y });
    setCooldown(cooldown);
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    tiles.map((tile) => drawTile(ctx, tile, { x, y }));
  };

  const editTile = (e: MessageEvent) => {
    const body = JSON.parse(e.data);
    if (body.type === MessageType.UPDATE) {
      const canvas = ref.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const payload: Tile = body.payload;
      drawTile(ctx, payload);
    }
  };

  const drawTile = (
    ctx: CanvasRenderingContext2D,
    tile: Tile,
    sizeOverride?: { x: number; y: number },
  ) => {
    const pixelSize = env.pixelSize;
    const currentSize = sizeOverride || size;
    const { x, y } = getCoordsByIndex(tile.number, currentSize);
    ctx.fillStyle = tile.color ?? '#ffffff';
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  };

  useEffect(() => {
    if (!inited.current) {
      setup();
      inited.current = true;
    }
  });

  useEffect(() => {
    if (!inited.current) {
      inited.current = true;
    }
    socket.addEventListener('message', editTile);

    return () => {
      socket.removeEventListener('message', editTile);
    };
  });
  const width = env.width * env.pixelSize;
  const height = env.height * env.pixelSize;
  return (
    <canvas
      style={{ position: 'absolute', top: 0, left: 0 }}
      ref={ref}
      id="canvas"
      width={width}
      height={height}
    />
  );
};

export default Canvas;
