/* ===== JavaScript ראשי — באבא עוף ===== */

document.addEventListener('DOMContentLoaded', function () {

  /* ===== Scroll Reveal — IntersectionObserver ===== */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
  if (revealEls.length) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ===== תפריט המבורגר למובייל ===== */
  const hamburger = document.getElementById('hamburger-btn');
  const mainNav   = document.getElementById('main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.setAttribute('aria-label', isOpen ? 'סגור תפריט ניווט' : 'פתח תפריט ניווט');
    });

    mainNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mainNav.contains(e.target)) {
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ===== Header — הסתרה/הצגה חכמה בגלילה ===== */
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  let ticking = false;

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        const currentScroll = window.scrollY;
        if (currentScroll > lastScroll && currentScroll > 140) {
          header.style.transform = 'translateY(-100%)';
        } else {
          header.style.transform = 'translateY(0)';
        }
        /* הכהיית header בגלילה */
        if (currentScroll > 50) {
          header.style.background = 'rgba(17,17,17,0.98)';
        } else {
          header.style.background = 'rgba(17,17,17,0.95)';
        }
        lastScroll = currentScroll <= 0 ? 0 : currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ===== הדגשת קישור ניווט פעיל ===== */
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(function (s) { navObserver.observe(s); });

  /* ===== סינון תפריט לפי קטגוריה ===== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards  = document.querySelectorAll('.menu-card');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      menuCards.forEach(function (card, i) {
        const show = filter === 'all' || card.getAttribute('data-category') === filter;
        if (show) {
          card.classList.remove('hidden');
          /* אנימציית כניסה בהדרגה */
          card.style.animationDelay = (i % 6) * 0.07 + 's';
          card.style.animation = 'fadeUp 0.45s ease both';
          setTimeout(function () { card.style.animation = ''; }, 500);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ===== הגדרת תאריך מינימלי לטופס ===== */
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  /* ===== וולידציה של שדה בודד ===== */
  function validateField(input, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (!input.value.trim()) {
      input.classList.add('error');
      if (errorEl) errorEl.textContent = message;
      return false;
    }
    input.classList.remove('error');
    if (errorEl) errorEl.textContent = '';
    return true;
  }

  /* ===== טופס הזמנת מקום ===== */
  const form           = document.getElementById('reservation-form');
  const successMsg     = document.getElementById('form-success');
  const closeSuccessBtn = document.getElementById('close-success-btn');

  if (form) {
    /* ניקוי שגיאה בהקלדה */
    form.querySelectorAll('input, textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        this.classList.remove('error');
        const errorEl = document.getElementById(this.id + '-error');
        if (errorEl) errorEl.textContent = '';
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const firstName = document.getElementById('first-name');
      const lastName  = document.getElementById('last-name');
      const phone     = document.getElementById('phone');
      const guests    = document.getElementById('guests');
      const resDate   = document.getElementById('res-date');
      const resTime   = document.getElementById('res-time');
      const notes     = document.getElementById('notes');

      const valid = [
        validateField(firstName, 'first-name-error', 'יש למלא שם פרטי'),
        validateField(lastName,  'last-name-error',  'יש למלא שם משפחה'),
        validateField(phone,     'phone-error',      'יש למלא מספר טלפון'),
        validateField(guests,    'guests-error',     'יש למלא מספר סועדים'),
        validateField(resDate,   'date-error',       'יש לבחור תאריך'),
        validateField(resTime,   'time-error',       'יש לבחור שעה'),
      ].every(Boolean);

      if (!valid) {
        const firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
        return;
      }

      /* שמירה ב-localStorage */
      const reservation = {
        firstName:   firstName.value.trim(),
        lastName:    lastName.value.trim(),
        phone:       phone.value.trim(),
        guests:      guests.value,
        date:        resDate.value,
        time:        resTime.value,
        notes:       notes ? notes.value.trim() : '',
        submittedAt: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem('babaof_reservations') || '[]');
      existing.push(reservation);
      localStorage.setItem('babaof_reservations', JSON.stringify(existing));

      /* ===== שליחת הזמנה לווטסאפ של המנהל ===== */
      /* מספר הטלפון של המסעדה/מנהל — לשנות אם צריך */
      var managerPhone = '972547641182';

      /* עיצוב תאריך בעברית */
      var dateFormatted = resDate.value.split('-').reverse().join('/');

      /* הודעת WhatsApp מסודרת */
      var msg =
        '🍗 *הזמנת מקום חדשה — באבא עוף*\n\n' +
        '👤 *שם:* ' + firstName.value.trim() + ' ' + lastName.value.trim() + '\n' +
        '📞 *טלפון:* ' + phone.value.trim() + '\n' +
        '👥 *סועדים:* ' + guests.value + '\n' +
        '📅 *תאריך:* ' + dateFormatted + '\n' +
        '⏰ *שעה:* ' + resTime.value + '\n' +
        (notes && notes.value.trim() ? '📝 *הערות:* ' + notes.value.trim() + '\n' : '') +
        '\n✅ אשר את ההזמנה בהודעה חוזרת.';

      var waUrl = 'https://wa.me/' + managerPhone + '?text=' + encodeURIComponent(msg);

      /* פתיחת WhatsApp בחלון חדש */
      window.open(waUrl, '_blank');

      /* הצגת הצלחה */
      form.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', function () {
      if (successMsg) successMsg.style.display = 'none';
      if (form) {
        form.style.display = '';
        form.reset();
        form.querySelectorAll('.error').forEach(function (el) { el.classList.remove('error'); });
        form.querySelectorAll('.field-error').forEach(function (el) { el.textContent = ''; });
      }
    });
  }

  /* ===== אפקט hover על כרטיסי ערכים ===== */
  document.querySelectorAll('.value-card').forEach(function (card) {
    card.addEventListener('mouseenter', function () {
      this.querySelector('.value-icon').style.transform = 'scale(1.3) rotate(10deg)';
    });
    card.addEventListener('mouseleave', function () {
      this.querySelector('.value-icon').style.transform = '';
    });
  });

});
