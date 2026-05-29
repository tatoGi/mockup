/* ============================
   TBILISI STYLE 21 — MOCKUP JS
   Demonstrates UX fixes from documents
============================ */

document.addEventListener('DOMContentLoaded', () => {
  initCountdown();
  initDrawer();
  initLineupFilter();
  initFAQ();
  initBuyModal();
  initFadeIn();
  initHeaderScroll();
  initBannerClose();
  initNewsletter();
});

/* --- 1. Countdown timer (HERO improvement) --- */
function initCountdown() {
  const target = new Date('2027-08-27T18:00:00+04:00').getTime();
  const $days = document.querySelector('[data-cd="days"]');
  const $hours = document.querySelector('[data-cd="hours"]');
  const $mins = document.querySelector('[data-cd="mins"]');
  const $secs = document.querySelector('[data-cd="secs"]');
  if (!$days) return;

  const update = () => {
    const diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    $days.textContent = String(d).padStart(2, '0');
    $hours.textContent = String(h).padStart(2, '0');
    $mins.textContent = String(m).padStart(2, '0');
    $secs.textContent = String(s).padStart(2, '0');
  };
  update();
  setInterval(update, 1000);
}

/* --- 2. Drawer menu (grouped navigation) --- */
function initDrawer() {
  const burger = document.querySelector('[data-burger]');
  const drawer = document.querySelector('[data-drawer]');
  const backdrop = document.querySelector('[data-drawer-backdrop]');
  const close = document.querySelector('[data-drawer-close]');
  if (!burger || !drawer) return;

  const open = () => {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const shut = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  };
  burger.addEventListener('click', open);
  close.addEventListener('click', shut);
  backdrop.addEventListener('click', shut);
  drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', shut));
}

/* --- 3. Lineup day filter (replaces static poster) --- */
function initLineupFilter() {
  const filters = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('[data-day]');
  if (!filters.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      filters.forEach(f => f.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        const show = filter === 'all' || card.dataset.day === filter;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

/* --- 4. FAQ accordion (missing feature added) --- */
function initFAQ() {
  document.querySelectorAll('[data-faq]').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
      item.classList.toggle('open');
    });
  });
}

/* --- 5. Buy Ticket Modal with all UX fixes --- */
function initBuyModal() {
  const triggers = document.querySelectorAll('[data-buy]');
  const modal = document.querySelector('[data-modal]');
  const close = document.querySelector('[data-modal-close]');
  const form = document.querySelector('[data-buy-form]');
  if (!modal || !form) return;

  // Per-ticket data attached to trigger
  const $ticketName = modal.querySelector('[data-ticket-name]');
  const $ticketDate = modal.querySelector('[data-ticket-date]');
  const $ticketPrice = modal.querySelector('[data-ticket-price]');
  const $ticketTotal = modal.querySelector('[data-ticket-total]');

  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const { ticketName, ticketDate, ticketPrice } = btn.dataset;
      $ticketName.textContent = ticketName;
      $ticketDate.textContent = ticketDate;
      $ticketPrice.textContent = ticketPrice + ' ₾';
      $ticketTotal.textContent = ticketPrice + ' ₾';
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  const shut = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    form.reset();
    clearValidation();
  };
  close.addEventListener('click', shut);
  modal.addEventListener('click', e => { if (e.target === modal) shut(); });

  // FIX: Latin-only input WITH visible hint (vs silent filter in original)
  const $name = form.querySelector('[name="name"]');
  const $surname = form.querySelector('[name="surname"]');
  [$name, $surname].forEach(input => {
    input.addEventListener('input', () => {
      const cleaned = input.value.replace(/[^a-zA-Z\s]/g, '');
      const wasFiltered = cleaned !== input.value;
      input.value = cleaned;
      const hint = input.parentElement.querySelector('.form-hint');
      if (wasFiltered) {
        hint.textContent = '⚠ Latin letters only — write your name as on ID';
        hint.classList.add('error');
        input.classList.add('error');
        setTimeout(() => {
          hint.textContent = hint.dataset.default;
          hint.classList.remove('error');
          input.classList.remove('error');
        }, 2200);
      }
    });
  });

  // FIX: Personal Number — digits only + 11-digit length check
  const $personalNumber = form.querySelector('[name="personalNumber"]');
  $personalNumber.addEventListener('input', () => {
    $personalNumber.value = $personalNumber.value.replace(/\D/g, '').slice(0, 11);
    const hint = $personalNumber.parentElement.querySelector('.form-hint');
    if ($personalNumber.value.length === 11) {
      hint.textContent = '✓ Valid format';
      hint.classList.remove('error');
      hint.classList.add('success');
      $personalNumber.classList.remove('error');
      $personalNumber.classList.add('success');
    } else if ($personalNumber.value.length > 0) {
      hint.textContent = `${$personalNumber.value.length}/11 digits`;
      hint.classList.remove('success', 'error');
      $personalNumber.classList.remove('success', 'error');
    } else {
      hint.textContent = hint.dataset.default;
      hint.classList.remove('success', 'error');
    }
  });

  // FIX: Email — typo detection (gmial.com → gmail.com)
  const $email = form.querySelector('[name="email"]');
  $email.addEventListener('blur', () => {
    const value = $email.value.trim().toLowerCase();
    const hint = $email.parentElement.querySelector('.form-hint');
    const typos = {
      'gmial.com': 'gmail.com',
      'gmal.com': 'gmail.com',
      'gnail.com': 'gmail.com',
      'yhoo.com': 'yahoo.com',
      'hotnail.com': 'hotmail.com',
    };
    const domain = value.split('@')[1];
    if (domain && typos[domain]) {
      const corrected = value.replace(domain, typos[domain]);
      hint.innerHTML = `Did you mean <a href="#" data-fix="${corrected}" style="color:var(--color-accent)">${corrected}</a>?`;
      hint.classList.add('error');
      hint.querySelector('[data-fix]').addEventListener('click', e => {
        e.preventDefault();
        $email.value = e.target.dataset.fix;
        hint.textContent = hint.dataset.default;
        hint.classList.remove('error');
      });
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      hint.textContent = '✓ Looks good';
      hint.classList.remove('error');
      hint.classList.add('success');
      $email.classList.remove('error');
      $email.classList.add('success');
    } else if (value.length > 0) {
      hint.textContent = '⚠ Please enter a valid email';
      hint.classList.add('error');
      $email.classList.add('error');
    }
  });

  function clearValidation() {
    form.querySelectorAll('.form-input').forEach(i => i.classList.remove('error', 'success'));
    form.querySelectorAll('.form-hint').forEach(h => {
      h.textContent = h.dataset.default || '';
      h.classList.remove('error', 'success');
    });
  }

  // FIX: Real submit with proper loading state + same-tab redirect simulation
  form.addEventListener('submit', async e => {
    e.preventDefault();

    if ($personalNumber.value.length !== 11) {
      $personalNumber.classList.add('error');
      const hint = $personalNumber.parentElement.querySelector('.form-hint');
      hint.textContent = '⚠ ID must be exactly 11 digits';
      hint.classList.add('error');
      $personalNumber.focus();
      return;
    }
    if (!form.terms.checked) {
      showToast('Please accept the Terms & Conditions');
      return;
    }

    const $btn = form.querySelector('[data-submit]');
    const $btnText = $btn.querySelector('[data-submit-text]');
    const original = $btnText.textContent;
    $btn.disabled = true;

    // Multi-stage feedback (instead of generic "in progress...")
    const stages = ['Checking your details…', 'Reserving your ticket…', 'Redirecting to payment…'];
    for (let i = 0; i < stages.length; i++) {
      $btnText.textContent = stages[i];
      await sleep(700);
    }

    // Demo: show success toast (real version would redirect SAME tab to Quipu)
    showToast('✓ In production: redirecting to secure payment (same tab)');
    $btn.disabled = false;
    $btnText.textContent = original;
    setTimeout(shut, 1800);
  });
}

function showToast(msg) {
  let t = document.querySelector('.toast');
  if (!t) {
    t = document.createElement('div');
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._tm);
  t._tm = setTimeout(() => t.classList.remove('show'), 3500);
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

/* --- 6. Fade-in on scroll --- */
function initFadeIn() {
  if (!('IntersectionObserver' in window)) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));
}

/* --- 7. Header background on scroll --- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  const update = () => {
    header.classList.toggle('transparent', window.scrollY < 60);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

/* --- 8. Banner dismiss --- */
function initBannerClose() {
  const banner = document.querySelector('[data-banner]');
  const close = document.querySelector('[data-banner-close]');
  if (!banner || !close) return;
  close.addEventListener('click', () => banner.style.display = 'none');
}

/* --- 9. Newsletter mock --- */
function initNewsletter() {
  const form = document.querySelector('[data-newsletter]');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value)) {
      showToast('Please enter a valid email');
      return;
    }
    showToast('✓ Subscribed! Watch your inbox for lineup updates');
    input.value = '';
  });
}
