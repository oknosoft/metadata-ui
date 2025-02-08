
import {TextFormatter, TextCell} from './Text';
import {NumberFormatter, NumberCell} from './Number';
import {PresentationFormatter} from './RefField';
import RefCell from './RefCell';

export function dataFieldPlugin() {

  Object.assign(  $p.ui, {
    editors: {
      Text: TextCell,
      Ref: RefCell,
      Number: NumberCell,
    },
    formatters: {
      Text: TextFormatter,
      Presentat: PresentationFormatter,
      Number: NumberFormatter,
    },
  });
}
