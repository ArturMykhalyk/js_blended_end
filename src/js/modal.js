//Описана робота модалки - відкриття закриття і все що з модалкою повʼязано
import { refs } from './refs';
export function openModal() {
  refs.modal.classList.add('modal--is-open');

  document.addEventListener('keydown', closeModalOnEsc);

  window.addEventListener('click', clickNoModal);

  refs.closeModalBtn.addEventListener('click', closeModal);
}

function closeModal() {
  refs.modal.classList.remove('modal--is-open');
  document.removeEventListener('keydown', closeModalOnEsc);
  window.removeEventListener('click', clickNoModal);
}

function closeModalOnEsc(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}
function clickNoModal(event) {
  if (event.target === refs.modal) {
    closeModal();
  }
}
