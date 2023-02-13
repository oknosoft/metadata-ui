import React from 'react';
import PropTypes from 'prop-types';

export default function MarkdownComponents({handleIfaceState, handleNavigate, text, components}) {

  const xml = new DOMParser().parseFromString(text.substr(1, text.length -2),"text/xml");
  const elm = xml && xml.firstElementChild;
  if(elm) {
    const {tagName, attributes, children} = elm;
    const Component = components[tagName];
    if(Component) {
      const props = {};
      for(const attr of attributes) {
        props[attr.name] = attr.value;
      }
      if(children.length) {
        return <React.Suspense key="attachments" fallback="Загрузка...">
          Компоненты с детьми, пока не поддержаны. Используйте один узел
        </React.Suspense>;
      }
      else {
        return <React.Suspense key="attachments" fallback="Загрузка...">
          <Component handleIfaceState={handleIfaceState} handleNavigate={handleNavigate} {...props} />
        </React.Suspense>;
      }
    }
  }

  return null;
}
