const { readFileSync, readdirSync } = require('fs')
const path = require('path')
const { readFile, writeFile } = require('fs/promises')
const matter = require('gray-matter')
const { stringify } = require("yaml");
const { flatten, unflatten } = require("flat");


const source = readFileSync(path.join(__dirname, "/", "source.txt"), "utf-8")
const contents = source
  .replace(/^(第.+集.*)/gm, '|$1')
  .split('|')
  .filter(content => !!content.trim())
  .map(content =>
    content
      .split('\n')
      .filter(content => !!content.trim())
      .filter((_, index) => index % 2 === 1)
      .reduce((obj, value, index) => {
        if (index === 0) {
          obj.title = value
        } else {
          if (obj.content) {
            obj.content += '\n\n'
          } else {
            obj.content = ''
          }
          obj.content += value
        }
        return obj
      }, {})
  )

const dirPath = "../../data/resources/channel/items"

const filePaths = readdirSync(dirPath).filter(filePath => /class-.*\.md$/.test(filePath))

filePaths.forEach(async fileName => {
  const filePath = path.join(__dirname, dirPath, "/", fileName)
  const file = await readFile(filePath)
  const fileContent = matter(file)
  const { data: frontMatter, content } = fileContent
  const [, classNumberStr] = frontMatter.zh.slug.match(/class-(\d+)/)
  const classNumber = parseInt(classNumberStr)
  const { title: enTitle, content: enContent } = contents[classNumber - 1]
  frontMatter.en = {
    title: enTitle,
    content: enContent,
  }
  const newContent = `---\n${stringify(frontMatter)}---\n${content}`
  await writeFile(filePath, newContent)
})
