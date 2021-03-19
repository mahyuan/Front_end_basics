import log from './directiveList/log';
import copy from './directiveList/copy';
import langpress from './directiveList/langpress';
import lazyload from './directiveList/lazyload';
import permission from './directiveList/permission';
import waterMarker from './directiveList/waterMarker';
import draggable from './directiveList/draggable';

const directives = {
  draggable,
  waterMarker,
  permission,
  lazyload,
  langpress,
  copy,
  log
};
const directive = {
  install(Vue) {
    Object.keys(directives).forEach(key => {
      Vue.directive(key, directives[key]);
    });
  }

};
export default directive;
