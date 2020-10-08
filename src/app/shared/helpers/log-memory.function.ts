export function logMemory() {
  if (typeof process === 'undefined') { return; }

  Object.entries(process.memoryUsage()).forEach(item => console.log(`${item[0]}: ${(item[1] / 1024 / 1024).toFixed(4)} MB`));
  console.log(new Date());
  console.log('\n');
}
