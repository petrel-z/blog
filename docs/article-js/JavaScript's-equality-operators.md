---
sticky: 2
description: js的相等运算符 ==和=== 区别
tag:             
 - js     
---
# JavaScript 的相等运算符有什么区别？

![image-20250330115003454](./images/image-20250330113810221.png)

JavaScript 提供了两个用于比·较的相等运算符：

- 双等号 ( `==`)，也称为松散相等运算符
- 三重等号 ( `===`)，也称为严格相等运算符

两者之间的主要区别在于，三重等于（`===`）运算符同时比较类型和值，而双等号（`==`）运算符使用类型强制，以便两个操作数属于同一类型，然后仅比较结果值。

以下是一些示例，可以消除任何混淆：

```
const num = 0;
const str = '0';
const obj = new String(0);
const bool = false;
const undef = undefined;
const nil = null;

console.dir([
  num == str,     // 0 == 0, true
  num == bool,    // 0 == 0, true
  str == obj,     // '0' == '0', true
  obj == num,     // 0 == 0, true
  bool == str,    // 0 == 0, true
  bool == obj,    // 0 == 0, true
  bool == nil,    // false
  undef == nil,   // true
  undef == bool,  // false
]);

console.dir([
  num === str,     // types don't match, false
  num === bool,    // types don't match, false
  str === obj,     // types don't match, false
  obj === num,     // types don't match, false
  bool === str,    // types don't match, false
  bool === obj,    // types don't match, false
  bool === nil,    // types don't match, false
  undef === nil,   // types don't match, false
  undef === bool,  // types don't match, false
]);
```

从上面的示例中可以看出，使用三等号 ( `===`) 运算符比双等号 ( ) 运算符更可预测且直观`==`。因此，我们建议您在大多数情况下使用三等号 ( `===`) 运算符，除非您完全确定要对比较的操作数应用类型强制。