import { motion } from "framer-motion";

export default function StaggeredText({
  text,
  delay = 0,
  className = "",
  asWords = false,
}) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hidden: {
      opacity: 0,
      x: 40,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const elements = asWords ? text.split(" ") : text.split("");

  return (
    <motion.div
      style={{
        display: "flex",
        overflow: "hidden",
        flexWrap: asWords ? "wrap" : "nowrap",
        gap: asWords ? "0.5rem" : "0",
      }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {elements.map((element, index) => (
        <motion.span variants={child} key={index} className="inline-block">
          {asWords ? element : element}
        </motion.span>
      ))}
    </motion.div>
  );
}
