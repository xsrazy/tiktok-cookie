# Tiktok Cookie

A Chrome/Edge extension that grabs cookies from the TikTok account you are logged in to. The code is fully open, just 3 files, and nothing is sent to any server.

## How it works

- Reads cookies from the tiktok.com domain only.
- Only runs when you click a button in the popup.
- Downloads a 1-line CSV: handle,cookie.
- A "Copy Cookie Only" button copies the cookie to your clipboard.

## Install

1. Open chrome://extensions/ (or edge://extensions/).
2. Turn on "Developer mode" (top right corner).
3. Click "Load unpacked" and pick this repo folder.
4. Open tiktok.com and log in to the account you want the cookie from.
5. Click the extension icon, fill in the handle (auto-filled when you are on a profile page), click "Download CSV".

## Files

- manifest.json: extension permissions (cookies, activeTab, downloads; tiktok.com host only).
- popup.html: popup UI.
- popup.js: cookie reading and CSV download logic. Nothing else.

## Credit

xsrazy raided the cookie jar so you don't have to

## License

MIT
