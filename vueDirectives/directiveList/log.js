// https://pms.ushareit.me/index.php?m=story&f=view&storyID=8248
import Listener from '../utils/listener';

const listeners = {};
window.listeners = listeners;

export default {
  // binding: name value, oldValue, expression, arg, modifiers
  inserted(el, binding) {
    const code = binding.arg;
    if (!code) {
      throw new Error('v-log need binding.arg arguments, with: ' + el);
    }

    const listener = new Listener({ el, binding });
    listener.addListener();
    listeners[code] = listener;
  },
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated(el, binding) {
    const code = binding.arg;
    if (!code) {
      return;
    }

    const listenerItem = listeners[code] || null;
    if (listenerItem) {
      listenerItem.binding = binding;
      listenerItem.componentUpdated(el, binding);
    }
  },
  unbind(el, binding) {
    const code = binding.arg;
    if (!code) {
      return;
    }

    const listenerItem = listeners[code] || null;
    if (listenerItem) {
      listenerItem.removeListener();
    }

    delete listeners[code];
  }
};
