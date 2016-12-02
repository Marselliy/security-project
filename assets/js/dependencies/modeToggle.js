window.onload = () => {
  mode = document.cookie.indexOf('mode=true') != -1;
  if (mode) {
    document.body.className = 'sombra-mode';
  } else {
    document.body.className = 'normal-mode';
  }
}
window.onkeypress = (e) => {
  mode = document.cookie.indexOf('mode=true') != -1;
  if (e.key == '/') {
    document.cookie = document.cookie.replace('mode=' + mode, 'mode=' + !mode);
  }
  if (!mode) {
    document.body.className = 'sombra-mode';
  } else {
    document.body.className = 'normal-mode';
  }
}
