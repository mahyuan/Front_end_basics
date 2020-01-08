
## JSONP如何解决跨域

原理： 利用script标签可以跨域来实现

### 原生方式：
```html
<script>
  function callbackFunction(result, methodName) {
    console.log('-----result----', result);
    console.log('-----methodName----', methodName);

    var html = '<ul>';
      for(var i = 0; i < result.length; i++) {
          html += '<li>' + result[i] + '</li>';
      }
      html += '</ul>';
      var element = document.getElementById('divCustomers1')
      element.innerHTML = html
  }
</script>
<script type="text/javascript" src="https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=callbackFunction"></script>
```

### jquery方式
```html
<script src="https://cdn.static.runoob.com/libs/jquery/1.8.3/jquery.js"></script>
<script>
  $.getJSON("https://www.runoob.com/try/ajax/jsonp.php?jsoncallback=?", function(data) {
      var html = '<ul>';
      for(var i = 0; i < data.length; i++) {
          html += '<li>' + data[i] + '</li>';
      }
      html += '</ul>';

      $('#divCustomers2').html(html);
  });
</script>
```

### vue使用jsonp
vue使用jsonp需要引用vue-jsonp包
Static function: `Vue.jsonp(url, dataObj, timeout)`
In Vue component: `this.$jsonp(url, dataObj, timeout)`

URL:
```js
'/url?{callbackQuery}={callbackName}&...'

// Default:
'/url?callback=jsonp_RANDOM_STRING&...'
```

使用案例
```js
import Vue from 'vue'
import VueJsonp from 'vue-jsonp'
Vue.use(VueJsonp)

// If you want to setup the global timeout, just:
Vue.use(VueJsonp, 5000)
// Now all requests will be expired after 5000ms.

// Use it in Vue Component.
const SomeComponent = Vue.extend({
  methods: {
    getData () {
      this.$jsonp('http://www.some-site.com/data', { name: 'MyName', age: 20 }).then(json => {
        // Success.
      }).catch(err => {
        // Failed.
      })
    }
  }
})

// Static Function.
// Request url will be 'http://www.some-site.com/data?name=MyName&age=20&cb=jsonpFunc'
Vue.jsonp('http://www.some-site.com/data', {
  name: 'MyName', age: 20, callbackQuery: 'cb', callbackName: 'jsonpFunc'
}).then(json => {
  // Success.
}).catch(err => {
  // Failed.
})
```


