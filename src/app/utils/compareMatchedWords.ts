export const getColoredTextParts = (expected: string, actual: string) => {
  const expectedWords = expected.trim().split(/\s+/);
  const actualWords = actual.trim().split(/\s+/);

  return expectedWords.map((word, index) => ({
    word,
    matched: word.toLowerCase() === actualWords[index]?.toLowerCase(),
  }));
};
