import {createElement, render} from 'rax';
import * as DriverDOM from 'driver-dom';
import { isWeex } from 'universal-env';
import * as DriverWeex from 'driver-weex';
import Image from '../src/index';

render(<Image source={{
  uri: 'https://gw.alicdn.com/tfs/TB1bBD0zCzqK1RjSZFpXXakSXXa-68-67.png',
  height: '68',
  width: '67'
}} />, document.body, { driver: isWeex ? DriverWeex : DriverDOM });
