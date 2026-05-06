---
title: 演示文档
next: 上一篇文档
---


## 欢迎来到我的博客!
这是一个 <font color=green size=5><strong>演示文档</strong></font>, 主要是演示支持的 markdown 功能

This is a **demo** of the theme's *documentation* layout.


## 功能演示

### 数学公式

支持行内数学公式 $ E=mc^2 $ ,
行间公式也支持，但是行间公式不能有空行

$$
\begin{aligned}
    &F=m\frac{\mathrm{d}v}{\mathrm{d}t} \\
    &I=\int_{t_1}^{t2}F\mathrm{d}t \\
\end{aligned}
$$




### 代码块

{{< callout type="info" emoji="ℹ️" >}}
支持代码块和高亮块
{{< /callout >}}

```Python {filename="main.Python"}
import numpy as np
def fun():
    print("你好哇！")
```

> [!warning]
> 但是好可惜，不支持 `Mathematica` 语法高亮
> 但是，按帮助文档的说法，使用的[语法高亮库chroma](https://github.com/alecthomas/chroma#supported-languages)应该是支持才对的啊
> <img src=".\doc_picture\2026-05-06-17-58-47.png" alt="丢失描述" width="100%">

```Mathematica {filename="main.Mathematica"}
Plot[ Sin[x], {x,-Pi, Pi} ];
MyFun[] := Module[{},
    Print["欢迎你"]
]
```

### 图片和视频
#### 图片
支持“传统markdown语法 + 描述”
![丢失描述](https://camo.githubusercontent.com/f930c23b71cd90b4398e98c37c2af17dca0881b47d3c87615f1a5e990d7cbd75/68747470733a2f2f6f63746f6465782e6769746875622e636f6d2f696d616765732f68756c615f6c6f6f705f6f63746f64657830332e676966 "顺便测试一下默认语法的图片描述功能")


#### 嵌入的b站视频：
<div style="position: relative; padding: 28.1% 45%;">
  <iframe src="//player.bilibili.com/player.html?isOutside=true&aid=228086186&bvid=BV1ch411L7aL&cid=1111035512&p=1&autoplay=0" frameborder="no" scrolling="no" allowfullscreen="true" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts" style="position: absolute; width: 100%; height: 100%; left: 0; top: 0;">
  </iframe>
</div>