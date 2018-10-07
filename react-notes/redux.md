# Redux
大型应用中多组件之间传值很不方便，redux提供一个公共的存储区域Store，组件之间改变Store中的数据，其他组件再来Store取数据

Redux = Reducer + Flux

- store是唯一的
- reducer不能改变数据，只有store才能改变数据
- reducer是纯函数：给定固定的输入，一定有固定的输出，不能有其他副作用(不能有ajax请求，Date, timeout等)

redux核心的API
- createStore
- store.dispatch
- store.getState
- store.subscribe


