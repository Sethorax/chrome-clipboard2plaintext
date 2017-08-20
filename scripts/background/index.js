let activeTab = null;

/**
 * Extension class
 */
class Extension {
    /**
     * Returns the active tab
     */
    static get activeTab() { return activeTab; }

    /**
     * Initialize class properties
     */
    constructor() {
        this.contextMenuId = 'paste-plaintext';
        this.contextMenuContexts = ['editable'];
    }

    /**
     * Initialization method
     */
    init() {
        this.createContextMenu();
        this.handleContextMenuClick();
        this.handleBrowserAction();
    }

    /**
     * Creates the context menu entry
     */
    createContextMenu() {
        chrome.contextMenus.create({
            id: this.contextMenuId,
            title: chrome.i18n.getMessage('contextMenuTitle'),
            contexts: this.contextMenuContexts
        });
    }

    /**
     * Add listener to the onClicked event of the context menu
     */
    handleContextMenuClick() {
        chrome.contextMenus.onClicked.addListener((event, tab) => {
            activeTab = tab;

            if (event.menuItemId === this.contextMenuId) {
                this.convertClipboardContents();        
            }
        });
    }

    /**
     * Add listener to the onClicked event of the browser action button
     */
    handleBrowserAction() {
        chrome.browserAction.onClicked.addListener(tab => {
            activeTab = tab;

            this.convertClipboardContents();
        });
    }

    /**
     * Get the current clipboard content and convert it's contents.
     * Paste the converted content to the active element.
     */
    convertClipboardContents() {
        const clipboardContents = ClipboardUtility.getClipboardContents();
        const cleanText = TextConverter.fixUmlauts(clipboardContents);

        ActiveTabUtility.setValueOfFormElement(cleanText);
    }
}

(new Extension()).init();