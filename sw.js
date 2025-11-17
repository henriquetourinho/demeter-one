// sw.js (Service Worker)

const CACHE_NAME = 'demeterone-v1';

// Este é um Service Worker muito simples.
// Por agora, o seu único objetivo é ser "detetável"
// para que o Chrome ofereça a instalação (PWA).

// Evento de Instalação: Ocorre quando o SW é instalado.
self.addEventListener('install', event => {
  console.log('Service Worker: Instalado');
  // Ativa o novo service worker imediatamente, sem esperar
  event.waitUntil(self.skipWaiting());
});

// Evento de Ativação: Ocorre quando o SW é ativado.
self.addEventListener('activate', event => {
  console.log('Service Worker: Ativado');
  // Garante que o SW atual controle a página o mais rápido possível
  event.waitUntil(self.clients.claim());
});

// Evento de Fetch: Ocorre para cada requisição da página.
// Nós vamos usar uma estratégia "Network First" (Tenta a rede primeiro).
// Para a página de "em breve", não vamos guardar nada em cache 
// para evitar problemas quando lançarmos o site completo.
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // Se a rede falhar, poderíamos
        // retornar uma página offline de um cache,
        // mas não é necessário por agora.
      })
  );
});