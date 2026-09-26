const CATEGORY_ORDER = [
  "dated_events",
  "surfing",
  "sup",
  "scuba",
  "kayak",
  "snorkeling",
  "whale_dolphin",
  "hiking",
  "paragliding",
  "buggy_jeep",
  "jet_ski",
  "stargazing",
  "markets",
  "day_trips",
  "nightlife",
];

const CATEGORY_META = {
  dated_events: {
    title: "Dated events",
    blurb: "One-off happenings inside the Oct 4–20 window. Highlighted picks: elrow XXL (10 Oct), Cross Villa de Adeje (11 Oct), Eólica (16–17 Oct).",
  },
  surfing: {
    title: "Surfing",
    blurb: "Private beginner lessons already planned — keep these ranked options for booking or backup.",
  },
  sup: { title: "SUP / Paddleboard", blurb: "Sheltered south-coast beginner paddling." },
  scuba: { title: "Scuba diving", blurb: "Discover / intro dives near Los Cristianos." },
  kayak: { title: "Kayaking", blurb: "Coast and cliffs from Palm-Mar and Los Cristianos." },
  snorkeling: { title: "Snorkeling", blurb: "Beach and boat options near Palm-Mar." },
  whale_dolphin: { title: "Whale & dolphin / catamaran", blurb: "Eco and classic south-coast boat trips." },
  hiking: { title: "Hiking", blurb: "Teide and Masca are day-reachable; Anaga is north-only." },
  paragliding: { title: "Paragliding", blurb: "Tandem flights over the Adeje corridor." },
  buggy_jeep: { title: "Buggy / Jeep / Quad", blurb: "Off-road south-coast loops and Teide quad tours." },
  jet_ski: { title: "Jet ski", blurb: "Guided safaris from Puerto Colón, no licence needed." },
  stargazing: { title: "Stargazing", blurb: "Teide sunset + stars evenings." },
  markets: { title: "Markets", blurb: "Local south markets for an easy half-day." },
  day_trips: { title: "Day trips", blurb: "Bigger south-friendly outings and parks." },
  nightlife: { title: "Nightlife", blurb: "Bars and beachfront near the base corridor." },
};

const HIGHLIGHT_IDS = new Set([
  "event-elrow-xxl-2026-10-10",
  "event-cross-adeje-2026-10-11",
  "event-eolica-2026-10-16-17",
]);

function isNorthOnly(item) {
  const blob = `${item.area || ""} ${item.notes || ""} ${item.summary || ""}`.toLowerCase();
  return (
    blob.includes("north-only") ||
    blob.includes("north only") ||
    (item.id === "hike-anaga") ||
    (item.area || "").includes("NORTH-ONLY")
  );
}

function formatDates(dates) {
  if (!dates || !dates.length) return null;
  const fmt = new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Atlantic/Canary",
  });
  return dates
    .map((d) => fmt.format(new Date(`${d}T12:00:00`)))
    .join(" · ");
}

function escapeHtml(str) {
  return String(str ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderCard(item) {
  const highlight = HIGHLIGHT_IDS.has(item.id);
  const north = isNorthOnly(item);
  const dated = item.scheduleType === "dated";
  const plannedSurf = item.id === "surf-kaizen-private";
  const dateLabel = formatDates(item.dates);

  const badges = [
    `<span class="badge badge-rank">#${item.rank}</span>`,
    dated
      ? `<span class="badge badge-dated">Dated</span>`
      : `<span class="badge badge-ongoing">Ongoing</span>`,
  ];
  if (highlight) badges.push(`<span class="badge badge-highlight">Trip highlight</span>`);
  if (north) badges.push(`<span class="badge badge-north">North-only</span>`);
  if (plannedSurf) badges.push(`<span class="badge badge-planned">Already planned</span>`);

  const classes = ["card"];
  if (highlight) classes.push("is-highlight");
  if (dated) classes.push("is-dated");

  return `
    <article class="${classes.join(" ")}" data-id="${escapeHtml(item.id)}">
      <div class="card__top">${badges.join("")}</div>
      <h3 class="card__name">${escapeHtml(item.name)}</h3>
      <p class="card__summary">${escapeHtml(item.summary)}</p>
      <div class="meta">
        <div class="meta__row"><span class="meta__label">Area</span><span class="meta__value">${escapeHtml(item.area)}</span></div>
        <div class="meta__row"><span class="meta__label">Duration</span><span class="meta__value">${escapeHtml(item.duration)}</span></div>
        <div class="meta__row"><span class="meta__label">Price</span><span class="meta__value">${escapeHtml(item.price)}</span></div>
        ${
          item.rating
            ? `<div class="meta__row"><span class="meta__label">Rating</span><span class="meta__value">${escapeHtml(item.rating)}</span></div>`
            : ""
        }
        ${
          dateLabel
            ? `<div class="meta__row"><span class="meta__label">When</span><span class="meta__value">${escapeHtml(dateLabel)}</span></div>`
            : ""
        }
      </div>
      ${item.notes ? `<p class="card__notes">${escapeHtml(item.notes)}</p>` : ""}
      <div class="card__actions">
        <a class="btn" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
          Book / info <span aria-hidden="true">↗</span>
        </a>
        ${item.mapsUrl ? `<a class="btn btn--ghost" href="${escapeHtml(item.mapsUrl)}" target="_blank" rel="noopener noreferrer">Map <span aria-hidden="true">↗</span></a>` : ""}
      </div>
    </article>
  `;
}

function groupByCategory(items) {
  const map = new Map();
  for (const cat of CATEGORY_ORDER) map.set(cat, []);
  for (const item of items) {
    if (!map.has(item.category)) map.set(item.category, []);
    map.get(item.category).push(item);
  }
  for (const [, list] of map) list.sort((a, b) => a.rank - b.rank);
  return map;
}

function renderNav(categoriesPresent) {
  const nav = document.getElementById("cat-nav-inner");
  nav.innerHTML = categoriesPresent
    .map((cat) => {
      const meta = CATEGORY_META[cat] || { title: cat };
      return `<a href="#cat-${cat}">${escapeHtml(meta.title)}</a>`;
    })
    .join("");

  const links = [...nav.querySelectorAll("a")];
  const sections = categoriesPresent.map((c) => document.getElementById(`cat-${c}`)).filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const id = visible.target.id.replace("cat-", "");
      links.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === `#cat-${id}`));
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.4, 0.7] }
  );
  sections.forEach((s) => observer.observe(s));
}

function link(url, label) {
  return url ? `<a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${label}</a>` : "";
}

function renderChecked(rows) {
  if (!rows.length) return "";
  return `
    <details class="checked">
      <summary>Everything checked (${rows.length})</summary>
      <div class="checked__wrap">
        <table>
          <thead><tr><th>Name</th><th>Link</th><th>Map</th><th>Reason</th></tr></thead>
          <tbody>
            ${rows
              .map(
                (r) =>
                  `<tr><td>${escapeHtml(r.name)}</td><td>${link(r.url, "link")}</td><td>${link(r.mapsUrl, "map")}</td><td>${escapeHtml(r.reason)}</td></tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>
    </details>
  `;
}

function renderApp(items, checked = []) {
  const grouped = groupByCategory(items);
  const present = CATEGORY_ORDER.filter((c) => (grouped.get(c) || []).length > 0);
  const app = document.getElementById("app");

  app.innerHTML = present
    .map((cat) => {
      const meta = CATEGORY_META[cat] || { title: cat, blurb: "" };
      const list = grouped.get(cat);
      return `
        <section class="category" id="cat-${cat}">
          <div class="category__head">
            <h2 class="category__title">${escapeHtml(meta.title)}</h2>
            <span class="category__count">${list.length} option${list.length === 1 ? "" : "s"}</span>
          </div>
          ${meta.blurb ? `<p class="category__blurb">${escapeHtml(meta.blurb)}</p>` : ""}
          <div class="grid">
            ${list.map(renderCard).join("")}
          </div>
        </section>
      `;
    })
    .join("") + renderChecked(checked);

  renderNav(present);
}

async function main() {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}activities.json`);
    if (!res.ok) throw new Error(`Failed to load activities (${res.status})`);
    const items = await res.json();
    const checked = await fetch(`${import.meta.env.BASE_URL}checked.json`)
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []);
    renderApp(items, checked);
  } catch (err) {
    document.getElementById("app").innerHTML = `<p class="loading">Could not load activities: ${escapeHtml(err.message)}</p>`;
  }
}

main();
