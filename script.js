/* ============================================================
   SERENITY – script.js
   Form validation, price display, Firebase booking submission
   ============================================================ */

// ── NAVBAR ──────────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Close menu when any link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset;
  sections.forEach(sec => {
    const top    = sec.offsetTop - 90;
    const height = sec.offsetHeight;
    const id     = sec.getAttribute('id');
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach(a => a.classList.remove('active'));
      const match = document.querySelector(`.nav-link[href="#${id}"]`);
      if (match) match.classList.add('active');
    }
  });
});

// ── PRICING MAP ──────────────────────────────────────────────
const PRICES = {
  'Individual Therapy'       : '₹1,000',
  'Couple Therapy'           : '₹1,000',
  'Family Therapy'           : '₹1,500',
  'Group Therapy'            : '₹1,500',
  'Stress & Anxiety'         : '₹1,000',
  'Pre-Marital Counselling'  : '₹1,000',
};

// ── THERAPY TYPE DROPDOWN ────────────────────────────────────
const therapySelect  = document.getElementById('therapyType');
const priceDisplay   = document.getElementById('priceDisplay');
const priceAmount    = document.getElementById('priceAmount');

if (therapySelect && priceDisplay && priceAmount) {
  therapySelect.addEventListener('change', () => {
    const selected = therapySelect.value;
    if (selected && PRICES[selected]) {
      priceAmount.textContent = PRICES[selected] + ' / session';
      priceDisplay.style.display = 'flex';
    } else {
      priceDisplay.style.display = 'none';
    }
  });
}

// ── FORM VALIDATION HELPERS ──────────────────────────────────
function setError(fieldId, errorId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.add('invalid');
  if (error) error.textContent = message;
  return false;
}

function clearError(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(errorId);
  field.classList.remove('invalid');
  if (error) error.textContent = '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateForm() {
  let valid = true;

  const name     = document.getElementById('clientName').value.trim();
  const email    = document.getElementById('clientEmail').value.trim();
  const therapy  = document.getElementById('therapyType').value;
  const date     = document.getElementById('preferredDate').value;
  const time     = document.getElementById('preferredTime').value;

  // Clear previous errors
  ['clientName','clientEmail','therapyType','preferredDate','preferredTime'].forEach((id, i) => {
    const errorIds = ['nameError','emailError','therapyError','dateError','timeError'];
    clearError(id, errorIds[i]);
  });

  if (!name) {
    valid = setError('clientName', 'nameError', 'Please enter your full name.');
  }
  if (!email) {
    valid = setError('clientEmail', 'emailError', 'Please enter your email address.') && valid;
  } else if (!isValidEmail(email)) {
    valid = setError('clientEmail', 'emailError', 'Please enter a valid email address.') && valid;
  }
  if (!therapy) {
    valid = setError('therapyType', 'therapyError', 'Please select a therapy type.') && valid;
  }
  if (!date) {
    valid = setError('preferredDate', 'dateError', 'Please choose a preferred date.') && valid;
  } else {
    const today    = new Date(); today.setHours(0,0,0,0);
    const chosen   = new Date(date);
    if (chosen < today) {
      valid = setError('preferredDate', 'dateError', 'Please select a future date.') && valid;
    }
  }
  if (!time) {
    valid = setError('preferredTime', 'timeError', 'Please choose a preferred time.') && valid;
  }

  return valid;
}

// ── FORM SUBMISSION ──────────────────────────────────────────
const bookingForm = document.getElementById('bookingForm');
const submitBtn   = document.getElementById('submitBtn');
const btnText     = document.getElementById('btnText');
const btnSpinner  = document.getElementById('btnSpinner');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');

if (bookingForm) {
  bookingForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    formSuccess.style.display = 'none';
    formError.style.display   = 'none';

    if (!validateForm()) return;

    // Collect form data
    const bookingData = {
      name       : document.getElementById('clientName').value.trim(),
      email      : document.getElementById('clientEmail').value.trim(),
      phone      : document.getElementById('clientPhone').value.trim(),
      therapyType: document.getElementById('therapyType').value,
      price      : PRICES[document.getElementById('therapyType').value] || 'N/A',
      date       : document.getElementById('preferredDate').value,
      time       : document.getElementById('preferredTime').value,
      message    : document.getElementById('clientMessage').value.trim(),
      submittedAt: new Date().toISOString(),
    };

    // Show loading state
    submitBtn.disabled  = true;
    btnText.style.display   = 'none';
    btnSpinner.style.display = 'inline-block';

    try {
      // ── OPTION A: Save to Firestore ──────────────────────────
      // Requires firebase-config.js to be configured with valid Firebase keys.
      if (typeof db !== 'undefined') {
        const { collection, addDoc } = await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
        await addDoc(collection(db, 'bookings'), bookingData);
      }

      // ── OPTION B: Call Firebase Cloud Function (sends email) ─
      // TODO: Replace the URL below with your deployed Firebase Function endpoint.
      // Example: https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/sendBookingEmail
      const FUNCTION_URL = window.FIREBASE_FUNCTION_URL || '';

      if (FUNCTION_URL) {
        const response = await fetch(FUNCTION_URL, {
          method : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body   : JSON.stringify(bookingData),
        });
        if (!response.ok) throw new Error('Function returned error ' + response.status);
      }

      // ── Fallback: mailto link (works without Firebase) ───────
      if (!FUNCTION_URL && typeof db === 'undefined') {
        const subject = encodeURIComponent(`New Appointment Request – ${bookingData.name}`);
        const body    = encodeURIComponent(
          `Name: ${bookingData.name}\n` +
          `Email: ${bookingData.email}\n` +
          `Phone: ${bookingData.phone}\n` +
          `Therapy: ${bookingData.therapyType}\n` +
          `Fee: ${bookingData.price}\n` +
          `Date: ${bookingData.date}\n` +
          `Time: ${bookingData.time}\n\n` +
          `Notes:\n${bookingData.message}`
        );
        window.location.href = `mailto:athirajagadeeswaran@gmail.com?subject=${subject}&body=${body}`;
      }

      // Success UI
      formSuccess.style.display = 'block';
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      bookingForm.reset();
      priceDisplay.style.display = 'none';

    } catch (err) {
      console.error('Booking submission error:', err);
      formError.style.display = 'block';
    } finally {
      submitBtn.disabled       = false;
      btnText.style.display    = 'inline';
      btnSpinner.style.display = 'none';
    }
  });
}

// ── ANIMATE CARDS ON SCROLL (Intersection Observer) ─────────
const cards = document.querySelectorAll('.service-card, .contact-card');
const cardObserver = new IntersectionObserver(
  (entries) => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity   = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  }),
  { threshold: 0.12 }
);

cards.forEach(card => {
  card.style.opacity   = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)';
  cardObserver.observe(card);
});

// ── SET MIN DATE for date picker to today ────────────────────
const dateInput = document.getElementById('preferredDate');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
