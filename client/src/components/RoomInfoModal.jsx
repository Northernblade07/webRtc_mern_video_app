import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RoomInfoModal = ({ roomId, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-gray-500 bg-gray-600/80 p-6 text-white shadow-2xl backdrop-blur-xl"
          >
            <h3 className="text-xl font-bold bg-gradient-to-r from-purple-200 to-cyan-200 bg-clip-text text-transparent">
              Your Meeting is Ready
            </h3>
            <p className="mt-2 text-sm text-gray-400">
              Share this room ID with others so they can join your call.
            </p>

            {/* Room ID Box */}
            <div className="mt-5 flex items-center justify-between gap-2 rounded-xl border border-gray-700 bg-gray-950/50 p-3 font-mono">
              <span className="truncate text-purple-100 selection:bg-purple-300/30">
                {roomId}
              </span>
              <button
                onClick={handleCopy}
                className={`shrink-0 rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-gray-200'
                }`}
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Close Action */}
            <div className="mt-6 flex justify-end">
              <button
                onClick={onClose}
                className="rounded-xl bg-blue-500 px-5 py-2 text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}
      
    </AnimatePresence>
  );
};

export default RoomInfoModal;
