
"use strict";

/* ==================================
   DATA ANGGOTA KELOMPOK
   Ganti nama, NIM, jabatan, dan foto di sini.
   Foto opsional: tambahkan photo: "images/namafile.jpg"
================================== */

const members = [
  { name: "SYIFAUL INDA FADHILA", nim: "24670031", role: "Anggota", photo:"images/Syifa.jpg" },
  { name: "Valentina Veroriael ", nim: "24670039", role: "Anggota", photo:"images/Ria.jpg" },
  { name: "Raydinata Sabriliant Al Ghifari ", nim: "NIM: 24670002", role: "Anggota" },
  { name: " Akmal Pratama", nim: "24670003", role: "Anggota" },
  { name: "Muhammad Arkan Albani", nim: "24670040", role: "Anggota", photo: "images/Arkan.jpg", pos: "45% 85%" },
  { name: "Patrick Ivanuell Firstyanto ", nim: "24670041", role: "Anggota" },
  { name: "Livaris Ananda Rivaldo Saputro", nim: "24670099", role: "Anggota" },
  { name: "Rafli Azizi Azakia Akhmad ", nim: "24670101", role: "Anggota", photo:"images/Rafli.jpg" },
  { name: "Indra Dana Zulian", nim: "24670111", role: "Anggota", photo: "images/Indra.jpg", pos: "center 10%" },
  { name: "Afif Prasetya", nim: "24670118", role: "Anggota", photo: "images/Afif.jpg", pos: "center 10%" },
  { name: "Ani Rohmayani", nim: "24670103", role: "Anggota", photo: "images/Ani.jpg", pos: "center 55%" }
];

/* ==================================
   TAMPILKAN KARTU ANGGOTA
================================== */

const teamGrid = document.querySelector("#team-grid");

if (teamGrid) {
  members.forEach((member, index) => {
    const card = document.createElement("article");
    card.className = "member-card";

    const avatar = document.createElement("div");
    avatar.className = "member-avatar";
    avatar.setAttribute("aria-hidden", "true");

    const initials = document.createElement("span");
    initials.className = "avatar-initials";

    const words = member.name.trim().split(/\s+/);
    initials.textContent = words
      .slice(0, 2)
      .map(word => word.charAt(0))
      .join("")
      .toUpperCase() || String(index + 1);

    avatar.appendChild(initials);

    // Jika anggota punya foto, tampilkan di atas inisial.
    // Kalau file foto tidak ditemukan, inisial tetap tampil.
    if (member.photo) {
      const photo = document.createElement("img");
      photo.className = "member-photo";
      photo.src = member.photo;
      photo.alt = "Foto " + member.name.trim();
      photo.loading = "lazy";
      photo.style.objectPosition = member.pos || "center 25%";
      photo.addEventListener("error", () => photo.remove());
      avatar.appendChild(photo);
    }

    const role = document.createElement("span");
    role.className = "member-role";
    role.textContent = member.role;

    const name = document.createElement("h3");
    name.textContent = member.name;

    const nim = document.createElement("p");
    nim.className = "member-nim";
    nim.textContent = member.nim;

    card.append(avatar, role, name, nim);
    teamGrid.appendChild(card);
  });
}

/* ==================================
   MENU NAVIGASI HP
================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#nav-links");

function closeMenu() {
  if (!menuToggle || !navLinks) return;

  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu");
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Tutup menu" : "Buka menu"
    );
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeMenu();
  });

  document.addEventListener("click", event => {
    if (
      navLinks.classList.contains("open") &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });
}

/* ==================================
   TAHUN OTOMATIS DI FOOTER
================================== */

const yearElement = document.querySelector("#year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ==================================
   FOTO LAPORAN
   Jika foto belum tersedia, tampilkan
   kotak petunjuk untuk memasukkan foto
================================== */

document.querySelectorAll(".report-photo").forEach(photoBox => {
  const image = photoBox.querySelector("img");
  const placeholder = photoBox.querySelector(".photo-placeholder");

  if (!image || !placeholder) return;

  const showPlaceholder = () => {
    image.style.display = "none";
    placeholder.style.display = "grid";
  };

  const showImage = () => {
    image.style.display = "block";
    placeholder.style.display = "none";
  };

  image.addEventListener("error", showPlaceholder);
  image.addEventListener("load", showImage);

  // Menangani gambar yang sudah selesai dimuat
  // sebelum event listener dipasang.
  if (image.complete) {
    if (image.naturalWidth > 0) {
      showImage();
    } else {
      showPlaceholder();
    }
  }
});

/* ==================================
   GALERI DAN LIGHTBOX
   Klik foto untuk melihat ukuran besar
================================== */

const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const lightboxClose = document.querySelector(".lightbox-close");

document.querySelectorAll(".gallery-card").forEach(card => {
  const image = card.querySelector("img");

  // Sembunyikan foto galeri jika file belum ada.
  if (image) {
    image.addEventListener("error", () => {
      image.style.display = "none";
    });

    image.addEventListener("load", () => {
      image.style.display = "block";
    });

    if (image.complete && image.naturalWidth === 0) {
      image.style.display = "none";
    }
  }

  card.addEventListener("click", () => {
    const imagePath = card.dataset.image;
    const title = card.dataset.title || "Dokumentasi KKL";

    if (!lightbox || !lightboxImage || !imagePath) return;

    lightboxImage.onerror = () => {
      lightboxImage.removeAttribute("src");

      if (lightboxCaption) {
        lightboxCaption.textContent =
          "Foto belum tersedia. Masukkan foto ke folder images.";
      }
    };

    lightboxImage.src = imagePath;
    lightboxImage.alt = title;

    if (lightboxCaption) {
      lightboxCaption.textContent = title;
    }

    if (typeof lightbox.showModal === "function") {
      lightbox.showModal();
    }
  });
});

if (lightbox && lightboxClose) {
  lightboxClose.addEventListener("click", () => {
    lightbox.close();
  });

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  lightbox.addEventListener("close", () => {
    if (lightboxImage) {
      lightboxImage.removeAttribute("src");
    }
  });
}

/* ==================================
   PENANDA MENU SESUAI BAGIAN HALAMAN
================================== */

const sections = document.querySelectorAll("main section[id]");
const navItems = document.querySelectorAll(".nav-link");

if ("IntersectionObserver" in window && sections.length && navItems.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navItems.forEach(link => {
        const isActive =
          link.getAttribute("href") === `#${entry.target.id}`;

        link.classList.toggle("active", isActive);
      });
    });
  }, {
    rootMargin: "-30% 0px -60% 0px"
  });

  sections.forEach(section => observer.observe(section));
}
