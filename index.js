/* =========================================================
   1. JAVASCRIPT SLIDESHOW FOTO
   ========================================================= */
let slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return;

    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
    }

    if (slides[slideIndex - 1]) slides[slideIndex - 1].classList.add("active");
    if (dots[slideIndex - 1]) dots[slideIndex - 1].classList.add("active");
}

/* =========================================================
   2. UPDATE LINK WHATSAPP & PROFIL DARI LOCALSTORAGE
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    // A. Update Link WhatsApp
    const savedPhone = localStorage.getItem("userPhone");
    const waBtn = document.querySelector(".wa-btn");

    if (savedPhone && waBtn) {
        let formattedPhone = savedPhone;
        if (formattedPhone.startsWith("0")) {
            formattedPhone = "62" + formattedPhone.slice(1);
        }
        waBtn.href = "https://wa.me/" + formattedPhone;
    }

    // B. Update Nama & Deskripsi
    const savedData = JSON.parse(localStorage.getItem('userProfileData'));

    if (savedData) {
        const namaElement = document.getElementById('displayNama');
        if (namaElement) {
            if (savedData.nama) {
                namaElement.innerText = savedData.nama;
            } else if (savedData.akun) {
                namaElement.innerText = savedData.akun;
            }
        }

        const deskripsiElement = document.getElementById('displayDeskripsi');
        if (deskripsiElement && savedData.deskripsi) {
            deskripsiElement.innerText = savedData.deskripsi;
        }

        // Update Negara & Alamat yang sekarang ada di Footer Kontak
        const elemNegara = document.getElementById("displayNegara");
        if (elemNegara && savedData.negara) {
            elemNegara.innerText = savedData.negara;
        }

        const elemAlamat = document.getElementById("displayAlamat");
        if (elemAlamat && savedData.alamat) {
            elemAlamat.innerText = savedData.alamat;
        }
    }
    
    // C. Update Kontak Footer
    const displayEmail = document.getElementById('displayEmail');
    const displayTelepon = document.getElementById('displayTelepon');
    const displayNegara = document.getElementById('displayNegara');
    const displayInstagram = document.getElementById('displayInstagram');
    const displayGithub = document.getElementById('displayGithub');

    const savedEmail = localStorage.getItem('userEmail');
    const savedLokasi = localStorage.getItem('userLokasi');
    const savedInstagram = localStorage.getItem('userInstagram');
    const savedGithub = localStorage.getItem('userGithub');

    if (displayEmail && savedEmail) displayEmail.innerText = savedEmail;
    if (displayTelepon && savedPhone) displayTelepon.innerText = savedPhone;
    
    // Jika tidak ada data negara dari userProfileData, gunakan userLokasi
    if (displayNegara && !displayNegara.innerText && savedLokasi) {
        displayNegara.innerText = savedLokasi;
    }

    if (displayInstagram && savedInstagram) {
        displayInstagram.innerText = savedInstagram;
        const igLink = document.getElementById('displayInstagramLink');
        if (igLink) igLink.href = `https://instagram.com/${savedInstagram.replace('@', '')}`;
    }

    if (displayGithub && savedGithub) {
        displayGithub.innerText = savedGithub;
        const ghLink = document.getElementById('displayGithubLink');
        if (ghLink) ghLink.href = savedGithub.startsWith('http') ? savedGithub : `https://github.com/${savedGithub}`;
    }
});