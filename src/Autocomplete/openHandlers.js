
const stub = () => alert('openList');

export function openHandlers({value, options, onChange, openList = false, disableClearable, ...other}) {

  if(typeof disableClearable !== 'boolean') {
    disableClearable = true;
  }

  if(openList) {
    if(typeof openList === 'function') {
      openList = openList.bind(null, {value, options, onChange})
    }
    else {
      openList = stub;
    }
  }

  const openObj = openList && stub;

  return {openList, openObj, disableClearable, other};
}
