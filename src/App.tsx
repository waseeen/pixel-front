import { useEffect, useRef } from 'react';
import { MessageType } from './types/Message';
import { Tile } from './types/Tile';
import ColorPicker from './components/ColorPicker/ColorPicker';
import Profile from './components/Profile/Profile';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Canvas from './components/Canvas/Canvas';
import HoveredTile from './components/HoveredTile/HoveredTile';
import { useAtom } from 'jotai';
import { cooldownAtom, sizeAtom, tilesAtom } from './molecules/canvas';
import LanguagePicker from './components/LanguagePicker/LanguagePicker';

const socket = new WebSocket(import.meta.env.VITE_WS_URL);

const App = () => {
  const inited = useRef(false);
  const [tiles, setTiles] = useAtom(tilesAtom);
  const [, setSize] = useAtom(sizeAtom);
  const [, setCooldown] = useAtom(cooldownAtom);
  const getTiles = async () => {
    const req = await fetch(import.meta.env.VITE_BACKEND_URL);
    const body = await req.json();
    setSize({ x: body.payload.size[0], y: body.payload.size[1] });
    setTiles(body.payload.tiles);
    setCooldown(body.payload.cooldown);
  };
  const setup = async () => {
    await getTiles();
  };

  const editTile = (e: MessageEvent) => {
    const body = JSON.parse(e.data);
    if (body.type == MessageType.UPDATE) {
      const payload = body.payload as Tile;
      const newTiles = [...tiles];
      newTiles[payload.number] = {
        ...newTiles[payload.number],
        number: payload.number,
        color: payload.color,
      };
      setTiles(newTiles);
    }
  };

  useEffect(() => {
    if (inited.current === false) {
      setup();
    }
    inited.current = true;
    socket.addEventListener('message', editTile);

    return () => {
      socket.removeEventListener('message', editTile);
    };
  });

  return (
    <>
      <TransformWrapper
        initialScale={window.innerWidth / 15000}
        limitToBounds={true}
        minScale={0.1}
        maxScale={0.75}
        centerOnInit
        wheel={{ smoothStep: 0.0005 }}
      >
        <TransformComponent
          wrapperStyle={{
            width: '100cqw',
            height: '100cqh',
          }}
        >
          <Canvas />
        </TransformComponent>
      </TransformWrapper>
      <LanguagePicker />
      <HoveredTile />
      <ColorPicker />
      <Profile />
    </>
  );
};

export default App;
