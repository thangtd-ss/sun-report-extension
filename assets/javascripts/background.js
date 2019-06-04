chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.tabs.executeScript(tabId, {
    code: `

    `
  })
})

chrome.runtime.onMessage.addListener(
  function(response, sender, sendResponse){

  }
)

function setData(type, el) {

}
