import "./style.css";

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
import { renderReport } from "./render/report.js";

window.appActions = {
  addDeviation,
  removeDeviation,
  updateModuleField,
  updateDeviationField,
  handleImageUpload,
  toggleModule
};

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
  "docDrawings"
].forEach((id) => {
  document.getElementById(id).addEventListener("input", renderReport);
  document.getElementById(id).addEventListener("change", renderReport);
});

document.getElementById("updateReportBtn").addEventListener("click", renderReport);
document.getElementById("fillDemoBtn").addEventListener("click", fillDemo);
document.getElementById("printBtn").addEventListener("click", () => window.print());
document.getElementById("resetBtn").addEventListener("click", resetApp);

renderForms();
renderReport();
