import React from 'react';
import RefField from './RefField';
import Checkbox from './Checkbox';
import Text from './Text';
import {NumberField} from './Number';

const stub = {};

export default function ParamField({obj, fld, param, meta, label, onChange, fullWidth=true, openList=true, ...other}) {
  if(!param) {
    param = obj.param;
  }
  if(!fld) {
    fld=param.ref;
  }
  // вычисляемые скрываем всегда
  let hide = false;

  if(!meta) {
    meta = {
      type: param.type,
      mandatory: param.mandatory,
      synonym: label || param.caption || param.name,
    };
  }
  const {types} = param.type;

  if(!param.type.isRef) {
    let Component;
    if(types.includes('boolean')) {
      Component = Checkbox;
    }
    else if(types.includes('string')) {
      Component = Text;
    }
    if(types.includes('number')) {
      Component = NumberField;
    }
    if(Component) {
      return <Component obj={obj} meta={stub} fld={fld} label={meta.synonym} fullWidth={fullWidth} {...other} />;
    }
    hide = true;
  }

  // учтём дискретный ряд - он приоритетнее связей параметров
  let oselect = types.length === 1 && ['cat.property_values', 'cat.characteristics'].includes(types[0]);
  const drow = null; // inset?.product_params?.find({param});
  if(drow) {
    if(!hide){
      hide = drow.hide;
    }
    if(drow?.list) {
      try{
        meta.list = JSON.parse(drow.list);
        oselect = true;
      }
      catch (e) {
        delete meta.list;
      }
    }
    else {
      delete meta.list;
    }
  }
  if(!drow?.list) {
    // если нет умолчаний во вставке, используем связи
    const lnk_props = {obj, grid: {selection: {cnstr: 0, inset: null}}};
    const links = param.paramsLinks(lnk_props);
    // если для параметра есть связи - сокрытие по связям
    if(!hide && links.length){
      hide = links.some((link) => link.hide);
    }
    // дополним метаданные отбором
    if (links.length) {
      const values = [];
      param.linkedValues(links, null, values);
      if(values.length) {
        if(values.length < 50) {
          oselect = true;
        }
        if(!meta.choiceParams) {
          meta.choiceParams = [];
        }
        // дополняем отбор
        meta.choiceParams.push({
          name: 'ref',
          path: {in: values.map((v) => v.value)}
        });
      }
    }
    else if(oselect && types[0] === 'cat.property_values') {
      meta.list = [];
      $p.cat.propertyValues.findRows({owner: param}, (v) => {
        meta.list.push(v);
      });
    }
  }

  return hide ? null : <RefField
    obj={obj}
    fld={fld}
    meta={meta}
    onChange={onChange}
    fullWidth={fullWidth}
    openList={openList}
    {...other}
  />;
}
