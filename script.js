const portfolioItems = [
  {
    title: "Miniatura 01",
    image: "assets/thumbs/ComfyUI_10933__result.jpg",
    alt: "Miniatura de YouTube 01",
  },
  {
    title: "Miniatura 02",
    image: "assets/thumbs/ComfyUI_10938__result.jpg",
    alt: "Miniatura de YouTube 02",
  },
  {
    title: "Miniatura 03",
    image: "assets/thumbs/ComfyUI_11072__result.jpg",
    alt: "Miniatura de YouTube 03",
  },
  {
    title: "Miniatura 04",
    image: "assets/thumbs/ComfyUI_13803__result.jpg",
    alt: "Miniatura de YouTube 04",
  },
  {
    title: "Miniatura 05",
    image: "assets/thumbs/ComfyUI_temp_eefqk_00002__result.jpg",
    alt: "Miniatura de YouTube 05",
  },
  {
    title: "Miniatura 06",
    image: "assets/thumbs/e77f4804-4856-489e-aa79-0294f03d3bb2_result.jpg",
    alt: "Miniatura de YouTube 06",
  },
  {
    title: "Miniatura 07",
    image: "assets/thumbs/gfhgfhgf_result.jpg",
    alt: "Miniatura de YouTube 07",
  },
  {
    title: "Miniatura 08",
    image: "assets/thumbs/ghfghjfg_result.jpg",
    alt: "Miniatura de YouTube 08",
  },
  {
    title: "Miniatura 09",
    image: "assets/thumbs/s5e6se_result.jpg",
    alt: "Miniatura de YouTube 09",
  },
];

const gallery = document.querySelector("#gallery");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxCaption = document.querySelector("#lightbox-caption");
const closeButton = document.querySelector(".lightbox-close");
const prevButton = document.querySelector(".lightbox-prev");
const nextButton = document.querySelector(".lightbox-next");

let currentIndex = 0;

function renderGallery(items) {
  gallery.innerHTML = items
    .map(
      (item, index) => `
        <article class="thumb-card">
          <div class="thumb-preview" data-index="${index}">
            <img src="${item.image}" alt="${item.alt}" loading="lazy" />
            <button class="thumb-open" type="button" data-index="${index}" aria-label="Abrir ${item.title}">
              +
            </button>
          </div>
          <div class="thumb-info">
            <h2>${item.title}</h2>
            <p>Thumbnail 16:9 para YouTube</p>
          </div>
        </article>
      `,
    )
    .join("");
}

function openLightbox(index) {
  currentIndex = index;
  const item = portfolioItems[currentIndex];
  lightboxImage.src = item.image;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.title;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  closeButton.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "";
}

function moveLightbox(direction) {
  currentIndex = (currentIndex + direction + portfolioItems.length) % portfolioItems.length;
  const item = portfolioItems[currentIndex];
  lightboxImage.src = item.image;
  lightboxImage.alt = item.alt;
  lightboxCaption.textContent = item.title;
}

gallery.addEventListener("click", (event) => {
  const preview = event.target.closest(".thumb-preview");
  if (!preview) return;
  openLightbox(Number(preview.dataset.index));
});

closeButton.addEventListener("click", closeLightbox);
prevButton.addEventListener("click", () => moveLightbox(-1));
nextButton.addEventListener("click", () => moveLightbox(1));

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("is-open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);
});

renderGallery(portfolioItems);
