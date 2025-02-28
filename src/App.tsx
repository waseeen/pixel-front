import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import Canvas from './components/Canvas/Canvas';
import ColorPicker from './components/ColorPicker/ColorPicker';
import HoveredTile from './components/HoveredTile/HoveredTile';
import LanguagePicker from './components/LanguagePicker/LanguagePicker';
import Profile from './components/Profile/Profile';
import CanvasOverlay from './components/Canvas/CanvasOverlay';
import env from './utils/env';

const App = () => {
  return (
    <>
      <TransformWrapper
        initialScale={0.29}
        limitToBounds={true}
        minScale={0.25}
        maxScale={2}
        centerOnInit={true}
        smooth={true}
        wheel={{
          // smoothStep: 0.0005,
          step: 0.5,
        }}
      >
        <TransformComponent
          wrapperStyle={{
            width: '100cqw',
            height: '100cqh',
          }}
        >
          <div
            style={{
              position: 'relative',
              width: `${env.width * env.pixelSize}px`,
              height: `${env.height * env.pixelSize}px`,
            }}
          >
            <Canvas />
            <CanvasOverlay />
          </div>
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
