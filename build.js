#!/usr/bin/env node

var buildTools = require('./build-tools.js');

buildTools.js();
buildTools.css();
buildTools.html('index.html');