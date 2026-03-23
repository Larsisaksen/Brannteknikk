import { moduleDefs } from "../data/moduleDefs.js";
import { state, ensureModuleData } from "../state.js";
import { escapeHtml, chunkRows, statusCell } from "../utils.js";

function renderNotesBox(notes) {
  if (!notes || !notes.trim()) {
    return "";
  }

  return `
    <div class="bulletBox">
      <div style="font-weight:700;margin-bottom:8px;">FRITEKST / KOMMENTAR</div>
      <div style="font-size:11px; line-height:1.5; white-space:pre-wrap;">${escapeHtml(notes)}</div>
    </div>
  `;
}

function renderOtherDeviationsPage(id, def, data) {
  const item = data.deviations[0] || { images: [] };
  const images = item.images || [];

  return `
    <section class="page">
      <div class="modulePageTitle">
        <div>${id}</div>
        <div>${escapeHtml(def.title.toUpperCase())}</div>
      </div>

      <table class="statusTable">
        <tr>
          <td style="width:38%;">KONTROLL UTFØRT</td>
          <td>${data.performed ? "JA" : "NEI"}</td>
        </tr>
        <tr>
          <td>KONTROLL UTFØRT</td>
          ${statusCell(data.summary, "green")}
          ${statusCell(data.summary, "red")}
        </tr>
      </table>

      ${renderNotesBox(data.notes)}

      <table class="deviationTable">
        <tr>
          <th>BILDE</th>
        </tr>
        ${
          images.length
            ? images.map((src) => `
              <tr>
                <td style="text-align:center;">
                  <img class="photo" src="${src}" alt="bilde" />
                </td>
              </tr>
            `).join("")
            : `
              <tr>
                <td style="text-align:center;">
                  <div class="emptyPhoto">Ingen bilde</div>
                </td>
              </tr>
            `
        }
      </table>
    </section>
  `;
}

export function renderCoverPage() {
  const img = state.coverImage
    ? `<img class="heroImg" src="${state.coverImage}" alt="Forsidebilde" />`
    : `<div class="heroImg" style="display:flex;align-items:center;justify-content:center;color:#666;font-size:13px;">Ingen forsidebilde lastet opp</div>`;

  return `
    <section class="page">

      <!-- NY LOGO -->
      <div class="brand">
        <img src="/logo.png" style="width:100%; max-width:300px;" alt="Logo" />
      </div>

      <div class="mainTitle">
        <div class="flame">🔥</div>
        <div>BRANNVERNDOKUMENTASJON</div>
      </div>

      ${img}

      <table class="reportTable">
        <tr>
          <th class="sectionHead" colspan="2">Ansvarlige roller</th>
        </tr>
        <tr>
          <td>Eier</td>
          <td class="center">${escapeHtml(document.getElementById("owner").value || "")}</td>
        </tr>
        <tr>
          <td>Eiers representant</td>
          <td class="center">${escapeHtml(document.getElementById("ownerRep").value || "")}</td>
        </tr>
        <tr>
          <td>Ant leietakere / brukere</td>
          <td class="center">${escapeHtml(document.getElementById("tenants").value || "")}</td>
        </tr>
      </table>

      <table class="reportTable">
        <tr>
          <th class="sectionHead" colspan="2">Dokumenter</th>
        </tr>
        <tr>
          <td>Brannkonsept</td>
          <td class="center">${escapeHtml(document.getElementById("docConcept").value || "")}</td>
        </tr>
        <tr>
          <td>Branntekniske tegninger</td>
          <td class="center">${escapeHtml(document.getElementById("docDrawings").value || "")}</td>
        </tr>
      </table>

      <div class="lawBox">
        <div class="head">Relevante lover, forskrifter eller interne prosedyrer kontrollen bygger på.</div>
        <div class="item">Brann- og eksplosjonsvernloven</div>
        <div class="item">Forskrift om brannforebygging</div>
        <div class="item">Byggteknisk forskrift (TEK) – relevante kapitler</div>
        <div class="item">NS og interne rutiner</div>
      </div>

      <table class="reportTable" style="margin-top:20px;">
        <tr>
          <th class="sectionHead" colspan="2">Bygningsinformasjon</th>
        </tr>
        <tr>
          <td>Bygningsnavn</td>
          <td class="center">${escapeHtml(document.getElementById("buildingName").value || "")}</td>
        </tr>
        <tr>
          <td>Adresse</td>
          <td class="center">${escapeHtml(document.getElementById("address").value || "")}</td>
        </tr>
        <tr>
          <td>Type bygning</td>
          <td class="center">${escapeHtml(document.getElementById("buildingType").value || "")}</td>
        </tr>
        <tr>
          <td>Areal</td>
          <td class="center">${escapeHtml(document.getElementById("area").value || "")}</td>
        </tr>
        <tr>
          <td>Objekt</td>
          <td class="center">${escapeHtml(document.getElementById("objectRef").value || "")}</td>
        </tr>
        <tr>
          <td>Brannklasse</td>
          <td class="center">${escapeHtml(document.getElementById("fireClass").value || "")}</td>
        </tr>
        <tr>
          <td>Risikoklasse</td>
          <td class="center">${escapeHtml(document.getElementById("riskClass").value || "")}</td>
        </tr>
        <tr>
          <td>TEK</td>
          <td class="center">${escapeHtml(document.getElementById("tek").value || "")}</td>
        </tr>
      </table>
    </section>
  `;
}

export function renderSummaryPage() {
  const selected = state.selectedModules.map((id) => {
    const def = moduleDefs.find((m) => m.id === id);
    const data = ensureModuleData(id);

    return `
      <tr>
        <td>${id}</td>
        <td>${escapeHtml(def.title)}</td>
        <td class="${data.summary === "green" ? "statusGreen" : "statusRed"} summaryStatus">X</td>
      </tr>
    `;
  }).join("");

  return `
    <section class="page">
      <table class="reportTable moduleSummaryTable">
        <tr>
          <th class="sectionHead" colspan="3">Branntekniske installasjoner som inngår i kontroll</th>
        </tr>
        <tr>
          <td colspan="3" class="center">
            <strong>x= utført</strong> &nbsp;&nbsp; rød= registrerte avvik &nbsp;&nbsp; grønn= ingen registrerte avvik
          </td>
        </tr>
        ${selected || '<tr><td>–</td><td>Ingen kontrollpunkter valgt</td><td></td></tr>'}
      </table>
    </section>
  `;
}

export function modulePages() {
  const pages = [];

  state.selectedModules.forEach((id) => {
    const def = moduleDefs.find((m) => m.id === id);
    const data = ensureModuleData(id);

    if (id === 18) {
      pages.push(renderOtherDeviationsPage(id, def, data));
      return;
    }

    const rows = data.deviations.filter(
      (d) => d.floor || d.location || d.deviation || (d.images && d.images.length)
    );
    const groups = chunkRows(
      rows.length ? rows : [{ floor: "", location: "", deviation: "", images: [] }]
    );

    groups.forEach((group, groupIndex) => {
      const includeBullets = groupIndex === 0;

      const rowsHtml = group.map((d) => `
        <tr>
          <td>${escapeHtml(d.floor || "")}</td>
          <td>${escapeHtml(d.location || "")}</td>
          <td>${escapeHtml(d.deviation || "")}</td>
          <td>${(d.images && d.images.length)
            ? `<img class="photo" src="${d.images[0]}" alt="bilde" />`
            : '<div class="emptyPhoto">Ingen bilde</div>'}</td>
        </tr>
      `).join("");

      pages.push(`
        <section class="page">
          <div class="modulePageTitle">
            <div>${id}</div>
            <div>${escapeHtml(def.title.toUpperCase())}</div>
          </div>

          ${includeBullets ? `
            <div class="bulletBox">
              <ul>${def.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>
            </div>

            <table class="statusTable">
              <tr>
                <td style="width:38%;">KONTROLL UTFØRT</td>
                <td>${data.performed ? "JA" : "NEI"}</td>
              </tr>
              <tr>
                <td>KONTROLL UTFØRT</td>
                ${statusCell(data.summary, "green")}
                ${statusCell(data.summary, "red")}
              </tr>
            </table>

            ${renderNotesBox(data.notes)}
          ` : `
            <div class="pageSpacer"></div>
          `}

          <table class="deviationTable">
            <tr>
              <th>ETG</th>
              <th>PLASSERING</th>
              <th>AVVIK</th>
              <th>BILDE</th>
            </tr>
            ${rowsHtml}
          </table>
        </section>
      `);
    });
  });

  return pages.join("");
}

export function renderReport() {
  document.getElementById("pages").innerHTML = `
    <article class="reportDocument">
      ${renderCoverPage()}
      ${renderSummaryPage()}
      ${modulePages()}
    </article>
  `;
}
