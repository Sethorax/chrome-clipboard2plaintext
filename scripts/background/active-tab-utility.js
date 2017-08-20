let injectedScriptTabList = [];

/**
 * ActiveTabUtility class
 */
class ActiveTabUtility {
    /**
     * Inject the content script and send the converted text to the content script via a message.
     * 
     * @param {string} value 
     */
    static setValueOfFormElement(value) {
        ActiveTabUtility.injectScript().then(() => {
            chrome.tabs.sendMessage(Extension.activeTab.id, value);
        });
    }

    /**
     * Check if the content script has already been injected.
     * If not, inject the content script.
     */
    static injectScript() {
        return new Promise((resolve, reject) => {
            if (injectedScriptTabList.indexOf(Extension.activeTab.id) === -1) {
                if (Extension.activeTab.url.indexOf('chrome://') === -1) {
                    chrome.tabs.executeScript({
                        file: 'scripts/content/inject.js'
                    }, () => {
                        injectedScriptTabList.push(Extension.activeTab.id);
                        resolve();
                    });
                }
            } else {
                resolve();
            }
        });
    }
}