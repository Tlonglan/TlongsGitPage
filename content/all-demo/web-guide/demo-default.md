---
title: 演示-默认文档
type: default
draft: false
tags: [0-功能测试]
series: [尝鲜, 演示]
categories: []

date: 2026-05-06
lastmod: 2026-05-31
# 其他自定义字段
weight: 3
---


这是个默认文档，即 type 的值为 `default` ，或者没有设置 type 这个属性，并且满足下面任意一个条件的文档：
- 在当前文档的所在目录的 **_index.md 没有在元数据中使用`cascade`** 设置页面类型继承时
- 当前文档 **不在已经设置有全局样式的目录** ，例如/docs、/blog 等目录下
  - 因为这些目录下的页面会自动继承 type: docs，或者 type: blog 的根目录样式，即使不在页面的元数据中设置type 这个属性）
 
最终会展示的页面效果。

[点我返回站点说明文档](/all-demo/web-guide)

