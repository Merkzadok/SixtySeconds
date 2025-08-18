export const compareTexts = (expected: string, actual: string) => {
  const expectedWords = expected.trim().toLowerCase().split(/\s+/);
  const actualWords = actual.trim().toLowerCase().split(/\s+/);

  let matchCount = 0;
  expectedWords.forEach((word, index) => {
    if (word === actualWords[index]) {
      matchCount++;
    }
  });

  const accuracy = ((matchCount / expectedWords.length) * 100).toFixed(2);

  return {
    matchCount,
    total: expectedWords.length,
    accuracy,
  };
};
