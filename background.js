function stripTitle(title) {
    return title.replace(/⌘[1-9] /g, '')
        .replace(/'/g, "\\'")
        .replace(/"/g, '\\"')
}

function updateTabNumber() {
    chrome.tabs.query({}, function (tabs) {
        tabs.forEach((tab, i, tabs) => {
            if (tab.index < 8) {
                chrome.tabs.executeScript(tab.id, {
                    code: `document.title = '⌘${tab.index + 1} ${stripTitle(tab.title)}'`
                })
            } else if (i === tabs.length - 1) {
                chrome.tabs.executeScript(tab.id, {
                    code: `document.title = '⌘9 ${stripTitle(tab.title)}'`
                })
            } else {
                chrome.tabs.executeScript(tab.id, {
                    code: `document.title = '${stripTitle(tab.title)}'`
                })
            }

        })
    })
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
        updateTabNumber()
    }
})

chrome.runtime.onInstalled.addListener(({ }) => {
    updateTabNumber()
})

chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
    updateTabNumber()
})

