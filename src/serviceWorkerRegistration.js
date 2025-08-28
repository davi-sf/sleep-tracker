export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then(registration => { console.log('ServiceWorker registrado:', registration); })
        .catch(error => { console.log('Falha ao registrar ServiceWorker:', error); });
    });
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => { registration.unregister(); });
  }
}
