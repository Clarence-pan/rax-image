import { createElement, useState, useRef} from 'rax';
import { isWeex } from 'universal-env';
import View from 'rax-view';
import './index.css';

const Image = (props) => {
  let [source, setSource] = useState('');
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

  const save = (callback) => {
    imgRef.current.save(result => {
      callback(result);
    });
  };

  let nativeProps = {
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

    let NativeImage;
    if (isWeex) {
      NativeImage = 'image';
    } else {
      NativeImage = 'img';
    }

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
          <View className="absoluteImage">
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

Image.resizeMode = {
  contain: 'contain',
  cover: 'cover',
  stretch: 'stretch',
  center: 'center',
  repeat: 'repeat',
};

export default Image;
