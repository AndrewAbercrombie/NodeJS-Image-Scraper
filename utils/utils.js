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