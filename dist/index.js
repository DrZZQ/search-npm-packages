"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promise_1 = __importDefault(require("request-promise"));
const url_1 = require("url");
const request = request_promise_1.default;
function npmSearch(search) {
    return new Promise((resolve, reject) => {
        /**
         * On the site npmjs.com only 20 found packages can be displayed on a single page.
         * Therefore, we need to make several requests with the page url parameter.
         */
        if (search.quantity >= 20) {
            request(createRequestParams(search))
                .then((data) => __awaiter(this, void 0, void 0, function* () {
                const totalFoundedPackages = data.total;
                const allPackages = getPackages(data);
                let requestCount;
                if (search.quantity > totalFoundedPackages) {
                    requestCount = (totalFoundedPackages / 20) - 1;
                }
                else {
                    requestCount = (search.quantity / 20) - 1;
                }
                for (let i = 0; i < requestCount; i++) {
                    const searchResult = yield request(createRequestParams(search, i))
                        .catch(err => reject(err));
                    const packages = getPackages(searchResult);
                    packages.forEach(p => allPackages.push(p));
                }
                if (allPackages.length > search.quantity) {
                    const deleteCount = allPackages.length - search.quantity;
                    allPackages.splice(0, deleteCount);
                }
                resolve(allPackages);
            }))
                .catch(err => err);
        }
        else if (search.quantity < 20) {
            request(createRequestParams(search))
                .then((data) => {
                const allPackages = getPackages(data);
                allPackages.splice(0, 20 - search.quantity);
                resolve(allPackages);
            })
                .catch(err => reject(err));
        }
    });
}
exports.default = npmSearch;
function createRequestParams(options, page) {
    const searchParams = new url_1.URLSearchParams(); // from @types/request-promise package
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
        },
        json: true
    };
}
function getPackages(data) {
    return data.objects.map(p => p.package);
}
