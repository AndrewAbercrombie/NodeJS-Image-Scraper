const { download } = require('async-file-dl');
exports.download = async function download(url, options) {
  let timeout = options.timeout;


  if (timeout) {
    //Wait for the timeout to expire
    await new Promise(resolve => setTimeout(resolve, timeout));
  }

  const { download } = require('async-file-dl');

  await download(url, options.directory, options.filename)
};