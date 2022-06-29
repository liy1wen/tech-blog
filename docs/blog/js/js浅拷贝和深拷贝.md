---
title js 浅拷贝和深拷贝
---

## 什么是浅拷贝和深拷贝

js 中数据类型分为原始类型和引用类型。原始类型即保存在栈内存中的简单数据段，这种类型值是直接存储在内存中的。而引用类型值则是保存在堆内存中的对象，栈内存中存储的是指向堆内存中对象的地址，因此引用类型的值实质保存的是指向一个堆内存对象的地址指针。而正是因为引用类型的这种机制，导致我们在复制一个引用类型变量时，其实复制的是一个地址指针，因此复制和被复制的两个变量其实指向同一个堆内存中的对象，当改变这个对象时，两个变量获取的值也就都产生了变化。而原始类型值本身存储的就是一个数据，所以不存在改变一个变量而引起其他变量发生变化的问题。因此浅拷贝和深拷贝是发生在引用类型中的。这两种拷贝的主要区别则在于复制的层次和是否在栈内存中重新分配了空间。

## 浅拷贝

浅拷贝只会将被复制对象的第一层属性进行复制，若第一层属性为原始类型的值，则直接复制其值，一般称之为“传值”；若第一层属性为引用类型的值，则复制的是其存储的指向堆内存对象的地址指针，一般称之为“传址”。因此浅拷贝的结果存在当改变一个对象的值时引起另一个对象值变化的问题。即新对象和旧对象之间值相互影响。下面是一些实现浅拷贝的方法：

1. Array.concat()，Array.slice()，Array.from()等

```javascript
let a = [1, 2, 3, { name: 'Joy' }]
let b = [].concat(a)
let c = b.slice()
let d = Array.from(c)

a[1] = 1000
console.log('a: ', a) //a:  [ 1, 1000, 3, { name: 'Joy' } ]
console.log('b: ', b) //b:  [ 1, 2, 3, { name: 'Joy' } ]
console.log('c: ', c) //c:  [ 1, 2, 3, { name: 'Joy' } ]
console.log('d: ', d) //d:  [ 1, 2, 3, { name: 'Joy' } ]
/**---改变a中的原始类型值，b、c、d没有变化 */

a[3].name = 'Bob'
console.log('a: ', a) //a:  [ 1, 1000, 3, { name: 'Bob' } ]
console.log('b: ', b) //b:  [ 1, 2, 3, { name: 'Bob' } ]
console.log('c: ', c) //c:  [ 1, 2, 3, { name: 'Bob' } ]
console.log('d: ', d) //d:  [ 1, 2, 3, { name: 'Bob' } ]
```

2. Object.assign()

```javascript
let a = {
  name: 'Joy',
  friends: ['Bob', 'Tom', 'Jim'],
}
let b = Object.assign({}, a)

a.name = 'Lie'
console.log('a: ', a) //a:  { name: 'Lie', friends: [ 'Bob', 'Tom', 'Jim' ] }
console.log('b: ', b) //b:  { name: 'Joy', friends: [ 'Bob', 'Tom', 'Jim' ] }
/**---改变a中的原始类型值，b没有变化 */

a.friends.push('Sun')
console.log('a: ', a) //a:  { name: 'Lie', friends: [ 'Bob', 'Tom', 'Jim', 'Sun' ] }
console.log('b: ', b) //b:  { name: 'Joy', friends: [ 'Bob', 'Tom', 'Jim', 'Sun' ] }
/**---改变a中的引用类型值，发现b中引用类型值也发生了变化 */
```

还有例如 es6 扩展运算符 等方法也实现的是浅拷贝。

## 深拷贝

而不同于浅拷贝，深拷贝是逐层对目标对象进行复制，意味着会在栈内存中重新分配空间存储指向一个新对象的新地址指针，因此不存在改变一个对象值而引发另一个对象随之改变的问题。下面提供两种深拷贝的实现方法。

1. 递归

```javascript
function deepClone(obj) {
  if (obj && typeof obj === 'object') {
    let newObj = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = deepClone(obj[key])
      }
    }
    return newObj
  }
  return obj
}

let a = {
  name: 'Joy',
  friends: ['Bob', 'Tom', 'Jim'],
}

let b = deepClone(a)
console.log('a: ', a) //a:  { name: 'Joy', friends: [ 'Bob', 'Tom', 'Jim' ] }
console.log('b: ', b) //b:  { name: 'Joy', friends: [ 'Bob', 'Tom', 'Jim' ] }

a.name = 'Lie'
a.friends.push('Sun')
console.log('a: ', a) //a:  { name: 'Lie', friends: [ 'Bob', 'Tom', 'Jim', 'Sun' ] }
console.log('b: ', b) //b:  { name: 'Joy', friends: [ 'Bob', 'Tom', 'Jim' ] }
/**---发现无论改变a中的原始类型值还是引用类型值，b都没有发生任何变化 */
```

但该方法忽略了一个问题，就是当出现循环引用时，会发生死循环，造成栈溢出的问题。

2. 利用 JSON.parse()和 JSON.stringify()

```javascript
function deepClone(obj) {
  if (obj && typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj))
  }
  return obj
}

let a = {
  name: 'Joy',
  friends: ['Bob', 'Tom', 'Jim'],
}

let b = deepClone(a)
console.log('a: ', a) //a:  { name: 'Joy', friends: [ 'Bob', 'Tom', 'Jim' ] }
console.log('b: ', b) //b:  { name: 'Joy', friends: [ 'Bob', 'Tom', 'Jim' ] }

a.name = 'Lie'
a.friends.push('Sun')
console.log('a: ', a) //a:  { name: 'Lie', friends: [ 'Bob', 'Tom', 'Jim', 'Sun' ] }
console.log('b: ', b) //b:  { name: 'Joy', friends: [ 'Bob', 'Tom', 'Jim' ] }
/**---发现无论改变a中的原始类型值还是引用类型值，b都没有发生任何变化 */
```

但利用 JSON.parse()和 JSON.stringify()这种方法会有一些缺陷，在序列化处理非数组对象的属性值（例如 undefined、函数类型、正则表达式类型或者 symbol 值等）时会忽略属性值或者转换为 null，而且会抛弃对象的 constructor，导致深拷贝之后都变成 Object。此外 JSON.stringify()在存在循环引用的情况下会抛出异常。

- obj 里面有时间对象，则 JSON.stringify 后再 JSON.parse 的结果，时间将只是字符串的形式。而不是时间对象；

- 如果 obj 里有 RegExp、Error 对象，则序列化的结果将只得到空对象；

- 如果 obj 里有函数，undefined，则序列化的结果会把函数或 undefined 丢失；

- 如果 obj 里有 NaN、Infinity 和-Infinity，则序列化的结果会变成 null

- 如果 obj 中的对象是有构造函数生成的， 则使用 JSON.parse(JSON.stringify(obj))深拷贝后，会丢弃对象的 constructor；

## 处理循环引用问题的深拷贝

循环引用问题的产生原因可能是对象之间相互引用，也可能是对象引用了其自身，而造成死循环的原因则是我们在进行深拷贝时并没有将这种引用情况考虑进去，因此解决问题的关键也就是可以将这些引用存储起来并在发现引用时返回被引用过的对象，从而结束递归的调用。

原理：可以使用一个 WeakMap 结构（ES6）或者数组（ES5）存储已经被拷贝的对象，每一次进行拷贝的时候就先向 WeakMap 查询该对象是否已经被拷贝，如果已经被拷贝则取出该对象并返回。

```javascript
/**
 * js深拷贝(包括 循环引用 的情况)
 *
 * @param {*} originObj
 * @param {*} [map=new WeakMap()]  使用hash表记录所有的对象的引用关系，初始化为空
 * @returns
 */
function deepClone(originObj, map = new WeakMap()) {
  if (!originObj || typeof originObj !== 'object') return originObj //空或者非对象则返回本身

  //如果这个对象已经被记录则直接返回
  if (map.get(originObj)) {
    return map.get(originObj)
  }
  //这个对象还没有被记录，将其引用记录在map中，进行拷贝
  let result = Array.isArray(originObj) ? [] : {} //拷贝结果
  map.set(originObj, result) //记录引用关系
  let keys = Object.keys(originObj) //originObj的全部key集合
  //拷贝
  for (let i = 0, len = keys.length; i < len; i++) {
    let key = keys[i]
    let temp = originObj[key]
    result[key] = deepClone(temp, map)
  }
  return result
}

/**下面是一些例子 */

/**例子1： 数组深拷贝 */
let a = [1, 2]
let b = [4, 5, 6, a]
a.push(b)
let c = deepClone(a)

a.push(200)
b.push(10)
console.log(a) //[ 1, 2, [ 4, 5, 6, [Circular], 10 ], 200 ]
console.log(b) //[ 4, 5, 6, [ 1, 2, [Circular], 200 ], 10 ]
console.log(c) //[ 1, 2, [ 4, 5, 6, [Circular] ] ]
/**a 和 b均变化，因为a、b互为直接引用, 而通过深拷贝，c不受a、b变化的影响 */

c[2][0] = 100
console.log(a) //[ 1, 2, [ 4, 5, 6, [Circular], 10 ], 200 ]
console.log(b) //[ 4, 5, 6, [ 1, 2, [Circular], 200 ], 10 ]
console.log(c) //[ 1, 2, [ 100, 5, 6, [Circular] ] ]
/**深拷贝，c变化，而a和b未发生变化 */

/**例子2： 对象深拷贝 */
let d = {
  name: '水果',
  eat: ['苹果', '香蕉'],
  obj: {},
  arr: [],
}

let e = {
  name: '蔬菜',
  eat: ['黄瓜', '西红柿'],
  fn: function () {
    return a
  },
}

d.e = e
e.d = d

let f = deepClone(d)

d.eat[2] = '桃子'
d.e.eat[2] = '土豆'

f.eat[2] = '火龙果'

console.log('d: ', d)
console.log('f: ', f)

/**深拷贝，d和f的变化都不互相产生影响 */

/**例子3：保留引用关系展示 */
const obj = {
  a: {
    name: 'a',
  },
  b: {
    name: 'b',
  },
  c: {
    d: {},
  },
}
obj.a.z = obj.a //a.z 引用 a本身
obj.c.d.e = obj.a //c.d.e 引用 a
obj.a.x = obj.c.d.e //a.x 引用 c.d.e
const copy = deepClone(obj)
console.log(copy.a) // 输出： { name: 'a', z: [Circular], x: [Circular] }
console.log(copy.a.z) // 输出： { name: 'a', z: [Circular], x: [Circular] }
console.log(copy.a.x) // 输出： { name: 'a', z: [Circular], x: [Circular] }
console.log(copy.c.d.e) // 输出: { name: 'a', z: [Circular], x: [Circular] }
console.log(copy.a === copy.a.z) // 输出： true  表明拷贝后的引用关系依旧保留
console.log(copy.a === copy.c.d.e) // 输出： true  表明拷贝后的引用关系依旧保留
console.log(copy.c.d.e === copy.a.x) // 输出： true  表明拷贝后的引用关系依旧保留
```

上述方法基本能够实现大部分情况下的深拷贝，但未解决 Date 和 RegExp。

通过对 Date 和 RegExp 的判断解决这部分的深复制,改造上面代码，解决问题。

```javascript
const Constructor = originObj.constructor
// typeof null的返回值为object，所以可以直接省略
if (!originObj || typeof originObj !== 'object') {
  return originObj
} else if (Constructor === RegExp) {
  return new Constructor(originObj)
} else if (Constructor === Date) {
  return new Constructor(originObj.getTime())
}
```
