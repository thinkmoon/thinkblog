// ThinkBlog JavaScript utilities

// Common utility functions
window.ThinkBlog = {
  // Initialize common functionality
  init: function() {
    this.initScrollEffects();
    this.initLazyLoading();
    this.initSiteTimer();
  },

  // Smooth scroll effects
  initScrollEffects: function() {
    // Add smooth scrolling to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth'
          });
        }
      });
    });
  },

  // Lazy loading for images
  initLazyLoading: function() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  },

  // Site timer functionality
  initSiteTimer: function() {
    const siteTimerElement = document.getElementById('site-timer');
    if (!siteTimerElement) return;

    // 博客开始时间：2017年12月15日 13时47分25秒
    const startTime = new Date('2017-12-15T13:47:25');

    const calculateRunningTime = () => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();

      // 计算年、月、日、小时、分钟、秒
      const years = Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
      const months = Math.floor((diff % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
      const days = Math.floor((diff % (30.44 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000));
      const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
      const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
      const seconds = Math.floor((diff % (60 * 1000)) / 1000);

      // 构建时间字符串
      const timeParts = [];

      if (years > 0) {
        timeParts.push(`${years}年`);
      }
      if (months > 0) {
        timeParts.push(`${months}月`);
      }
      if (days > 0) {
        timeParts.push(`${days}日`);
      }
      if (hours > 0) {
        timeParts.push(`${hours}小时`);
      }
      if (minutes > 0) {
        timeParts.push(`${minutes}分`);
      }
      if (seconds > 0) {
        timeParts.push(`${seconds}秒`);
      }

      // 如果时间太短，显示秒数
      if (timeParts.length === 0) {
        timeParts.push('0秒');
      }

      return timeParts.join('');
    };

    const updateTimer = () => {
      siteTimerElement.textContent = `本站已顽强运行：${calculateRunningTime()}`;
    };

    // 立即更新一次
    updateTimer();

    // 每秒更新一次
    setInterval(updateTimer, 1000);
  }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  window.ThinkBlog.init();
});
