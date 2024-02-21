import { motion } from 'framer-motion';

export default function Loading() {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity:  0 }}
      animate={{ opacity:  1 }}
      exit={{ opacity:  0 }}
      transition={{ duration:  0.2 }}
    >
      <motion.div
        className="animate-spin rounded-full h-24 w-24 border-t-4 border-gray-500"
        animate={{ rotate:  360 }}
        transition={{ duration:  1, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}
