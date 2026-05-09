---
title: 常用Ae代码
type: docs
series: [精选内容]
tags: [经验技巧]
categories: [Ae, 动画, Javascript]
draft: false
date: 2024-05-06
lastmod: 2024-05-07
---
---

# 常用的Ae表达式

## 缓动

```javascript
// Ease and Wizz 2.5.3 : Curvaceous : outExpo : all keyframes
// Ian Haigh (http://aescripts.com/ease-and-wizz/)
// Last built: 2017-08-08T09:11:05+10:00
// 从思源笔记里转移的
 
function easeandwizz_outExpo(t, b, c, d) {
	var OUT_EXPO_CORRECTION = 1.000976;
	return (t==d) ? b+c : c * OUT_EXPO_CORRECTION * (-Math.pow(2, -10 * t/(d)) + 1) + b;
}
 
function easeAndWizz() {
	var n = 0;
	if (numKeys > 0) {
		n = nearestKey(time).index;
		if (key(n).time > time) { n-- }
	}
 
	try {
		var key1 = key(n);
		var key2 = key(n+1);
	} catch(e) {
		return null;
	}
 
	t = time - key1.time;
	d = key2.time - key1.time;
 
	sX = key1.time;
	eX = key2.time - key1.time;
 

	if ((time < key1.time) || (time > key2.time)) {
		return null;
	} else {
		return valueAtTime(easeandwizz_outExpo(t, sX, eX, d));
	}
}
 
(easeAndWizz() || value);
```

## 路径循环

```javascript
// 方式1
valueAtTime(time % key(numKeys).time)


//方式2
t = time % (90 * thisComp.frameDuration);
valueAtTime(t);

```


## 降低random频率

```javascript
// 核心思想是从当前属性的取值中抽取数值
posterizeTime(1) /*括号里表示帧速率*/
Math.round(random(100))

```


## 字幕分割

```javascript
/*

举例：
字幕文件：字幕0602.csv，文件首行为当前字幕文件的名字，例如字幕0602，然后一句台词一行
配音文件，
字幕合成名字为：字幕0602

*/

name = thisComp.name+".csv";
i = thisComp.layer(name).index-index-1;
footage(name).dataValue([0,i])


```