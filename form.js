// ── EMAILJS CONFIG ─────────────────────────────────────────────
// Replace these three values with your own from emailjs.com
const EMAILJS_SERVICE_ID  = "service_oqokmd6";
const EMAILJS_TEMPLATE_ID = "template_m4aya0h";
// Public key is already set in index.html

// ── Scroll spy ─────────────────────────────────────────────────
const navLinks = document.querySelectorAll('.nav-link');
const panels   = document.querySelectorAll('.panel');

navLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.getElementById(link.dataset.target);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

function updateActiveNav() {
  let current = panels[0].id;
  panels.forEach(function(panel) {
    if (panel.offsetTop <= window.scrollY + 130) current = panel.id;
  });
  navLinks.forEach(function(link) {
    link.classList.toggle('active', link.dataset.target === current);
  });
}
window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ── Progress bar ───────────────────────────────────────────────
function updateProgress() {
  const all = document.querySelectorAll('#appForm input:not([type=checkbox]), #appForm select, #appForm textarea');
  let filled = 0;
  all.forEach(function(el) { if (el.value.trim()) filled++; });
  const pct = all.length ? Math.round((filled / all.length) * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressPct').textContent = pct + '%';

  panels.forEach(function(panel) {
    const req = panel.querySelectorAll('[required]');
    let done = req.length > 0;
    req.forEach(function(el) {
      if (el.type === 'checkbox' && !el.checked) done = false;
      else if (el.type !== 'checkbox' && !el.value.trim()) done = false;
    });
    const link = document.querySelector('.nav-link[data-target="' + panel.id + '"]');
    if (link) link.classList.toggle('done', done);
  });
}
document.addEventListener('input', updateProgress);
document.addEventListener('change', updateProgress);
updateProgress();

// ── SSN formatter ──────────────────────────────────────────────
function formatSSN(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 9);
  if (val.length > 5) val = val.slice(0,3) + '-' + val.slice(3,5) + '-' + val.slice(5);
  else if (val.length > 3) val = val.slice(0,3) + '-' + val.slice(3);
  input.value = val;
}

// ── Validation ─────────────────────────────────────────────────
function validateForm() {
  const required = document.querySelectorAll('#appForm [required]');
  let valid = true, first = null;
  required.forEach(function(el) {
    el.classList.remove('invalid');
    const empty = el.type === 'checkbox' ? !el.checked : !el.value.trim();
    if (empty) {
      el.classList.add('invalid');
      valid = false;
      if (!first) first = el;
    }
  });
  if (!valid && first) {
    first.closest('.panel').scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(function() { first.focus(); }, 400);
  }
  return valid;
}

document.addEventListener('input', function(e) {
  if (e.target.classList.contains('invalid')) e.target.classList.remove('invalid');
});

// ── Collect form data ──────────────────────────────────────────
function collectFormData() {
  const days = [];
  document.querySelectorAll('input[name="daysAvailable"]:checked').forEach(function(cb) {
    days.push(cb.value);
  });

  return {
    // Personal
    firstName:       document.getElementById('firstName').value,
    lastName:        document.getElementById('lastName').value,
    email:           document.getElementById('email').value,
    phone:           document.getElementById('phone').value,
    address:         document.getElementById('address').value,
    city:            document.getElementById('city').value,
    state:           document.getElementById('state').value,
    zip:             document.getElementById('zip').value,
    position:        document.getElementById('position').value,
    employmentType:  document.getElementById('employmentType').value,
    // Identity
    dlNumber:        document.getElementById('dlNumber').value,
    dlState:         document.getElementById('dlState').value,
    ssn:             '*** (provided, kept confidential)',
    // Experience
    employer1:       document.getElementById('employer1').value,
    jobTitle1:       document.getElementById('jobTitle1').value,
    startDate1:      document.getElementById('startDate1').value,
    endDate1:        document.getElementById('endDate1').value || 'Present',
    responsibilities1: document.getElementById('responsibilities1').value,
    reasonLeft1:     document.getElementById('reasonLeft1').value,
    employer2:       document.getElementById('employer2').value,
    jobTitle2:       document.getElementById('jobTitle2').value,
    startDate2:      document.getElementById('startDate2').value,
    endDate2:        document.getElementById('endDate2').value,
    responsibilities2: document.getElementById('responsibilities2').value,
    // Education
    institution:     document.getElementById('institution').value,
    degree:          document.getElementById('degree').value,
    fieldOfStudy:    document.getElementById('fieldOfStudy').value,
    gradYear:        document.getElementById('gradYear').value,
    certification:   document.getElementById('certification').value,
    licenseNumber:   document.getElementById('licenseNumber').value,
    licenseExpiry:   document.getElementById('licenseExpiry').value,
    // Availability
    startDate:       document.getElementById('startDate').value,
    shift:           document.getElementById('shift').value,
    daysAvailable:   days.join(', ') || 'Not specified',
    availabilityNotes: document.getElementById('availabilityNotes').value,
    // References
    ref1Name:        document.getElementById('ref1Name').value,
    ref1Relation:    document.getElementById('ref1Relation').value,
    ref1Phone:       document.getElementById('ref1Phone').value,
    ref1Email:       document.getElementById('ref1Email').value,
    ref2Name:        document.getElementById('ref2Name').value,
    ref2Relation:    document.getElementById('ref2Relation').value,
    ref2Phone:       document.getElementById('ref2Phone').value,
    ref2Email:       document.getElementById('ref2Email').value,
    // Documents
    resumeLink:      document.getElementById('resumeLink').value,
    coverLink:       document.getElementById('coverLink').value,
  };
}

// ── Submit ──────────────────────────────────────────────────────
document.getElementById('appForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  if (!validateForm()) return;

  const btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Submitting…';
  hideError();

  const data = collectFormData();

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
    document.getElementById('appForm').style.display = 'none';
    document.getElementById('successScreen').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (err) {
    console.error('EmailJS error:', err);
    showError('Submission failed. Please check your connection or try again later.');
    btn.disabled = false;
    btn.textContent = 'Submit Application ✓';
  }
});

function showError(msg) {
  const el = document.getElementById('formError');
  el.textContent = msg;
  el.style.display = 'block';
}
function hideError() {
  document.getElementById('formError').style.display = 'none';
}
