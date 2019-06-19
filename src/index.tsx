import { createElement, useState, forwardRef, useRef, useImperativeHandle } from 'rax';
import { isWeex } from 'universal-env';
import View from 'rax-view';
import { Props } from './types';

const Image = (props: Props, ref) => {
  let [source, setSource] = useState('');
  const [isError, setIsError] = useState(false);

  const imgRef = useRef(null);

  const onError = e => {
    const { fallbackSource = {}, onError = () => {} } = props;

    if (fallbackSource.uri && source.uri !== fallbackSource.uri) {
      setSource(fallbackSource);
      setIsError(true);
    }
    onError(e);
  };

  const onLoad = e => {
    const { onLoad = () => {} } = props;
    if (typeof e.success !== 'undefined') {
      if (e.success) onLoad(e); else onError(e);
    } else if (typeof e.currentTarget !== 'undefined') {
      if (e.currentTarget.naturalWidth > 1 && e.currentTarget.naturalHeight > 1) {
        onLoad(e);
      } else {
        onError(e);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    // save 方法只在 weex 下可用
    save: isWeex ? (callback) => {
      imgRef.current.save(result => {
        callback(result);
      });
    } : () => {},
    _nativeNode: imgRef.current
  }));

  let nativeProps: any = {
    ...props,
  };
  source = isError ? source : nativeProps.source;

  // Source must a object
  if (source && source.uri) {
    let style = nativeProps.style;
    let {width, height, uri} = source;

    // Default is 0
    if (
      width == null &&
      height == null &&
      style.height == null &&
      style.width == null
    ) {
      width = 0;
      height = 0;
    }

    nativeProps.style = {
      ...{
        ...{display: 'flex'},
        width: width,
        height: height,
      },
      ...style
    };
    nativeProps.src = uri;
    nativeProps.onLoad = onLoad;
    nativeProps.onError = onError;

    delete nativeProps.source;

    let NativeImage = isWeex ? 'image' : 'img';

    // for cover and contain
    let resizeMode = nativeProps.resizeMode || nativeProps.style.resizeMode;
    if (resizeMode) {
      if (isWeex) {
        nativeProps.resize = resizeMode;
        nativeProps.style.resizeMode = resizeMode;
      } else {
        nativeProps.style.objectFit = resizeMode;
      }
    }

    if (props.children) {
      nativeProps.children = null;
      return (
        <View style={nativeProps.style}>
          <NativeImage ref={imgRef} {...nativeProps} />
          <View style={{
            left: 0,
            top: 0,
            position: 'absolute'
          }}>
            {props.children}
          </View>
        </View>
      );
    } else {
      return <NativeImage ref={imgRef} {...nativeProps} />;
    }
  }
  return null;
};

export default forwardRef(Image);
