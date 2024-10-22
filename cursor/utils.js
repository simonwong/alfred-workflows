
export const getPathInDB = (url) => {
  return url.replace(/^file:\/\//, '');
}

export const getFullNameInDB = (url) => {
  return url.split('/').at(-1);
}

export const getFileNameInDB = (url) => {
  return url.split('/').at(-1).split('.')[0];
}
