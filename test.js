const {downloadHTMLContent, getImageTags, getImageSrcFromTag} = require('./utils/htmlUtils.js');
const {makeDownloadableUrl, removeEndingUrlSlash} = require('./utils/utils.js');

const url = removeEndingUrlSlash("https://solstamps.io");

(async () => {
  const {html, error} = await downloadHTMLContent(url);
  if (error) {
    console.log(error);
    return;
  }


  const images = await getImageTags(html);
  const imageSrcs = await Promise.all(images.map(async (image) => {
    return makeDownloadableUrl(await getImageSrcFromTag(image), url);
  }));

  console.log(imageSrcs);
})();