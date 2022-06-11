export const storageAgent = {
  fetch(key) {
    const items = JSON.parse(localStorage.getItem(key) || "[]");
    items.forEach((item, index) => {
      item.id = index;
    });
    storageAgent.uid = items.length;
    return items;
  },
  save(key, items) {
    localStorage.setItem(key, JSON.stringify(items));
  },
};
