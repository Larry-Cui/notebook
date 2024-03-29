---
title: 如何在网页中嵌入google照片库链接
date: 2022-06-23
categories: 
  - IT大杂烩
---

在博客或个人网页中，我们往往需要嵌入图片，这涉及到两个问题：第一是图片文件本身存放在哪里，第二是怎么把图片嵌入到网页中。

<!-- more -->

以个人博客网站来说，由于博客一般都部署在 `Github` 上，所以容量相对有限。虽然图片可以跟博客文档一并存放在 `GitHub` 项目文件池里，但通常来说我们都不会这么做，因为图片比较占用空间，很快就会吃掉有限的容量配额。

Google photo 提供了 15G 容量的空间，所以博客经常把需要使用的图片存放在这里，然后通过在网页上嵌入链接的方式，让博客网站调取图片实现页面展示。

由于 Google photo 的图片地址不是静态链接，没法直接复制使用，因此外链图片的使用过程要分为两步：

- 第一步是找到图片的原始链接。我们需要去到[ Google photo ](https://photos.google.com/)，找到需要链接的图片，然后点击分享-生成链接，Google 会自动生成一个图片分享链接。
- 以上生成的链接没法直接使用，所以我们在第二步的时候，需要把这个 Google 图片链接转换成 `HTML` 网页可用的链接。好多网站提供这种转换服务，我自己使用过 [digital inspiration](https://www.labnol.org/embed/google/photos/) 的网站，证实可用。当然，如果以上的链接失效，完全可以搜索到其他类似的网站功能。这里生成的链接，就可以直接嵌入网页使用了。
