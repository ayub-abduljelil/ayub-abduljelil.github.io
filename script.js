  const roles = ["Ayub", "a Web Developer", "a Designer", "a Video Editor"];
  const textElement = document.querySelector(".textaa");
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeEffect() {
    const current = roles[roleIndex];
    
    if (!isDeleting) {
      textElement.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;

      if (charIndex === current.length) {
        // full word displayed, short pause
        typingSpeed = 1500;
        isDeleting = true;
      }
    } else {
      textElement.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
      }
    }

    setTimeout(typeEffect, typingSpeed);
  }

  typeEffect();





  document.addEventListener('DOMContentLoaded', function () {
    // Get all cards
    var cards = document.querySelectorAll('.progrid .image');

    // Helper: create overlay HTML for one card
    function makeOverlay(title, desc, tagsArray, github, live) {
      var overlay = document.createElement('div');
      overlay.className = 'proj-overlay';

      // Title
      var t = document.createElement('div');
      t.className = 'proj-title';
      t.textContent = title;
      overlay.appendChild(t);

      // Description
      var d = document.createElement('div');
      d.className = 'proj-desc';
      d.textContent = desc;
      overlay.appendChild(d);

      // Tags
      var tagsWrap = document.createElement('div');
      tagsWrap.className = 'proj-tags';
      for (var i = 0; i < tagsArray.length; i++) {
        var s = document.createElement('span');
        s.className = 'proj-tag';
        s.textContent = tagsArray[i].trim();
        tagsWrap.appendChild(s);
      }
      overlay.appendChild(tagsWrap);

      // Links (optional)
      var linksWrap = document.createElement('div');
      linksWrap.className = 'proj-links';
      if (github) {
        var a1 = document.createElement('a');
        a1.className = 'proj-link';
        a1.href = github;
        a1.target = '_blank';
        a1.rel = 'noopener';
        a1.textContent = 'GitHub';
        linksWrap.appendChild(a1);
      }
      if (live) {
        var a2 = document.createElement('a');
        a2.className = 'proj-link';
        a2.href = live;
        a2.target = '_blank';
        a2.rel = 'noopener';
        a2.textContent = 'Live';
        linksWrap.appendChild(a2);
      }
      overlay.appendChild(linksWrap);

      return overlay;
    }

    // Helper: fallback title from filename (simple)
    function fallbackTitleFromSrc(src) {
      if (!src) return 'Project';
      var parts = src.split('/');
      var file = parts[parts.length - 1] || src;
      var name = file.replace(/\.[^/.]+$/, ''); // remove extension
      name = name.replace(/[_-]/g, ' ');        // replace underscores/dashes
      // Capitalize words:
      var words = name.split(' ');
      for (var i = 0; i < words.length; i++) {
        if (words[i].length > 0) {
          words[i] = words[i][0].toUpperCase() + words[i].slice(1);
        }
      }
      return words.join(' ');
    }

    // Loop cards and add overlays
    for (var i = 0; i < cards.length; i++) {
      (function() {
        var card = cards[i];

        // If overlay already exists, skip
        if (card.querySelector('.proj-overlay')) return;

        // Read data attributes, with fallbacks
        var title = card.getAttribute('data-title') || '';
        var desc  = card.getAttribute('data-desc') || '';
        var tags  = card.getAttribute('data-tags') || 'HTML,CSS,JS';
        var github = card.getAttribute('data-github') || '';
        var live   = card.getAttribute('data-live') || '';

        // If title or desc are empty, try to use image alt or filename
        var img = card.querySelector('img');
        var imgSrc = img ? img.getAttribute('src') : '';
        var imgAlt = img ? img.getAttribute('alt') : '';

        if (!title) {
          // prefer alt text, otherwise filename
          title = imgAlt || fallbackTitleFromSrc(imgSrc) || ('Project ' + (i+1));
        }
        if (!desc) {
          desc = 'A short preview of "' + title + '". Click to pin details.';
        }

        var tagsArray = tags.split(',');

        // Build overlay and append to card
        var overlay = makeOverlay(title, desc, tagsArray, github, live);
        card.appendChild(overlay);

        // Make card keyboard accessible
        if (!card.hasAttribute('tabindex')) {
          card.setAttribute('tabindex', '0');
        }

        // Click toggles "pinned" state
        card.addEventListener('click', function (event) {
          // If clicked a link inside overlay, do nothing (links open)
          if (event.target.closest('.proj-link')) {
            return;
          }
          var isPinned = card.classList.toggle('pinned');
          if (isPinned) {
            // close other pinned cards
            var others = document.querySelectorAll('.progrid .image.pinned');
            for (var j = 0; j < others.length; j++) {
              if (others[j] !== card) others[j].classList.remove('pinned');
            }
          }
        });

        // Keyboard: Enter or Space to toggle, Esc to unpin
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            card.click();
          } else if (e.key === 'Escape') {
            card.classList.remove('pinned');
          }
        });
      })();
    }

    // Close pinned if clicking outside any card
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.progrid .image')) {
        var pinned = document.querySelectorAll('.progrid .image.pinned');
        for (var k = 0; k < pinned.length; k++) pinned[k].classList.remove('pinned');
      }
    }, true);

  });