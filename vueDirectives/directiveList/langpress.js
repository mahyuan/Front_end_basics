
/**
 * <div  v-longpress:300="longpress">test</div>
 */

export default {
  bind(el, binding, vnode) {
    if (typeof binding.value !== 'function') {
      throw new Error('callback must been a functiion');
    }
    const duration = binding.arg && Number(binding.arg) || 2000;

    let pressTimer = null;
    const start = e => {
      console.log('start e', e);
      if (e.type === 'click' && el.button !== 0) {
        return;
      }
      if (pressTimer === null) {
        pressTimer = setTimeout(() => {
          handler();
        }, duration);
      }
    };

    const cancel = e => {
      console.log('cnacel e', e);
      clearTimeout(pressTimer);
      pressTimer = null;
    };

    const handler = e => {
      binding.value(e);
    };

    el.addEventListener('mousedown', start);
    el.addEventListener('touchstart', start);

    el.addEventListener('click', cancel);
    el.addEventListener('touchout', cancel);
    el.addEventListener('click', cancel);
    el.addEventListener('touchend', cancel);
    el.addEventListener('touchcancel', cancel);
  },

  componentUpdated(el, binding) {
    el.$value = binding.value;
  },

  unbind(el) {
    el.removeEventListener('click', el.handler);
  }
};
