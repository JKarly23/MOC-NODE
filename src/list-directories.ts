import * as fs from 'fs';
import * as path from 'path';

export const listDirectoriesRecursively = (dirPath: string): string[] => {
  const results: string[] = [];

  const traverse = (currentPath: string) => {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    entries.map(entry => {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.git') {
        results.push(fullPath);
        traverse(fullPath);
      }
    })
  };

  traverse(dirPath);
  return results;
};