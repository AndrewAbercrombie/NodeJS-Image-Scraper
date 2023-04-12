const path = require('path');

const {
  downloadHTMLContent, 
  getImageTags, 
  getImageSrcFromTag
} = require('./utils/htmlUtils.js');

const {
  makeDownloadableUrl, 
  removeEndingUrlSlash,
  removeDupes
} = require('./utils/utils.js');

const {
  ensureDirectoryExists
} = require('./utils/fileUtils.js');

const {
  download 
} = require('./utils/downloadUtils.js');




(async () => {
  //Tests for downloading images
  const url = await removeEndingUrlSlash("https://www.solstamps.io");

  //Download HTML
  const {html, error} = await downloadHTMLContent(url);
  if (error) {
    console.log(error);
    return;
  }

  //Get image tags
  let images = await getImageTags(html);
  


  //Loop though image tags and get soruce
  let imageSrcs = await Promise.all(images.map(async (image) => {
    return await makeDownloadableUrl(await getImageSrcFromTag(image), url);
  }));

  imageSrcs = await removeDupes(imageSrcs);

  console.log(imageSrcs);


  //Tests for fileUtils
  let dir = await ensureDirectoryExists(url);
  console.log(dir);

  //Tests for downloads
  for (let i = 0; i < imageSrcs.length; i++) {
    console.log(`Downloading image ${i + 1} of ${imageSrcs.length}`);
    let src = imageSrcs[i];
    let filename = src.split('/').pop();

    let options = {
      directory: dir,
      filename: filename,
      timeout: 1000
    }

    await download(src, options);
  }

})();




