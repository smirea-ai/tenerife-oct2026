(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`dated_events`,`surfing`,`sup`,`scuba`,`kayak`,`snorkeling`,`whale_dolphin`,`hiking`,`paragliding`,`buggy_jeep`,`jet_ski`,`stargazing`,`markets`,`day_trips`,`nightlife`],t={dated_events:{title:`Dated events`,blurb:`One-off happenings inside the Oct 4–20 window. Highlighted picks: elrow XXL (10 Oct), Cross Villa de Adeje (11 Oct), Eólica (16–17 Oct).`},surfing:{title:`Surfing`,blurb:`Private beginner lessons already planned — keep these ranked options for booking or backup.`},sup:{title:`SUP / Paddleboard`,blurb:`Sheltered south-coast beginner paddling.`},scuba:{title:`Scuba diving`,blurb:`Discover / intro dives near Los Cristianos.`},kayak:{title:`Kayaking`,blurb:`Coast and cliffs from Palm-Mar and Los Cristianos.`},snorkeling:{title:`Snorkeling`,blurb:`Beach and boat options near Palm-Mar.`},whale_dolphin:{title:`Whale & dolphin / catamaran`,blurb:`Eco and classic south-coast boat trips.`},hiking:{title:`Hiking`,blurb:`Teide and Masca are day-reachable; Anaga is north-only.`},paragliding:{title:`Paragliding`,blurb:`Tandem flights over the Adeje corridor.`},buggy_jeep:{title:`Buggy / Jeep / Quad`,blurb:`Off-road south-coast loops and Teide quad tours.`},jet_ski:{title:`Jet ski`,blurb:`Guided safaris from Puerto Colón, no licence needed.`},stargazing:{title:`Stargazing`,blurb:`Teide sunset + stars evenings.`},markets:{title:`Markets`,blurb:`Local south markets for an easy half-day.`},day_trips:{title:`Day trips`,blurb:`Bigger south-friendly outings and parks.`},nightlife:{title:`Nightlife`,blurb:`Bars and beachfront near the base corridor.`}},n=new Set([`event-elrow-xxl-2026-10-10`,`event-cross-adeje-2026-10-11`,`event-eolica-2026-10-16-17`]);function r(e){let t=`${e.area||``} ${e.notes||``} ${e.summary||``}`.toLowerCase();return t.includes(`north-only`)||t.includes(`north only`)||e.id===`hike-anaga`||(e.area||``).includes(`NORTH-ONLY`)}function i(e){if(!e||!e.length)return null;let t=new Intl.DateTimeFormat(`en-GB`,{weekday:`short`,day:`numeric`,month:`short`,year:`numeric`,timeZone:`Atlantic/Canary`});return e.map(e=>t.format(new Date(`${e}T12:00:00`))).join(` · `)}function a(e){return String(e??``).replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`)}function o(e){let t=n.has(e.id),o=r(e),s=e.scheduleType===`dated`,c=e.id===`surf-kaizen-private`,l=i(e.dates),u=[`<span class="badge badge-rank">#${e.rank}</span>`,s?`<span class="badge badge-dated">Dated</span>`:`<span class="badge badge-ongoing">Ongoing</span>`];t&&u.push(`<span class="badge badge-highlight">Trip highlight</span>`),o&&u.push(`<span class="badge badge-north">North-only</span>`),c&&u.push(`<span class="badge badge-planned">Already planned</span>`);let d=[`card`];return t&&d.push(`is-highlight`),s&&d.push(`is-dated`),`
    <article class="${d.join(` `)}" data-id="${a(e.id)}">
      <div class="card__top">${u.join(``)}</div>
      <h3 class="card__name">${a(e.name)}</h3>
      <p class="card__summary">${a(e.summary)}</p>
      <div class="meta">
        <div class="meta__row"><span class="meta__label">Area</span><span class="meta__value">${a(e.area)}</span></div>
        <div class="meta__row"><span class="meta__label">Duration</span><span class="meta__value">${a(e.duration)}</span></div>
        <div class="meta__row"><span class="meta__label">Price</span><span class="meta__value">${a(e.price)}</span></div>
        ${e.rating?`<div class="meta__row"><span class="meta__label">Rating</span><span class="meta__value">${a(e.rating)}</span></div>`:``}
        ${l?`<div class="meta__row"><span class="meta__label">When</span><span class="meta__value">${a(l)}</span></div>`:``}
      </div>
      ${e.notes?`<p class="card__notes">${a(e.notes)}</p>`:``}
      <div class="card__actions">
        <a class="btn" href="${a(e.url)}" target="_blank" rel="noopener noreferrer">
          Book / info <span aria-hidden="true">↗</span>
        </a>
        ${e.mapsUrl?`<a class="btn btn--ghost" href="${a(e.mapsUrl)}" target="_blank" rel="noopener noreferrer">Map <span aria-hidden="true">↗</span></a>`:``}
      </div>
    </article>
  `}function s(t){let n=new Map;for(let t of e)n.set(t,[]);for(let e of t)n.has(e.category)||n.set(e.category,[]),n.get(e.category).push(e);for(let[,e]of n)e.sort((e,t)=>e.rank-t.rank);return n}function c(e){let n=document.getElementById(`cat-nav-inner`);n.innerHTML=e.map(e=>`<a href="#cat-${e}">${a((t[e]||{title:e}).title)}</a>`).join(``);let r=[...n.querySelectorAll(`a`)],i=e.map(e=>document.getElementById(`cat-${e}`)).filter(Boolean),o=new IntersectionObserver(e=>{let t=e.filter(e=>e.isIntersecting).sort((e,t)=>t.intersectionRatio-e.intersectionRatio)[0];if(!t)return;let n=t.target.id.replace(`cat-`,``);r.forEach(e=>e.classList.toggle(`is-active`,e.getAttribute(`href`)===`#cat-${n}`))},{rootMargin:`-20% 0px -65% 0px`,threshold:[.1,.4,.7]});i.forEach(e=>o.observe(e))}function l(e,t){return e?`<a href="${a(e)}" target="_blank" rel="noopener noreferrer">${t}</a>`:``}function u(e){return e.length?`
    <details class="checked">
      <summary>Everything checked (${e.length})</summary>
      <div class="checked__wrap">
        <table>
          <thead><tr><th>Name</th><th>Link</th><th>Map</th><th>Reason</th></tr></thead>
          <tbody>
            ${e.map(e=>`<tr><td>${a(e.name)}</td><td>${l(e.url,`link`)}</td><td>${l(e.mapsUrl,`map`)}</td><td>${a(e.reason)}</td></tr>`).join(``)}
          </tbody>
        </table>
      </div>
    </details>
  `:``}function d(n,r=[]){let i=s(n),l=e.filter(e=>(i.get(e)||[]).length>0),d=document.getElementById(`app`);d.innerHTML=l.map(e=>{let n=t[e]||{title:e,blurb:``},r=i.get(e);return`
        <section class="category" id="cat-${e}">
          <div class="category__head">
            <h2 class="category__title">${a(n.title)}</h2>
            <span class="category__count">${r.length} option${r.length===1?``:`s`}</span>
          </div>
          ${n.blurb?`<p class="category__blurb">${a(n.blurb)}</p>`:``}
          <div class="grid">
            ${r.map(o).join(``)}
          </div>
        </section>
      `}).join(``)+u(r),c(l)}async function f(){try{let e=await fetch(`/tenerife-oct2026/activities.json`);if(!e.ok)throw Error(`Failed to load activities (${e.status})`);d(await e.json(),await fetch(`/tenerife-oct2026/checked.json`).then(e=>e.ok?e.json():[]).catch(()=>[]))}catch(e){document.getElementById(`app`).innerHTML=`<p class="loading">Could not load activities: ${a(e.message)}</p>`}}f();