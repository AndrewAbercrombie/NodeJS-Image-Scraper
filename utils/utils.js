exports.makeDownloadableUrl = async function makeDownloadableUrl(imgSrc, url) {
  if (imgSrc.startsWith('/')) {
    return `${url}${imgSrc}`;
  } else {
    return imgSrc;
  }
}

exports.removeEndingUrlSlash = async function removeEndingUrlSlash(url) {
  while (url.endsWith('/')) {
      url = url.slice(0, -1);
  }
  return url;
}

exports.removeWWW = async function removeWWW(url) {
  if (url.startsWith('www.')) {
    url = url.slice(4);
  }
  return url;
}

exports.removeHttpOrHttps = async function removeHttpOrHttps(url) {
  if (url.startsWith('http://')) {
    url = url.slice(7);
  } else if (url.startsWith('https://')) {
    url = url.slice(8);
  }
  return url;
}

exports.removeAnything