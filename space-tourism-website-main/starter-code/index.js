const routes = {
  home: "index.html",
  destination: "destination-moon.html",
  crew: "crew-commander.html",
  technology: "technology-vehicle.html"
};

const destinationPages = [
  { name: "Moon", route: "destination-moon.html" },
  { name: "Mars", route: "destination-mars.html" },
  { name: "Europa", route: "destination-europa.html" },
  { name: "Titan", route: "destination-titan.html" }
];

const crewPages = [
  { name: "Douglas Hurley", route: "crew-commander.html" },
  { name: "Mark Shuttleworth", route: "crew-specialist.html" },
  { name: "Victor Glover", route: "crew-pilot.html" },
  { name: "Anousheh Ansari", route: "crew-engineer.html" }
];

const technologyPages = [
  { name: "Launch vehicle", route: "technology-vehicle.html" },
  { name: "Spaceport", route: "technology-spaceport.html" },
  { name: "Space capsule", route: "technology-capsule.html" }
];

const app = document.querySelector("#app");
const page = document.body.dataset.page;
const pageType = page === "home" ? "home" : page.split("-")[0];

function renderHeader() {
  const links = [
    ["home", "00", "HOME"],
    ["destination", "01", "DESTINATION"],
    ["crew", "02", "CREW"],
    ["technology", "03", "TECHNOLOGY"]
  ];

  return `
    <header class="site-header">
      <a class="brand" href="${routes.home}" aria-label="Space tourism home">
        <img src="./assets/shared/logo.svg" alt="">
      </a>
      <button class="menu-toggle" type="button" aria-label="Open navigation"
        aria-expanded="false" aria-controls="primary-navigation">
        <span class="menu-icon" aria-hidden="true"></span>
      </button>
      <nav class="primary-navigation" id="primary-navigation" aria-label="Primary navigation">
        ${links.map(([key, number, label]) => `
          <a href="${routes[key]}" ${key === pageType ? 'aria-current="page"' : ""}>
            <span>${number}</span>${label}
          </a>
        `).join("")}
      </nav>
    </header>
  `;
}

function renderHome() {
  return `
    ${renderHeader()}
    <main class="page-main home-main">
      <div class="home-copy">
        <p class="eyebrow">So, you want to travel to</p>
        <h1>Space</h1>
        <p>
          Let’s face it: if you want to go to space, you might as well genuinely
          go to outer space and not hover kind of on the edge of it. Well, sit
          back and relax because we’ll give you a truly out-of-this-world
          experience.
        </p>
      </div>
      <a class="explore-link" href="${routes.destination}">Explore</a>
    </main>
  `;
}

function renderDestination(data) {
  const current = destinationPages.findIndex((item) => item.route === page + ".html");
  const destination = data.destinations[current];

  return `
    ${renderHeader()}
    <main class="page-main">
      <h1 class="page-heading"><span>01</span>Pick your destination</h1>
      <div class="destination-layout">
        <div class="destination-art">
          <picture>
            <source srcset="${destination.images.webp}" type="image/webp">
            <img src="${destination.images.png}" alt="${destination.name}">
          </picture>
        </div>
        <section class="destination-copy" aria-labelledby="destination-name">
          <nav class="destination-tabs" aria-label="Choose a destination">
            ${destinationPages.map((item) => `
              <a href="${item.route}" ${item.name === destination.name ? 'aria-current="page"' : ""}>
                ${item.name}
              </a>
            `).join("")}
          </nav>
          <h2 id="destination-name">${destination.name}</h2>
          <p>${destination.description}</p>
          <dl class="destination-stats">
            <div>
              <dt>Avg. distance</dt>
              <dd>${destination.distance}</dd>
            </div>
            <div>
              <dt>Est. travel time</dt>
              <dd>${destination.travel}</dd>
            </div>
          </dl>
        </section>
      </div>
    </main>
  `;
}

function renderCrew(data) {
  const current = crewPages.findIndex((item) => item.route === page + ".html");
  const member = data.crew[current];

  return `
    ${renderHeader()}
    <main class="page-main">
      <h1 class="page-heading"><span>02</span>Meet your crew</h1>
      <div class="crew-layout">
        <section class="crew-copy" aria-labelledby="crew-name">
          <p class="crew-role">${member.role}</p>
          <h2 id="crew-name">${member.name}</h2>
          <p>${member.bio}</p>
          <nav class="crew-tabs" aria-label="Choose a crew member">
            ${crewPages.map((item) => `
              <a href="${item.route}" aria-label="${item.name}"
                ${item.name === member.name ? 'aria-current="page"' : ""}></a>
            `).join("")}
          </nav>
        </section>
        <div class="crew-art">
          <picture>
            <source srcset="${member.images.webp}" type="image/webp">
            <img src="${member.images.png}" alt="${member.name}">
          </picture>
        </div>
      </div>
    </main>
  `;
}

function renderTechnology(data) {
  const current = technologyPages.findIndex((item) => item.route === page + ".html");
  const technology = data.technology[current];

  return `
    ${renderHeader()}
    <main class="page-main">
      <h1 class="page-heading"><span>03</span>Space launch 101</h1>
      <div class="technology-layout">
        <div class="technology-story">
          <nav class="technology-tabs" aria-label="Choose a technology">
            ${technologyPages.map((item, index) => `
              <a href="${item.route}" aria-label="${item.name}"
                ${item.name === technology.name ? 'aria-current="page"' : ""}>${index + 1}</a>
            `).join("")}
          </nav>
          <section class="technology-copy" aria-labelledby="technology-name">
            <p class="eyebrow">The terminology...</p>
            <h2 id="technology-name">${technology.name}</h2>
            <p>${technology.description}</p>
          </section>
        </div>
        <picture class="technology-art">
          <source media="(max-width: 1000px)" srcset="${technology.images.landscape}">
          <img src="${technology.images.portrait}" alt="${technology.name}">
        </picture>
      </div>
    </main>
  `;
}

function setupNavigation() {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");

  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

async function initializePage() {
  if (page === "home") {
    app.innerHTML = renderHome();
    setupNavigation();
    return;
  }

  try {
    const response = await fetch("./data.json");
    if (!response.ok) {
      throw new Error(`Could not load the project data (${response.status}).`);
    }

    const data = await response.json();
    if (!data.destinations || !data.crew || !data.technology) {
      throw new Error("The project data is missing a destination, crew, or technology list.");
    }

    if (pageType === "destination") app.innerHTML = renderDestination(data);
    else if (pageType === "crew") app.innerHTML = renderCrew(data);
    else if (pageType === "technology") app.innerHTML = renderTechnology(data);
    else throw new Error(`Unknown page: ${page}`);

    setupNavigation();
  } catch (error) {
    const message = error instanceof Error ? error.message : "An unexpected error occurred.";
    app.innerHTML = "";
    const errorMessage = document.createElement("p");
    errorMessage.className = "load-error";
    errorMessage.textContent = `${message} Run this project with a local web server (for example, VS Code Live Server) and reload.`;
    app.append(errorMessage);
    console.error("Unable to initialize the space tourism page.", error);
  }
}

initializePage();
