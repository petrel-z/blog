---
sticky: 2
description: 使用 Node.js 创建静态文件服务器
tag:
  - nodejs
  - server
---

# 使用 Node.js 创建静态文件服务器

![img](../\..\public\images\man-cup-laptop-1200.webp)

## 一个简单的静态文件服务器

您可以创建的最简单的初学者后端项目之一是静态文件服务器。在最简单的形式中，静态文件服务器将监听请求并尝试将请求的 URL 与本地文件系统上的文件进行匹配。以下是实际操作的一个简单示例：

```js
import { readFile } from 'fs'
import { createServer } from 'http'

createServer((req, res) => {
  readFile(__dirname + req.url, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('404: File not found')
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(data)
    }
  })
}).listen(8000)
```

在此代码示例中，我们使用`fs`模块读取 处的文件`__dirname + req.url`。如果文件不存在，我们将返回`404`错误。否则，我们将返回文件。`http`模块用于创建侦听端口 的服务器`8000`。

理论上，我们可以就此打住，拥有一个非常基本的静态文件服务器。但是，有一些注意事项需要考虑。让我们逐一探讨，看看我们如何解决它们。

## 模块化

首先，我们不一定希望从与 Node.js 服务器相同的目录中提供文件。为了解决这个问题，我们必须更改`fs.readFile()`查找文件的目录。为了实现这一点，我们可以指定一个目录来提供文件，并使用`path`模块来解析该目录中的文件。这样，我们还可以更好地处理不同的操作系统和环境。

以下是如何使用`path`模块解析文件路径的简短代码片段：

```js
import { readFile } from 'fs'
import { join } from 'path'

const directoryName = './public'
const requestUrl = 'index.html'

const filePath = join(directoryName, requestUrl)

readFile(filePath, (err, data) => {
  // ...
})
```

## 安全

我们接下来要考虑的是安全性。显然，我们不希望用户未经授权窥探我们的机器。目前，访问指定根目录之外的文件并非不可能（例如`GET /../../../`）。为了解决这个问题，我们可以`path`再次使用该模块来检查请求的文件是否在根目录中。

```js
import { join, normalize, resolve } from 'path'

const directoryName = './public'
const root = normalize(resolve(directoryName))

const requestUrl = 'index.html'

const filePath = join(root, fileName)
const isPathUnderRoot = normalize(resolve(filePath)).startsWith(root)
```

类似地，我们可以通过检查文件类型来确保用户无法访问敏感文件。为此，我们可以指定支持的文件类型的数组或对象，然后`path`再次使用该模块检查文件的扩展名。

```js
mport { extname } from 'path';

const types = ['html', 'css', 'js', 'json'];

const requestUrl = 'index.html';
const extension = extname(requestUrl).slice(1);

const isTypeSupported = types.includes(extension);
```

## 省略 HTML 扩展

大多数网站的主要功能是请求 HTML 页面时从 URL 中省略文件扩展名。这是用户期望的一项小小生活质量改进，如果能将其添加到我们的静态文件服务器中，那就太好了。

事情在这里变得有点棘手。为了提供此功能，我们需要检查缺少的扩展名并查找适当的 HTML 文件。但请记住，对于 URL，例如 ，有两种可能的匹配项`/my-page`。此路径可以与`/my-page.html`或匹配`my-page/index.html`。为了解决这个问题，我们将优先考虑其中一个。在我们的例子中，我们将优先考虑`/my-page.html`，`my-page/index.html`但反过来交换它们也很容易。

为了实现这一点，我们可以使用该`fs`模块来检查其中一个是否存在并进行适当的处理。还需要为根 URL ( `/`) 添加一个特殊情况以将其与文件匹配`index.html`。

```js
import { accessSync, constants } from 'fs'
import { join, normalize, resolve, extname } from 'path'

const directoryName = './public'
const root = normalize(resolve(directoryName))

const extension = extname(req.url).slice(1)
let fileName = requestUrl

if (requestUrl === '/') fileName = 'index.html'
else if (!extension) {
  try {
    accessSync(join(root, requestUrl + '.html'), constants.F_OK)
    fileName = requestUrl + '.html'
  } catch (e) {
    fileName = join(requestUrl, 'index.html')
  }
}
```

## 最后的润色

实现上述所有功能后，我们可以将所有内容整合在一起，创建一个具有我们所需所有功能的静态文件服务器。我将进行一些收尾工作，例如将请求记录到控制台并处理更多文件类型，以下是最终产品：

```js
import { readFile, accessSync, constants } from 'fs'
import { createServer } from 'http'
import { join, normalize, resolve, extname } from 'path'

const port = 8000
const directoryName = './public'

const types = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  png: 'image/png',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  json: 'application/json',
  xml: 'application/xml'
}

const root = normalize(resolve(directoryName))

const server = createServer((req, res) => {
  console.log(`${req.method} ${req.url}`)

  const extension = extname(req.url).slice(1)
  const type = extension ? types[extension] : types.html
  const supportedExtension = Boolean(type)

  if (!supportedExtension) {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('404: File not found')
    return
  }

  let fileName = req.url
  if (req.url === '/') fileName = 'index.html'
  else if (!extension) {
    try {
      accessSync(join(root, req.url + '.html'), constants.F_OK)
      fileName = req.url + '.html'
    } catch (e) {
      fileName = join(req.url, 'index.html')
    }
  }

  const filePath = join(root, fileName)
  const isPathUnderRoot = normalize(resolve(filePath)).startsWith(root)

  if (!isPathUnderRoot) {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.end('404: File not found')
    return
  }

  readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' })
      res.end('404: File not found')
    } else {
      res.writeHead(200, { 'Content-Type': type })
      res.end(data)
    }
  })
})

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
```

还不错，对吧？仅用 70 行代码，我们就成功创建了一个相当不错的静态文件服务器，无需使用核心 Node.js API 以外的任何代码。
