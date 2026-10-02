(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero field depth drift: far, mid and near layers move at 3%, 7% and 12% of scroll distance.
  var hero = document.querySelector('.tv-hero--field');
  if (hero && !reduce) {
    var layers = [['.tv-field__far', 0.03], ['.tv-field__mid', 0.07], ['.tv-field__near', 0.12]]
      .map(function (l) { return [hero.querySelector(l[0]), l[1]]; })
      .filter(function (l) { return l[0]; });
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, hero.offsetHeight);
        layers.forEach(function (l) { l[0].style.transform = 'translateY(' + (-y * l[1]) + 'px)'; });
        ticking = false;
      });
    }, { passive: true });
  }

  // Demo: load the exported viewer only when asked, so the page itself stays light.
  var load = document.getElementById('demo-load');
  if (load) {
    load.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = '/demo/view1.html';
      frame.title = 'Interactive walkthrough demo';
      frame.allow = 'fullscreen; xr-spatial-tracking';
      var box = document.getElementById('demo-frame');
      box.textContent = '';
      box.appendChild(frame);
      frame.focus();
    });
  }
})();
