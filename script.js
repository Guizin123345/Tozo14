const imagesPerPage = 5;

// Inicializa todos os sliders da página
document.querySelectorAll('.foto-slider').forEach(slider => {
    const container = slider.querySelector('.slider-container');
    const slides = container.querySelectorAll('.foto');
    const totalSlides = slides.length;
    const totalPages = Math.ceil(totalSlides / imagesPerPage);

    container.dataset.currentPage = "0";
    container.dataset.totalPages = totalPages;

    // Botões de navegação
    const prevButton = slider.querySelector('.prev');
    const nextButton = slider.querySelector('.next');

    prevButton.addEventListener('click', () => {
        mudarPagina(slider, -1);
    });

    nextButton.addEventListener('click', () => {
        mudarPagina(slider, 1);
    });

    mudarPagina(slider, 0); // Inicializa na primeira página
});

function mudarPagina(slider, direction) {
    const container = slider.querySelector('.slider-container');
    const slides = container.querySelectorAll('.foto');
    const slideWidth = slides[0].offsetWidth;

    const totalPages = parseInt(container.dataset.totalPages);
    let currentPage = parseInt(container.dataset.currentPage);

    currentPage += direction;

    // Só reinicia quando realmente passar do total de páginas
    if (currentPage >= totalPages) {
        currentPage = 0;
    } else if (currentPage < 0) {
        currentPage = totalPages - 1;
    }

    const offset = currentPage * imagesPerPage * slideWidth;
    container.style.transform = `translateX(-${offset}px)`;
    container.dataset.currentPage = currentPage;
}

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Atribui clique nas imagens para abrir o lightbox
document.querySelectorAll('.foto img').forEach(img => {
    img.addEventListener('click', function () {
        abrirLightbox(this.src);
    });
});

function abrirLightbox(src) {
    lightboxImg.src = src;
    lightbox.classList.add('ativo');
}

function fecharLightbox() {
    lightbox.classList.remove('ativo');
}

// Fecha lightbox com ESC
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        fecharLightbox();
    }
});

// Fecha lightbox ao clicar fora da imagem
lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        fecharLightbox();
    }
});

// Menu mobile
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

menuToggle?.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});
