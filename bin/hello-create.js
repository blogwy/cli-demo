#!/usr/bin/env node

const commander = require('commander')
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')
const download = require('../modules/download')
const prompt = require('../modules/prompt')
const generator = require('../modules/generator')
// 解析参数
commander.parse(process.argv)
// 接收第一个参数
const projectName = commander.args[0]
// 创建一个loading
const spinner = ora('downloading template');

// 没有项目名，提示help，退出
if (!projectName) {
  commander.help()
  return
}

async function main (projectName) {
  const path = `${process.cwd()}/${projectName}`
  // 开始下载模版
  spinner.start()
  try {
    await download(path)
  } catch (error) {
    // 隐藏loading，打印错误信息
    spinner.stop()
    console.log(logSymbols.error, chalk.red('download error'))
    console.log(chalk.red(error))
    return
  }
  // 下载成功
  spinner.stop()
  // 收集数据
  const projectInfo = await prompt(projectName)
  // 生成模版
  try {
    await generator(projectInfo, path, path)
  } catch (error) {
    console.log(logSymbols.error, chalk.red('generator error'))
    console.log(chalk.red(error))
    return
  }
  // Finished
  console.log(logSymbols.success, chalk.green('Finished successfully!'))
}

main(projectName)