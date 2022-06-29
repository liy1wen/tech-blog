---
title: Vue3.0setup语法糖
---

## 前言

Vue3.0 给我们提供了 composition API，而实现 composition API 这种代码风格主要是使用官方提供的 setup 这个函数。

Vue3.0 一个常规的 setup 写法如下：

```javaScript
<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header'

export default defineComponent({
  components: {
    NavMenu,
    NavHeader
  },
  setup(props,context) {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
      isCollapse.value = isFold
    }

    return {
      isCollapse,
      handleFoldChange
    }
  }
})
```

其实在 Vue3.0 阶段，就已经有了 script setup。不过当时这个提案还只是实验阶段，所以之前写 Vue3 的代码仍然是采用常规 setup 函数这种，终于我们在 2021 年 6 月 29 日上午迎来了他的[Finalization](https://github.com/vuejs/rfcs/pull/227#issuecomment-870105222)，下面简单介绍下更新的内容。

![](https://files.mdnice.com/user/14603/1de0aeab-37a9-4c43-8207-6151169bf77d.png)

## 更新内容

介绍更新内容之前，我们先看看最新的 script setup 代码写法，让大家有一个基本的了解以及和之前写法做一下对比：

```javaScript
<script setup lang="ts">
import { ref } from 'vue'
import AccountLogin from './account-login.vue'

const isRememberPassword = ref(true)
const accountRef = ref<InstanceType<typeof AccountLogin>>()
const activeName = ref('account')
const login = () => {
  activeName.value === 'account'
    ? accountRef.value?.loginAction(isRememberPassword.value)
    : phoneRef.value?.loginAction(isRememberPassword.value)
}
</script>
```

### 1.子组件不需要注册

在 script setup 中，引入的组件可以直接使用，无需再通过 components 进行注册，并且无法指定当前组件的名字，它会自动以引入文件名为主。示例：

```javaScript
<template>
    <login-account />
</template>

<script setup>
  import LoginAccount from './loginAccount'
</script>
```

### 2.变量和方法不需要再被 return

示例：

```javaScript
<template>
  <div class="overview">
    {{ message }}
    <button @click="changeMessage/button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const message = ref('hello world')
const changeMessage = () => {
  message = 'hahahah'
}
</script>
```

### 3.新增 API

**defineExpose**

传统 setup 写法里我们可以在父组件中通过子组件的 ref 实例来访问子组件的数据和方法（childRef.value.someFn()）,但是这种写法在 script setup 却行不通了。

不过最新提供了 defineExpose 这个 API。组件通过 defineExpose 暴露出自己的属性，在父组件中拿到。

```javaScript
//子组件
import { ref, defineExpose } from 'vue'
const loginAction = (isRememberPassword: boolean) => {
  ......
}
defineExpose({
  loginAction
})
```

```javaScript
//父组件
<template>
  <div>
    <account-login
      ref="accountRef"
      :rememberPassword="isRememberPassword"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AccountLogin from './account-login.vue'
const accountRef = ref<InstanceType<typeof AccountLogin>>()
const login = () => {
  accountRef.value?.loginAction()
}
</script>
```

**defineProps**

defineProps 用于子组件接受父组件传的值.示例:

```javaScript
//父组件
<template>
  <div>
    <account-login :message="message" />
  </div>
</template>
<script lang="ts" setup>
// 组件命名采用的是大驼峰，引入后不需要在注册
import AccountLogin from './account-login.vue'
let message = 'hello world'
</script>
```

```javaScript
//子组件
<template>
  <div>
    <h2>{{message}}</h2>
  </div>
</template>
<script lang="ts" setup>
import {defineProps} from 'vue'
defineProps({
    message:{
        type:String,
        default:'hahha'
    }
})
</script>
```

**defineEmits**

子组件向父组件传递事件。示例:

```javaScript
//子组件
<template>
  <div>
    <button @click='sendEmit'>给父组件发送事件</button>
  </div>
</template>
<script lang="ts" setup>
import {defineEmits} from 'vue'
//使用defineEmits创建名称，接受一个数组
const emit = defineEmits(['sendEmit'])
const sendEmit = () =>{
  emit('sendEmit','传递的数据')
}
</script>
```

```javaScript
//父组件
<template>
  <div>
    <account-login @sendEmit="handleEmit">
  </div>
</template>
<script lang="ts" setup>
// 组件命名采用的是大驼峰，引入后不需要在注册
import AccountLogin from './account-login.vue'
const handleEmit = (data) => {
  console.log(`子组件传来的值：${data}`)
}
</script>
```

### 4.其它

**顶层 await**

script setup 会默认声明 async，类似于 async setup()的效果，你可以在 script setup 中直接使用 await 函数。示例:

```javascript
<script lang='ts' setup>
  const res = await request('api/getData')
</script>
```

**useSlots 和 useAttrs**

之前可以通过 useContext 从上下文中获取 slots 和 attrs。不过提案在正式通过后，废除了这个语法，被拆分成了 useAttrs 和 useSlots。示例：

```javascript
// 旧
<script setup>
  import { useContext } from 'vue'
  const { slots, attrs } = useContext()
</script>

// 新
<script lang="ts" setup>
  import { useAttrs, useSlots } from 'vue'
  const attrs = useAttrs()
  const slots = useSlots()
</script>

```
