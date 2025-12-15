/**
 * PORTFOLIO SITE - INTERACTIVITY & INTEGRATIONS
 * Features: Zapier webhook integration, smooth scroll, animations, hamburger menu
 */

// ========================================
// HAMBURGER MENU
// ========================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', !isExpanded);
  });

  // Close menu when clicking links
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// ========================================
// CONFIGURATION
// ========================================

const CONFIG = {
  zapierWebhookUrl: 'YOUR_ZAPIER_WEBHOOK_URL_HERE', // Replace with actual webhook
  animationObserverOptions: {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
};

// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ========================================

const observerCallback = (entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
};

const observer = new IntersectionObserver(
  observerCallback,
  CONFIG.animationObserverOptions
);

// Apply fade-in animations
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.work-item, .testimonial, .skill-item');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
  });
});

// ========================================
// CONTACT FORM HANDLING WITH ZAPIER
// ========================================

const contactForm = document.getElementById('contactForm');
const submitButton = contactForm?.querySelector('button[type="submit"]');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      projectType: formData.get('projectType'),
      budget: formData.get('budget'),
      message: formData.get('message'),
      timestamp: new Date().toISOString(),
      source: 'Portfolio Contact Form'
    };
    
    // Validate form
    if (!validateForm(data)) {
      return;
    }
    
    // Show loading state
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
      // Send to Zapier webhook
      const response = await fetch(CONFIG.zapierWebhookUrl, {
        method: 'POST',
        mode: 'no-cors', // Zapier webhooks require no-cors
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      // Show success message
      showFormMessage('success', '✓ Message sent! I\'ll respond within 24 hours.');
      contactForm.reset();
      
      // Track conversion (optional - integrate with analytics)
      trackFormSubmission('portfolio_contact', data);
      
    } catch (error) {
      console.error('Form submission error:', error);
      showFormMessage('error', '× Something went wrong. Please try emailing directly.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  });
}

// ========================================
// FORM VALIDATION
// ========================================

function validateForm(data) {
  const errors = [];
  
  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Please enter a valid name');
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    errors.push('Please provide more details about your project (min 10 characters)');
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
  messageEl.style.padding = '1rem';
  messageEl.style.marginBottom = '1rem';
  messageEl.style.borderRadius = '6px';
  messageEl.style.fontWeight = '500';
  
  if (type === 'success') {
    messageEl.style.background = '#d1fae5';
    messageEl.style.color = '#065f46';
    messageEl.style.border = '1px solid #10b981';
  } else {
    messageEl.style.background = '#fee2e2';
    messageEl.style.color = '#991b1b';
    messageEl.style.border = '1px solid #ef4444';
  }
  
  // Insert before form
  contactForm.parentElement.insertBefore(messageEl, contactForm);
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    messageEl.style.transition = 'opacity 0.3s';
    messageEl.style.opacity = '0';
    setTimeout(() => messageEl.remove(), 300);
  }, 5000);
}

// ========================================
// ANALYTICS TRACKING (OPTIONAL)
// ========================================

function trackFormSubmission(eventName, data) {
  // Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, {
      event_category: 'Contact',
      event_label: data.projectType,
      value: data.budget
    });
  }
  
  // Facebook Pixel
  if (typeof fbq !== 'undefined') {
    fbq('track', 'Contact', {
      content_category: data.projectType
    });
  }
  
  // Custom tracking
  console.log('Form submission tracked:', eventName, data);
}

// ========================================
// CALENDLY CALLBACK (OPTIONAL)
// ========================================

// Listen for Calendly events
window.addEventListener('message', (e) => {
  if (e.origin === 'https://calendly.com' && e.data.event) {
    const event = e.data.event;
    
    if (event === 'calendly.event_scheduled') {
      // Track calendar booking
      trackFormSubmission('calendly_booking', {
        source: 'Portfolio Calendly Widget'
      });
      
      // Optional: Send booking confirmation to Zapier
      if (CONFIG.zapierWebhookUrl !== 'YOUR_ZAPIER_WEBHOOK_URL_HERE') {
        fetch(CONFIG.zapierWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'calendly_booking',
            timestamp: new Date().toISOString(),
            source: 'Portfolio Page'
          })
        }).catch(console.error);
      }
    }
  }
});

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPercent = (scrollTop / scrollHeight) * 100;
  
  // Update progress bar if it exists
  const progressBar = document.querySelector('.scroll-progress');
  if (progressBar) {
    progressBar.style.width = `${scrollPercent}%`;
  }
});

// ========================================
// CONSOLE EASTER EGG
// ========================================

console.log('%c🚀 Hello, curious developer!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%cLike what you see? Let\'s build something together.', 'font-size: 14px; color: #64748b;');
console.log('%c→ Check out the source: https://github.com/yourusername', 'font-size: 12px; color: #7c3aed;');
