const fs = require('fs').promises;
const path = require('path');
const {
  removeHttpOrHttps,
  removeWWW
}= require('./utils');

checkIfDownloadDirExists = async function checkIfDownloadDirExists() {
  try {
    await fs.access(path.join(__dirname, '../downloads'));
    return true;
  } catch (error) {
    return false;
  }
}

createDowloadsDir = async function createDowloadsDir() {
  try {
    await fs.mkdir(path.join(__dirname, '../downloads'));
    return true;
  } catch (error) {
    return false;
  }
}

getSiteDownloadDir = async function getSiteDownloadDir(url) {
  console.log(url);
  return path.join(__dirname, '../downloads', url);
}


createSiteDownloadDir = async function createSiteDownloadDir(url) {

  try {
    await fs.mkdir(path.join(__dirname, '../downloads', url));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

checkIfSiteDownloadDirExists = async function checkIfSiteDownloadDirExists(url) {

  try {
    await fs.access(path.join(__dirname, '../downloads', url));
    return true;
  } catch (error) {
    return false;
  }
}

getDirAddon = async function getDirAddon(url) {
  let index = 0;
  let ready = false;

  while (!ready) {
    if (index == 0) {
      if (await checkIfSiteDownloadDirExists(url)) {
        index++;
      } else {
        ready = true;
        break;
      }

    } else {
      if (await checkIfSiteDownloadDirExists(`${url} (${index})`)) {
        index++;
      } else {
        ready = true;
        break;
      }
    }
  }

  return index;
}



exports.ensureDirectoryExists = async function ensureDirectoryExists(url) {
  url = await removeHttpOrHttps(url);
  url = await removeWWW(url);

  
    if (!await checkIfDownloadDirExists(url)) {
      await createDowloadsDir();
    };

    let index = await getDirAddon(url);

    if (index == 0) {
      await createSiteDownloadDir(url);
    } else {
      await createSiteDownloadDir(`${url} (${index})`);
      url = `${url} (${index})`;
    }

    return path.join(__dirname, '../downloads', url)
    
}
