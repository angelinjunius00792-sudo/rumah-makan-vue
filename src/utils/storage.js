export function loadOrSeed(key, seed) {
  try {
    const saved = localStorage.getItem(key)
    if (saved) return JSON.parse(saved)
  } catch (e) {
    console.error('Gagal membaca localStorage', e)
  }
  localStorage.setItem(key, JSON.stringify(seed))
  return structuredClone(seed)
}

export function save(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}