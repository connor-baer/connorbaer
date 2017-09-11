export function contains(textToSearch = '', wordsToMatch = []) {
  const text = textToSearch.toLowerCase();
  return wordsToMatch.some(wordToMatch => {
    const word = wordToMatch.toLowerCase();
    return text.includes(word);
  });
}
