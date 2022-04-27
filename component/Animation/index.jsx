import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './styles.module.scss';

export default function Page() {
  return (
    <div className={styles.main}>
      <Hero>
        <div className={styles.container}>
          {/* <Info /> */}
          <div className={styles.row}>
            {cards.map((card, i) => (
              <div className={styles.column} key={i}>
                <Card>
                  <div className={styles['card-title']}>{card.title}</div>
                  <div className={styles['card-body']}>{card.description}</div>
                  <Image ratio={card.imageRatio} src={card.image} />
                </Card>
              </div>
            ))}
          </div>
        </div>
      </Hero>
    </div>
  );
}

function Card({ children }) {
  // We add this ref to card element and use in onMouseMove event ...
  // ... to get element's offset and dimensions.
  const ref = useRef();

  // Keep track of whether card is hovered so we can increment ...
  // ... zIndex to ensure it shows up above other cards when animation causes overlap.
  const [isHovered, setHovered] = useState(false);

  const [animatedProps, setAnimatedProps] = useSpring(() => {
    return {
      // Array containing [rotateX, rotateY, and scale] values.
      // We store under a single key (xys) instead of separate keys ...
      // ... so that we can use animatedProps.xys.interpolate() to ...
      // ... easily generate the css transform value below.
      xys: [0, 0, 1],
      // Setup physics
      config: { mass: 10, tension: 400, friction: 40, precision: 0.00001 },
    };
  });

  return (
    <animated.div
      ref={ref}
      className={styles.card}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={({ clientX, clientY }) => {
        // Get mouse x position within card
        const x = clientX - (ref.current.offsetLeft - (window.scrollX || window.pageXOffset || document.body.scrollLeft));

        // Get mouse y position within card
        const y = clientY - (ref.current.offsetTop - (window.scrollY || window.pageYOffset || document.body.scrollTop));

        // Set animated values based on mouse position and card dimensions
        const dampen = 50; // Lower the number the less rotation
        const xys = [
          -(y - ref.current.clientHeight / 2) / dampen, // rotateX
          (x - ref.current.clientWidth / 2) / dampen, // rotateY
          1.07, // Scale
        ];

        // Update values to animate to
        setAnimatedProps({ xys: xys });
      }}
      onMouseLeave={() => {
        setHovered(false);
        // Set xys back to original
        setAnimatedProps({ xys: [0, 0, 1] });
      }}
      style={{
        // If hovered we want it to overlap other cards when it scales up
        zIndex: isHovered ? 2 : 1,
        // Interpolate function to handle css changes
        transform: animatedProps.xys.interpolate((x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`),
      }}
    >
      {children}
    </animated.div>
  );
}
function Hero({ children }) {
  return (
    <div className={styles.hero}>
      <div className={styles['hero-body']}>{children}</div>
    </div>
  );
}

function Image({ ratio, src }) {
  return (
    <div className={styles['image-container']}>
      <div className={styles['image-inner-container']}>
        <div
          className={styles.ratio}
          style={{
            paddingTop: ratio * 100 + '%',
          }}
        >
          <div className={styles['ratio-inner']}>
            <img src={src} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Info() {
  return (
    <div className={styles.info}>
      Springy cards from{' '}
      <a target="_blank" href="https://bit.ly/382KSdo" rel="noreferrer">
        divjoy.com
      </a>
      <div className={styles.notice}>(best viewed at larger screen width)</div>
    </div>
  );
}

const cards = [
  {
    title: '앱 개발 프로젝트 🚀',
    description: '바코드 인식 앱 개발 프로젝트 경험이 있습니다. 쇼핑앱 제작 경험이 있고, React Native 기술로 제작하였습니다. Flutter 도 배우게 되면 금방 익힐 수 있습니다.',
    image: 'https://6jlvz1j5q3.csb.app/undraw_collection.svg',
    imageRatio: 784 / 1016,
  },
  {
    title: '백엔드 설계 👩‍🎨',
    description:
      'Oracle, SQL Server, MySQL 을 다룰줄 알며, 최신 ORM 이 적용된 프로젝트를 만드는데 능숙합니다. 단순한 strapi 로 만들어서 운영중인 서비스가 있고, 새로운 언어를 배우는 것에도 익숙합니다.',
    image: 'https://6jlvz1j5q3.csb.app/undraw_upload.svg',
    imageRatio: 839 / 1133,
  },
  {
    title: '프론트엔드 제작 ⚡️',
    description:
      'React.js , Vue.js 등 프로젝트 경험이 있고, Next.js + WordPress 로 웹사이트 제작 경험이 있습니다. 새로운 Stack 을 공부하는 것을 좋아하며 60, 70살이 되어서도 끊임없이 배우는 것이 인생의 목표입니다.',
    image: 'https://6jlvz1j5q3.csb.app/undraw_static_assets.svg',
    imageRatio: 730 / 1030,
  },
];
