function saveSettings(e) {
  e.preventDefault();
  browser.storage.sync.set({
    search_type: document.querySelector("#QuickSearchSearchType").value
  });
}

function restoreSettings() {

  function setCurrentChoice(result) {
    document.querySelector("#QuickSearchSearchType").value = result.search_type || "google";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting = browser.storage.sync.get("search_type");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreSettings);
document.querySelector("#QuickSearchSearchType").addEventListener("change", saveSettings);
