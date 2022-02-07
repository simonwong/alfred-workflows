import alfy from 'alfy'
import os from 'os'
import fs from 'fs'

const homedir = os.homedir
const readFileSync = fs.readFileSync
const STORAGE_PATH = `${homedir()}/Library/Application\ Support/Code/storage.json`

const vscStorage = JSON.parse(readFileSync(STORAGE_PATH).toString())

const fileItems = vscStorage.lastKnownMenubarData.menus.File.items

const recentList = fileItems.find(item => item.id.startsWith('submenuitem') && item.submenu)?.submenu.items

let files = []

recentList.forEach(item => {
  if (['openRecentWorkspace', 'openRecentFile'].includes(item.id)) {
    files.push(item.uri.path)
  }
})

const data = [...new Set(files)].map(file => {
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