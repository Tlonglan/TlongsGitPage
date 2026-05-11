---
title: 功能演示-短代码
type: "docs"
draft: false
# 内容属性
tags: [0-功能测试]
series: [尝鲜, 演示]
categories: []
# 时间属性
date: "2026-05-12"
lastmod: "2026-05-12"
# 其他配置字段
weight: 6
---



### 自定义短代码

#### card-blok

试图在卡片内渲染内容，并且横排卡片，但是还没成功

{{< card-grid >}}
{{< card-block title="年度总结" icon="calendar" >}}
## 📌 概述

这是 **2024 年** 的精选文章列表：

- 《量子计算入门》
- 《认知心理学新进展》

[菲涅尔方程推导](/physics/fresnel)

数学公式：$E = mc^2$
{{< /card-block >}}
{{< card-block title="精选内容" icon="star" >}}
{{< list-by-taxonomy taxonomy="series" terms="精选内容" match="any" >}}
{{< /card-block >}}
{{< /card-grid >}}