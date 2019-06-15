import { createElement, useState, useRef, useImperativeHandle } from 'rax';
import { Props } from '../types';

const Image = (props:Props) => {
  let [ source, setSource ] = useState(props.source);
  const [isError, setIsError] = useState(false);
  const imgRef = useRef(null);

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

  const onError = e => {
    const { fallbackSource = {}, onError = () => {} } = props;

    if (fallbackSource.uri && source.uri !== fallbackSource.uri) {
      setSource(fallbackSource);
      setIsError(true);
    }
    onError(e);
  };

  // imgRef 在 Weex 环境下有
  useImperativeHandle(imgRef, () => ({
    save: (callback) => {
      imgRef.current.save(result => {
        callback(result);
      });
    }
  }));

  let nativeProps:any = {
    ...props,
  };
  source = isError ? source : nativeProps.source;

  // Source must a object
  if (source && source.uri) {
    let style = nativeProps.style;
    let { width, height, uri} = source;

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

    // for cover and contain
    let resizeMode = nativeProps.resizeMode || nativeProps.style.resizeMode;
    if (resizeMode) {
      nativeProps.resize = resizeMode;
      nativeProps.style.resizeMode = resizeMode;
    }

    if (props.children) {
      nativeProps.children = null;
      return (
        <div style={nativeProps.style}>
          <image ref={imgRef} {...nativeProps} />
          <div className="absoluteImage">
            {props.children}
          </div>
        </div>
      );
    } else {
      return <image ref={imgRef} {...nativeProps} />;
    }
  }
  return null;
};

export default Image;
