/* shared-nav.js — injects consistent nav + mobile menu into every page */

const NAV_HTML = `
<nav id="main-nav" class="nav">
  <div class="container">
    <div class="nav-inner">

      <a href="/index.html" class="nav-logo">
        <img src="/assets/images/logo.png" alt="Valluvam" class="nav-logo-img" />
        <span class="nav-logo-text">
          Valluvam
          <em>Tamil Empowerment &amp; Solidarity</em>
        </span>
      </a>

      <ul class="nav-links">
        <li><a href="/about.html">About</a></li>

        <li class="nav-item">
          <a href="/programs.html">Programs</a>
          <div class="nav-dropdown">
            <a href="/pages/kudil-mempadu.html">Kudil Mempadu</a>
            <a href="/pages/kumaran-kudil.html">Kumaran Kudil</a>
            <a href="/pages/ara-vali.html">Ara-Vali</a>
            <a href="/pages/malarum-mangaiyar.html">Malarum Mangaiyar</a>
          </div>
        </li>

        <li class="nav-item">
          <a href="/communities.html">Communities</a>
          <div class="nav-dropdown">
            <a href="/pages/puthur-kathiraveli.html">Puthur-Kathiraveli</a>
            <a href="/pages/karungkali-cholai.html">Karungkali Cholai</a>
            <a href="/pages/kallaripu-verukal.html">Kallaripu-Verukal</a>
            <a href="/pages/medan.html">Medan</a>
            <a href="/pages/bangkok.html">Bangkok</a>
            <a href="/pages/kuala-lumpur.html">Kuala Lumpur</a>
          </div>
        </li>

        <li><a href="/activities.html">Activities</a></li>
        <li><a href="/volunteer.html">Volunteer</a></li>
        <li><a href="/collaboration.html">Collaboration</a></li>
      </ul>

      <a href="/support.html#donate" class="nav-cta">Donate</a>

      <button id="hamburger" class="nav-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</nav>

<div id="mobile-menu" class="nav-mobile">
  <ul>
    <li><a href="/about.html">About</a></li>
    <li>
      <a href="/programs.html">Programs</a>
      <div class="sub-links">
        <a href="/pages/kudil-mempadu.html">Kudil Mempadu</a>
        <a href="/pages/kumaran-kudil.html">Kumaran Kudil</a>
        <a href="/pages/ara-vali.html">Ara-Vali</a>
        <a href="/pages/malarum-mangaiyar.html">Malarum Mangaiyar</a>
      </div>
    </li>
    <li>
      <a href="/communities.html">Communities</a>
      <div class="sub-links">
        <a href="/pages/puthur-kathiraveli.html">Puthur-Kathiraveli</a>
        <a href="/pages/karungkali-cholai.html">Karungkali Cholai</a>
        <a href="/pages/kallaripu-verukal.html">Kallaripu-Verukal</a>
        <a href="/pages/medan.html">Medan</a>
        <a href="/pages/bangkok.html">Bangkok</a>
        <a href="/pages/kuala-lumpur.html">Kuala Lumpur</a>
      </div>
    </li>
    <li><a href="/activities.html">Activities</a></li>
    <li><a href="/volunteer.html">Volunteer</a></li>
    <li><a href="/collaboration.html">Collaboration</a></li>
    <li><a href="/support.html">Support Us</a></li>
  </ul>
  <a href="/support.html#donate" class="mobile-cta">Donate Now</a>
</div>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <a href="/index.html" class="footer-logo-wrap">
          <img src="/assets/images/logo.png" alt="Valluvam" class="footer-logo-img" />
          <span class="footer-logo-name">Valluvam</span>
        </a>
        <p>A Canadian non-profit working to uplift Tamil communities in Sri Lanka through housing, children's welfare, and women's empowerment.</p>
        <p class="footer-tagline">Tamil Empowerment. Tamil Solidarity.</p>
        <div class="footer-social">
          <a href="https://www.instagram.com/valluvam" class="social-icon" aria-label="Instagram" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
          </a>
          <a href="https://www.facebook.com/valluvam" class="social-icon" aria-label="Facebook" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="https://www.youtube.com/@valluvam" class="social-icon" aria-label="YouTube" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" style="fill:var(--maroon-900)"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-col">
        <h5>Programs</h5>
        <ul>
          <li><a href="/pages/kudil-mempadu.html">Kudil Mempadu</a></li>
          <li><a href="/pages/kumaran-kudil.html">Kumaran Kudil</a></li>
          <li><a href="/pages/ara-vali.html">Ara-Vali</a></li>
          <li><a href="/pages/malarum-mangaiyar.html">Malarum Mangaiyar</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Communities</h5>
        <ul>
          <li><a href="/pages/puthur-kathiraveli.html">Puthur-Kathiraveli</a></li>
          <li><a href="/pages/karungkali-cholai.html">Karungkali Cholai</a></li>
          <li><a href="/pages/kallaripu-verukal.html">Kallaripu-Verukal</a></li>
          <li><a href="/pages/medan.html">Medan</a></li>
          <li><a href="/pages/bangkok.html">Bangkok</a></li>
          <li><a href="/pages/kuala-lumpur.html">Kuala Lumpur</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h5>Get Involved</h5>
        <ul>
          <li><a href="/support.html#donate">Donate</a></li>
          <li><a href="/volunteer.html">Volunteer</a></li>
          <li><a href="/collaboration.html">Collaborate</a></li>
          <li><a href="/support.html#other-ways">Thrift Store</a></li>
          <li><a href="mailto:info@valluvam.ca">Contact Us</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2024 Valluvam. Registered non-profit, Canada.</span>
      <span>Registered Charity No. [ADD YOUR NUMBER]</span>
    </div>
  </div>
</footer>
`;

document.addEventListener('DOMContentLoaded', () => {
  // Inject nav + footer
  document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
  document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);

  // Sticky nav
  const nav = document.getElementById('main-nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active link
  const path = window.location.pathname;
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    if (link.getAttribute('href') && path.endsWith(link.getAttribute('href').replace('/', ''))) {
      link.classList.add('active');
    }
  });

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
