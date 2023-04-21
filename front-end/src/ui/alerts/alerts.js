export function showAlert(state, element) {
  if (state) {
    document.querySelector(element).classList.remove('hidden');
  } else {
    document.querySelector(element).classList.add('hidden');
  }
}
