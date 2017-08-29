class ContentInjector {
    constructor() {
        this.handleOnMessage = this.handleOnMessage.bind(this);
    }

    init() {
        this.addListeners();
    }

    addListeners() {
        chrome.runtime.onMessage.addListener(this.handleOnMessage);
    }

    handleOnMessage(message, sender, sendResponse) {
        console.log(message.type);
        switch (message.type) {
            case 'paste':
                this.pasteToDocument();
                break;

            case 'copy':
                this.copyFromDocument();
                break;
        }

        sendResponse();
    }

    pasteToDocument(sendResponse) {
        this.getActiveDocument().execCommand('paste');
    }

    copyFromDocument(sendResponse) {
        this.getActiveDocument().execCommand('copy');
    }

    getActiveDocument() {
        const activeElement = this.getActiveElement(document);
        return activeElement.ownerDocument;
    }

    getActiveElement(document) {
        if (document.activeElement.tagName === 'IFRAME') {
            return this.getActiveElement(document.activeElement.contentWindow.document);
        } else {
            return document.activeElement;
        }
    }
}

(new ContentInjector()).init();