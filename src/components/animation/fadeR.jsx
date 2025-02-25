import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function FadeR({ children, className, delay = 0.1 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: delay,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: () => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: delay,
      },
    }),
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`fade-in-section ${className}`}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div variants={childVariants} custom={index}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
