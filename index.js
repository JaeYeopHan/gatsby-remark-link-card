const visit = require('unist-util-visit')
const puppeteer = require('puppeteer')

const { defaultOption } = require('./shared/defaultOption')

const ErrorFormat = {
  title: defaultOption.error.title,
  description: defaultOption.error.description,
  favicon: defaultOption.favicon,
  url: defaultOption.error.url,
  ogImage: defaultOption.image,
}

const getHTML = pageData => {
  const { title, description, favicon, url, ogImage } = pageData
  const ogImageSrc = !ogImage || ogImage === 'undefined' ? defaultOption.image : ogImage
  const ogImageAlt =
    ogImage === 'undefined' ? 'default-image' : `${title}-image`
  const faviconSrc = !favicon || favicon === 'undefined' ? defaultOption.favicon : favicon

  return `
    <div>
      <a target="_blank" rel="noopener noreferrer" href="${url}" class="preview-notion-container">
        <div class="preview-notion-wrapper">
          <div class="preview-notion-title">${title}</div>
          <div class="preview-notion-description">${description}</div>
          <div class="preview-notion-url">
            <img class="preview-notion-favicon" src="${faviconSrc}" alt="${title}-favicon"/>
            <div class="preview-notion-link">${url}</div>
          </div>
        </div>
        <div class="preview-notion-image-wrapper">
          <img class="preview-notion-image" alt="${ogImageAlt}" src="${ogImageSrc}" />
        </div>
      </a>
    </div>
  `.trim()
}

const getPageData = async (browser, url) => {
  try {
    const page = await browser.newPage()

    await page.goto(url)

    const [
      title,
      description,
      ogImage,
      favicon,
    ] = await Promise.all([
      page.title(),
      page.$eval(
        "meta[property='og:description']",
        el => el.content
      ),
      page.$eval(
        "meta[property='og:image']",
        el => el.content
      ),
      page.$eval("link[rel='shortcut icon']", el => el.href)
    ])
    return {
      title,
      description,
      url,
      ogImage,
      favicon,
    }
  } catch (e) {
    return ErrorFormat
  }
}

const getUrlString = url => {
  const urlString = url.startsWith('http') ? url : `https://${url}`

  try {
    return new URL(urlString).toString()
  } catch (error) {
    return null
  }
}

const isValidCondition = (node, delimiter) => {
  if (node.type === 'link' && node.title === null && node.url) {
    return (
      node.children[0] &&
      node.children[0].type === 'text' &&
      node.children[0].value === delimiter
    )
  }
}

module.exports = async ({ cache, markdownAST }, pluginOption) => {
  const options = { ...defaultOption, ...pluginOption }
  const { delimiter } = options
  const browser = await puppeteer.launch()
  const targets = []

  visit(markdownAST, 'paragraph', paragraphNode => {
    if (paragraphNode.children.length !== 1) {
      return
    }

    const [node] = paragraphNode.children

    if (!isValidCondition(node, delimiter)) {
      return
    }

    const { url, value = url } = node
    const urlString = getUrlString(value)

    if (!urlString) {
      return
    }

    targets.push(async () => {
      let html = await cache.get(urlString)

      if (!html) {
        const data = await getPageData(browser, url)
        html = getHTML(data)
        await cache.set(urlString, html)
      }

      node.type = `html`
      node.value = html
      node.children = undefined
    })
  })

  try {
    await Promise.all(targets.map(t => t()))
  } catch (e) {
    console.log(e)
  } finally {
    await browser.close()

    return markdownAST
  }
}
