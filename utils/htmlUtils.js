const { parse } = require('node-html-parser');
const axios = require('axios');

exports.downloadHTMLContent = async function downloadHTMLContent(url, options = {timeout: 3000}) {
  try {
    const response = await axios.get(url, options);
    return {"html": response.data};
  } catch (error) {
    return {"error": "Error while downloading HTML content."};
  }
}

exports.getImageTags = async function getImageTags(html) {
  const root = parse(html);
  const images = root.getElementsByTagName('img');

  return images;
}

exports.getImageSrcFromTag = async function getImageSrcFromTag(imageTag) {
  return imageTag.getAttribute('src');
}

exports.makeDownloadableUrl = async function makeDownloadableUrl(imgSrc, url) {
  if (imgSrc.startsWith('/')) {
    return `${url}${imgSrc}`;
  } else {
    return imgSrc;
  }
}




