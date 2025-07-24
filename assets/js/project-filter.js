document.addEventListener('DOMContentLoaded', function() {
  var buttons = document.querySelectorAll('#project-filters button');
  var items = document.querySelectorAll('#project-list li');
  buttons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var filter = this.getAttribute('data-filter');
      items.forEach(function(li) {
        if(filter === 'all' || li.getAttribute('data-tags').includes(filter)) {
          li.style.display = '';
        } else {
          li.style.display = 'none';
        }
      });
    });
  });
});
