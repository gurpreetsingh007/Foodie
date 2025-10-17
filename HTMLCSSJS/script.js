// Basic JS for Foodie site
document.addEventListener('DOMContentLoaded', ()=>{
  const navToggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('nav');
  if(navToggle){
    navToggle.addEventListener('click', ()=>{
      nav.classList.toggle('open');
    });
  }

  // Simple handler for Order buttons to show a modal-like alert
  document.querySelectorAll('.order-btn').forEach(btn=>{
    btn.addEventListener('click', (e)=>{
      const item = e.currentTarget.dataset.item || 'Delicious Dish';
      alert(`Added to order: ${item} — we will contact you to confirm!`);
    })
  });
});
