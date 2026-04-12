const POLL_INTERVAL = 500;   // ms
const ENDPOINT = '/__gardener/hot-reload';

let knownVersion = null;

async function poll() {
  try {
    const res = await fetch(ENDPOINT);
    if (!res.ok) return;
    const { version } = await res.json();

    if (knownVersion === null) {
      knownVersion = version;   // capture baseline on first poll
      return;
    }

    if (version !== knownVersion) {
      window.location.reload();
    }
  } catch {
    // network hiccup — retry next tick
  }
}

export function startHotReload() {
  poll();   // immediate check
  setInterval(poll, POLL_INTERVAL);
}

