// Responsive menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Prevent form submission (demo only)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Thank you for reaching out! (Demo only)');
});

// Fade-in on scroll for story-scroll-segment
function revealStorySegments() {
  const segments = document.querySelectorAll('.story-scroll-segment');
  const windowHeight = window.innerHeight;
  segments.forEach(seg => {
    const rect = seg.getBoundingClientRect();
    if (rect.top < windowHeight - 60) {
      seg.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', revealStorySegments);
window.addEventListener('DOMContentLoaded', revealStorySegments); 