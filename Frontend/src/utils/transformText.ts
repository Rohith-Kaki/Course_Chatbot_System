/**
 * Converts a sentence to title case.
 * @param sentence - The sentence to convert.
 * @returns The sentence in title case.
 */
export function toTitleCase(sentence: string): string {
  return sentence
    .toLowerCase()
    .split(/(\s+)/)  //splits keeping the delimiters.
    .map((word) => {
      if (word.trim() === "") {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join("");
}
