/**
 * <img v-LazyLoad="xxx.jpg" />
 * 此懒加载指令存在注册多个scroll监听事件的性能问题，优化方向：使用发布订阅模式，维护全局事件列表
 */

const LazyLoad = {
  install(Vue, options) {
    const defaultSrc = options.default;
    Vue.directive('lazy', {
      bind(el, binding) {
        LazyLoad.init(el, binding.value, defaultSrc);
      },
      inserted(el) {
        if (IntersectionObserver) {
          LazyLoad.observe(el);
        } else {
          LazyLoad.listenerScroll(el);
        }
      }
    });
  },
  init(el, val, def) {
    el.setAttribute('data-src', val);
    el.setAttribute('src', def);
  },
  observe(el) {
    const io = new IntersectionObserver(entries => {
      const realSrc = el.dataset.src;
      if (entries[0].isIntersecting) {
        if (realSrc) {
          el.src = realSrc;
          el.removeAttribute('data-src');
        }
      }
    });
    io.observe(el);
  },
  listenerScroll(el) {
    const handler = LazyLoad.throttle(LazyLoad.load, 300);
    LazyLoad.load(el);
    window.addEventListener('scroll', () => {
      handler(el);
    });
  },
  load(el) {
    const windowHeight = document.documentElement.clientHeight;
    const rect = el.getBoundingClientRect();
    const elTop = rect.top;
    const elBtm = rect.bottom;
    const realSrc = el.dataset.src;
    if (elTop - windowHeight < 0 && elBtm > 0) {
      if (realSrc) {
        el.src = realSrc;
        el.removeAttribute('data-src');
      }
    }
  },
  // 节流
  throttle(fn, delay) {
    let timer;
    let prevTime;
    return function(...args) {
      const currTime = Date.now();
      const context = this;
      if (!prevTime) prevTime = currTime;
      clearTimeout(timer);

      if (currTime - prevTime > delay) {
        prevTime = currTime;
        fn.apply(context, args);
        clearTimeout(timer);
        return;
      }

      timer = setTimeout(function() {
        prevTime = Date.now();
        timer = null;
        fn.apply(context, args);
      }, delay);
    };
  },
};
export default LazyLoad;
