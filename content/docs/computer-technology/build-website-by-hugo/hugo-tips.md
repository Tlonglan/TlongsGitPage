---
title: Hugo框架使用技巧
type: "docs"
draft: false
# 内容属性
tags: [5-经验技巧]
series: []
categories: [Hugo, 模板]
# 时间属性
date: "2026-05-13"
lastmod: "2026-05-13"
# 其他配置字段
description: ""
---


## Hugo 模板

Hugo 的模板引擎对文件的开头非常敏感。如果文件的第一行不是 {{ define "..." }} 或其他 Hugo 模板指令，Hugo 可能不认为这是一个布局模板，尤其是在某些主题的模板查找逻辑下，它可能会被忽略，于是页面就回退到了一个空的默认输出。

Hugo 模板文件必须以 {{ define "..." }} 开头，注释请使用 ` {{/* ... */}} ` 或 在 define 之后 使用 html 的注释`<!-- 注释--->`
