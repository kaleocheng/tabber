const titles = {}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status == 'complete') {
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach((tab, i, tabs) => {
                if (!(tab.id in titles)) {
                    titles[tab.id] = tab.title
                }
                if (tab.index < 8) {
                    chrome.tabs.executeScript(tab.id, {
                        code: `document.title = '[${tab.index + 1}] ${titles[tab.id]}'`
                    })
                } else if (i === tabs.length - 1) {
                    chrome.tabs.executeScript(tab.id, {
                        code: `document.title = '[9] ${titles[tab.id]}'`
                    })
                } else {
                    chrome.tabs.executeScript(tab.id, {
                        code: `document.title = '${titles[tab.id]}'`
                    })
                }

            })
        })
    }
})

