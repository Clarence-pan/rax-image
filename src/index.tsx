import { createElement } from 'rax';
import { isWeex } from 'universal-env';
import { Props } from './types';
import ImageWeex from './weex';
import ImageWeb from './web';

export default (props:Props) => {
  if (isWeex) {
    return <ImageWeex {...props} />;
  } else {
    return <ImageWeb {...props} />;
  }
};
