const CURRENT_VERSION = "1.0.1"; // kasalukuyang app version
const VERSION_JSON = "https://www.bjcprogramming.store/bjceload/version.json?t=" + new Date().getTime();

function checkVersion() {
  const currentEl = document.getElementById('currentVersion');
  const latestEl = document.getElementById('latestVersion');

  if(currentEl) {
    currentEl.innerText = CURRENT_VERSION;
    currentEl.style.color = "#00ff9d";
    currentEl.style.fontWeight = "bold";
  }

  fetch(VERSION_JSON)
    .then(res => res.json())
    .then(data => {
      const latestVersion = data.version;
      const apkLink = data.apk;

      if(latestEl) {
        latestEl.innerText = latestVersion;
        latestEl.style.color = "#ff9800";
        latestEl.style.fontWeight = "bold";
      }

      if(CURRENT_VERSION !== latestVersion){

        // popup container
        const popup = document.createElement('div');
        popup.id = 'updatePopup';
        popup.style.position = 'fixed';
        popup.style.top = '0';
        popup.style.left = '0';
        popup.style.width = '100%';
        popup.style.height = '100%';
        popup.style.background = 'rgba(0,0,0,0.8)';
        popup.style.display = 'flex';
        popup.style.flexDirection = 'column';
        popup.style.alignItems = 'center';
        popup.style.justifyContent = 'center';
        popup.style.zIndex = '9999';

        popup.innerHTML = `
          <div style="background:#222; padding:20px; border-radius:10px; text-align:center; color:white; max-width:300px;">
            <h2>May bagong update!</h2>
            <p>Version: <strong style="color:#ff9800">${latestVersion}</strong></p>
            <button id="downloadBtn" style="padding:12px 20px; background:#ff9800; border:none; color:black; font-weight:bold; border-radius:6px; cursor:pointer;">
              Download & Install
            </button>
          </div>
        `;

        document.body.appendChild(popup);

        const downloadBtn = document.getElementById('downloadBtn');

        downloadBtn.onclick = () => {

          // disable button para hindi ma-click ulit
          downloadBtn.disabled = true;
          downloadBtn.innerText = "Downloading...";
          downloadBtn.style.opacity = "0.6";
          downloadBtn.style.cursor = "not-allowed";

          // start download
          window.location.href = apkLink;

          setTimeout(() => {
            alert("After download, tap the APK in your Downloads folder to install/update the app.");
          }, 500);

        };

      }

    })
    .catch(err => console.log('Error fetching latest version:', err));
}

window.addEventListener("load", checkVersion);