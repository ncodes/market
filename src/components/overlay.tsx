import { motion } from "framer-motion";

export function Overlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed left-0 top-0 z-10 h-full w-full bg-black/50 backdrop-blur-sm transition-all duration-300"
    ></motion.div>
  );
}