//Sanitize test name for folder/file names
export const sanitizeTestName = (name: string): string => {
  return name
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .toLowerCase();
};