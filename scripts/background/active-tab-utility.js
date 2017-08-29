let injectionPromise = null;

/**
 * ActiveTabUtility class
 */
class ActiveTabUtility {
    /**
     * Inject the content script and tell it to execute the paste command.
     */
    static pasteInContent() {
        return new Promise(resolve => {
            ActiveTabUtility.injectScript().then(() => {
                chrome.tabs.sendMessage(Extension.activeTab.id, {type: 'paste'}, response => {
                    resolve();     
                });
            });
        });
    }

    /**
     * Inject the content script and tell it to execute the copy command.
     */
    static copyContent() {
        return new Promise(resolve => {
            ActiveTabUtility.injectScript().then(() => {
                chrome.tabs.sendMessage(Extension.activeTab.id, {type: 'copy'}, response => {
                    resolve();
                });
            });
        });
    }

    /**
     * Check if the content script has already been injected.
     * If not, inject the content script.
     */
    static injectScript() {
        return new Promise((resolve, reject) => {
            if (Extension.activeTab.url.indexOf('chrome://') === -1) {
                chrome.tabs.executeScript({
                    code: 'typeof ContentInjector === "function";'
                }, isLoaded => {
                    if (isLoaded[0]) {
                        resolve();
                    } else {
                        chrome.tabs.executeScript({
                            file: 'scripts/content/inject.js'
                        }, () => {
                            resolve();
                        });
                    }
                });
            }
        });
    }
}