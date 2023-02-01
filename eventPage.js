// chrome.contextMenus.create({
//     title: "Buzz This",
//     contexts: ["page", "selection", "image", "link"],
//     onclick: clickHandler,
//   });

// const body = document.querySelectorAll("body");

// body.prepend(`<div class="meaning-modal"></div>`);

const DICTIONARY_API = "https://api.dictionaryapi.dev/api/v2/entries/en/";
var contextMenu = {
  id: "checkMeaning",
  title: "Check Meaning",
  contexts: ["selection"],
};

chrome.contextMenus.create(contextMenu);
function clickHandler(data) {
  //   alert(JSON.stringify(data));
  if (data.menuItemId == "checkMeaning" && data.selectionText) {
    fetchMeaning(data.selectionText)
      .then((res) => {
        const meaningObj = {
          selectionText: data.selectionText,
          phonetics: res[0].phonetics[0],
          definitions: res[0].meanings[0].definitions,
          sourceUrls: res[0].sourceUrls[0],
        };
        chrome.storage.sync.set({ meaningObj });
        // alert(JSON.stringify(meaningObj));
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
