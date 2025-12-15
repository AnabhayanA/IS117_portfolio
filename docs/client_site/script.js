/**
 * CLIENT SITE - VELOCITY AI SOLUTIONS
 * Features: Zapier lead capture, parallax effects, scroll animations
 */

// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
  zapierWebhookUrl: 'YOUR_ZAPIER_WEBHOOK_URL_HERE', // Replace with actual webhook
  scrollAnimationThreshold: 0.1,
  navHideDelay: 100
};

// ========================================
// NAVIGATION SCROLL BEHAVIOR
// ========================================

let lastScrollTop = 0;
const nav = document.querySelector('.nav-main');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Hide nav on scroll down, show on scroll up
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    nav.style.transform = 'translateY(-100%)';
  } else {
    nav.style.transform = 'translateY(0)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}, false);

// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// PARALLAX EFFECT FOR HERO PARTICLES
// ========================================

const particles = document.querySelectorAll('.hero-particle');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  
  particles.forEach((particle, index) => {
    const speed = 0.3 + (index * 0.1);
    particle.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const animateOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
};

const scrollObserver = new IntersectionObserver(animateOnScroll, {
  threshold: CONFIG.scrollAnimationThreshold,
  rootMargin: '0px 0px -50px 0px'
});

// Apply animations to elements
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll(
    '.service-card, .process-step, .result-card, .testimonial, .pricing-card'
  );
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    scrollObserver.observe(el);
  });
});

// ========================================
// LEAD FORM HANDLING WITH ZAPIER
// ========================================

const leadForm = document.getElementById('leadForm');
const submitButton = leadForm?.querySelector('button[type="submit"]');

if (leadForm) {
  leadForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(leadForm);
    const leadData = {
      fullName: formData.get('fullName'),
      email: formData.get('email'),
      company: formData.get('company'),
      industry: formData.get('industry'),
      companySize: formData.get('companySize'),
      challenge: formData.get('challenge'),
      timestamp: new Date().toISOString(),
      source: 'VelocityAI Website',
      page: 'Client Site Demo',
      userAgent: navigator.userAgent,
      referrer: document.referrer || 'Direct'
    };
    
    // Validate form
    if (!validateLeadForm(leadData)) {
      return;
    }
    
    // Show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';
    
    try {
      // Send to Zapier webhook
      const response = await fetch(CONFIG.zapierWebhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Zapier webhooks require no-cors
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(leadData)
      });
      
      // Show success message
      showFormMessage('success', 
        '✓ Success! We\'ll review your request and contact you within 24 hours to schedule your free AI audit.'
      );
      leadForm.reset();
      
      // Track conversion
      trackConversion('lead_submission', leadData);
      
      // Optional: Redirect to thank you page after delay
      setTimeout(() => {
        // window.location.href = '/thank-you.html';
      }, 2000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      showFormMessage('error', 
        '× We encountered an issue. Please email us directly at hello@velocityai.com or try again.'
      );
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

// ========================================
// FORM VALIDATION
// ========================================

function validateLeadForm(data) {
  const errors = [];
  
  // Name validation
  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.push('Please enter your full name');
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Please enter a valid work email address');
  }
  
  // Company validation
  if (!data.company || data.company.trim().length < 2) {
    errors.push('Please enter your company name');
  }
  
  // Industry validation
  if (!data.industry) {
    errors.push('Please select your industry');
  }
  
  // Company size validation
  if (!data.companySize) {
    errors.push('Please select your company size');
  }
  
  // Challenge validation
  if (!data.challenge || data.challenge.trim().length < 20) {
    errors.push('Please describe your AI challenge in more detail (min 20 characters)');
  }
  
  if (errors.length > 0) {
    showFormMessage('error', errors.join('<br>'));
    return false;
  }
  
  return true;
}

// ========================================
// FORM MESSAGE DISPLAY
// ========================================

function showFormMessage(type, message) {
  // Remove existing message
  const existingMessage = document.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Create new message
  const messageEl = document.createElement('div');
  messageEl.className = `form-message form-message--${type}`;
  messageEl.innerHTML = message;
  
  // Style the message
  messageEl.style.padding = '1.25rem';
  messageEl.style.marginBottom = '1.5rem';
  messageEl.style.borderRadius = '8px';
  messageEl.style.fontWeight = '500';
  messageEl.style.lineHeight = '1.6';
  
  if (type === 'success') {
    messageEl.style.background = '#d1fae5';
    messageEl.style.color = '#065f46';
    messageEl.style.border = '2px solid #10b981';
  } else {
    messageEl.style.background = '#fee2e2';
    messageEl.style.color = '#991b1b';
    messageEl.style.border = '2px solid #ef4444';
  }
  
  // Insert before form
  const formWrapper = document.querySelector('.contact-form-wrapper');
  formWrapper.insertBefore(messageEl, leadForm);
  
  // Scroll to message
  messageEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Auto-remove success messages after 10 seconds
  if (type === 'success') {
    setTimeout(() => {
      messageEl.style.transition = 'opacity 0.5s';
      messageEl.style.opacity = '0';
      setTimeout(() => messageEl.remove(), 500);
    }, 10000);
  }
}

// ========================================
// CONVERSION TRACKING
// ========================================

function trackConversion(eventName, data) {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      event_category: 'Lead Generation',
      event_label: data.industry,
      value: getLeadValue(data.companySize)
    });
  }
  
  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Lead', {
      content_category: data.industry,
      content_name: 'AI Audit Request'
    });
  }
  
  // LinkedIn Insight Tag
  if (typeof lintrk !== 'undefined') {
    lintrk('track', { conversion_id: 12345678 });
  }
  
  // Custom tracking
  console.log('Lead conversion tracked:', eventName, data);
}

// Estimate lead value based on company size
function getLeadValue(companySize) {
  const valueMap = {
    '1-10': 5000,
    '11-50': 15000,
    '51-200': 50000,
    '201-1000': 150000,
    '1000+': 300000
  };
  return valueMap[companySize] || 10000;
}

// ========================================
// PRICING CARD HIGHLIGHTING
// ========================================

const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    pricingCards.forEach(c => {
      if (c !== card) {
        c.style.opacity = '0.6';
      }
    });
  });
  
  card.addEventListener('mouseleave', () => {
    pricingCards.forEach(c => {
      c.style.opacity = '1';
    });
  });
});

// ========================================
// CALL-TO-ACTION TRACKING
// ========================================

document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', (e) => {
    const buttonText = button.textContent.trim();
    const buttonHref = button.getAttribute('href');
    
    // Track CTA clicks
    if (typeof gtag !== 'undefined') {
      gtag('event', 'cta_click', {
        event_category: 'Engagement',
        event_label: buttonText,
        event_value: buttonHref
      });
    }
    
    console.log('CTA clicked:', buttonText, buttonHref);
  });
});

// ========================================
// URGENCY TIMER (OPTIONAL)
// ========================================

// Uncomment to add a countdown timer for limited availability
/*
function updateUrgencyTimer() {
  const urgencyEl = document.querySelector('.contact-urgency p:last-child');
  if (!urgencyEl) return;
  
  // Calculate time until end of quarter
  const now = new Date();
  const currentQuarter = Math.floor(now.getMonth() / 3);
  const quarterEnd = new Date(now.getFullYear(), (currentQuarter + 1) * 3, 0, 23, 59, 59);
  const timeLeft = quarterEnd - now;
  
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
  urgencyEl.textContent = `Q1 2025 has 1 spot remaining. ${days} days, ${hours} hours left to claim it.`;
}

updateUrgencyTimer();
setInterval(updateUrgencyTimer, 3600000); // Update every hour
*/

// ========================================
// EXIT INTENT POPUP (OPTIONAL)
// ========================================

/*
let exitIntentShown = false;

document.addEventListener('mouseleave', (e) => {
  if (e.clientY <= 0 && !exitIntentShown && window.pageYOffset > 1000) {
    exitIntentShown = true;
    showExitIntentPopup();
  }
});

function showExitIntentPopup() {
  const popup = document.createElement('div');
  popup.className = 'exit-intent-popup';
  popup.innerHTML = `
    <div class="popup-content">
      <button class="popup-close">&times;</button>
      <h2>Wait! Before you go...</h2>
      <p>Get our free "AI Readiness Checklist" - a 10-point assessment to see if your business is ready for AI transformation.</p>
      <form class="popup-form">
        <input type="email" placeholder="Enter your email" required>
        <button type="submit" class="btn btn-primary">Send Me the Checklist</button>
      </form>
    </div>
  `;
  
  document.body.appendChild(popup);
  
  // Add styles dynamically
  const style = document.createElement('style');
  style.textContent = `
    .exit-intent-popup {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
      animation: fadeIn 0.3s;
    }
    .popup-content {
      position: relative;
      background: white;
      padding: 3rem;
      border-radius: 12px;
      max-width: 500px;
      text-align: center;
    }
    .popup-close {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      font-size: 2rem;
      cursor: pointer;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // Close popup handlers
  popup.querySelector('.popup-close').addEventListener('click', () => {
    popup.remove();
  });
  
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
      popup.remove();
    }
  });
}
*/

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c🚀 VelocityAI Solutions', 'font-size: 24px; font-weight: bold; color: #3b82f6;');
console.log('%cLike what you see? We build custom AI systems for businesses like yours.', 'font-size: 14px; color: #64748b;');
console.log('%c→ Get your free AI audit: https://velocityai.com/audit', 'font-size: 12px; color: #8b5cf6;');
