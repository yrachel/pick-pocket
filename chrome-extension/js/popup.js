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


toggleState.onclick = function() {
    console.log('clicked toggleState');
    chrome.storage.sync.get('onState', function(data) {
        if (data.onState == 'off') {
            data.onState = 'on'
        } else {
            data.onState = 'off' }
        if (data.onState == 'on') {
            chrome.tabs.executeScript({
                file: 'js/contentTest.js'
            });
        }
    });
};
