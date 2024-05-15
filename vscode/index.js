import alfy from 'alfy';
import os from 'os';
import fs from 'fs';
import initSqlJs from 'sql.js';
import { getFileNameInDB, getFullNameInDB, getPathInDB } from './utils.js';

const homedir = os.homedir;
const DB_PATH = `${homedir()}/Library/Application\ Support/Code/User/globalStorage/state.vscdb`;
const fileBuffer = fs.readFileSync(DB_PATH);
const SQL = await initSqlJs();
const db = new SQL.Database(fileBuffer);
const dbResults = db.exec("select value from ItemTable where key = 'history.recentlyOpenedPathsList'");
db.close();

const resStr = dbResults[0].values.toString();
const res = JSON.parse(resStr);
const OpenedPathsList = res.entries;

const data = [];
const setMap = {}



OpenedPathsList.forEach(item => {
  let title = ''
  let url = ''

  if (item.workspace) {
    url = getPathInDB(item.workspace.configPath);
    title = `${getFileNameInDB(item.workspace.configPath)}（工作区）`;
  }

  if (item.folderUri) {
    url = getPathInDB(item.folderUri);
    title = getFullNameInDB(item.folderUri);
  }

  if (item.fileUri) {
    url = getPathInDB(item.fileUri);
    title = getFullNameInDB(item.fileUri);
  }

  if (url && title) {
    if (!setMap[title]) {
      data.push({
        url,
        title
      })
      setMap[title] = 1
    }
  }
})

const items = alfy
	.inputMatches(data, 'title')
	.map(element => ({
    title: element.title,
    subtitle: element.url,
    arg: element.url,
  }));

alfy.output(items);
