---
title: 使用Hugo框架搭建网站技巧
draft: false
# 内容属性
tags: [5-经验技巧]
series: []
categories: [计算机, 网站, Hugo]
type: docs
# 时间属性
date: 2026-05-12
lastmod: 2026-05-12
# 其他配置字段
layout: single
---



## 准备

全局参数配置放在`/hugo.yaml`(或者hugo.toml，hugo.json)文件下。这里以hugo.yaml为例。



## 实用配置

### unsafe 渲染

```yaml
markup:
  # allow raw html
  goldmark:
    renderer:
      unsafe: true
```

unsafe 参数默认为 `false`，用 `unsafe = true` 后，Goldmark解析器 会将 Markdown 文件里的任何 HTML 都原样传给浏览器，
例如，开启之后，就可以使用类似 `<mark>内容</mark>` 这样的html高亮标记语法。
本节所有的配置都基于当前配置
> [!warning]
> 这意味着，你可能会因此不小心引入恶意脚本，带来潜在的安全风险。






#### 换行和分段

```yaml
markup:
  # allow raw html
  goldmark:
    renderer:
      unsafe: true
      hardWraps: true
```

默认情况下的配置为 `hardWraps: false` ，首次按下`Enter`键，不会自动换行，除非插入一个`<br>`标签，连续按下两次`Enter`键，会自动创建一个新的段落，即：

在markdown 中编辑：
```markdown
内容1。
内容2

内容3。<br>
内容4
```

在实际的网页中会渲染为：
```
内容1。内容2

内容3。
内容4
```

而开启`hardWraps: true` 之后，首次按下`Enter`键就会自动换行，相当于插入了一个`<br>`标签，连续按下两次`Enter`键，依然会自动创建一个新的段落，即


在markdown 中编辑：
```markdown
内容1。
内容2

内容3。
内容4
```

在实际的网页中会渲染为：
```
内容1。
内容2

内容3。
内容4
```


### 高亮语法

```yaml
markup:
  # allow raw html
  goldmark:
    renderer:
      unsafe: true
      
```