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
        const activeElement = this.getActiveElement(document);
        const doc = activeElement.ownerDocument;

        doc.execCommand('paste');

        sendResponse('restore-clipboard');
    }

    pasteToActiveFormfield(value) {
        const activeElement = this.getActiveElement(document);
        const isEditable = this.checkElementEditibility(activeElement);

        if (isEditable) {
            const preText = activeElement.value.substring(0, activeElement.selectionStart);
            const afterText = activeElement.value.substring(activeElement.selectionEnd);

            activeElement.value = preText + value + afterText;
        }
    }

    checkElementEditibility(element) {
        const formElements = ['INPUT', 'TEXTAREA'];

        return formElements.indexOf(element.tagName) > -1 || element.isContentEditable;
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