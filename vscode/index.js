const alfy = require('alfy');
const homedir = require('os').homedir
const readFileSync = require('fs').readFileSync
const STORAGE_PATH = `${homedir()}/Library/Application\ Support/Code/storage.json`

const vscStorage = JSON.parse(readFileSync(STORAGE_PATH).toString())
const { openedPathsList } = vscStorage

let files = []

openedPathsList.entries.forEach(item => {
  if (item.folderUri) {
    files.push(item.folderUri)
  } else if (item.workspace) {
    files.push(item.workspace.configPath)
  }
})

const data = [...new Set(files)].map(file => {
  if (typeof file === 'object' && 'configURIPath' in file) {
    file = file.configURIPath
  }
  file = decodeURI(file.replace(/^file:\/\//, ''))
  const fileSplit = file.split('/')

  file = file.replace(/(\s+)/g, '\\$1')

  return {
    filePath: file,
    title: fileSplit[fileSplit.length - 1],
  }
})

const items = alfy
	.inputMatches(data, 'title')
	.map(element => ({
    title: element.title,
    arg: element.filePath,
	}));

alfy.output(items);