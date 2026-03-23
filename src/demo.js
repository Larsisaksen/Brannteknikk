import { state, ensureModuleData } from "./state.js";
import { renderForms } from "./render/forms.js";
import { renderReport } from "./render/report.js";

export function fillDemo() {
  document.getElementById("buildingName").value = "SAMEIET STADIONBYGG";
  document.getElementById("inspectionDate").value = "2026-03-12";
  document.getElementById("owner").value = "SAMEIET STADIONBYGG";
  document.getElementById("ownerRep").value = "RIKKE B. MOEN";
  document.getElementById("address").value = "Fridtjof Nansens Gate 21/23";
  document.getElementById("tenants").value = "6";
  document.getElementById("buildingType").value = "KONTOR / LAGER / HANDEL";
  document.getElementById("area").value = "2300 KVM";
  document.getElementById("objectRef").value = "A";
  document.getElementById("fireClass").value = "1";
  document.getElementById("riskClass").value = "5";
  document.getElementById("tek").value = "87/10";
  document.getElementById("docConcept").value = "Nei";
  document.getElementById("docDrawings").value = "Delvis";

  state.selectedModules = [1, 2, 3, 4, 5, 11];
  state.moduleData = {};
  state.selectedModules.forEach((id) => ensureModuleData(id));

  state.moduleData[1].summary = "red";
  state.moduleData[1].deviations = [
    {
      floor: "1",
      location: "ODD STADION",
      deviation: "SLOKKER V / GARDEROBER. MANGLER ETTERLYSENDE SKILT. (AVVIK ETABLERT 2024)",
      images: []
    }
  ];

  state.moduleData[2].summary = "red";
  state.moduleData[2].deviations = [
    {
      floor: "1",
      location: "KIWI - LAGER",
      deviation: "DET LAGRES FORRAN BRANNPOST",
      images: []
    },
    {
      floor: "1",
      location: "KIWI - BUTIKK",
      deviation: "DET LAGRES FORRAN BRANNPOST",
      images: []
    }
  ];

  state.moduleData[3].summary = "red";
  state.moduleData[3].deviations = [
    {
      floor: "1",
      location: "KIWI - LAGER - VAREMOTTAK",
      deviation: "LAMPE PÅ SKILT FOR RØMNING LYSER RØDT",
      images: []
    }
  ];

  state.moduleData[4].summary = "green";
  state.moduleData[4].deviations = [
    { floor: "", location: "", deviation: "", images: [] }
  ];

  state.moduleData[5].summary = "red";
  state.moduleData[5].deviations = [
    {
      floor: "2",
      location: "LEDIG LOKALE V / LEGKONTOR",
      deviation: "LAGRING I RØMNINGSVEI",
      images: []
    },
    {
      floor: "",
      location: "DIVERSE STEDER",
      deviation: "DET LAGRES BRENNBART I TRAPPEROM / RØMNINGSVEIER",
      images: []
    }
  ];

  state.moduleData[11].summary = "red";
  state.moduleData[11].deviations = [
    {
      floor: "2",
      location: "LEGEKONTOR",
      deviation: "KUN ÉN RØMNINGSVEI SÅ LENGE DØR TIL TOMT LOKALE ER STENGT",
      images: []
    }
  ];

  renderForms();
  renderReport();
}
