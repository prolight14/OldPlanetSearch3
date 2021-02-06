"use strict";

// Modified from https://github.com/photonstorm/phaser3-plugin-template

// const webpack = require("webpack");

module.exports = {

    context: `${__dirname}/www/`,

    devtool: "source-map",

    mode: "development",

    entry: {
        index: "./js/",
    },

    output: {
        path: `${__dirname}/wwwOut/js/`,
        filename: "[name].js",
        // library: "PlanetSearch3",
        // libraryTarget: "umd",
        sourceMapFilename: '[file].map',
        umdNamedDefine: true
    },

    devtool: 'source-map'
};