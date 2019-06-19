import {createElement, render, useEffect, useRef} from 'rax';
import DU from 'driver-universal';
import Image from '../src/index';

const App = () => {

  const imageRef = useRef(null);

  useEffect(() => {
    console.log(imageRef.current);
    // imageRef.current.save();
  });

  return <Image ref={imageRef} source={{
    uri: 'https://gw.alicdn.com/tfs/TB1bBD0zCzqK1RjSZFpXXakSXXa-68-67.png',
    height: '68',
    width: '67'
  }} />;
};

render(<App />, document.body, { driver: DU });
