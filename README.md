<div align="center">
  <img src="./assets/logo.png" width="480px" />
</div>

Gatsby Remark plugin to embed card about link.

> 👀 You can preview the description of the link!

[![Build Status](https://travis-ci.org/JaeYeopHan/gatsby-remark-link-card.svg?branch=master)](https://travis-ci.org/JaeYeopHan/gatsby-remark-link-card)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![npm version](https://badge.fury.io/js/gatsby-remark-link-card.svg)](https://badge.fury.io/js/gatsby-remark-link-card)

<p>
  <a href="https://twitter.com/JbeeLjyhanll">
    <img alt="Twitter: JbeeLjyhanll" src="https://img.shields.io/twitter/follow/JbeeLjyhanll.svg?style=social" target="_blank" />
  </a>
</p>

## 🗂 Use Case

- [gatsby-starter-bee](https://github.com/JaeYeopHan/gatsby-starter-bee)

## 🚚 Install

```
$ npm install --save gatsby-remark-link-card
# or
$ yarn add gatsby-remark-link-card
```

## 🚀 How to use

👉 This plugin requires `gatsby-transformer-remark`.

### in Markdown

```md
[$card](https://github.com/JaeYeopHan/gatsby-remark-link-card)
```

### with Config

```js
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-transformer-remark`,
    options: {
      plugins: [
        {
          resolve: `gatsby-remark-link-card`,
          options: {
            //...
          }
        }
      ]
    }
  }
];
```

## ⚙ Options

| Property       | Type                                  | Default  | Description                                                |
| -------------- | ------------------------------------- | -------- | ---------------------------------------------------------- |
| `delimiter`       | `string`                              | `$card`      | Title of the link to create a card |
| `image`       | `string`                              | data-uri      | Default og image path |
| `favicon`       | `string`                              | data-uri      | Default favicon image path |
| `timeout`       | `number`                              | 30000      | Default timeout(ms) for puppeteer |
| `error`       | `Object`                              | -      | Default config when error |

## Author

👤 **JaeYeopHan (Jbee)**

- Github: [@JaeYeopHan](https://github.com/JaeYeopHan)
- Twitter: [@JbeeLjyhanll](https://twitter.com/JbeeLjyhanll)

## Inspiration

[gatsby-remark-embedder](https://github.com/MichaelDeBoey/gatsby-remark-embedder)

## Show your support

Give a ⭐️ if this project helped you!

<div align="center">

<sub><sup>Written by <a href="https://github.com/JaeYeopHan">@Jbee</a></sup></sub><small>✌</small>

</div>
