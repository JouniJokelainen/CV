const translations = {
  fi: {
    pageTitle: "Jouni Jokelainen — ICT-intoilija",
    pageDescription: "Jouni Jokelainen – ICT-kouluttaja, lehtori ja ICT-intoilija.",
    skipLink: "Siirry sisältöön",
    languageLabel: "Kieli",
    sectionNavLabel: "Sivun osiot",
    themeLabel: "Teema",
    themeToggleLabel: "Ota tumma tila käyttöön",
    lightThemeToggleLabel: "Ota vaalea tila käyttöön",
    eyebrow: "ICT-kouluttaja · lehtori · ICT-intoilija",
    summary: "Jouni on pitkän linjan ICT-kouluttaja ja lehtori Riveriassa, Pohjois-Karjalan koulutuskuntayhtymässä.",
    githubLink: "Tutustu GitHub-profiiliin",
    profileLabel: "Profiili",
    profileNote: "Pohjois-Karjalan koulutuskuntayhtymä Riveria<br><span>(ent. PKKY)</span>",
    role: "ICT-kouluttaja ja lehtori",
    skillsHeading: "Osaaminen",
    skillsDescription: "Teknologiat ja osaamisalueet",
    skillsListLabel: "Osaaminen",
    localNetworks: "Lähiverkot",
    interestsHeading: "Vapaa-ajalla",
    interestsDescription: "Kiinnostuksen kohteita työn ulkopuolella",
    reading: "Lukeminen",
    gym: "Kuntosali",
    fencing: "Historiallinen miekkailu",
    footerNote: "Rakennettu uteliaisuudesta teknologiaan."
  },
  en: {
    pageTitle: "Jouni Jokelainen — ICT enthusiast",
    pageDescription: "Jouni Jokelainen — ICT educator, lecturer, and technology enthusiast.",
    skipLink: "Skip to content",
    languageLabel: "Language",
    sectionNavLabel: "Page sections",
    themeLabel: "Theme",
    themeToggleLabel: "Switch to dark mode",
    lightThemeToggleLabel: "Switch to light mode",
    eyebrow: "ICT educator · lecturer · technology enthusiast",
    summary: "Jouni is a long-time ICT trainer and lecturer at Riveria, the North Karelia education and training consortium.",
    githubLink: "Explore my GitHub profile",
    profileLabel: "Profile",
    profileNote: "North Karelia Municipal Education and Training Consortium, Riveria<br><span>(formerly PKKY)</span>",
    role: "ICT educator and lecturer",
    skillsHeading: "Skills",
    skillsDescription: "Technologies and areas of expertise",
    skillsListLabel: "Skills",
    localNetworks: "Local area networks",
    interestsHeading: "Outside work",
    interestsDescription: "A few interests beyond technology",
    reading: "Reading",
    gym: "Gym training",
    fencing: "Historical fencing",
    footerNote: "Made with curiosity about technology."
  }
};

const languageButtons = document.querySelectorAll("[data-language]");
const themeToggle = document.querySelector(".theme-toggle");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
let currentLanguage = document.documentElement.lang;

function setLanguage(language) {
  const content = translations[language];
  if (!content) {
    return;
  }

  currentLanguage = language;
  document.documentElement.lang = language;
  document.title = content.pageTitle;
  document.querySelector('meta[name="description"]').content = content.pageDescription;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (content[key]) {
      element.innerHTML = content[key];
    }
  });
  document.querySelectorAll("[data-i18n-aria-label]").forEach((element) => {
    const key = element.dataset.i18nAriaLabel;
    if (content[key]) {
      element.setAttribute("aria-label", content[key]);
    }
  });
  themeToggle.setAttribute("aria-label", content[themeToggle.getAttribute("aria-pressed") === "true" ? "lightThemeToggleLabel" : "themeToggleLabel"]);
  languageButtons.forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setTheme(isDark) {
  document.documentElement.dataset.theme = isDark ? "dark" : "light";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", translations[currentLanguage][isDark ? "lightThemeToggleLabel" : "themeToggleLabel"]);
}

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

themeToggle.addEventListener("click", () => {
  const isDark = themeToggle.getAttribute("aria-pressed") !== "true";
  setTheme(isDark);
});

setTheme(systemPrefersDark.matches);
document.querySelector("#year").textContent = String(new Date().getFullYear());
