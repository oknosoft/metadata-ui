import React from 'react';
import RefField from './RefField';
import Checkbox from './Checkbox';
import Text from './Text';
import {NumberField} from './Number';
import {optionListHook, OptionList} from './OptionList';

const stub = {};

export default function ParamField({obj, fld, param, meta, label, onChange, fullWidth=true, openList: paramOpenList, ...other}) {
  if(!param) {
    param = obj.param;
  }
  if(!fld) {
    fld = param.ref;
  }

  const [listProps, openList] = optionListHook(param, paramOpenList);

  if(!meta) {
    meta = {
      type: param.type,
      mandatory: param.mandatory,
      synonym: label || param.caption || param.name,
    };
  }
  const {types} = param.type;
  // вычисляемые скрываем всегда
  let hide = false;
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
  const drow = null; // inset?.product_params?.find({param});
  if(drow) {
    if(!hide){
      hide = drow.hide;
    }
    if(drow?.list) {
      try{
        meta.list = JSON.parse(drow.list);
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
    const context = obj.owner.context();
    const links = param.paramsLinks(context);
    // если для параметра есть связи - сокрытие по связям
    if(!hide && links.length){
      hide = links.some((link) => link.hide);
    }
    // дополним метаданные отбором
    if (links.length) {
      meta.list = [];
      links.forEach((link) => link.appendValues(meta.list));
    }
    else if(types[0] === 'cat.property_values') {
      meta.list = [];
      $p.cat.propertyValues.findRows({owner: param}, (v) => {
        meta.list.push(v);
      });
    }
  }

  return hide ? null : <>
    <RefField
      obj={obj}
      fld={fld}
      meta={meta}
      onChange={onChange}
      fullWidth={fullWidth}
      openList={openList}
      {...other}
    />
    {listProps ? <OptionList {...listProps} /> : null}
  </>;
}
