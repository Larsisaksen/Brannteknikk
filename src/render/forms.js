import { moduleDefs } from "../data/moduleDefs.js";
import { state, ensureModuleData } from "../state.js";
import { escapeHtml } from "../utils.js";

function renderStandardModule(id, def, data) {
  return `
    <div class="moduleForm">
      <div class="moduleHeader">
        <div>
          <h3>${id}. ${def.title}</h3>
          <div class="tiny muted">Kun dette skjemaet kommer med i rapporten når punktet er valgt.</div>
        </div>
        <span class="pill">${data.deviations.length} avvik</span>
      </div>

      <div class="row2">
        <div>
          <label>Kontroll utført</label>
          <select onchange="window.appActions.updateModuleField(${id}, 'performed', this.value === 'true')">
            <option value="true" ${data.performed ? "selected" : ""}>Ja</option>
            <option value="false" ${!data.performed ? "selected" : ""}>Nei</option>
          </select>
        </div>

        <div>
          <label>Oppsummering</label>
          <select onchange="window.appActions.updateModuleField(${id}, 'summary', this.value)">
            <option value="green" ${data.summary === "green" ? "selected" : ""}>Ingen registrerte avvik</option>
            <option value="red" ${data.summary === "red" ? "selected" : ""}>Registrerte avvik</option>
          </select>
        </div>
      </div>

      <div>
        <label>Fritekst / kommentar</label>
        <textarea
          oninput="window.appActions.updateModuleField(${id}, 'notes', this.value)"
          placeholder="Skriv valgfri kommentar for dette kontrollpunktet"
        >${escapeHtml(data.notes || "")}</textarea>
      </div>

      ${data.deviations.map((d, idx) => `
        <div class="findingCard">
          <h4>Avvik ${idx + 1}</h4>

          <div class="row3">
            <div>
              <label>Etg</label>
              <input
                value="${escapeHtml(d.floor)}"
                oninput="window.appActions.updateDeviationField(${id}, ${idx}, 'floor', this.value)"
                placeholder="F.eks. 2"
              />
            </div>

            <div>
              <label>Plassering</label>
              <input
                value="${escapeHtml(d.location)}"
                oninput="window.appActions.updateDeviationField(${id}, ${idx}, 'location', this.value)"
                placeholder="F.eks. Kiwi - lager"
              />
            </div>

            <div>
              <label>Avvik</label>
              <input
                value="${escapeHtml(d.deviation)}"
                oninput="window.appActions.updateDeviationField(${id}, ${idx}, 'deviation', this.value)"
                placeholder="Kort tekst"
              />
            </div>
          </div>

          <div class="uploadBox">
            <label>Bilder for dette avviket</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onchange="window.appActions.handleImageUpload(this, ${id}, ${idx})"
            />
            <div class="tiny muted">
              Fungerer både for opplasting og mobilkamera dersom enheten tilbyr kamera i filvelgeren.
            </div>
            <div class="thumbs">
              ${d.images.map((src) => `<img src="${src}" alt="avviksbilde" />`).join("")}
            </div>
          </div>

          <div class="btnRow">
            <button type="button" class="btnGhost" onclick="window.appActions.removeDeviation(${id}, ${idx})">
              Slett avvik
            </button>
          </div>
        </div>
      `).join("")}

      <div class="btnRow">
        <button type="button" class="btnSecondary" onclick="window.appActions.addDeviation(${id})">
          Legg til avvik
        </button>
      </div>
    </div>
  `;
}

function renderOtherDeviationsModule(id, def, data) {
  const item = data.deviations[0] || { images: [] };

  return `
    <div class="moduleForm">
      <div class="moduleHeader">
        <div>
          <h3>${id}. ${def.title}</h3>
          <div class="tiny muted">Her kan du kun legge inn fritekst og laste opp bilde.</div>
        </div>
        <span class="pill">Fritekst + bilde</span>
      </div>

      <div class="row2">
        <div>
          <label>Kontroll utført</label>
          <select onchange="window.appActions.updateModuleField(${id}, 'performed', this.value === 'true')">
            <option value="true" ${data.performed ? "selected" : ""}>Ja</option>
            <option value="false" ${!data.performed ? "selected" : ""}>Nei</option>
          </select>
        </div>

        <div>
          <label>Oppsummering</label>
          <select onchange="window.appActions.updateModuleField(${id}, 'summary', this.value)">
            <option value="green" ${data.summary === "green" ? "selected" : ""}>Ingen registrerte avvik</option>
            <option value="red" ${data.summary === "red" ? "selected" : ""}>Registrerte avvik</option>
          </select>
        </div>
      </div>

      <div>
        <label>Fritekst / andre avvik</label>
        <textarea
          oninput="window.appActions.updateModuleField(${id}, 'notes', this.value)"
          placeholder="Skriv fritekst for andre avvik"
        >${escapeHtml(data.notes || "")}</textarea>
      </div>

      <div class="findingCard">
        <div class="uploadBox">
          <label>Bilder</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onchange="window.appActions.handleImageUpload(this, ${id}, 0)"
          />
          <div class="tiny muted">
            Fungerer både for opplasting og mobilkamera dersom enheten tilbyr kamera i filvelgeren.
          </div>
          <div class="thumbs">
            ${(item.images || []).map((src) => `<img src="${src}" alt="avviksbilde" />`).join("")}
          </div>
        </div>
      </div>
    </div>
  `;
}

export function moduleOptionsMarkup() {
  return moduleDefs.map((m) => `
    <label class="moduleOption">
      <input
        type="checkbox"
        ${state.selectedModules.includes(m.id) ? "checked" : ""}
        onchange="window.appActions.toggleModule(${m.id}, this.checked)"
      />
      <div>
        <strong>${m.id}. ${m.title}</strong>
        <span>${m.bullets.length} kontrollpunkter i standardsjekklisten</span>
      </div>
    </label>
  `).join("");
}

export function moduleFormsMarkup() {
  if (!state.selectedModules.length) {
    return '<div class="muted small">Ingen kontrollpunkter valgt ennå.</div>';
  }

  return state.selectedModules.map((id) => {
    const def = moduleDefs.find((x) => x.id === id);
    const data = ensureModuleData(id);

    if (id === 18) {
      return renderOtherDeviationsModule(id, def, data);
    }

    return renderStandardModule(id, def, data);
  }).join("");
}

export function renderForms() {
  document.getElementById("moduleOptions").innerHTML = moduleOptionsMarkup();
  document.getElementById("moduleForms").innerHTML = moduleFormsMarkup();
}
