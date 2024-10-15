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
    
    const targetX = mouseX - (rect.left + scrollX);
    const targetY = mouseY - (rect.top + scrollY);
    
    blurPositions[index].currentX = lerp(blurPositions[index].currentX, targetX, 0.2);
    blurPositions[index].currentY = lerp(blurPositions[index].currentY, targetY, 0.2);
    
    element.style.left = `${blurPositions[index].currentX}px`;
    element.style.top = `${blurPositions[index].currentY}px`;
  });
  
  requestAnimationFrame(updateBlurs);
}

if (window.innerWidth > 768) {
  requestAnimationFrame(updateBlurs);
  console.log("matched");
  // dont update blurs if it is a phone
}


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
      });
  });
});