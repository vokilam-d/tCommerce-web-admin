export function saveFileFromUrl(downloadUrl: string) {
  const linkEl = document.createElement('a');
  linkEl.setAttribute('download', '');
  linkEl.setAttribute('href', downloadUrl);
  linkEl.click();
}
