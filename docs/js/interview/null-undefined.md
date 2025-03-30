---
sticky: 2
description: JavaScript 中的 undeclared、undefined 和 null 有什么区别
tag:
 - js
 - interview
---

# JavaScript 中的 undeclared、undefined 和 null 有什么区别

![](https://www.30secondsofcode.org/assets/cover/river-houses-1200.webp)

## undeclared
如果一个变量没有用适当的关键字（即 `var`、`let` 或 `const`）声明，则该变量是未声明的。访问未声明的变量将引发 `ReferenceError`
```js
console.log(x); // ReferenceError: x is not defined

```

## undefinded
如果尚未为变量分配值，则变量为`undefined`。`undefined` 是 `JavaScript` 中的一种原始数据类型，表示变量已经被声明，但尚未被赋值。
```js
let x;
console.log(x); // undefined

```

## null
`null` 是 `JavaScript` 中的一个原始数据类型，表示一个空值或有意的缺失值。
```js
let x = null;
console.log(x); // null

```

## 总结
- `undeclared`：变量未声明，访问时会抛出 `ReferenceError`。
- undefined：变量已声明但未赋值，表示“未定义”。
- null：变量被显式赋值为 null，表示“空值”。
- 比较：`undefined == null` 返回 true，但 `undefined === null` 返回 false。
- 使用场景：undefined 通常用于未赋值的变量或对象属性，null 用于表示明确的空值。