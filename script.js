const sectionIndicator = document.querySelector("#section-indicator");
const sectionLinks = [...document.querySelectorAll(".nav a")];
const sections = [...document.querySelectorAll("[data-section-name]")];
const revealItems = [...document.querySelectorAll(".reveal")];
const sceneTabs = [...document.querySelectorAll(".scene-tab")];
const scenePanels = [...document.querySelectorAll("[data-scene-panel]")];

const sectionMap = new Map(
  sectionLinks.map((link) => [link.getAttribute("href"), link])
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visibleEntry = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleEntry) return;

    const sectionName = visibleEntry.target.dataset.sectionName;
    sectionIndicator.textContent = sectionName;

    sectionLinks.forEach((link) => link.classList.remove("is-active"));

    if (visibleEntry.target.id) {
      const activeLink = sectionMap.get(`#${visibleEntry.target.id}`);
      if (activeLink) activeLink.classList.add("is-active");
    }
  },
  { threshold: [0.2, 0.45, 0.7] }
);

sections.forEach((section) => sectionObserver.observe(section));

sceneTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetScene = tab.dataset.scene;

    sceneTabs.forEach((item) => item.classList.toggle("is-active", item === tab));
    scenePanels.forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.scenePanel === targetScene);
    });
  });
});
