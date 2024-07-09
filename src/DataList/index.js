import React from 'react';
import {useMatches} from 'react-router-dom';
import Typography from '@mui/material/Typography';
import {useTitleContext} from '../App/titleContext';
//import TreeList from './TreeList';
import FlatList from './FlatList';

export default function DataList({Component}) {

  const [mgr, setMgr] = React.useState(null);
  const [stub, matches] = useMatches();

  const {setTitle} = useTitleContext();

  React.useEffect(() => {
    const parts = matches.pathname.split('/');
    const mgr = $p.md.mgr(`${parts[1]}.${parts[2]}`);
    if(mgr) {
      const meta = mgr.metadata();
      const listName = `${meta.list_presentation || meta.synonym} (список)`;
      const title =  {title: listName, appTitle: <Typography variant="h6" noWrap>{listName}</Typography>};
      setTitle(title);
      setMgr(mgr);
    }
  }, [matches.pathname]);

  if(!mgr) {
    return null;
  }
  const meta = mgr.metadata();
  if(!Component) {
    Component = FlatList;
  }
  return <Component mgr={mgr} meta={meta}/>;
  //return (meta.hierarchical && meta.group_hierarchy) ? <TreeList mgr={mgr} meta={meta}/> : <FlatList mgr={mgr} meta={meta}/>;

}
