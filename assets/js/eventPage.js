const DICTIONARY_API = "https://api.dictionaryapi.dev/api/v2/entries/en/";
var contextMenu = {
  id: "checkMeaning",
  title: "Check Meaning",
  contexts: ["selection"],
};

chrome.contextMenus.create(contextMenu);
function clickHandler(data) {
  if (data.menuItemId == "checkMeaning" && data.selectionText) {
    fetchMeaning(data.selectionText)
      .then((res) => {
        const meaningObj = {
          selectionText: data.selectionText,
          result: !res?.title,
          phonetics: res[0]?.phonetics[0],
          definition:
            res[0]?.meanings[0].definitions[0].definition || res?.title,
          meanings: res[0]?.meanings[0],
          sourceUrls: res[0]?.sourceUrls[0],
        };
        chrome.storage.sync.set({ meaningObj });
        chrome.tabs.query(
          { active: true, currentWindow: true },
          function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "openModal" });
          }
        );
      })
      .catch((err) => {
        // alert(err);
      });
  }
}

async function fetchMeaning(text) {
  try {
    const response = await fetch(DICTIONARY_API + text);
    const result = await response.json();
    return result;
  } catch (error) {
    // alert(error);
  }

  //   return DICTIONARY_API + text;
}

chrome.contextMenus.onClicked.addListener(clickHandler);
