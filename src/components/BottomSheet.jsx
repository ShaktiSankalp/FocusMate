import React, { useState, useRef, useEffect } from 'react';
import Tabs from './Tabs';
import ChatAssistant from './ChatAssistant';
import TaskScheduler from './TaskScheduler';

const SNAP_POINTS = [
  100, // collapsed
  window.innerHeight * 0.5, // half
  window.innerHeight * 0.9, // full
];

function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}

export default function BottomSheet() {
  const [snapIndex, setSnapIndex] = useState(1);
  const [targetHeight, setTargetHeight] = useState(SNAP_POINTS[1]);
  const [currentHeight, setCurrentHeight] = useState(SNAP_POINTS[1]);
  const [dragging, setDragging] = useState(false);
  const dragStartY = useRef(0);
  const dragStartHeight = useRef(0);
  const animFrame = useRef(null);

  const [activeTab, setActiveTab] = useState('chat');

  // Animate snap transition
  useEffect(() => {
    if (dragging) return;

    let start = null;
    const initialHeight = currentHeight;
    const diff = targetHeight - initialHeight;
    const duration = 300;

    function animate(timestamp) {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutQuart(t);
      setCurrentHeight(initialHeight + diff * eased);
      if (t < 1) animFrame.current = requestAnimationFrame(animate);
    }

    animFrame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame.current);
  }, [targetHeight, dragging]);

  // Drag start
  const onDragStart = (e) => {
    setDragging(true);
    dragStartY.current = e.touches ? e.touches[0].clientY : e.clientY;
    dragStartHeight.current = currentHeight;
  };

  // Global drag move/end
  useEffect(() => {
    if (!dragging) return;

    const onDragMove = (e) => {
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const dy = dragStartY.current - clientY;
      let newHeight = dragStartHeight.current + dy;
      newHeight = Math.min(Math.max(newHeight, SNAP_POINTS[0]), SNAP_POINTS[2]);
      setCurrentHeight(newHeight);
    };

    const onDragEnd = () => {
      setDragging(false);
      const closestIndex = SNAP_POINTS.reduce(
        (closest, val, i) =>
          Math.abs(val - currentHeight) < Math.abs(SNAP_POINTS[closest] - currentHeight)
            ? i
            : closest,
        0
      );
      setSnapIndex(closestIndex);
      setTargetHeight(SNAP_POINTS[closestIndex]);
    };

    window.addEventListener('mousemove', onDragMove);
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchmove', onDragMove);
    window.addEventListener('touchend', onDragEnd);

    return () => {
      window.removeEventListener('mousemove', onDragMove);
      window.removeEventListener('mouseup', onDragEnd);
      window.removeEventListener('touchmove', onDragMove);
      window.removeEventListener('touchend', onDragEnd);
    };
  }, [dragging, currentHeight]);

  // Keyboard accessibility
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setSnapIndex(0);
        setTargetHeight(SNAP_POINTS[0]);
      }
      if (e.key === 'ArrowUp' && snapIndex < SNAP_POINTS.length - 1) {
        const newIndex = snapIndex + 1;
        setSnapIndex(newIndex);
        setTargetHeight(SNAP_POINTS[newIndex]);
      }
      if (e.key === 'ArrowDown' && snapIndex > 0) {
        const newIndex = snapIndex - 1;
        setSnapIndex(newIndex);
        setTargetHeight(SNAP_POINTS[newIndex]);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [snapIndex]);

  const toggleOpen = () => {
    const newIndex = snapIndex === 0 ? 2 : 0;
    setSnapIndex(newIndex);
    setTargetHeight(SNAP_POINTS[newIndex]);
  };

  return (
    <>
      {/* Backdrop */}
      {snapIndex !==0  && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => {
            setSnapIndex(0);
            setTargetHeight(SNAP_POINTS[0]);
          }}
          aria-hidden="true"
        />
      )}

      {/* Bottom Sheet */}
      <div
        className="fixed bottom-0 left-0 right-0 bg-white shadow-xl rounded-t-xl z-50 flex flex-col"
        style={{ height: currentHeight, touchAction: 'none' }}
      >
        {/* Drag Handle + Toggle */}
        <div
          className="flex flex-col items-center cursor-pointer select-none"
          onMouseDown={onDragStart}
          onTouchStart={onDragStart}
          role="button"
          tabIndex={0}
          aria-label="Drag handle to resize bottom sheet"
        >
          <div className="w-12 h-1.5 bg-gray-400 rounded-full mt-3 mb-1" />
          <button
            onClick={toggleOpen}
            className="mb-2 px-4 py-1 bg-blue-600 text-white rounded-full text-sm"
            aria-label="Toggle bottom sheet open/close"
          >
            {snapIndex === 0 ? 'Open FocusMate' : 'Close FocusMate'}
          </button>
        </div>

        {/* Tabs */}
        <Tabs selected={activeTab} onChange={setActiveTab} />

        {/* Scrollable content */}
        <div className="flex-1 overflow-auto p-4">
          {activeTab === 'chat' ? <ChatAssistant /> : <TaskScheduler />}
        </div>
      </div>
    </>
  );
}
