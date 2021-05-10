/* eslint-disable import/no-commonjs */
const path = require('path');
const { Module } = require('module');
const dotenv = require('dotenv');

function clearRequireCache() {
    Object.keys(require.cache).forEach((key) => {
        delete require.cache[key];
    });
}

const ROOT_FOLDER = process.cwd();

function preventParentScopeModules() {
    const nodeModulePaths = Module._nodeModulePaths;

    Module._nodeModulePaths = function (from) {
        const originalPath = nodeModulePaths.call(this, from);
        const insideRootPaths = originalPath.filter(function (p) {
            return p.match(ROOT_FOLDER);
        });

        return insideRootPaths;
    };
}

function initEnv() {
    dotenv.config({ path: path.join(__dirname, './test.env') });
}

clearRequireCache();
preventParentScopeModules();
initEnv();
