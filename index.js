const path = require('path')

function createTreeNode(dependencyMap, node) {
  const children = (dependencyMap[node] || []).map(child => {
    return createTreeNode(dependencyMap, child)
  })

  return {
    [node]: children
  }
}

function ComponentTreePlugin (options) {
  this.directories = options.directories || []
  this.extensions = options.extensions || ['.jsx']
  this.outputPath = options.outputPath
}

ComponentTreePlugin.prototype.apply = function (compiler) {
  compiler.plugin('this-compilation', compilation => {
    compilation.plugin('additional-assets', callback => {
      compilation.chunks.forEach(chunk => {
        let dependencyMap = {}

        chunk.modules.forEach(module => {
          if (!this.isComponent(module.resource)) return

          const dependencies = (module.dependencies || []).filter(dependency => {
            return dependency.module &&
              dependency.module.resource &&
              this.isComponent(dependency.module.resource)
          }).map(dependency => dependency.module.resource)

          dependencyMap[module.resource] = dependencies
        })

        const rootComponent = Object.keys(dependencyMap).find(component => {
          return Object.keys(dependencyMap).every(innerComponent => {
            return !dependencyMap[innerComponent].includes(component)
          })
        })

        const dependencyTree = createTreeNode(dependencyMap, rootComponent)
        const payload = JSON.stringify(dependencyTree)

        compilation.assets[this.outputPath] = {
          source: () => payload,
          size: () => payload.length
        }
      })

      callback()
    })
  })
}

ComponentTreePlugin.prototype.isComponent = function (modulePath) {
  const directoryMatch = this.directories.some(directory => {
    return modulePath.indexOf(directory) === 0
  })

  if (!directoryMatch) return false

  return this.extensions.includes(path.extname(modulePath))  
}

module.exports = ComponentTreePlugin
