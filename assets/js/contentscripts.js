chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.type) {
    case "openModal":
      chrome.storage.sync.get(["meaningObj"], function (value) {
        // alert(JSON.stringify(value));
        const { meaningObj } = value;
        // alert(JSON.stringify(meaningObj));
        Swal.fire({
          title: "Check Meaning For",
          //   text: "Definition: " + meaningObj.menings.definition,
          html: `<p class="arya-check-meaning-selectionText"><strong>${
            meaningObj.selectionText
          }</strong>${
            meaningObj.result
              ? `(<span class="arya-check-meaning-partsofspeech"><i>${meaningObj?.meanings?.partOfSpeech}</i></span>)`
              : ""
          }</p><br><strong>Definition:</strong> ${meaningObj?.definition}</p>
          ${
            meaningObj?.phonetics?.audio
              ? `<audio src="${meaningObj?.phonetics?.audio}" controls>
                Your browser does not support the audio element.
            </audio>`
              : ""
          }
                ${
                  meaningObj?.meanings?.synonyms?.length > 0
                    ? `<p class="arya-check-meaning-synonyms"><span>Synonyms:</span> ${meaningObj?.meanings?.synonyms?.toString()}</p>`
                    : ""
                }
              `,
          //   icon: "error",
          confirmButtonText: "Close",
          customClass: {
            container: "arya-check-meaning-container",
          },
        });
      });
      break;
  }
});
