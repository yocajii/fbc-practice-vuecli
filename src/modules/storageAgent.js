export const storageAgent = {
  fetch(key) {
    return JSON.parse(localStorage.getItem(key) || "[]");
  },
  save(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  },
};
