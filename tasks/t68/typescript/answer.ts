function classifyFilesByExtension(fileNames: string[]): {[key: string]: string[]} {
  const classifiedFiles: {[key: string]: string[]} = {};

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
