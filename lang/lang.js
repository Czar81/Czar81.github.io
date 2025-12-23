const DEFAULT_LANG = "en";

async function setLanguage(lang) {
  try {
    const response = await fetch("lang/lang.json");
    const data = await response.json();

    const translations = data[lang];
    if (!translations) return;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const keys = el.getAttribute("data-i18n").split(".");
      let value = translations;

      keys.forEach(k => {
        value = value?.[k];
      });
       if (!value) return;

      if (el.dataset.i18nAttr) {
        el.setAttribute(el.dataset.i18nAttr, value);
      } else {
        el.textContent = value;
      }
    });

    document.documentElement.lang = lang;
    localStorage.setItem("language", lang);
  } catch (error) {
    console.error("Error loading language:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("language") || DEFAULT_LANG;
  setLanguage(savedLang);
});
