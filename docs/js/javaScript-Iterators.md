---
sticky: 2
description: JavaScript 迭代器
sidebar: false
tag:
  - JS
---
# 什么是 JavaScript 迭代器，我可以在哪里使用它们？
![](https://www.30secondsofcode.org/assets/cover/balloons-1200.webp)
JavaScript 迭代器是在 ES6 中引入的，它们用于循环遍历一系列值，通常是某种集合。根据定义，迭代器必须实现一个 next（） 函数，该函数以 { value， done } 的形式返回一个对象，其中 value 是迭代序列中的下一个值，done 是一个布尔值，用于确定序列是否已被使用。
在实际项目中具有实际用途的非常简单的迭代器可能如下所示：
```javaScript
class LinkedList {
  constructor(data) {
    this.data = data;
  }

  firstItem() {
    return this.data.find(i => i.head);
  }

  findById(id) {
    return this.data.find(i => i.id === id);
  }

  [Symbol.iterator]() {
    let item = { next: this.firstItem().id };
    return {
      next: () => {
        item = this.findById(item.next);
        if (item) {
          return { value: item.value, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  }
}

const myList = new LinkedList([
  { id: 'a10', value: 'First', next: 'a13', head: true },
  { id: 'a11', value: 'Last', next: null, head: false },
  { id: 'a12', value: 'Third', next: 'a11', head: false },
  { id: 'a13', value: 'Second', next: 'a12', head: false },
]);

for (let item of myList) {
  console.log(item); // 'First', 'Second', 'Third', 'Last'
}
```
在上面的示例中，我们实现了一个 LinkedList 数据结构 ，它在内部使用数据数组。其中的每个项都有一个值和一些特定于实现的属性，用于确定其在 sequence 中的位置。默认情况下，从此类构造的对象是不可迭代的。为了定义迭代器，我们使用 Symbol.iterator 并对其进行设置，以便返回的序列根据类的内部实现按顺序排列，而返回的项目仅返回其值 。
与此相关的是，迭代器只是函数，这意味着它们可以像任何其他函数一样调用（例如，将迭代委托给现有的迭代器），同时也不限于 Symbol.iterator 名称。这允许我们为同一个对象定义多个迭代器。以下是这些概念的示例：
```javaScript
class SpecialList {
  constructor(data) {
    this.data = data;
  }

  [Symbol.iterator]() {
    return this.data[Symbol.iterator]();
  }

  values() {
    return this.data
      .filter(i => i.complete)
      .map(i => i.value)
      [Symbol.iterator]();
  }
}

const myList = new SpecialList([
  { complete: true, value: 'Lorem ipsum' },
  { complete: true, value: 'dolor sit amet' },
  { complete: false },
  { complete: true, value: 'adipiscing elit' },
]);

for (let item of myList) {
  console.log(item); // The exact data passed to the SpecialList constructor above
}

for (let item of myList.values()) {
  console.log(item); // 'Lorem ipsum', 'dolor sit amet', 'adipiscing elit'
}
```
在此示例中，我们使用数据对象的本机数组迭代器使 SpecialList 可迭代，并返回数据数组的确切值。同时，我们还定义了一个 values 方法，它本身就是一个迭代器，在数据数组上使用 Array.prototype.filter（） 和 Array.prototype.map（）。 最后，我们返回结果的 Symbol.iterator，只允许迭代序列中的非空对象，并只返回每个对象的值 。