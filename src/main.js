import "./style.css";
import "pagedjs";

import {
  addDeviation,
  removeDeviation,
  updateModuleField,
  updateDeviationField,
  handleImageUpload,
  handleCoverUpload,
  toggleModule,
  resetApp
} from "./actions.js";
import { fillDemo } from "./demo.js";
import { renderForms } from "./render/forms.js";
import { renderReport, renderTripletexAttachment } from "./render/report.js";

let isTripletexPrint = false;

window.appActions = {
  addDeviation,
  removeDeviation,
  updateModuleField,
  updateDeviationField,
  handleImageUpload,
  toggleModule
};

function preparePrintLayout() {
  document.body.classList.add("printing-report");

  if (!isTripletexPrint) {
    renderReport();
  }
}

function cleanupPrintLayout() {
  document.body.classList.remove("printing-report");
}

document.getElementById("coverImage").addEventListener("change", function () {
  handleCoverUpload(this);
});

[
  "buildingName",
  "inspectionDate",
  "owner",
  "ownerRep",
  "address",
  "tenants",
  "buildingType",
  "area",
  "objectRef",
  "fireClass",
  "riskClass",
  "tek",
  "docConcept",
  "docDrawings",
  "docConceptNotes",
  "docDrawingsNotes"
].forEach((id) => {
  document.getElementById(id).addEventListener("input", renderReport);
  document.getElementById(id).addEventListener("change", renderReport);
});

window.addEventListener("beforeprint", preparePrintLayout);
window.addEventListener("afterprint", cleanupPrintLayout);

document.getElementById("updateReportBtn").addEventListener("click", renderReport);
document.getElementById("fillDemoBtn").addEventListener("click", fillDemo);

document.getElementById("tripletexPrintBtn")?.addEventListener("click", () => {
  isTripletexPrint = true;
  const oldTitle = document.title;
  document.title = "";
  document.body.classList.add("printing-report");
  renderTripletexAttachment();

  setTimeout(() => {
    window.print();

    setTimeout(() => {
      isTripletexPrint = false;
      document.title = oldTitle;
      cleanupPrintLayout();
      renderReport();
    }, 500);
  }, 100);
});

document.getElementById("printBtn").addEventListener("click", () => {
  preparePrintLayout();
  window.print();
  setTimeout(cleanupPrintLayout, 500);
});
document.getElementById("resetBtn").addEventListener("click", resetApp);

renderForms();
renderReport();
