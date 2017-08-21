let cbElement = null;

/**
 * ClipbaordUtility class
 */
class ClipboardUtility {
    /**
     * Creates a textarea in the background DOM.
     * Set the focus to the textarea and paste the clipboard content.
     * Returns the value of the textarea.
     * 
     * @return {string}
     */
    static getClipboardContents() {
        if (!cbElement) {
            cbElement = document.createElement('textarea');
            document.getElementsByTagName('body')[0].appendChild(cbElement);
        }

        cbElement.value = '';
        cbElement.focus();
        document.execCommand('paste');

        return cbElement.value;
    }

    static writeClipboardContents(content) {
        if (!cbElement) {
            cbElement = document.createElement('textarea');
            document.getElementsByTagName('body')[0].appendChild(cbElement);
        }

        cbElement.value = content;
        cbElement.focus();
        document.execCommand('selectAll');
        document.execCommand('copy');
        cbElement.value = '';
    }
}