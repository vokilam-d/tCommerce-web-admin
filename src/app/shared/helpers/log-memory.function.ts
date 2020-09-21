export function logMemory() {
  if (!process) { return; }

  Object.entries(process.memoryUsage()).forEach(item => console.log(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`));
}
