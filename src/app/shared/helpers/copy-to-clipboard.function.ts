export function copyToClipboard(str: string): boolean {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  const success = document.execCommand('copy');
  document.body.removeChild(el);

  return success;
}
