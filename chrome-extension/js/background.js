chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({onState: 'off'}, function callback() {
        console.log("The onState is off.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
        chrome.declarativeContent.onPageChanged.addRules(
        [{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'developer.chrome.com'},
            })
        ],
                actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    })
});
