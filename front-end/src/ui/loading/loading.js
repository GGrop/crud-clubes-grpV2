function startLoading($loading) {
  $loading.classList.remove('hidden');
  document.querySelector('#blackscreen').classList.remove('hidden');
}

function stopLoading($loading) {
  $loading.classList.add('hidden');
  document.querySelector('#blackscreen').classList.add('hidden');
}

export default function handleLoading(state) {
  const $loading = document.querySelector('#loading');
  if (state) {
    startLoading($loading);
  } else {
    stopLoading($loading);
  }
}
