import store from '@/store/index';
import { submitAuditLog } from '@/api/common/audit';
import types from './types';

const utils = {
  // common_key: '__AUDIT_LOG_COMMON_INFO__',
  // log_key: '__AUDIT_LOG_DATA__',
  // 检查list中是否已有传入的code，有则返回true
  checkoutRepeatCode(list, code) {
    let index = -1;
    if (Array.isArray(list) && list.length > 0) {
      index = list.findIndex(item => item.code === code);
    }
    return index > -1;
  },

  getISODateString(str) {
    return str ? new Date(str).toISOString() : new Date().toISOString();
  },

  getUTCString(str) {
    return str ? new Date(str).toUTCString() : new Date().toUTCString();
  },

  timeDiff(end, start) {
    if (typeof end === 'number' && typeof start === 'number') {
      return Math.abs(end - start);
    } else {
      const timeStart = new Date(start).getTime();
      const timeEnd = new Date(end).getTime();
      return Math.abs(timeStart - timeEnd);
    }
  },

  getSimpleValue(value) {
    if (!value) {
      return '';
    } else if (typeof value !== 'object') {
      return value;
    } else if (Array.isArray(value)) {
      return value.join(',');
    }
  },

  getStringFromObject(obj) {
    try {
      const str = JSON.stringify(obj);
      typeof str === 'string' ? str : obj;
    } catch (error) {
      return obj;
    }
  },

  setListenerLog(data = {}) {
    const commonInfo = this.getCommonInfo();
    const logList = this.getListenerLog();
    const isFreshLog = this.isLogFresh(logList, data);

    if (isFreshLog) {
      data.itemId = commonInfo.itemId;
      data.userId = commonInfo.userId;
      data.pool = commonInfo.pool;
      data.itemType = commonInfo.itemType;

      store.commit('ADD_AUDIT_LOG', { ...data });
      console.log(data);
    }
  },
  // 是否是新的日志
  isLogFresh(logList = [], current) {
    if (logList.length === 0) return current;

    const isIncluded = logList.includes(item =>
      item.code === current.code && item.startTime === current.startTime
    );
    return !isIncluded;
  },

  getCommonInfo() {
    return store.getters.auditCommonInfo || {};
  },

  getListenerLog() {
    return store.getters.auditLogs || [];
  },

  // 提交数据前
  uploadLog(submitCode) {
    // const oldList = this.getListenerLog();
    // if (!oldList.length) {
    //   return;
    // }
    this.beforeUplaod(submitCode);

    const logList = this.getListenerLog();
    const now = +new Date();
    const commonInfo = this.getCommonInfo();

    // 统一为所有日志设置提交时间
    logList.forEach(item => {
      item.createTime = now;
    });
    console.table(JSON.parse(JSON.stringify(logList)));
    // 发请求上传数据
    this.uploadRequest({ itemType: commonInfo.itemType, data: logList });
  },
  beforeUplaod(submitCode) {
    const now = +new Date();
    submitCode = submitCode || 'click_save_action'; // space_save_action click_save_action
    const commonInfo = this.getCommonInfo();

    var initCode = 'start_action';
    var endCode = 'end_action';

    // 提交前要写入审核开始日志，审核结束日志，提交日志
    const initLog = {
      startTime: commonInfo.startTime,
      code: initCode,
      name: utils.getNameByCode(types, initCode),
      itemId: commonInfo.itemId,
      itemType: commonInfo.itemType,
      pool: commonInfo.pool,
      userId: commonInfo.userId
    };

    const endLog = {
      endTime: now,
      code: endCode,
      name: utils.getNameByCode(types, endCode),
      itemId: commonInfo.itemId,
      itemType: commonInfo.itemType,
      pool: commonInfo.pool,
      userId: commonInfo.userId
    };
    const auditSubmitLog = {
      code: submitCode,
      name: utils.getNameByCode(types, submitCode),
      itemId: commonInfo.itemId,
      itemType: commonInfo.itemType,
      pool: commonInfo.pool,
      userId: commonInfo.userId
    };
    store.commit('ADD_AUDIT_LOG', [initLog, endLog, auditSubmitLog]);
  },
  uploadRequest(params) {
    submitAuditLog(params)
      .then(resp => {
        if (resp.code === 0) {
          store.commit('CLEAR_AUDIT_LOG');
        }
      }).finally(() => {
        store.commit('SUBMIT_LOG', false);
      });
  },
  isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
  },

  getNameByCode(types = {}, code = '') {
    if (types.hasOwnProperty(code) && types[code]) {
      return types[code];
    }
    return '';
  }
};

export default utils;
