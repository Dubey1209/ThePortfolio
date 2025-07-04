// Theme toggle logic for day/dark mode
const toggleBtn = document.getElementById('theme-toggle');
const icon = document.getElementById('theme-toggle-icon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(isDark) {
  document.body.classList.toggle('dark-theme', isDark);
  icon.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Load theme on page load
(function() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && prefersDark)) {
    setTheme(true);
  } else {
    setTheme(false);
  }
})();

toggleBtn.addEventListener('click', () => {
  const isDark = !document.body.classList.contains('dark-theme');
  setTheme(isDark);
}); 