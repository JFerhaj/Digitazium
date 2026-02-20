/* ===== DIGITAZIUM - ANIMATIONS & INTERACTIONS ===== */
document.addEventListener('DOMContentLoaded', () => {
  
  // ===== PRELOADER =====
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('hidden');
    // Trigger animations after preloader hides
    setTimeout(initScrollAnimations, 300);
  }, 1200);

  // ===== MOBILE NAV TOGGLE =====
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = mobileToggle.querySelector('i');
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileToggle.querySelector('i').classList.add('fa-bars');
        mobileToggle.querySelector('i').classList.remove('fa-times');
      });
    });
  }

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===== SCROLL ANIMATIONS (Intersection Observer) =====
  function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.animate');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Stop observing after animation triggers
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
    
    animateElements.forEach(el => observer.observe(el));
  }

  // ===== ANIMATED COUNTERS =====
  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (!counters.length) return;
    
    const animateCounter = (el) => {
      const target = +el.getAttribute('data-target');
      const duration = 2000; // ms
      const increment = target / (duration / 16); // ~60fps
      let current = 0;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          el.textContent = Math.floor(current) + (el.dataset.suffix || '');
          requestAnimationFrame(updateCounter);
        } else {
          el.textContent = target + (el.dataset.suffix || '');
        }
      };
      updateCounter();
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
  }

  // ===== FORM VALIDATION & SUBMISSION =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showFormMessage('Thank you! Your message has been sent. We\'ll be in touch within 24 hours.', 'success');
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
    
    function showFormMessage(text, type) {
      let messageEl = document.getElementById('formMessage');
      if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'formMessage';
        messageEl.style.marginTop = '20px';
        messageEl.style.padding = '15px';
        messageEl.style.borderRadius = '12px';
        messageEl.style.fontWeight = '500';
        contactForm.appendChild(messageEl);
      }
      
      messageEl.textContent = text;
      messageEl.style.background = type === 'success' 
        ? 'rgba(46, 160, 67, 0.15)' 
        : 'rgba(220, 53, 69, 0.15)';
      messageEl.style.color = type === 'success' 
        ? '#2e8a43' 
        : '#c43c4d';
      messageEl.style.border = `2px solid ${type === 'success' ? '#2e8a43' : '#c43c4d'}`;
      
      // Animate in
      messageEl.style.opacity = '0';
      messageEl.style.transform = 'translateY(10px)';
      setTimeout(() => {
        messageEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        messageEl.style.opacity = '1';
        messageEl.style.transform = 'translateY(0)';
      }, 10);
      
      // Auto-hide success messages
      if (type === 'success') {
        setTimeout(() => {
          messageEl.style.opacity = '0';
          messageEl.style.transform = 'translateY(-10px)';
          setTimeout(() => messageEl.remove(), 300);
        }, 6000);
      }
    }
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ===== HOVER EFFECTS FOR CARDS (Enhanced) =====
  document.querySelectorAll('.service-card, .result-card, .blog-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.zIndex = '10';
    });
    card.addEventListener('mouseleave', function() {
      this.style.zIndex = '1';
    });
  });

  // ===== INITIALIZATION =====
  initCounters();
  
  // Re-init animations on page load (for multi-page)
  if (document.querySelector('.animate')) {
    // If preloader already hidden, init immediately
    if (preloader && preloader.classList.contains('hidden')) {
      initScrollAnimations();
    }
  }
});

// ===== PAGE LOAD ANIMATION FOR CONTENT =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});