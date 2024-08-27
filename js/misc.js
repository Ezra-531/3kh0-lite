// Utility function to output messages
const output = (msg, clr) => {
  const txt = document.getElementById("console-output");
  txt.style.color = clr;
  txt.innerText = msg;
};

// Cache DOM elements
const tcInput = document.getElementById("userinput");
const urlInput = document.getElementById("url-target");
const presetSelect = document.getElementById("apply-presets");

// Function to change the tab title
const changeTabTitle = () => {
  if (tcInput.value.trim() === "") {
    window.localStorage.removeItem("title");
    output("No title entered. Default applied, refresh to see changes", "red");
  } else {
    window.localStorage.setItem("title", tcInput.value);
    document.title = tcInput.value;
    output("Title change successful", "green");
  }
  tcInput.value = "";
};

// Function to change the tab icon
const changeTabIcon = () => {
  if (tcInput.value.trim() === "") {
    document.querySelector("link[rel*='icon']").href = "";
    window.localStorage.removeItem("icon");
    output("No image entered. Default applied, refresh to see changes", "red");
  } else if (validURL(tcInput.value)) {
    document.querySelector("link[rel*='icon']").href = tcInput.value;
    window.localStorage.setItem("icon", tcInput.value);
    output("Icon change successful", "green");
  } else {
    output("Icon change failed. Make sure you are using a valid URL", "red");
  }
  tcInput.value = "";
};

// Function to validate URL
const validURL = (str) => {
  const exp = /^(https?:\/\/)?([\w\d-]+\.)+[\w]{2,}(\/[\w\d-]*)*\/?$/i;
  return exp.test(str);
};

// Function to reset tab settings
const resetTabSettings = () => {
  ["icon", "title"].forEach(item => window.localStorage.removeItem(item));
  window.location.reload();
};

// Function to apply URL and title
const applyUrl = (url, title) => {
  urlInput.value = url;
  changeTabIcon();
  tcInput.value = title;
  changeTabTitle();
  output("Preset applied successfully!", "green");
};

// Event handler for the 'Create page' button
document.getElementById("create").addEventListener("click", () => {
  let url = urlInput.value.trim();
  if (!url.startsWith("https://") && !url.startsWith("http://")) {
    url = `https://${url}`;
  } else if (url.startsWith("http://")) {
    url = `https://${url.substring(7)}`;
  }

  const win = window.open();
  win.document.body.style.margin = "0";
  win.document.body.style.height = "100vh";
  const iframe = win.document.createElement("iframe");
  iframe.style.border = "none";
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.src = url;
  iframe.referrerpolicy = "no-referrer";
  iframe.allow = "fullscreen";
  win.document.body.appendChild(iframe);
});

// Event handler for the preset select dropdown
presetSelect.addEventListener('change', function() {
  switch (this.value) {
    case "canvas":
      applyUrl('https://img.icons8.com/?size=512&id=oECahFP3ibID&format=png', 'Dashboard');
      break;
    case "aeries":
      applyUrl('https://wascouhsd.aeries.net/student/favicon.ico', 'Aeries Student Dashboard');
      break;
    case "gmail":
      applyUrl('https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico', 'Gmail');
      break;
    default:
      output("No preset selected", "red");
  }
});

// Event listeners for the buttons
document.getElementById('set-title-btn').addEventListener('click', changeTabTitle);
document.getElementById('set-icon-btn').addEventListener('click', changeTabIcon);
document.getElementById('reset-btn').addEventListener('click', resetTabSettings);
document.getElementById('imitate-canvas-btn').addEventListener('click', () => {
  applyUrl('https://wascouhsd.instructure.com/favicon.ico', 'Canvas');
});
