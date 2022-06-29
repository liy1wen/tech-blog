---
title js 常见数组方法
---

# js 常见数组方法

![](https://cdn.jsdelivr.net/gh/liy1wen/image-resource@master/20210914/数组.7h46njms5r00.png)

**01、concat()**

concat() 方法用于连接两个或多个数组。此方法不会更改现有数组，而是返回一个新数组，其中，包含连接数组的值。

```javascript
var arr1 = ['apple']
var arr2 = ['melon']
var newArr = arr1.concat(arr2)
console.log(newArr)
```

输出结果：

> ["apple", "melon"]

**02、copyWithin()**

将数组元素复制到数组中的另一个位置，覆盖现有值。此方法永远不会向数组添加更多项。注意：此方法会覆盖原始数组。

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango', 'Kiwi', 'Papaya']
fruits.copyWithin(2, 0, 2)
```

输出结果：

> ['Banana','Orange','Banana','Orange','Kiwi','Papaya']

**03、entry()**

entry() 方法返回一个带有键/值对的数组迭代器对象。

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
fruits.entries()
```

输出结果：

> [0, "Banana"] > [1, "Orange"] > [2, "Apple"] > [3, "Mango"]

**04、every()**

every() 方法检查数组中的所有元素是否都通过了测试（作为函数提供）。

```javascript
var ages = [32, 33, 16, 40]
var is18 = ages.every(item => item >= 18)
console.log(is18)
```

输出结果：

> false

**05、fill()**

fill() 方法用于将一个固定值替换数组的元素。

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
fruits.fill('Runoob')
console.log(fruits)
```

输出结果：

> [Runoob,Runoob,Runoob,Runoob]

**06、filter()**

filter() 方法创建一个数组，其中填充了所有通过测试的数组元素（作为函数提供）。

```javascript
var ages = [32, 33, 16, 40]
var arr18 = ages.filter(item => item >= 18)
console.log(arr18)
```

输出结果：

> [32, 33, 40]

**07、find()**

find() 方法返回数组中通过测试的第一个元素的值（作为函数提供）。

```javascript
var ages = [32, 33, 16, 40]
var find18 = ages.find(item => item >= 18)
console.log(find18)
```

输出结果：

> 32

**08、findIndex()**

findIndex() 方法返回数组中通过测试的第一个元素的索引（作为函数提供）。

```javascript
var ages = [32, 33, 16, 40]
var findIndex18 = ages.findIndex(item => item >= 18)
console.log(findIndex18)
```

输出结果：

> 0

**09、forEach()**

forEach() 方法按顺序为数组中的每个元素调用一次函数。

```javascript
var ages = [32, 33, 16, 40]
var newAges = ages.forEach((item, index, currentArr) => currentArr[index] + 10)
console.log(newAges)
```

输出结果：

> [42, 43, 26, 50]

**10、contains()**

contains() 方法确定数组是否包含指定的元素。

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
const hasOrange = fruits.includs('Orange')
```

输出结果：

> true

**11、indexOf()**

indexOf() 方法在数组中搜索指定项，并返回其位置。

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
var a = fruits.indexOf('Apple')
cosnole.log(a)
```

输出结果：

> 2

**12、isArray()**

isArray() 方法确定对象是否是数组。如果对象是数组，返回 true，否则返回 false。

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
console.log(Array.isArray(fruits))
```

输出结果：

> true

**13、join()**

将数组的元素转换为字符串。join() 方法将数组作为字符串返回。

```javascript
var alpha = ['A', 'B', 'C', 'D', 'E']
var str = alpha.join()
console.log(str, typeof str)
```

输出结果：

> A,B,C,D,E string

**14、lastIndexOf()**

lastIndexOf() 方法返回指定值在调用该方法的字符串中最后出现的位置，如果没找到则返回 -1

```javascript
var ar = ['ab', 'cd', 'ef', 'ab', 'cd']
// 找到最后一个CD的位置
console.log(ar.lastIndexOf('cd'))
```

输出结果：

> 4

**15、map()**

map() 方法使用为每个数组元素调用函数的结果创建一个新数组。

```javascript
var ages = [32, 33, 16, 40]
var newAges = ages.map((item, index, arr) => item + 10)
console.log(newAges)
```

输出结果：

> [42, 43, 26, 50]

**16、pop()**

pop() 方法删除数组的最后一个元素，并返回该元素。

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
fruits.pop()
console.log(fruits)
```

输出结果：

> ['Banana','Orange','Apple']

**17、push()**

push() 方法将新项添加到数组的末尾，并返回新长度。

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
fruits.push('melon')
console.log(fruits)
```

> ["Banana", "Orange", "Apple", "Mango","melon"];

**18、reduce()**

reduce() 方法为数组的每个值（从左到右）执行提供的函数，并将数组缩减为单个值。

reduce 为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，接受四个参数：初始值（或者上一次回调函数的返回值），当前元素值，当前索引，调用 reduce 的数组。

```javascript
var num = [0, 1, 2, 3, 4]
var total = num.reduce((previousValue, currentValue, index, array) => previousValue + currentValue)
console.log(total)
```

输出结果：

> 10

**19、reduceRight()**

reduceRight() 方法为数组的每个值（从右到左）执行提供的函数，并将数组缩减为单个值。

```javascript
var num = [0, 1, 2, 3, 4]
var total = num.reduceRight((previousValue, currentValue, index, array) => previousValue + currentValue)
console.log(total)
```

输出结果：

> 10

**20、reverse()**

reverse() 方法反转数组中元素的顺序。

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
var reverseFruits = fruits.reverse()
console.log(reverseFruits)
```

输出结果：

> ["Mango","Apple","Orange","Banana"]

**21、some()**

some() 方法检查数组中的任何元素是否通过测试（作为函数提供）。它为数组中存在的每个元素执行一次函数。

```javascript
var ages = [32, 33, 16, 40]
var some18 = ages.some(item => item >= 18)
console.log(some18)
```

输出结果：

> true

**22、slice()**

slice() 方法选择从给定 start 参数开始的元素，并以给定的 end 参数结束，但不包括。它将数组中的选定元素作为新的数组对象返回。

```javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var sliceArr = arr.slice(2, 5)
console.log(sliceArr)
```

输出结果：

> [3, 4, 5]

**23、shift()**

shift() 方法删除数组的第一项。

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
var shiftFruits = fruits.shift()
console.log(shiftFruits)
```

输出结果：

> Banana

**24、sort()**

sort() 方法对数组的项进行排序。

```javascript
var ages = [32, 33, 16, 40]
var sortAges = ages.sort((a, b) => a - b)
console.log(sortAges)
```

输出结果：

> [16, 32, 33, 40]

**25、splice()**

splice() 方法从数组添加/删除项目，并返回删除的项目。

```javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var sliceArr = arr.splice(2, 1)
console.log(sliceArr, arr)
```

输出结果：

> [3] [1, 2, 4, 5, 6, 7, 8, 9]

**26、toString()**

toString() 方法返回一个包含所有数组值的字符串，以逗号分隔。

```javascript
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var toStringArr = arr.toString()
console.log(toStringArr)
```

输出结果：

> 1,2,3,4,5,6,7,8,9

**27、unshift()**

unshift() 方法将新项添加到数组的开头并返回新长度。

```javascript
var fruits = ['Banana', 'Orange', 'Apple', 'Mango']
fruits.unshift('Lemon', 'Pineapple')
console.log(fruits)
```

输出结果：

> ['Lemon','Pineapple','Banana','Orange','Apple','Mango']

**28、valueOf()**

valueOf() 方法返回数组。该方法是数组对象的默认方法。Array.valueOf() 将返回与 Array 相同的值。

```javascript
var colors = ['red', 'blue', 'green']
console.log(colors.valueOf())
```

输出结果：

> ["red", "blue", "green"]
