let toggleState = document.getElementById('toggleState');

chrome.storage.sync.get('onState', function(data) {
    if (data.onState == 'off'){
        toggleState.style.backgroundColor = '#abcdef';
    }
    else {
        toggleState.style.backgroundColor = '#123456';
    }
    toggleState.setAttribute('value', data.onState);
});


toggleState.onclick = function(element) {
    let state = element.target.value;
    chrome.tabs.query({active: true, currentWindow:
        chrome.tabs.executeScript(
            tabs[0].id,
            {code: 'document.body.style.'}
        )
        })
}
