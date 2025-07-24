(function() {
  var btn = document.getElementById('theme-toggle');
  if(!btn) return;
  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }
  btn.addEventListener('click', function() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    var next = current === 'light' ? 'dark' : 'light';
    apply(next);
  });
  var stored = localStorage.getItem('theme');
  if(stored) apply(stored);
})();
