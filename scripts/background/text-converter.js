/**
 * TextConverter class
 */
class TextConverter {
    /**
     * Iterate over each character of the string.
     * If the unicode character COMBINING DIARESIS is found, check the previous character.
     * If the previous character's charcode is listed in the replacementChars object,
     * replace it with the given character.
     * 
     * @param {string} text 
     * @return {string}
     */
    static fixUmlauts(text) {
        const cleanChars = [];
        const replacementChars = {
            65: 'Ä',
            79: 'Ö',
            85: 'Ü',
            97: 'ä',
            111: 'ö',
            117: 'ü'
        };

        for (let i = 0; i < text.length; i++) {
            const charcode = text.charCodeAt(i);

            if (charcode === 776) {
                const charCodeBefore = text.charCodeAt(i - 1);

                if (Object.keys(replacementChars).indexOf(charCodeBefore.toString()) > -1) {
                    cleanChars[i - 1] = replacementChars[charCodeBefore];
                } else {
                    cleanChars[i] = text.charAt(i);
                }
            } else {
                cleanChars[i] = text.charAt(i);
            }
        }

        return cleanChars.join('');
    }
}