import galleryImages from "./gallery-items.js";

const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  lightboxContainer: document.querySelector(".lightbox"),
  lightboxOverlay: document.querySelector(".lightbox__overlay"),
  closeModalBtn: document.querySelector(".lightbox__button"),
  imageEl: document.querySelector(".lightbox__image"),
};

const galleryMarkup = createGalleryMarkup(galleryImages);

//вставляем разметку в нужное место
refs.galleryContainer.insertAdjacentHTML("afterbegin", galleryMarkup);

//вешаем обработчик клика на галлерею
refs.galleryContainer.addEventListener("click", onGalleryContainerClick);

//обработчик клика на кнопку закрытия
refs.closeModalBtn.addEventListener("click", onCloseModal);

//обработчик клика на backdrop
refs.lightboxOverlay.addEventListener("click", onCloseModalbyBackdop);

//обработчик клика на картинек в галлерее
function onGalleryContainerClick(event) {
  //убираем действие браузера по умолчанию чтоб не
  //было перехода по ссылке (<a>)
  event.preventDefault();

  const isGalleryItemEl = event.target.classList.contains("gallery__image");

  if (!isGalleryItemEl) {
    return;
  }

  const parentImg = event.target.closest(".gallery__link");

  refs.imageEl.src = parentImg.href;
  refs.imageEl.alt = event.target.alt;

  onOpenModal();
}
//создаем разметку
function createGalleryMarkup(imgs) {
  return imgs
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join("");
}

//открытие модального окна
function onOpenModal() {
  window.addEventListener("keydown", onEscKeyPress);
  refs.lightboxContainer.classList.add("is-open");
}
//закрытие модального окна
function onCloseModal(event) {
  window.removeEventListener("keydown", onEscKeyPress);
  refs.lightboxContainer.classList.remove("is-open");
  //Oчистка значения атрибута src элемента img.lightbox__image
  refs.imageEl.src = "";
  refs.imageEl.alt = "";
}
//закрытие модального окна по клику на бекдроп
function onCloseModalbyBackdop(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}
//закрытие модального окна по клику на "Escape"
function onEscKeyPress(event) {
  const ESC_KEY_CODE = "Escape";
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  }
}
