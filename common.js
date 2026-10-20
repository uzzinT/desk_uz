// Only allow http(s) links (or files in this repo) so a bad entry can't run script via "javascript:" URLs.
function safeUrl(u) {
  try { return ["http:", "https:"].includes(new URL(u, location.href).protocol) ? u : ""; }
  catch { return ""; }
}

// Items whose url points into files/ are downloads; everything else opens as a link.
const isFile = item => /^files\//.test(item.url || "");

// files/<id>/<원래 이름.hwp> → "원래 이름.hwp"
const fileName = item => decodeURIComponent((item.url || "").split("/").pop());

// "HWP", "PDF", ... for the badge.
const fileExt = item => (fileName(item).match(/\.(\w+)$/) || [, "FILE"])[1].toUpperCase();

function normalize(data) {
  return { categories: data.categories || [], items: data.items || [] };
}

console.assert(fileName({ url: "files/k1/%EA%B8%B0%EC%95%88.hwp" }) === "기안.hwp", "fileName decode");
console.assert(fileExt({ url: "files/k1/a.b.pdf" }) === "PDF", "fileExt");
console.assert(!isFile({ url: "https://example.com/files/x" }), "isFile only for repo files");
