// Basic JS for Foodie site
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Simple handler for Order buttons to show a modal-like alert
  document.querySelectorAll('.order-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = e.currentTarget.dataset.item || 'Delicious Dish';
      alert(`Added to order: ${item} — we will contact you to confirm!`);
    })
  });

  // Image fallback for browsers that don't support HEIC: try a .jpg variant, then a lightweight SVG placeholder
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function handleErr() {
      // prevent infinite loop
      img.removeEventListener('error', handleErr);
      try {
        const src = img.getAttribute('src') || '';
        if (/\.HEIC$/i.test(src)) {
          const jpg = src.replace(/\.HEIC$/i, '.jpg');
          // try load a corresponding .jpg if it exists on disk
          img.src = jpg;
          // reattach an error handler in case jpg also fails
          img.addEventListener('error', function () {
            img.removeEventListener('error', arguments.callee);
            img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#e8fbff"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#0a0a0a" font-family="Arial,Helvetica,sans-serif" font-size="18">Image unavailable</text></svg>`
            );
          });
        } else {
          img.src = 'data:image/svg+xml;utf8,' + encodeURIComponent(
            `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="#e8fbff"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#0a0a0a" font-family="Arial,Helvetica,sans-serif" font-size="18">Image unavailable</text></svg>`
          );
        }
      } catch (err) {
        // final fallback
        img.src = '';
      }
    });
  });

  // Force dark theme only
  document.documentElement.setAttribute('data-theme', 'dark');
  // Remove any stored theme preference to avoid toggling back later
  try { localStorage.removeItem('site-theme'); } catch (e) { }

  // Lightbox: open images in a modal
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  function openLightbox(src, caption) {
    if (!lightbox) return;
    lightboxImg.src = src;
    lightboxCaption.textContent = caption || '';
    lightbox.classList.add('open');
  }

  document.querySelectorAll('.menu-item img').forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => openLightbox(img.src, img.alt || ''));
  });

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  }
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightbox) lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
});
