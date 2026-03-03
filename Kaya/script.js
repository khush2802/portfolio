// Theme Toggle
const themeBtn = document.getElementById("themeToggle");
let mode = 0;

themeBtn.addEventListener("click", () => {
    mode++;
    document.body.classList.remove("dark", "gold");
    if (mode % 3 === 1) document.body.classList.add("dark");
    else if (mode % 3 === 2) document.body.classList.add("gold");
});

// Fade
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add("show");
    });
}, { threshold: 0.2 });

document.querySelectorAll(".fade").forEach(el => observer.observe(el));

// Gallery
const gallery = document.getElementById("gallery");
const uploadInput = document.getElementById("imageUpload");
const addBtn = document.getElementById("addImageBtn");

let images = JSON.parse(localStorage.getItem("portfolioImages")) || [];

function renderGallery() {
    gallery.innerHTML = "";
    images.forEach((src, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "image-wrapper";

        const img = document.createElement("img");
        img.src = src;

        const delBtn = document.createElement("button");
        delBtn.innerText = "Delete";
        delBtn.className = "delete-btn";

        delBtn.onclick = () => {
            images.splice(index, 1);
            localStorage.setItem("portfolioImages", JSON.stringify(images));
            renderGallery();
        };

        img.onclick = () => openModal(index);

        wrapper.appendChild(img);
        wrapper.appendChild(delBtn);
        gallery.appendChild(wrapper);
    });
}

renderGallery();

addBtn.addEventListener("click", () => {
    const file = uploadInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        images.push(e.target.result);
        localStorage.setItem("portfolioImages", JSON.stringify(images));
        renderGallery();
    };
    reader.readAsDataURL(file);
});

// Modal + Swipe
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".close");

let currentIndex = 0;

function openModal(index) {
    currentIndex = index;
    modal.style.display = "flex";
    modalImg.src = images[index];
}

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
    modalImg.src = images[currentIndex];
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    modalImg.src = images[currentIndex];
}