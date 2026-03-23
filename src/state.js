export const state = {
  selectedModules: [],
  moduleData: {},
  coverImage: ""
};

export function ensureModuleData(id) {
  if (!state.moduleData[id]) {
    state.moduleData[id] = {
      performed: true,
      summary: "red",
      notes: "",
      deviations: [{ floor: "", location: "", deviation: "", images: [] }]
    };
  }

  return state.moduleData[id];
}

export function resetState() {
  state.selectedModules = [];
  state.moduleData = {};
  state.coverImage = "";
}
