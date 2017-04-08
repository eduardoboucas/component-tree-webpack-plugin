# Component Tree Webpack Plugin

Generates a JSON file with a tree representation of all the module dependencies within a specified list of directories that match certain extensions. It's particularly useful to generate a hierarchy of React components.

## Installation

```shell
npm install component-tree-webpack-plugin --save-dev
```

## Usage

In your webpack configuration file:

1. Require the plugin

   ```js
   const ComponentTreePlugin = require('component-tree-webpack-plugin');
   ```
   
1. Add the plugin to the `plugins` array:

   ```js
   plugins: ([
     new ComponentTreePlugin({
       directories: [
         path.resolve(__dirname, 'frontend/components/'),
         path.resolve(__dirname, 'frontend/containers/'),
         path.resolve(__dirname, 'frontend/views/')
       ],
       extensions: ['.jsx'],
       outputPath: '/../component-map.json'
     })
   ])
   ```
   
## Options

- `directories` (Array): A list of directories to look for components in
- `extensions` (Array): A list of allowed extensions for components (default: `['.jsx']`)
- `outputPath` (String): The full path to the generated JSON file

## License

Copyright 2017 Eduardo Bouças

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
