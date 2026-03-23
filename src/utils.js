export function escapeHtml(str) {
  return (str || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function chunkRows(rows, firstPageLimit = 4, nextPageLimit = 6) {
  const pages = [];
  const remaining = [...rows];

  if (remaining.length <= firstPageLimit) {
    pages.push(remaining);
    return pages;
  }

  pages.push(remaining.splice(0, firstPageLimit));

  while (remaining.length) {
    pages.push(remaining.splice(0, nextPageLimit));
  }

  return pages;
}

export function statusCell(summary, fill) {
  const cls = fill === summary
    ? (fill === "green" ? "fillGreen" : "fillRed")
    : "";

  return `<td class="${cls}">${fill === "green" ? "INGEN REGISTRERTE AVVIK" : "REGISTRERTE AVVIK"}</td>`;
}
