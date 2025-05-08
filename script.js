const imagesPerPage = 1;

// Inicializa todos os sliders da página
document.querySelectorAll('.foto-slider').forEach(slider => {
    const container = slider.querySelector('.slider-container');
    const slides = container.querySelectorAll('.foto');
    const totalSlides = slides.length;
    const totalPages = Math.ceil(totalSlides / imagesPerPage);

    container.dataset.currentPage = "0";
    container.dataset.totalPages = totalPages;

    const prevButton = slider.querySelector('.prev');
    const nextButton = slider.querySelector('.next');

    prevButton.addEventListener('click', () => {
        mudarPagina(slider, -1);
    });

    nextButton.addEventListener('click', () => {
        mudarPagina(slider, 1);
    });

    mudarPagina(slider, 0);
});

function mudarPagina(slider, direction) {
    const container = slider.querySelector('.slider-container');
    const slides = container.querySelectorAll('.foto');
    const slideWidth = slides[0].offsetWidth;

    const totalPages = parseInt(container.dataset.totalPages);
    let currentPage = parseInt(container.dataset.currentPage);

    currentPage += direction;

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

let imagens = Array.from(document.querySelectorAll('.foto img'));
let imagemAtualIndex = 0;

imagens.forEach((img, index) => {
    img.addEventListener('click', function () {
        imagemAtualIndex = index;
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

document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('ativo')) return;

    if (event.key === 'Escape') {
        fecharLightbox();
    } else if (event.key === 'ArrowRight') {
        imagemAtualIndex = (imagemAtualIndex + 1) % imagens.length;
        lightboxImg.src = imagens[imagemAtualIndex].src;
    } else if (event.key === 'ArrowLeft') {
        imagemAtualIndex = (imagemAtualIndex - 1 + imagens.length) % imagens.length;
        lightboxImg.src = imagens[imagemAtualIndex].src;
    }
});

lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
        fecharLightbox();
    }
});

document.querySelector('.lightbox-seta.esquerda').addEventListener('click', () => {
    imagemAtualIndex = (imagemAtualIndex - 1 + imagens.length) % imagens.length;
    lightboxImg.src = imagens[imagemAtualIndex].src;
});

document.querySelector('.lightbox-seta.direita').addEventListener('click', () => {
    imagemAtualIndex = (imagemAtualIndex + 1) % imagens.length;
    lightboxImg.src = imagens[imagemAtualIndex].src;
});

document.querySelector('.lightbox-fechar').addEventListener('click', fecharLightbox);

// Menu mobile (integrado com sua versão anterior)
const toggle = document.getElementById('menu-toggle') || document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

toggle?.addEventListener('click', () => {
    toggle.classList.toggle('active');
    navLinks.classList.toggle('open');
});

let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-container img');
const totalSlides = slides.length;
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// Função para mudar de slide
function changeSlide(direction) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + direction + totalSlides) % totalSlides;
    slides[currentSlide].classList.add('active');
}

// Rotação automática do carrossel
setInterval(() => {
    changeSlide(1);
}, 5000); // Troca a cada 3 segundos

// Navegação com as setas
prevButton.addEventListener('click', () => {
    changeSlide(-1);
});

nextButton.addEventListener('click', () => {
    changeSlide(1);
});
