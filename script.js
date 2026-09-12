/* =================================
   FAQ ACCORDION
================================= */

document.addEventListener('DOMContentLoaded', function () {

    document.documentElement.classList.add('js-animations');

    var preferredDate = document.getElementById('preferred-date');
    if (preferredDate) {
        var today = new Date();
        var localToday = [
            today.getFullYear(),
            String(today.getMonth() + 1).padStart(2, '0'),
            String(today.getDate()).padStart(2, '0')
        ].join('-');
        preferredDate.min = localToday;
    }

    document.querySelectorAll('.hero h1 .line').forEach(function (line, lineIndex) {
        var words = line.textContent.trim().split(/\s+/);
        line.textContent = '';
        words.forEach(function (word, index) {
            var wordSpan = document.createElement('span');
            var wordLabel = document.createElement('span');
            wordSpan.className = 'word';
            wordLabel.className = 'word-label';
            wordLabel.textContent = word;
            wordSpan.style.setProperty('--word-index', index + (lineIndex * words.length));
            wordSpan.appendChild(wordLabel);
            line.appendChild(wordSpan);
        });
    });

    var faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(function (item) {

        var question = item.querySelector('.faq-question');
        var answer = item.querySelector('.faq-answer');
        var toggle = item.querySelector('.faq-toggle');

        question.addEventListener('click', function () {

            var isOpen = item.classList.contains('open');

            // close every item first
            faqItems.forEach(function (other) {
                other.classList.remove('open');
                other.querySelector('.faq-answer').style.maxHeight = null;
                other.querySelector('.faq-toggle').textContent = '+';
            });

            // then reopen the clicked one, unless it was already open
            if (!isOpen) {
                item.classList.add('open');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                toggle.textContent = '–';
            }

        });

    });


    /* =================================
       SCROLL REVEAL
       Elements with class "reveal-up" fade
       and slide up into view as the user
       scrolls down the page.
    ================================= */

    var revealEls = document.querySelectorAll('.reveal-up');

    if ('IntersectionObserver' in window) {

        var revealObserver = new IntersectionObserver(function (entries, observer) {

            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -60px 0px'
        });

        revealEls.forEach(function (el) {
            revealObserver.observe(el);
        });

    } else {

        // fallback for very old browsers: just show everything
        revealEls.forEach(function (el) {
            el.classList.add('in-view');
        });

    }

    var sections = document.querySelectorAll('main > section');
    if ('IntersectionObserver' in window) {
        var sectionObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });
    } else {
        sections.forEach(function (section) {
            section.classList.add('section-in-view');
        });
    }

});

document.querySelectorAll('.work-card').forEach((card) => {
  const images = card.querySelectorAll('.work-visual img');
  let index = 0, intervalId;

  const showImage = (i) => images.forEach((img, n) => img.classList.toggle('is-active', n === i));

  card.addEventListener('mouseenter', () => {
    index = 0;
    intervalId = setInterval(() => {
      index = (index + 1) % images.length;
      showImage(index);
    }, 2000);
  });

  card.addEventListener('mouseleave', () => {
    clearInterval(intervalId);
    showImage(0);
  });
});
