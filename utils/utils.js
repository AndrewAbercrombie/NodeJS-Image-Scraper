exports.makeDownloadableUrl = async function makeDownloadableUrl(imgSrc, url) {
  if (imgSrc.startsWith('/')) {
    return `${url}${imgSrc}`;
  } else {
    return imgSrc;
  }
}