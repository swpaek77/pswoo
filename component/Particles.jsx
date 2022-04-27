import particlesConfig from '../config/particles-config';
import ReactParticles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function Particles({ children }) {
  const particlesInit = async main => {
    console.log(main);

    // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(main);
  };

  const particlesLoaded = container => {
    // console.log(container);
  };

  return (
    <div style={{ position: 'relative' }}>
      <ReactParticles
        params={particlesConfig}
        style={{
          position: 'absolute',
          // zIndex: 1,
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
        init={particlesInit}
        loaded={particlesLoaded}
      />
      {children && <div style={{ position: 'relative' }}>{children}</div>}
    </div>
  );
}
