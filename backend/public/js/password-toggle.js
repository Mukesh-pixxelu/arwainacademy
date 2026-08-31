(function () {
  document.querySelectorAll('[data-toggle-password]').forEach(function (button) {
    function toggle(event) {
      event.preventDefault();
      event.stopPropagation();

      var wrap = button.closest('.password-wrap');
      var input = wrap ? wrap.querySelector('input') : null;
      if (!input) return;

      var show = input.getAttribute('type') === 'password';
      input.setAttribute('type', show ? 'text' : 'password');
      input.type = show ? 'text' : 'password';
      button.classList.toggle('is-on', show);
      button.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
      button.setAttribute('aria-pressed', show ? 'true' : 'false');
    }

    button.addEventListener('mousedown', function (event) {
      event.preventDefault();
    });
    button.addEventListener('click', toggle);
  });
})();
