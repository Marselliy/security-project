window.onload = () => {
  mode = document.cookie.indexOf('mode=true') != -1;
  if (mode) {
    document.body.className = 'sombra-mode';
  } else {
    document.body.className = 'normal-mode';
  }
}
window.onkeypress = (e) => {
  if (e.key == '/') {
    mode = document.cookie.indexOf('mode=true') != -1;
    document.cookie = document.cookie.replace('mode=' + mode, 'mode=' + !mode);
    if (!mode) {
      document.body.className = 'sombra-mode';
    } else {
      document.body.className = 'normal-mode';
    }
  }
}
