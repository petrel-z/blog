---
sticky: 1
description: 卡片悬停效果
tag:
 - CSS
---
# 卡片悬停效果

![](https://www.30secondsofcode.org/assets/cover/clouds-n-mountains-1200.webp)
卡片是现代网页设计中最常见的布局元素之一，它为创意悬停效果提供了大量机会。以下是一些卡片悬停效果的示例，您可以使用它们来使您的网站更具互动性和吸引力。
## 旋转卡
要创建悬停时旋转的双面卡片，首先需要一个容器元素，其中包含两个子元素，一个用于卡片正面，一个用于卡片背面。然后，您可以使用函数rotateY()围绕 Y 轴旋转卡片，并backface-visibility使用属性在卡片不可见时隐藏卡片背面。


```html
<div class="rotating-card">
  <div class="card-side front"></div>
  <div class="card-side back"></div>
</div>
```

```css
.rotating-card {
  perspective: 150rem;
  position: relative;
  box-shadow: none;
  background: none;
}

.rotating-card .card-side {
  transition: all 0.8s ease;
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.rotating-card .card-side.back {
  transform: rotateY(-180deg);
}

.rotating-card:hover .card-side.front {
  transform: rotateY(180deg);
}

.rotating-card:hover .card-side.back {
  transform: rotateY(0deg);
}
```

## 移动卡
对于移动卡片，您需要利用CSS 变量和少量 JavaScript 来跟踪鼠标光标的位置并相应地调整卡片的位置。您将使用mousemove事件来跟踪光标的位置并计算光标与卡片中心之间的相对距离，从而Element.getBoundingClientRect()获取卡片的位置和尺寸。

然后，使用 CSS 变量，您可以将transform属性应用于卡片元素，使其根据光标的位置移动。为了使变化更平滑，请使用该transition属性来为变换添加动画效果。

```css
.shifting-card {
  transition: transform 0.2s ease-out;
  transform: rotateX(calc(10deg * var(--dx, 0)))
    rotateY(calc(10deg * var(--dy, 0)));
}
const card = document.querySelector('.shifting-card');
const { x, y, width, height } = card.getBoundingClientRect();
const cx = x + width / 2;
const cy = y + height / 2;

const handleMove = e => {
  const { pageX, pageY } = e;
  const dx = (cx - pageX) / (width / 2);
  const dy = (cy - pageY) / (height / 2);
  e.target.style.setProperty('--dx', dx);
  e.target.style.setProperty('--dy', dy);
};

card.addEventListener('mousemove', handleMove);
```
## 透视卡
最后，对于透视卡，您只需要一个[transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform)带有[perspective()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/perspective)函数和一个[rotateY()](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform-function/rotateY)函数来创建透视效果。该[transition](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transition)属性将transform在悬停时为属性设置动画。

```css  
.perspective-card {
  transform: perspective(1500px) rotateY(15deg);
  transition: transform 1s ease 0s;
}

.perspective-card:hover {
  transform: perspective(3000px) rotateY(5deg);
}
```