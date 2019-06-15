import * as Rax from 'rax';

/**
 * 组件属性
 */
export interface Props extends Rax.Attributes {
  children?: any;
  /**
   * 图片源设置
   * 支持端: Weex/Web
   */
  source: {
    uri?: string;
    width?: string|number;
    height?: string|number;
  },
  /**
   * 图片样式
   * 支持端: Weex/Web
   */
  style?: Rax.CSSProperties,
  /**
   * 降级图片的源
   * 支持端: Weex
   */
  fallbackSource?: {
    uri?: string;
    width?: string;
    height?: string;
  },
  /**
   * 图片展示模式
   * 支持端: Weex/Web
   */
  resizeMode?: 'contain' | 'cover' | 'stretch' | 'center' | 'repeat';
  /**
   * 图片质量
   * 支持端: Weex
   */
  quality?: 'original' | 'normal' | 'low' | 'high' | 'auto';
  /**
   * 图片加载成功事件回调
   */
  onLoad?: (e: Event)=> void;
  /**
   * 图片加载失败事件回调
   */
  onError?: (e: Event)=> void;
}

// FIXME: 这个 Event 的定义还不足
interface Event {
  [propName:string]: any;
}

/**
 * ref 实例方法
 */
export interface RefInstanceMethods {
  /**
   * 保存图片事件回调
   */
  save?: ()=> void;
}
