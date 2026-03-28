import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import MarkdownElement from './MarkdownElement';
import MarkdownComponents from './MarkdownComponents';
import {getContents, getHeaders, getTitle, componentRegExp} from './parseMarkdown';

export function MarkdownDocs({markdown, subtitle, title, htitle, h1, img, descr, canonical, footer,
                               setTitle, titleBtns, TopButton, opt, sx, components = {}}) {

  const contents = getContents(markdown);
  let ltitle = htitle;
  if(!ltitle) {
    const headers = getHeaders(markdown);
    ltitle = headers?.title;
  }
  if(!ltitle) {
    ltitle = getTitle(markdown);
  }
  if(subtitle) {
    ltitle += ` - ${subtitle}`;
  }

  React.useEffect(() => {
    if(ltitle) {
      const baseTitle = <Typography variant="h6" noWrap sx={{flex: 1}} component="div" >{ltitle}</Typography>;
      const appTitle = titleBtns ? <>{baseTitle}{titleBtns}</> : baseTitle;
      setTitle({appTitle});
    }
  }, [markdown]);

  return (
    <Box sx={{mt: 1, ml: 1, mb: 6, ...sx}}>
      <Helmet title={ltitle}>
        <meta name="description" content={descr || h1} />
        {canonical && <link rel="canonical" href={canonical} />}
        <meta property="og:title" content={ltitle} />
        <meta property="og:description" content={descr || h1} />
        {img && <meta property="og:image" content={img} />}
      </Helmet>

      {
        h1 && <Box sx={{display: 'flex'}}>
          <Typography variant="h4" component="h1" color="primary" sx={{flex: 1}}>{h1}</Typography>
          {TopButton}
        </Box>
      }

      {contents.map((content, index) => {
        return content.match(componentRegExp) ?
          <MarkdownComponents
            key={`cm-${index}`}
            text={content}
            components={components}
          /> :
          <MarkdownElement
            key={`m-${index}`}
            title={title}
            text={content}
            opt={opt}
          />;
      })}

      {
        footer
      }
    </Box>
  );
}

MarkdownDocs.propTypes = {
  markdown: PropTypes.string.isRequired,
  title: PropTypes.string,              // заголовок в табе браузера
  subtitle: PropTypes.string,           // суффикс проекта в заголовке
  h1: PropTypes.string,                 // заголовок статьи
  descr: PropTypes.string,              // html meta description
  footer: PropTypes.node,               // кнопки share соцсетей, прочие элементы в подвале
  opt: PropTypes.object,                // параметры marked-парсера
};

export default MarkdownDocs;
