# JavaScript Build Tools

Why do these things even exist in the first place?

<img src="https://imgs.xkcd.com/comics/automation.png" alt="XKCD Comic that explains this stuff">

There's a lot of different tools that exist in the world of front-end web development, and the community has realized that the need to automate it all, and *make it easy*, is important.

What can build tools automate for you?
- Running a local webserver
- Automatically refreshing the page when a file changes
- Running unit / integration tests
- Compiling SASS/LESS into actual CSS
- Transpiling any language into vanilla JavaScript (TypeScript, CoffeeScript, ClojureSript, ECMA2015, etc)
- Creating source maps for files
- Minfiying files
- Uglifying files
- Concatenating files
- Linting code files
- Modularizing files (Browserify/RequireJS)

## [Grunt](http://gruntjs.com/getting-started)

Grunt is the original task running system that was created for web development.

Pros:
- Older, more stable
- Larger availabilty of plugins
- Adopted by more organizations
- More references available

Cons:
- Older, more grunt specifics in syntax
- Slower in execution and run times

### Installation

First you must install a separate global package via NPM, otherwise you won't be able to use it from the command line

`npm install -g grunt-cli`

After that, you have to install a local version of grunt for __every__ project

`npm install grunt --save-dev`

## [Gulp](http://gulpjs.com/)

Gulp is the main competitor to grunt, and is quickly being adopted in place of it. It's also a task runner and does the same thing as grunt, but it has a couple of design differences that certainly make it worthwhile to learn.

Pros:
- Very limited amount of commands, simple to learn and use
- Instead of trying to do everything through plugins, it encourages the use of NPM packages first
    + In grunt, you do everything via plugins
    + In gulp, you do only what you must via plugins
- Does tasks concurrently, as efficiently as possible
    + Leads to faster run times
    + Makes it so you don't have to think of how to speed things up

Cons:
- Newer, less reference material available
