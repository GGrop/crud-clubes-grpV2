export function handleHidden(state, element) {
  if (state) {
    document.querySelector(element).classList.remove('hidden');
  } else {
    document.querySelector(element).classList.add('hidden');
  }
}
export function handleHiddenAll(element) {
  document.querySelectorAll(element).forEach((e) => {
    e.classList.add('hidden');
  });
}
