"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("request"));
var url_1 = require("url");
function npmSearch(search) {
    return new Promise(function (resolve, reject) {
        /**
         * On the site npmjs.com only 20 found packages can be displayed on a single page.
         * Therefore, we need to make several requests with the page url parameter.
         */
        request_1.default(createRequestParams(search), function (err, res, body) {
            if (err)
                reject(err);
            var allFoundPackages = getPackages(body);
            resolve(allFoundPackages);
        });
    });
}
exports.default = npmSearch;
function createRequestParams(options, page) {
    var searchParams = new url_1.URLSearchParams();
    if (options.name) /*-----*/
        searchParams.set('q', options.name);
    if (options.keywords) /*-*/
        searchParams.set('q', 'keywords:' + options.keywords.join(' '));
    if (options.ranking) /*--*/
        searchParams.set('ranking', options.ranking);
    if (page) /*-------------*/
        searchParams.set('page', String(page));
    return {
        method: 'GET',
        uri: 'http://npmjs.com/search?' + searchParams.toString(),
        headers: {
            'Accept': 'application/json',
            'x-requested-with': 'XMLHttpRequest',
            'x-spiferack': 1
        }
    };
}
function getPackages(body) {
    return JSON.parse(body).objects.map(function (p) { return p.package; });
}