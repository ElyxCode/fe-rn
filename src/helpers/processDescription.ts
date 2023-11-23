
 export const processDescription = (description: string) => {
    const lines = description.split('\*');
    const trimmedLines = lines.map((line) => line.trim());
    const nonEmptyLines = trimmedLines.filter((line) => line !== '');

    return nonEmptyLines;
  };