// Theme Toggle (White → Dark → Gold)
const themeBtn = document.getElementById("themeToggle");
let mode = 0;

themeBtn.addEventListener("click", () => {
    mode++;
    document.body.classList.remove("dark", "gold");

    if (mode % 3 === 1) {
        document.body.classList.add("dark");
    } else if (mode % 3 === 2) {
        document.body.classList.add("gold");
    }
});

// Fade In
const fadeEls = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });

fadeEls.forEach(el => observer.observe(el));

// Modal + Swipe
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const images = document.querySelectorAll(".gallery-img");
const closeBtn = document.querySelector(".close");

let currentIndex = 0;

images.forEach((img, index) => {
    img.addEventListener("click", () => {
        modal.style.display = "flex";
        modalImg.src = img.src;
        currentIndex = index;
    });
});

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };

let startX = 0;

modal.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

modal.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) nextImage();
    if (endX - startX > 50) prevImage();
});

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    modalImg.src = images[currentIndex].src;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex].src;
}