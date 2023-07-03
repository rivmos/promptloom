chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        title: 'Add To Prompt Loom',
        contexts: ['selection'],
        id: 'promptSelect',
        
    });
});


function addToPromptLoom(info) {
    if(info.menuItemId === 'promptSelect'){
        const selectedText = document.getSelection().toString();
        chrome.tabs.executeScript(null, {
            file: "popup/popup.js",
            args: [selectedText]
        });
    }
}
// A generic onclick callback function.
chrome.contextMenus.onClicked.addListener(addToPromptLoom);