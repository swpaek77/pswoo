import styles from '../../styles/Home.module.css';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export default function Page() {
  const x = useMotionValue(0);
  const background = useTransform(
    //
    x,
    [-100, 0, 100],
    ['#ff008c', '#7700ff', 'rgb(230, 255, 0)']
  );

  return (
    <div className={styles.container}>
      <motion.div animate={{ scale: 0.5 }}>
        <div>asdf</div>
      </motion.div>
      <motion.div
        //
        drag="x"
        dragConstraints={{ left: -100, right: 100 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div>asdf</div>
      </motion.div>
      <div className="example-container">
        <motion.div
          //
          animate={{ scale: 2 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <div className="example-container">
        <motion.div
          //
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
        />
      </div>
      <div className="example-container">
        {/* <motion.div style={{ background }}>
          <motion.div drag="x" dragConstraints={{ left: 0, right: 0 }} style={{ x }}>
            
            <div>{x}</div>
          </motion.div>
        </motion.div> */}
      </div>
    </div>
  );
}
