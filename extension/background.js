chrome.action.onClicked.addListener((tab) => {
  // Prevent execution on restricted URLs like chrome://
  if (tab.url.startsWith('chrome://') || tab.url.startsWith('edge://')) {
    console.warn("DOM Anatomy cannot run on restricted browser pages.");
    return;
  }

  // Inject CSS
  chrome.scripting.insertCSS({
    target: { tabId: tab.id },
    files: ['xray-styles.css']
  }).catch(err => console.error("Error injecting CSS:", err));

  // Inject JavaScript
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content.js']
  }).catch(err => console.error("Error injecting script:", err));
});
