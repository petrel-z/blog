---
sticky: 1
description: 获取元素的所有祖先、父级、同级和子级
# sidebar: false
tag:
 - JS
---
# 如何获取元素的所有祖先、父级、同级和子级？
![flowering-hills-1200.webp](../public/images/flowering-hills-1200.webp)
如果你正在使用JavaScript和浏览器，DOM遍历是一项非常有用的技能。它允许您浏览DOM树并查找与给定元素相关的元素。让我们探讨如何利用它来发挥我们的优势。

注意
本文中的所有示例都使用了Node接口，该接口是DOM中所有节点的基类，包括元素、文本节点和注释。此外，这些函数返回元素数组，而不是NodeList对象，以使它们更容易使用。

获取元素的子元素
奇怪的是，有两种方法可以获取元素的子元素：Node.childNodes和Node.children。两者之间的区别在于Node.childNodes返回所有子节点，包括文本节点，而Node.children只返回元素节点。
根据我们的需要，我们可以使用这些属性中的任何一个来获取元素的子元素，所以让我们使用一个参数来决定返回哪个。

```js
const getChildren = (el, includeTextNodes = false) =>
  includeTextNodes ? [...el.childNodes] : [...el.children];

getChildren(document.querySelector('ul'));
// [li, li, li]

getChildren(document.querySelector('ul'), true);
// [li, #text, li, #text, li, #text]
```

获取元素的兄弟元素
要获取元素的兄弟节点，我们可以使用Node.parentNode属性访问父节点，然后使用Node.childNodes获取父节点的所有子节点。
然后，我们可以使用扩展运算符（…）将NodeList转换为数组。最后，我们可以使用Array.prototype.filter（）从子元素列表中过滤出元素本身，以获得兄弟元素。
```js
const getSiblings = el =>
  [...el.parentNode.childNodes].filter(node => node !== el);

getSiblings(document.querySelector('head'));
// ['body']
```

获取元素的祖先
要获取元素的所有祖先，我们可以使用while循环和Node.parentNode属性来向上移动元素的祖先树。然后，我们可以使用Array.prototype.unshift（）将每个新祖先添加到数组的开头。
```js
const getAncestors = el => {
  let ancestors = [];

  while (el) {
    ancestors.unshift(el);
    el = el.parentNode;
  }

  return ancestors;
};

getAncestors(document.querySelector('nav'));
// [document, html, body, header, nav]
```

匹配相关节点
在前面示例的基础上，我们可以创建函数，根据给定条件匹配相关节点。例如，我们可以找到一个元素的所有祖先，直到该元素被指定的选择器匹配，或者找到离给定节点最近的锚元素。

检查一个元素是否包含另一个元素
要检查一个元素是否包含另一个元素，我们可以简单地使用Node.contains（）方法。

```js
const elementContains = (parent, child) =>
  parent !== child && parent.contains(child);

elementContains(
  document.querySelector('head'),
  document.querySelector('title')
);
// true

elementContains(
  document.querySelector('body'),
  document.querySelector('body')
);
// false
```

查找最接近的匹配节点
从给定节点开始查找最接近的匹配节点对于事件处理通常很有用。我们可以使用for循环和Node.parentNode从给定节点向上遍历节点树。然后，我们使用Element.matches（）来检查是否有任何给定的元素节点与提供的选择器匹配。
```js
const findClosestMatchingNode = (node, selector) => {
  for (let n = node; n.parentNode; n = n.parentNode)
    if (n.matches && n.matches(selector)) return n;

  return null;
};

findClosestMatchingNode(
  document.querySelector('a'), 'body'
);
// body
```

获取父元素，直到元素与选择器匹配
为了找到一个元素的所有祖先，直到该元素被指定的选择器匹配，我们可以使用while循环和Node.parentNode来向上移动该元素的祖先树。然后，我们可以使用Array.prototype.unshift（）将每个新的祖先添加到数组的开头，并使用Element.matches（）检查当前元素是否与指定的选择器匹配。
```js
const getParentsUntil = (el, selector) => {
  let parents = [], _el = el.parentNode;

  while (_el && typeof _el.matches === 'function') {
    parents.unshift(_el);

    if (_el.matches(selector)) return parents;
    else _el = _el.parentNode;
  }

  return [];
};

getParentsUntil(document.querySelector('#home-link'), 'header');
// [header, nav, ul, li]
```