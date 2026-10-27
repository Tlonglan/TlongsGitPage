---
title: "windows保持切换中英文输入快捷键"
draft: false
# 内容属性
tags: [5-经验技巧]
series: [精选内容]
categories: [Windows系统, 输入法]
type: docs
# 时间属性
date: 2026-10-16
lastmod: 2026-10-16
# 其他配置字段
description: ""
layout: single
---


## windows11“切换中英文输入法”自动重置的bug

对于windows11系统（25H2）的输入法，在`高级键盘设置-输入语言热键`的“输入法/非输入法切换”选项中，有一个bug：在 `设置-时间和语言-输入-高级键盘设置-输入语言热键` 中修改“输入法/非输入法切换”的快捷键时，无论修改为什么，当系统重启后，会把这个快捷键重置为“ctrl+sapce”。

这是因为系统重启之后，会把“.default”中的这个一项配置覆盖当前用户的配置，因此，想要修改后为始终保持修改的结果，例如`ctrl+\`，就需要同时修改当前用户的配置 和 .default 中的配置。


## 修复方法

1. 在“输入法/非输入法切换”中修改快捷键，例如修改为`ctrl+\`，点击应用，然后点击确定。
2. 按下`win+R`调出命令输入框，输入`regedit`，按下 `Enter` 键进入注册表界面
3. 导航到`计算机\HKEY_CURRENT_USER\Control Panel\Input Method\Hot Keys\00000010`，查看“Key Modifiers” 和 “Virtual Key”这两项的数据并记录。
   > 例如，如果快捷键是修改为`ctrl+\`，那么Key Modifiers 的值应该是 `02 c0 00 00`，Virtual Key 值应该是`dc 00 00 00`，如果是修改为其他自定义的快捷键，则是其他对应的数据。
4. 导航到`计算机\HKEY_USERS\.DEFAULT\Control Panel\Input Method\Hot Keys\00000010`，在这个`00000010`文件夹上点击右键，选择导出，把导出后的文件保存好作为备份。
5. 找到`计算机\HKEY_USERS\.DEFAULT\Control Panel\Input Method\Hot Keys\00000010` 中“Key Modifiers” （默认是`02 c0 00 00`，即表示ctrl）和 “Virtual Key”（默认是`20 00 00 00`，即表示空格space），并把这两项的数据修改为在第三步记录的对应数据
6. 重启系统，之后可以保持为修改的`ctrl+\`了。


> [!note] 小笔记
> 修改的数据`dc 00 00 00` 以及 `20 00 00 00`，都是属于 **Virtual Key**
