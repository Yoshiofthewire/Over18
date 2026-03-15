(async () => {
  const text = await window.api.getLicense();
  document.getElementById('license').value = text;
})();
