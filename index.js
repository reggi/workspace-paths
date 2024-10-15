const path = require('path')
const fs = require('fs/promises')
const {glob} = require('glob')

const main = async ({cwd, includeRoot}) => {
  const currentDirectory = cwd
  const packageJsonPath = path.join(currentDirectory, 'package.json')
  const packageJsonContent = await fs.readFile(packageJsonPath, 'utf8')
  const packageJson = JSON.parse(packageJsonContent)
  const workspaces = packageJson.workspaces || []
  const workspacePaths = (
    await Promise.all(workspaces.map(workspace => glob(path.join(currentDirectory, workspace))))
  ).flat()
  if (includeRoot) workspacePaths.push(currentDirectory)
  return workspacePaths
}

module.exports = main
