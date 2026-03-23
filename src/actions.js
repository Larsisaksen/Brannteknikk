import { state, ensureModuleData, resetState } from "./state.js";
import { renderForms } from "./render/forms.js";
import { renderReport } from "./render/report.js";

export function addDeviation(moduleId) {
  ensureModuleData(moduleId).deviations.push({
    floor: "",
    location: "",
    deviation: "",
    images: []
  });

  renderForms();
}

export function removeDeviation(moduleId, index) {
  const list = ensureModuleData(moduleId).deviations;
  list.splice(index, 1);

  if (!list.length) {
    list.push({ floor: "", location: "", deviation: "", images: [] });
  }

  renderForms();
}

export function updateModuleField(moduleId, field, value) {
  ensureModuleData(moduleId)[field] = value;
  renderReport();
}

export function updateDeviationField(moduleId, index, field, value) {
  ensureModuleData(moduleId).deviations[index][field] = value;
  renderReport();
}

export function handleImageUpload(input, moduleId, index) {
  const files = [...input.files];
  if (!files.length) return;

  const target = ensureModuleData(moduleId).deviations[index].images;
  let loaded = 0;

  files.forEach((file) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      target.push(e.target.result);
      loaded++;

      if (loaded === files.length) {
        renderForms();
        renderReport();
      }
    };

    reader.readAsDataURL(file);
  });
}

export function handleCoverUpload(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    state.coverImage = e.target.result;
    renderReport();
  };

  reader.readAsDataURL(file);
}

export function toggleModule(id, checked) {
  if (checked) {
    if (!state.selectedModules.includes(id)) {
      state.selectedModules.push(id);
    }
  } else {
    state.selectedModules = state.selectedModules.filter((x) => x !== id);
  }

  state.selectedModules.sort((a, b) => a - b);
  ensureModuleData(id);

  renderForms();
  renderReport();
}

export function resetApp() {
  document.querySelectorAll("input:not([type=file]), textarea").forEach((el) => {
    el.value = "";
  });

  document.querySelectorAll("select").forEach((sel) => {
    if (sel.id === "docConcept") sel.value = "Nei";
    else if (sel.id === "docDrawings") sel.value = "Delvis";
  });

  document.getElementById("coverImage").value = "";
  resetState();
  renderForms();
  renderReport();
}
