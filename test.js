const {
  downloadHTMLContent, 
  getImageTags, 
  getImageSrcFromTag
} = require('./utils/htmlUtils.js');

const {
  makeDownloadableUrl, 
  removeEndingUrlSlash
} = require('./utils/utils.js');

const {
  ensureDirectoryExists
} = require('./utils/fileUtils.js');




(async () => {
  //Tests for downloading images
  const url = await removeEndingUrlSlash("http://www.solstamps.com");

  //Download HTML
  const {html, error} = await downloadHTMLContent(url);
  if (error) {
    console.log(error);
    return;
  }

  //Get image tags
  const images = await getImageTags(html);

  //Loop though image tags and get soruce
  const imageSrcs = await Promise.all(images.map(async (image) => {
    return await makeDownloadableUrl(await getImageSrcFromTag(image), url);
  }));


  console.log(imageSrcs);


  //Tests for fileUtils
  let dir = await ensureDirectoryExists(url);
  console.log(dir);

})();




