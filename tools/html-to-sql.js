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
  'introduction',
  'ch1',
  'ch2',
  'ch3',
  'ch4',
  'ch5',
  'ch6',
  'ch7'
]
