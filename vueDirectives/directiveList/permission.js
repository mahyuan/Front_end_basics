
/**
 * 权限
<div class="btns">
  <!-- 显示 -->
  <button v-permission="'1'">权限按钮1</button>
  <!-- 不显示 -->
  <button v-permission="'10'">权限按钮2</button>
</div>
 */

function checkArray(key) {
  const arr = ['1', '2', '3', '4'];
  const index = arr.indexOf(key);
  return index > -1;
}

export default {
  inserted(el, binding, vnode) {
    const permission = binding.value;
    if (permission) {
      const hasPermission = checkArray(permission);
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  }
};
