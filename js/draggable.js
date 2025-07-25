// Draggable functionality for both mouse and touch events
(function() {
  let isDragging = false;
  let currentElement = null;
  let startX = 0;
  let startY = 0;
  let initialX = 0;
  let initialY = 0;

  function initializeDraggable() {
    document.querySelectorAll('.draggable').forEach(element => {
      // Prevent default drag behavior
      element.draggable = false;
      element.style.userSelect = 'none';
      element.style.webkitUserSelect = 'none';
      element.style.position = 'absolute';

      // Mouse events
      element.addEventListener('mousedown', handleStart);
      
      // Touch events
      element.addEventListener('touchstart', handleStart, { passive: false });
    });

    // Global event listeners
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleEnd);
    document.addEventListener('touchmove', handleMove, { passive: false });
    document.addEventListener('touchend', handleEnd);
    document.addEventListener('touchcancel', handleEnd);
  }

  function getEventCoordinates(e) {
    if (e.type.includes('touch')) {
      return {
        clientX: e.touches[0]?.clientX || e.changedTouches[0]?.clientX,
        clientY: e.touches[0]?.clientY || e.changedTouches[0]?.clientY
      };
    }
    return { clientX: e.clientX, clientY: e.clientY };
  }

  function handleStart(e) {
    e.preventDefault();
    
    isDragging = true;
    currentElement = e.currentTarget;
    
    const coords = getEventCoordinates(e);
    const rect = currentElement.getBoundingClientRect();
    
    startX = coords.clientX;
    startY = coords.clientY;
    initialX = rect.left;
    initialY = rect.top;

    // Add dragging class for visual feedback
    currentElement.classList.add('dragging');
  }

  function handleMove(e) {
    if (!isDragging || !currentElement) return;
    
    e.preventDefault();
    
    const coords = getEventCoordinates(e);
    const deltaX = coords.clientX - startX;
    const deltaY = coords.clientY - startY;
    
    const newX = initialX + deltaX;
    const newY = initialY + deltaY;
    
    currentElement.style.left = newX + 'px';
    currentElement.style.top = newY + 'px';
  }

  function handleEnd(e) {
    if (!isDragging || !currentElement) return;
    
    isDragging = false;
    
    // Remove dragging class
    currentElement.classList.remove('dragging');
    
    currentElement = null;
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeDraggable);
  } else {
    initializeDraggable();
  }

  // Re-initialize when new elements are added
  window.reinitializeDraggable = initializeDraggable;
})(); 