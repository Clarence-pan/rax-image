import fmtEvent from './fmtEvent';

Component({
  data: {
    mode: "aspectFit"
  },
  props: {
    className: "",
    style: "",
    source: {
      uri: ""
    },
    resizeMode: "contain",
    lazyLoad: false,
    onClick: function onClick() {}
  },
  onInit() {
    this.initImage();
  },
  didMount: function didMount() {
    if(!my.canIUse('component2')) {
      this.initImage();
    }
  },
  methods: {
    onClick: function onClick(e) {
      var event = fmtEvent(this.props, e);
      this.props.onClick(event);
    },
    initImage: function initImage(e) {
      var mode = 'aspectFit';
      const { width=null, height=null } = this.props.source || {};
      let style = this.props.style || '';
      if (width) style += 'width:' + width + 'rpx;';
      if (height) style += 'height:' + height + 'rpx;';

      switch (this.props.resizeMode) {
        case 'cover':
          mode = 'aspectFill';
          break;

        case 'contain':
          mode = 'aspectFit';
          break;

        case 'stretch':
          mode = 'scaleToFill';
          break;

        default:
          mode = 'aspectFit';
      }

      this.setData({
        mode: mode,
        style: style
      });
    }
  }
});