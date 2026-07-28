function classifyFilesByExtension(fileNames) {
  /**
   * Classify an array of file names according to their file extensions.
   *
   * @param {string[]} fileNames - List of file names.
   * @returns {Object} - Dictionary with file extensions as keys and lists of file names as values.
   */
  const classifiedFiles = {};

  for (const file of fileNames) {
      const dotIndex = file.lastIndexOf('.');

      if (dotIndex !== -1 && dotIndex < file.length - 1) {
          const normalizedExt = file.slice(dotIndex + 1).toLowerCase();
          if (!classifiedFiles[normalizedExt]) {
              classifiedFiles[normalizedExt] = [];
          }
          classifiedFiles[normalizedExt].push(file);
      }
  }

  return classifiedFiles;
}
