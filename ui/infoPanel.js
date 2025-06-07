export function showInfo(name) {
  const panel = document.getElementById('infoPanel');
  panel.style.display = 'block';
  panel.textContent = name;

  setTimeout(() => {
    panel.style.display = 'none';
  }, 1000);
}
