// Responsive menu toggle
const menuToggleOpen = document.getElementById('menuToggleOpen');
const menuToggleClose = document.getElementById('menuToggleClose');
const navLinks = document.getElementById('navLinks');

// Hamburger menu toggle (robust, accessible)
if (menuToggleOpen && navLinks) {
  menuToggleOpen.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuToggleOpen.setAttribute('aria-expanded', isOpen);
    if (menuToggleClose) menuToggleClose.setAttribute('aria-expanded', isOpen);
  });
  // Close menu when a nav link is clicked (on mobile)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 800 && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggleOpen.setAttribute('aria-expanded', 'false');
        if (menuToggleClose) menuToggleClose.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

// Prevent form submission (demo only)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
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

// Unique Section/Page Transition Effects
(function() {
  // Create overlay for page transitions
  let overlay = document.createElement('div');
  overlay.className = 'page-transition-overlay';
  document.body.appendChild(overlay);

  // Helper: get section from hash
  function getSectionFromHash(hash) {
    if (!hash) return null;
    return document.querySelector(hash);
  }

  // Animate section transitions for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const hash = this.getAttribute('href');
      if (!hash || hash === '#' || !document.querySelector(hash)) return;
      const targetSection = document.querySelector(hash);
      const currentSection = document.querySelector('.section:target') || document.querySelector('.section');
      if (!targetSection || targetSection === currentSection) return;
      e.preventDefault();
      // Animate out current
      if (currentSection) {
        currentSection.classList.add('transitioning-out');
        setTimeout(() => {
          currentSection.classList.remove('transitioning-out');
        }, 600);
      }
      // Animate in target
      setTimeout(() => {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        targetSection.classList.add('transitioning-in');
        setTimeout(() => {
          targetSection.classList.remove('transitioning-in');
        }, 800);
      }, 200);
    });
  });

  // Animate page transitions for .html links
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      overlay.classList.add('active');
      setTimeout(() => {
        window.location.href = href;
      }, 600);
    });
  });
})();

// Drawer overlay close for mobile nav
const drawerOverlay = document.getElementById('drawerOverlay');
if (drawerOverlay && navLinks && menuToggleOpen) {
  drawerOverlay.addEventListener('click', () => {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      menuToggleOpen.setAttribute('aria-expanded', 'false');
      if (menuToggleClose) menuToggleClose.setAttribute('aria-expanded', 'false');
    }
  });
}

// Smooth scroll for anchor links

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

// Fade in/out transition for section navigation

document.addEventListener('DOMContentLoaded', function() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll('section');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1 && document.querySelector(targetId)) {
        e.preventDefault();
        const targetSection = document.querySelector(targetId);
        const currentSection = Array.from(sections).find(sec => sec.getBoundingClientRect().top <= 80 && sec.getBoundingClientRect().bottom > 80);
        if (currentSection && currentSection !== targetSection) {
          currentSection.style.transition = 'opacity 0.4s';
          currentSection.style.opacity = 0;
          setTimeout(() => {
            window.location.hash = targetId;
            currentSection.style.opacity = '';
            sections.forEach(sec => sec.style.opacity = '');
            targetSection.style.opacity = 0;
            targetSection.style.transition = 'opacity 0.4s';
            setTimeout(() => {
              targetSection.style.opacity = 1;
              setTimeout(() => {
                targetSection.style.transition = '';
                targetSection.style.opacity = '';
              }, 400);
            }, 10);
          }, 400);
        } else {
          window.location.hash = targetId;
        }
      }
    });
  });
}); 