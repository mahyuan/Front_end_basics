export default {
  bind(el, binding) {
    el.$value = binding.value;
    el.style.cursor = 'copy';
    el.handler = () => {
      if (!el.$value) {
        console.log('无复制内容');
        return;
      }
      const textarea = document.createElement('textarea');
      textarea.readOnly = 'readonly';
      textarea.style.position = 'absolute';
      textarea.style.left = '200px';
      textarea.value = el.$value;
      document.body.appendChild(textarea);
      // 兼容ios
      if (typeof textarea.select === 'function') {
        textarea.select();
      } else {
        textarea.setSelectionRange(0, textarea.value.length);
      }
      const result = document.execCommand('Copy');
      if (result) {
        console.log('复制成功', result);
      }
      document.body.removeChild(textarea);
    };

    el.addEventListener('click', el.handler);
  },
  componentUpdated(el, binding) {
    el.$value = binding.value;
  },
  unbind(el) {
    el.removeEventListener('click', el.handler);
  }
};
