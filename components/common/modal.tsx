'use client';
import React, { useState, useEffect, useRef } from 'react'; // Added useRef

interface ModalProps {
  isOpen: boolean;
  title?: string;
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ isOpen, title, children, onClose }: ModalProps) {
  const [isMounted, setIsMounted] = useState(false); // Renamed from 'render' for clarity
  const [isAnimatingIn, setIsAnimatingIn] = useState(false); // New state for opening animation
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null); // To store timeout ID

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      // Trigger the animation in the next tick
      const t = setTimeout(() => {
        setIsAnimatingIn(true);
      }, 10); // A small delay to allow initial render with opacity-0
      timeoutRef.current = t;
    } else {
      // If it was animating in or fully shown, start exit animation
      if (isAnimatingIn || (!isAnimatingIn && isMounted && !isExiting)) {
        setIsAnimatingIn(false); // Ensure this is false if closing prematurely
        setIsExiting(true);
        const t = setTimeout(() => {
          setIsExiting(false);
          setIsMounted(false);
        }, 200); // Match duration below
        timeoutRef.current = t;
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen]); // Only depend on isOpen for triggering mount/unmount logic

  // Effect to handle reset when modal is closed externally or rapidly toggled
  useEffect(() => {
    if (!isOpen && isMounted) {
        // If isOpen becomes false, and we are still mounted (e.g. during exit animation)
        // and then it quickly becomes true again, we need to reset animation states.
        // This is more of a safeguard. The main logic is above.
        if (isExiting) {
            setIsExiting(false);
        }
        if (isAnimatingIn) {
            setIsAnimatingIn(false);
        }
    }
  }, [isOpen, isMounted, isExiting, isAnimatingIn]);


  if (!isMounted && !isExiting) return null; // Only render if mounted or exiting

  const backdropClasses = [
    'fixed inset-0 flex items-center justify-center z-50',
    'bg-black bg-opacity-50',
    'transition-opacity duration-200 ease-out',
    (isAnimatingIn && !isExiting) ? 'opacity-100' : 'opacity-0', // Animate in, or ensure it's 0 if exiting or just mounted
  ].join(' ');

  const contentClasses = [
    'bg-white rounded-2xl shadow-lg p-6',
    'min-w-[450px] max-w-[600px]',
    'transition-all duration-200 ease-out', // Changed to transition-all or specify opacity and transform
    (isAnimatingIn && !isExiting) ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
  ].join(' ');

  return (
    <div
      className={backdropClasses}
      onClick={onClose}
      // Prevent clicks during exit animation from re-triggering onClose immediately
      style={{ pointerEvents: isExiting ? 'none' : 'auto' }}
    >
      <div className={contentClasses} onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            disabled={isExiting} // Disable button during exit animation
          >
            ✕
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {children}
        </div>
      </div>
    </div>
  );
}