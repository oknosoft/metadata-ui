
const stub = () => alert('openList');

export function openHandlers({value, options, onChange, openList = false, disableClearable, ...other}) {

  if(typeof disableClearable !== 'boolean') {
    disableClearable = true;
  }

  if(openList && typeof openList !== 'function') {
    openList = stub;
  }

  const openObj = openList && stub;

  return {openList, openObj, disableClearable, other};
}
