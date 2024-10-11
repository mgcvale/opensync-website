const blurs = document.getElementsByClassName('blur');

let mouseX = 0;
let mouseY = 0;

const blurPositions = Array.from(blurs).map(() => ({
  currentX: 0,
  currentY: 0
}));

// linear interpolation function for smoother animation
function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

document.addEventListener('mousemove', (e) => {
  mouseX = e.pageX;
  mouseY = e.pageY;
});

function updateBlurs() {
  Array.from(blurs).forEach((element, index) => {
    const rect = element.parentElement.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    
    // Calculate target positions
    const targetX = mouseX - (rect.left + scrollX);
    const targetY = mouseY - (rect.top + scrollY);
    
    // Smoothly interpolate to target position
    // Adjust the factor (0.1) to control the smoothing amount
    // Lower = smoother but more delay, Higher = more responsive but less smooth
    blurPositions[index].currentX = lerp(blurPositions[index].currentX, targetX, 0.2);
    blurPositions[index].currentY = lerp(blurPositions[index].currentY, targetY, 0.2);
    
    // Apply the smoothed position
    element.style.left = `${blurPositions[index].currentX}px`;
    element.style.top = `${blurPositions[index].currentY}px`;
  });
  
  requestAnimationFrame(updateBlurs);
}

requestAnimationFrame(updateBlurs);