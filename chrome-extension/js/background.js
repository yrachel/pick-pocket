chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({onState: 'off'}, function callback() {
        console.log("The onState is off.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function(){
        chrome.declarativeContent.onPageChanged.addRules([

        // activate on white-listed sites
        {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: 'developer.chrome.com'},
                })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        },
        {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: '127.0.0.1'},
                })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        },
        // activate on sites containing image tags
        {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    css: ["img"],
                })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }
    ]);
    })
});

// chrome.runtime.onMessage.addListener(function(message)) {
//     if (message.action == 'submit the form') {
//
//     }
// }
