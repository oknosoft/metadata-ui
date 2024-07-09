import * as React from 'react';
import Typography from '@mui/material/Typography';

export const description = 'Метадата: hello world';

export const initialTitle = {
  description,
  title: description,
  appTitle: <Typography variant="h6" noWrap component="div">{description}</Typography>,
  setTitle() {
  },
};

export const TitleContext = React.createContext(initialTitle);
export const useTitleContext = () => React.useContext(TitleContext);
