const fs = require('fs')
const path = require('path')
const { readFile, writeFile } = require('fs/promises')
const matter = require('gray-matter')
const { stringify, parse: parseYml } = require("yaml");
const OpenCC = require('opencc');
const { flatten, unflatten } = require("flat");
const converter = new OpenCC('hk2s.json');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
    }
  })

  return arrayOfFiles
}

async function copyKey(frontMatter) {
  if (
    !frontMatter
    || frontMatter.cn
    || (frontMatter.cn && Object.keys(frontMatter.cn).length > 0)
  ) return frontMatter
  if (!frontMatter.zh || frontMatter.cn || (frontMatter.cn && Object.keys(frontMatter.cn).length > 0)) return frontMatter
  const zhFrontMatter = flatten(frontMatter.zh)
  const keys = Object.keys(zhFrontMatter)
  const cnFrontMatter = {}
  await Promise.all(keys.map(async key => {
    const zhValue = zhFrontMatter[key]
    if (zhValue) {
      if (
        !['slug', 'color', 'image', 'url', 'id', 'date', 'category'].includes(key)
        && !/^\/(uploads|images)\//.test(zhValue)
      ) {
        const cnValue = await converter.convertPromise(zhValue)
        cnFrontMatter[key] = cnValue
      } else {
        cnFrontMatter[key] = zhValue
      }
    }
  }))
  frontMatter.cn = unflatten(cnFrontMatter)
  return frontMatter
}

async function parseMarkdown(filePath, keys) {
  const file = await readFile(filePath)
  const fileContent = matter(file)
  const { data: frontMatter, content } = fileContent

  const updatedFrontMatter = await copyKey(frontMatter, keys)

  const newContent = `---\n${stringify(updatedFrontMatter)}---\n${content}`
  await writeFile(filePath, newContent)
}

async function parseYML(filePath, keys) {
  const file = await readFile(filePath, "utf-8")
  const frontMatter = parseYml(file)
  const updatedFrontMatter = await copyKey(frontMatter, keys)
  const newContent = stringify(updatedFrontMatter)
  await writeFile(filePath, newContent)
}

const promises = getAllFiles("../../data/")
  .filter(filePath => /\.yml$/.test(filePath))
  .map(async filePath => {
    await parseMarkdown(filePath)
  })

promises.push(
  getAllFiles("../../data/")
    .filter(filePath => /\.yml$/.test(filePath))
    .map(async filePath => {
      await parseYML(filePath)
    })
)

Promise.all(promises)
