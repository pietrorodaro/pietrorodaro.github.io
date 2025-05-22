const pages = document.querySelectorAll('.page');
const titles = document.querySelectorAll('#sidebar .title');
const indicator = document.getElementById('page-indicator');

let currentPage = 0;
let isScrolling = false;

// Mostra la pagina corretta
function showPage(index) {
  pages.forEach((page, i) => {
    page.classList.remove('active');
    if (i === index) page.classList.add('active');
  });

  titles.forEach((title, i) => {
    title.classList.toggle('active', i === index);
  });

  indicator.textContent = `${index + 1} / ${pages.length}`;
}

// Cambia pagina con effetto loop
function changePage(delta) {
  if (isScrolling) return;

  currentPage = (currentPage + delta + pages.length) % pages.length;
  isScrolling = true;

  showPage(currentPage);

  setTimeout(() => {
    isScrolling = false;
  }, 900);
}

// Eventi
window.addEventListener('wheel', e => {
  changePage(e.deltaY > 0 ? 1 : -1);
});

let touchStartY = 0;
window.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
});
window.addEventListener('touchend', e => {
  const delta = touchStartY - e.changedTouches[0].clientY;
  if (Math.abs(delta) > 50) {
    changePage(delta > 0 ? 1 : -1);
  }
});

// Avvio
showPage(currentPage);
