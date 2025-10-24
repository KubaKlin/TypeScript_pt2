export const getCharacterStyle = (
  index: number,
  userInputLength: number,
  currentIndex: number,
  errors: Set<number>,
) => {
  if (index < userInputLength) {
    if (errors.has(index)) {
      return {
        backgroundColor: '#ffebee',
        color: '#d32f2f',
      };
    }
    return {
      backgroundColor: '#e8f5e8',
      color: '#2e7d32',
    };
  }

  if (index === currentIndex) {
    return {
      backgroundColor: '#bbdefb',
      color: '#000',
    };
  }

  return {
    backgroundColor: '',
    color: '',
  };
};
