import utils from './index';
import types from './types';

export default class Listener {
  constructor({ el, binding }) {
    this.el = el;
    this.binding = binding;
    this.classsList = el && typeof el.getAttribute === 'function'
      ? (el.getAttribute('class') || '').split(' ') : [];

    this.data = {
      name: utils.getNameByCode(types, this.binding.arg),
      code: this.binding.arg,
      startTime: '', // 组件触发时间
      endTime: '', // 组件操作结束时间
      newValue: '',
      oldValue: '',

      itemId: '',
      userId: '',
      itemType: '',
      createTime: '' // 日志提交时间
    };

    this.isEventPending = false;
    // 需要记录Blur和focus时间
    this.isTimerange = this.binding.modifiers.timerange || false;
    this.focusTimes = [];
  }
  addListener() {
    // binding: name value, oldValue, expression, arg, modifiers
    if (this.el && typeof this.el.getAttribute === 'function') {
      if (this.classsList.indexOf('el-select') > -1) {
        const input = this.el.querySelector('input');
        input.addEventListener('focus', this.focusHandler.bind(this), true);
        input.addEventListener('blur', this.blurHandler.bind(this), true);
      } else if (this.classsList.indexOf('el-radio-group') > -1) {
        this.el.addEventListener('click', this.clickHandler.bind(this), true);
      } /* else if (this.classsList.indexOf('el-button') > -1) {
        this.el.addEventListener('click', this.clickHandler.bind(this), true);
        if (this.binding.arg === 'click_save_action') {
          window.addEventListener('keypress', this.keypressHandler.bind(this));
        }
      } */

      if (this.binding.arg === 'offline_reason_action') {
        this.el.addEventListener('click', this.clickHandler.bind(this), false);
      }
    }
  }

  removeListener() {
    if (this.classsList.indexOf('el-select') > -1) {
      this.el.querySelector('input').removeEventListener('focus', this.focusHandler);
      this.el.querySelector('input').removeEventListener('blur', this.blurHandler);
    } else if (this.classsList.indexOf('el-radio-group') > -1) {
      this.el.removeEventListener('click', this.clickHandler);
    } /* else if (this.classsList.indexOf('el-button') > -1) {
      this.el.removeEventListener('click', this.clickHandler);
      if (this.binding.arg === 'click_save_action') {
        window.removeEventListener('keypress', this.keypressHandler);
      }
    } */
    if (this.binding.arg === 'offline_reason_action') {
      this.el.removeEventListener('click', this.clickHandler);
    }
  }

  componentUpdated(el, binding) {
    this.el = el;
    this.binding = binding;
    const now = +new Date();

    const validLog = this.isEventPending && binding.value !== binding.oldValue && String(binding.value) !== '';
    if (validLog) {
      var data = {
        code: this.data.code,
        name: this.data.name,
        oldValue: utils.getSimpleValue(binding.oldValue),
        newValue: utils.getSimpleValue(binding.value)
      };
      if (this.isTimerange) {
        this.focusTimes = this.focusTimes.slice(-2);
        const startTime = this.focusTimes.shift() || now;
        data.startTime = startTime;
        data.endTime = now;
      }
      utils.setListenerLog(data);
    }
    this.isEventPending = false;
  }

  // changeHandler(event) {
  //   this.isEventPending = true;
  // }
  /**
   * focus时，select组件会在focus和blur时分别触发一次focus事件
   */
  focusHandler(event) {
    this.isEventPending = true;
    const now = +new Date();
    this.focusTimes.push(now);
  }

  // blur 时事件触发，但是dom还没更新，此时获取不到最新数据，仅可以记录时间
  blurHandler() {
    this.isEventPending = true;
  }
  clickHandler(event) {
    this.isEventPending = true;
    event.stopPropagation();
    if (!this.data.startTime) {
      const now = +new Date();
      this.data.startTime = now;
    }
  }
  keypressHandler(event) {
    // Enter, Space
    if (event.code === 'Space' && this.binding.arg === 'click_save_action') {
      event.preventDefault();
      // utils.uploadLog('space_save_action');
    }
  }
}

