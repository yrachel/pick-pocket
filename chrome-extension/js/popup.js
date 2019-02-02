let toggleState = document.getElementById('toggleState');

function updateToggleButton(onState) {
    if (onState == 'off'){
        toggleState.style.backgroundColor = '#abcdef';
    }
    else {
        toggleState.style.backgroundColor = '#654321';
    }
    toggleState.setAttribute('value', onState);
}

chrome.storage.sync.get('onState', function(data) {
    updateToggleButton(data.onState);
});

toggleState.onclick = function() {
    chrome.storage.sync.get('onState', function(data) {
        var newState = data.onState=='off' ? 'on' : 'off';
        chrome.storage.sync.set({onState: newState}, function callback() {
            console.log("The onState is updated.");
        });
        updateToggleButton(data.onState);
        if (newState == 'on') {
            chrome.tabs.executeScript(null,{
                file: 'js/contentTest.js'
            });
        }
    });
};
