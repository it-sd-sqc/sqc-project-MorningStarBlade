// Dependencies ////////////////////////////////////////////
import { strict as assert } from 'node:assert'
import { closeSync, openSync, readFileSync, writeFileSync }
  from 'node:fs'
import { parse } from 'node-html-parser'

// This module uses the CommonJS module format, so we need
// to import it differently.
import pkg from 'svgoban'
const { serialize } = pkg

// Configuration ///////////////////////////////////////////
const srcPath = 'data/The Horror Expert .html'
const dstPath = 'docs/generated-schema.sql'
const chapterIds = [
  'introduction'
  'ch1',
  'ch2',
  'ch3',
  'ch4',
  'ch5'
]

const sqlHeader = ` 
  DROP TABLE IF EXISTS chapters;
  DROP TABLE IF EXISTS descriptions;

  CREATE TABLE chapters (chapter_id SERIAL PRIMARY KEY, chapter_name TEXT NOT NULL);
  CREATE TABLE descriptions (desc_id SERIAL PRIMARY KEY, FOREIGN KEY (chapter_id) REFERENCES chapters(chapter_id), body TEXT NOT NULL);

  INSERT INTO chapters (chapter_name) VALUES 
`
const insertDescSql = `INSERT INTO descriptions (chapter_id, body) VALUES
`

// Utility Functions ///////////////////////////////////////
const extractTitle = function (root, id){
  const chapter_name = root.querySelector(`#${id} .ph2`).text
  return chapter_name;
}

const extractBody = function (root, id) {
  const body = root.querySelector(`#${id} .divBody`)
  return body;
}

// Conversion //////////////////////////////////////////////
const src = readFileSync(srcPath, 'utf8')
const domRoot = parse(src)

// Extract guide chapters.
const chapters = []
chapterIds.forEach(
  (id) => {
    // Extract the title
    const chapter_name = extractTitle(domRoot, id)
    chapters.push({
    chapter_name
    })
  }
)

// Extract the bodies to descriptions
const body = []
chapterIds.forEach(
  (id) => {
    // Extract the title
    const chapter_name = extractBody(domRoot, id)
    descriptions.push({
    body
    })
  }
)

// Output the data as SQL.
const fd = openSync(dstPath, 'w')
writeFileSync(fd, sqlHeader)
writeFileSync(fd, `('${chapters[0].chapter_name}'`)
chapters.slice(1).forEach((data) => {
  const value = `,\n('${data.chapter_name}')`
  writeFileSync(fd, value)
})
writeFileSync(fd, ';\n\n')

writeFileSync(fd, `('${description[0].body}')`)
description.slice(1).forEach((data) => {
  const value = `,\n('${data.body}')`
  writeFileSync(fd, value)
})
writeFileSync(fd, ';\n\n')
closeSync(fd)
