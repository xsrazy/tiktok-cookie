// Tiktok Cookie: reads TikTok session cookies for the current tab only.
// No data leaves the browser except the file YOU download. No tracking, no server.
const COOKIE_NAMES = ["sessionid", "sessionid_ss", "sid_tt", "uid_tt", "passport_csrf_token", "msToken", "ttwid", "odin_tt"];

async function getTikTokCookies() {
  const cookies = await chrome.cookies.getAll({ domain: ".tiktok.com" });
  const picked = cookies.filter(c => COOKIE_NAMES.includes(c.name));
  const all = picked.length ? picked : cookies;
  return all.map(c => c.name + "=" + c.value).join("; ");
}

function csvEscape(v) {
  return '"' + String(v).replace(/"/g, '""') + '"';
}

document.getElementById("exportBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const handle = document.getElementById("handle").value.trim();
  if (!handle) { status.textContent = "Isi handle dulu (contoh: @akun1)."; status.style.color = "#fb7185"; return; }
  const cookie = await getTikTokCookies();
  if (!cookie) { status.textContent = "Cookie TikTok tidak ketemu. Pastikan kamu sudah login TikTok di tab ini."; status.style.color = "#fb7185"; return; }
  const csv = "handle,cookie\n" + csvEscape(handle) + "," + csvEscape(cookie) + "\n";
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const safe = handle.replace(/[^a-zA-Z0-9_.-]/g, "");
  await chrome.downloads.download({ url, filename: "tiktok-cookie-" + safe + ".csv", saveAs: false });
  status.textContent = "CSV terdownload. Gabungkan file-file ini jadi satu CSV buat import massal.";
  status.style.color = "#4ade80";
  document.getElementById("cookiePreview").textContent = cookie.slice(0, 200) + "...";
});

document.getElementById("copyBtn").addEventListener("click", async () => {
  const status = document.getElementById("status");
  const cookie = await getTikTokCookies();
  if (!cookie) { status.textContent = "Cookie TikTok tidak ketemu. Pastikan kamu sudah login TikTok di tab ini."; status.style.color = "#fb7185"; return; }
  await navigator.clipboard.writeText(cookie);
  status.textContent = "Cookie disalin ke clipboard.";
  status.style.color = "#4ade80";
  document.getElementById("cookiePreview").textContent = cookie.slice(0, 200) + "...";
});

// Auto-fill handle from the open TikTok tab if it is a profile page
(async () => {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    const m = tab && tab.url && tab.url.match(/tiktok\.com\/@([\w.]+)/);
    if (m) document.getElementById("handle").value = "@" + m[1];
  } catch (e) {}
})();
