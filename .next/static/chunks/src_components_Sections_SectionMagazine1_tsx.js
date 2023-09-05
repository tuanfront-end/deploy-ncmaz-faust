"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(self["webpackChunk_N_E"] = self["webpackChunk_N_E"] || []).push([["src_components_Sections_SectionMagazine1_tsx"],{

/***/ "./src/components/Card6/Card6.tsx":
/*!****************************************!*\
  !*** ./src/components/Card6/Card6.tsx ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_PostCardMeta_PostCardMeta__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/PostCardMeta/PostCardMeta */ \"./src/components/PostCardMeta/PostCardMeta.tsx\");\n/* harmony import */ var _components_PostCardSaveAction_PostCardSaveAction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/PostCardSaveAction/PostCardSaveAction */ \"./src/components/PostCardSaveAction/PostCardSaveAction.tsx\");\n/* harmony import */ var _components_PostCardLikeAndComment_PostCardLikeAndComment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/components/PostCardLikeAndComment/PostCardLikeAndComment */ \"./src/components/PostCardLikeAndComment/PostCardLikeAndComment.tsx\");\n/* harmony import */ var _components_CategoryBadgeList_CategoryBadgeList__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/components/CategoryBadgeList/CategoryBadgeList */ \"./src/components/CategoryBadgeList/CategoryBadgeList.tsx\");\n/* harmony import */ var _components_PostTypeFeaturedIcon_PostTypeFeaturedIcon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon */ \"./src/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon.tsx\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _utils_getPostDataFromPostFragment__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @/utils/getPostDataFromPostFragment */ \"./src/utils/getPostDataFromPostFragment.ts\");\n/* harmony import */ var _MyImage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../MyImage */ \"./src/components/MyImage.tsx\");\n\n\n\n\n\n\n\n\n\n\nconst Card6 = (param)=>{\n    let { className = \"h-full\", post } = param;\n    var _categories, _ncPostMetaData, _ncPostMetaData1, _featuredImage;\n    const { title, link, date, categories, excerpt, author, postFormats, featuredImage, ncPostMetaData, commentCount, uri, databaseId } = (0,_utils_getPostDataFromPostFragment__WEBPACK_IMPORTED_MODULE_8__.getPostDataFromPostFragment)(post);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"nc-Card6 relative flex group flex-row items-center sm:p-4 sm:rounded-3xl sm:bg-white sm:dark:bg-neutral-900 sm:border border-neutral-200 dark:border-neutral-700 \".concat(className),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_7___default()), {\n                href: uri || \"\",\n                className: \"absolute inset-0 z-0\"\n            }, void 0, false, {\n                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                lineNumber: 34,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-col flex-grow\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"space-y-3 mb-4\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_CategoryBadgeList_CategoryBadgeList__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                categories: ((_categories = categories) === null || _categories === void 0 ? void 0 : _categories.nodes) || []\n                            }, void 0, false, {\n                                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                                lineNumber: 37,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                                className: \"block font-semibold text-sm sm:text-base\",\n                                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_7___default()), {\n                                    dangerouslySetInnerHTML: {\n                                        __html: title\n                                    },\n                                    href: uri || \"\",\n                                    className: \"line-clamp-2\",\n                                    title: title || \"\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                                    lineNumber: 39,\n                                    columnNumber: 13\n                                }, undefined)\n                            }, void 0, false, {\n                                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                                lineNumber: 38,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_PostCardMeta_PostCardMeta__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                meta: {\n                                    author,\n                                    date\n                                }\n                            }, void 0, false, {\n                                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                                lineNumber: 46,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                        lineNumber: 36,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                        className: \"flex items-center flex-wrap justify-between mt-auto\",\n                        children: [\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_PostCardLikeAndComment_PostCardLikeAndComment__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                                className: \"relative\",\n                                commentCount: commentCount || 0,\n                                linkToPost: uri || \"\",\n                                likeCount: ((_ncPostMetaData = ncPostMetaData) === null || _ncPostMetaData === void 0 ? void 0 : _ncPostMetaData.likesCount) || 0,\n                                postDatabseId: databaseId || 0\n                            }, void 0, false, {\n                                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                                lineNumber: 49,\n                                columnNumber: 11\n                            }, undefined),\n                            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_PostCardSaveAction_PostCardSaveAction__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                                className: \"relative\",\n                                readingTime: ((_ncPostMetaData1 = ncPostMetaData) === null || _ncPostMetaData1 === void 0 ? void 0 : _ncPostMetaData1.readingTime) || 1,\n                                postDatabseId: databaseId || 0\n                            }, void 0, false, {\n                                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                                lineNumber: 56,\n                                columnNumber: 11\n                            }, undefined)\n                        ]\n                    }, void 0, true, {\n                        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                        lineNumber: 48,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                lineNumber: 35,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_7___default()), {\n                href: uri || \"\",\n                className: \"block relative flex-shrink-0 w-24 h-24 sm:w-40 sm:h-full ms-3 sm:ms-5 rounded-2xl overflow-hidden z-0\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_MyImage__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                        sizes: \"(max-width: 600px) 180px, 400px\",\n                        className: \"object-cover w-full h-full\",\n                        fill: true,\n                        src: ((_featuredImage = featuredImage) === null || _featuredImage === void 0 ? void 0 : _featuredImage.sourceUrl) || \"\",\n                        alt: title || \"Card Image\"\n                    }, void 0, false, {\n                        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                        lineNumber: 68,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"absolute bottom-1 start-1\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_PostTypeFeaturedIcon_PostTypeFeaturedIcon__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                            wrapSize: \"h-7 w-7\",\n                            iconSize: \"h-4 w-4\",\n                            postType: postFormats || \"\"\n                        }, void 0, false, {\n                            fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                            lineNumber: 76,\n                            columnNumber: 11\n                        }, undefined)\n                    }, void 0, false, {\n                        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                        lineNumber: 75,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n                lineNumber: 64,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Card6/Card6.tsx\",\n        lineNumber: 31,\n        columnNumber: 5\n    }, undefined);\n};\n_c = Card6;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Card6);\nvar _c;\n$RefreshReg$(_c, \"Card6\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9DYXJkNi9DYXJkNi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQWtDO0FBQ2dDO0FBQ2tCO0FBQ1k7QUFDZjtBQUNTO0FBQzdEO0FBQ3FEO0FBQ2pEO0FBS2pDLE1BQU1TLFFBQXdCO1FBQUMsRUFBRUMsWUFBWSxRQUFRLEVBQUVDLElBQUksRUFBRTtRQXVCcEJDLGFBZ0JsQkMsaUJBS0VBLGtCQWNWQztJQXpEYixNQUFNLEVBQ0pDLEtBQUssRUFDTEMsSUFBSSxFQUNKQyxJQUFJLEVBQ0pMLFVBQVUsRUFDVk0sT0FBTyxFQUNQQyxNQUFNLEVBQ05DLFdBQVcsRUFDWE4sYUFBYSxFQUNiRCxjQUFjLEVBQ2RRLFlBQVksRUFDWkMsR0FBRyxFQUNIQyxVQUFVLEVBQ1gsR0FBR2hCLCtGQUEyQkEsQ0FBQ0k7SUFFaEMscUJBQ0UsOERBQUNhO1FBQ0NkLFdBQVcsb0tBQThLLE9BQVZBOzswQkFFL0ssOERBQUNKLGtEQUFJQTtnQkFBQ21CLE1BQU1ILE9BQU87Z0JBQUlaLFdBQVU7Ozs7OzswQkFDakMsOERBQUNjO2dCQUFJZCxXQUFVOztrQ0FDYiw4REFBQ2M7d0JBQUlkLFdBQVU7OzBDQUNiLDhEQUFDTix1RkFBaUJBO2dDQUFDUSxZQUFZQSxFQUFBQSxjQUFBQSx3QkFBQUEsa0NBQUFBLFlBQVljLEtBQUssS0FBSSxFQUFFOzs7Ozs7MENBQ3RELDhEQUFDQztnQ0FBR2pCLFdBQVk7MENBQ2QsNEVBQUNKLGtEQUFJQTtvQ0FDSHNCLHlCQUF5Qjt3Q0FBRUMsUUFBUWQ7b0NBQU07b0NBQ3pDVSxNQUFNSCxPQUFPO29DQUNiWixXQUFVO29DQUNWSyxPQUFPQSxTQUFTOzs7Ozs7Ozs7OzswQ0FHcEIsOERBQUNkLDZFQUFZQTtnQ0FBQzZCLE1BQU07b0NBQUVYO29DQUFRRjtnQ0FBSzs7Ozs7Ozs7Ozs7O2tDQUVyQyw4REFBQ087d0JBQUlkLFdBQVU7OzBDQUNiLDhEQUFDUCxpR0FBc0JBO2dDQUNyQk8sV0FBVTtnQ0FDVlcsY0FBY0EsZ0JBQWdCO2dDQUM5QlUsWUFBWVQsT0FBTztnQ0FDbkJVLFdBQVduQixFQUFBQSxrQkFBQUEsNEJBQUFBLHNDQUFBQSxnQkFBZ0JvQixVQUFVLEtBQUk7Z0NBQ3pDQyxlQUFlWCxjQUFjOzs7Ozs7MENBRS9CLDhEQUFDckIseUZBQWtCQTtnQ0FDakJRLFdBQVU7Z0NBQ1Z5QixhQUFhdEIsRUFBQUEsbUJBQUFBLDRCQUFBQSx1Q0FBQUEsaUJBQWdCc0IsV0FBVyxLQUFJO2dDQUM1Q0QsZUFBZVgsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBCQUtuQyw4REFBQ2pCLGtEQUFJQTtnQkFDSG1CLE1BQU1ILE9BQU87Z0JBQ2JaLFdBQVk7O2tDQUVaLDhEQUFDRixnREFBT0E7d0JBQ040QixPQUFNO3dCQUNOMUIsV0FBVTt3QkFDVjJCLElBQUk7d0JBQ0pDLEtBQUt4QixFQUFBQSxpQkFBQUEsMkJBQUFBLHFDQUFBQSxlQUFleUIsU0FBUyxLQUFJO3dCQUNqQ0MsS0FBS3pCLFNBQVM7Ozs7OztrQ0FFaEIsOERBQUMwQjt3QkFBSy9CLFdBQVU7a0NBQ2QsNEVBQUNMLDZGQUFvQkE7NEJBQ25CcUMsVUFBUzs0QkFDVEMsVUFBUzs0QkFDVEMsVUFBVXhCLGVBQWU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTXJDO0tBdkVNWDtBQXlFTiwrREFBZUEsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9DYXJkNi9DYXJkNi50c3g/MGI0NSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgRkMgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBQb3N0Q2FyZE1ldGEgZnJvbSBcIkAvY29tcG9uZW50cy9Qb3N0Q2FyZE1ldGEvUG9zdENhcmRNZXRhXCI7XG5pbXBvcnQgUG9zdENhcmRTYXZlQWN0aW9uIGZyb20gXCJAL2NvbXBvbmVudHMvUG9zdENhcmRTYXZlQWN0aW9uL1Bvc3RDYXJkU2F2ZUFjdGlvblwiO1xuaW1wb3J0IFBvc3RDYXJkTGlrZUFuZENvbW1lbnQgZnJvbSBcIkAvY29tcG9uZW50cy9Qb3N0Q2FyZExpa2VBbmRDb21tZW50L1Bvc3RDYXJkTGlrZUFuZENvbW1lbnRcIjtcbmltcG9ydCBDYXRlZ29yeUJhZGdlTGlzdCBmcm9tIFwiQC9jb21wb25lbnRzL0NhdGVnb3J5QmFkZ2VMaXN0L0NhdGVnb3J5QmFkZ2VMaXN0XCI7XG5pbXBvcnQgUG9zdFR5cGVGZWF0dXJlZEljb24gZnJvbSBcIkAvY29tcG9uZW50cy9Qb3N0VHlwZUZlYXR1cmVkSWNvbi9Qb3N0VHlwZUZlYXR1cmVkSWNvblwiO1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiO1xuaW1wb3J0IHsgZ2V0UG9zdERhdGFGcm9tUG9zdEZyYWdtZW50IH0gZnJvbSBcIkAvdXRpbHMvZ2V0UG9zdERhdGFGcm9tUG9zdEZyYWdtZW50XCI7XG5pbXBvcnQgTXlJbWFnZSBmcm9tIFwiLi4vTXlJbWFnZVwiO1xuaW1wb3J0IHsgQ29tbW9uUG9zdENhcmRQcm9wcyB9IGZyb20gXCIuLi9DYXJkMi9DYXJkMlwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIENhcmQ2UHJvcHMgZXh0ZW5kcyBDb21tb25Qb3N0Q2FyZFByb3BzIHt9XG5cbmNvbnN0IENhcmQ2OiBGQzxDYXJkNlByb3BzPiA9ICh7IGNsYXNzTmFtZSA9IFwiaC1mdWxsXCIsIHBvc3QgfSkgPT4ge1xuICBjb25zdCB7XG4gICAgdGl0bGUsXG4gICAgbGluayxcbiAgICBkYXRlLFxuICAgIGNhdGVnb3JpZXMsXG4gICAgZXhjZXJwdCxcbiAgICBhdXRob3IsXG4gICAgcG9zdEZvcm1hdHMsXG4gICAgZmVhdHVyZWRJbWFnZSxcbiAgICBuY1Bvc3RNZXRhRGF0YSxcbiAgICBjb21tZW50Q291bnQsXG4gICAgdXJpLFxuICAgIGRhdGFiYXNlSWQsXG4gIH0gPSBnZXRQb3N0RGF0YUZyb21Qb3N0RnJhZ21lbnQocG9zdCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2BuYy1DYXJkNiByZWxhdGl2ZSBmbGV4IGdyb3VwIGZsZXgtcm93IGl0ZW1zLWNlbnRlciBzbTpwLTQgc206cm91bmRlZC0zeGwgc206Ymctd2hpdGUgc206ZGFyazpiZy1uZXV0cmFsLTkwMCBzbTpib3JkZXIgYm9yZGVyLW5ldXRyYWwtMjAwIGRhcms6Ym9yZGVyLW5ldXRyYWwtNzAwICR7Y2xhc3NOYW1lfWB9XG4gICAgPlxuICAgICAgPExpbmsgaHJlZj17dXJpIHx8IFwiXCJ9IGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgei0wXCI+PC9MaW5rPlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGZsZXgtZ3Jvd1wiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlLXktMyBtYi00XCI+XG4gICAgICAgICAgPENhdGVnb3J5QmFkZ2VMaXN0IGNhdGVnb3JpZXM9e2NhdGVnb3JpZXM/Lm5vZGVzIHx8IFtdfSAvPlxuICAgICAgICAgIDxoMiBjbGFzc05hbWU9e2BibG9jayBmb250LXNlbWlib2xkIHRleHQtc20gc206dGV4dC1iYXNlYH0+XG4gICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IHRpdGxlIH19XG4gICAgICAgICAgICAgIGhyZWY9e3VyaSB8fCBcIlwifVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJsaW5lLWNsYW1wLTJcIlxuICAgICAgICAgICAgICB0aXRsZT17dGl0bGUgfHwgXCJcIn1cbiAgICAgICAgICAgID48L0xpbms+XG4gICAgICAgICAgPC9oMj5cbiAgICAgICAgICA8UG9zdENhcmRNZXRhIG1ldGE9e3sgYXV0aG9yLCBkYXRlIH19IC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGZsZXgtd3JhcCBqdXN0aWZ5LWJldHdlZW4gbXQtYXV0b1wiPlxuICAgICAgICAgIDxQb3N0Q2FyZExpa2VBbmRDb21tZW50XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiXG4gICAgICAgICAgICBjb21tZW50Q291bnQ9e2NvbW1lbnRDb3VudCB8fCAwfVxuICAgICAgICAgICAgbGlua1RvUG9zdD17dXJpIHx8IFwiXCJ9XG4gICAgICAgICAgICBsaWtlQ291bnQ9e25jUG9zdE1ldGFEYXRhPy5saWtlc0NvdW50IHx8IDB9XG4gICAgICAgICAgICBwb3N0RGF0YWJzZUlkPXtkYXRhYmFzZUlkIHx8IDB9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8UG9zdENhcmRTYXZlQWN0aW9uXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiXG4gICAgICAgICAgICByZWFkaW5nVGltZT17bmNQb3N0TWV0YURhdGE/LnJlYWRpbmdUaW1lIHx8IDF9XG4gICAgICAgICAgICBwb3N0RGF0YWJzZUlkPXtkYXRhYmFzZUlkIHx8IDB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPExpbmtcbiAgICAgICAgaHJlZj17dXJpIHx8IFwiXCJ9XG4gICAgICAgIGNsYXNzTmFtZT17YGJsb2NrIHJlbGF0aXZlIGZsZXgtc2hyaW5rLTAgdy0yNCBoLTI0IHNtOnctNDAgc206aC1mdWxsIG1zLTMgc206bXMtNSByb3VuZGVkLTJ4bCBvdmVyZmxvdy1oaWRkZW4gei0wYH1cbiAgICAgID5cbiAgICAgICAgPE15SW1hZ2VcbiAgICAgICAgICBzaXplcz1cIihtYXgtd2lkdGg6IDYwMHB4KSAxODBweCwgNDAwcHhcIlxuICAgICAgICAgIGNsYXNzTmFtZT1cIm9iamVjdC1jb3ZlciB3LWZ1bGwgaC1mdWxsXCJcbiAgICAgICAgICBmaWxsXG4gICAgICAgICAgc3JjPXtmZWF0dXJlZEltYWdlPy5zb3VyY2VVcmwgfHwgXCJcIn1cbiAgICAgICAgICBhbHQ9e3RpdGxlIHx8IFwiQ2FyZCBJbWFnZVwifVxuICAgICAgICAvPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSBib3R0b20tMSBzdGFydC0xXCI+XG4gICAgICAgICAgPFBvc3RUeXBlRmVhdHVyZWRJY29uXG4gICAgICAgICAgICB3cmFwU2l6ZT1cImgtNyB3LTdcIlxuICAgICAgICAgICAgaWNvblNpemU9XCJoLTQgdy00XCJcbiAgICAgICAgICAgIHBvc3RUeXBlPXtwb3N0Rm9ybWF0cyB8fCBcIlwifVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvTGluaz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENhcmQ2O1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiUG9zdENhcmRNZXRhIiwiUG9zdENhcmRTYXZlQWN0aW9uIiwiUG9zdENhcmRMaWtlQW5kQ29tbWVudCIsIkNhdGVnb3J5QmFkZ2VMaXN0IiwiUG9zdFR5cGVGZWF0dXJlZEljb24iLCJMaW5rIiwiZ2V0UG9zdERhdGFGcm9tUG9zdEZyYWdtZW50IiwiTXlJbWFnZSIsIkNhcmQ2IiwiY2xhc3NOYW1lIiwicG9zdCIsImNhdGVnb3JpZXMiLCJuY1Bvc3RNZXRhRGF0YSIsImZlYXR1cmVkSW1hZ2UiLCJ0aXRsZSIsImxpbmsiLCJkYXRlIiwiZXhjZXJwdCIsImF1dGhvciIsInBvc3RGb3JtYXRzIiwiY29tbWVudENvdW50IiwidXJpIiwiZGF0YWJhc2VJZCIsImRpdiIsImhyZWYiLCJub2RlcyIsImgyIiwiZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUwiLCJfX2h0bWwiLCJtZXRhIiwibGlua1RvUG9zdCIsImxpa2VDb3VudCIsImxpa2VzQ291bnQiLCJwb3N0RGF0YWJzZUlkIiwicmVhZGluZ1RpbWUiLCJzaXplcyIsImZpbGwiLCJzcmMiLCJzb3VyY2VVcmwiLCJhbHQiLCJzcGFuIiwid3JhcFNpemUiLCJpY29uU2l6ZSIsInBvc3RUeXBlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Card6/Card6.tsx\n"));

/***/ }),

/***/ "./src/components/Sections/SectionMagazine1.tsx":
/*!******************************************************!*\
  !*** ./src/components/Sections/SectionMagazine1.tsx ***!
  \******************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Card2_Card2__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Card2/Card2 */ \"./src/components/Card2/Card2.tsx\");\n/* harmony import */ var _components_Card6_Card6__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/components/Card6/Card6 */ \"./src/components/Card6/Card6.tsx\");\n/* harmony import */ var _Empty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Empty */ \"./src/components/Empty.tsx\");\n\n\n\n\n\nconst Components = (param)=>{\n    let { posts, className = \"\" } = param;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"nc-SectionMagazine1 \".concat(className),\n        children: !posts.length ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Empty__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n            fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Sections/SectionMagazine1.tsx\",\n            lineNumber: 15,\n            columnNumber: 9\n        }, undefined) : /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"grid grid-cols-1 lg:grid-cols-2 gap-6 2xl:gap-7\",\n            children: [\n                posts[0] && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Card2_Card2__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    size: \"large\",\n                    post: posts[0]\n                }, void 0, false, {\n                    fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Sections/SectionMagazine1.tsx\",\n                    lineNumber: 18,\n                    columnNumber: 24\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"grid gap-6 2xl:gap-7\",\n                    children: posts.filter((_, i)=>i < 4 && i > 0).map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Card6_Card6__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                            post: item\n                        }, item.databaseId, false, {\n                            fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Sections/SectionMagazine1.tsx\",\n                            lineNumber: 23,\n                            columnNumber: 17\n                        }, undefined))\n                }, void 0, false, {\n                    fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Sections/SectionMagazine1.tsx\",\n                    lineNumber: 19,\n                    columnNumber: 11\n                }, undefined),\n                posts.filter((_, i)=>i >= 4).map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Card6_Card6__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                        post: item\n                    }, item.databaseId, false, {\n                        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Sections/SectionMagazine1.tsx\",\n                        lineNumber: 29,\n                        columnNumber: 15\n                    }, undefined))\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Sections/SectionMagazine1.tsx\",\n            lineNumber: 17,\n            columnNumber: 9\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/Sections/SectionMagazine1.tsx\",\n        lineNumber: 13,\n        columnNumber: 5\n    }, undefined);\n};\n_c = Components;\n/* harmony default export */ __webpack_exports__[\"default\"] = (Components);\nvar _c;\n$RefreshReg$(_c, \"Components\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9TZWN0aW9ucy9TZWN0aW9uTWFnYXppbmUxLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBa0M7QUFDMEI7QUFDZjtBQUNoQjtBQU83QixNQUFNSSxhQUF3QztRQUFDLEVBQUVDLEtBQUssRUFBRUMsWUFBWSxFQUFFLEVBQUU7SUFDdEUscUJBQ0UsOERBQUNDO1FBQUlELFdBQVcsdUJBQWlDLE9BQVZBO2tCQUNwQyxDQUFDRCxNQUFNRyxNQUFNLGlCQUNaLDhEQUFDTCw4Q0FBS0E7Ozs7c0NBRU4sOERBQUNJO1lBQUlELFdBQVU7O2dCQUNaRCxLQUFLLENBQUMsRUFBRSxrQkFBSSw4REFBQ0osK0RBQUtBO29CQUFDUSxNQUFLO29CQUFRQyxNQUFNTCxLQUFLLENBQUMsRUFBRTs7Ozs7OzhCQUMvQyw4REFBQ0U7b0JBQUlELFdBQVU7OEJBQ1pELE1BQ0VNLE1BQU0sQ0FBQyxDQUFDQyxHQUFHQyxJQUFNQSxJQUFJLEtBQUtBLElBQUksR0FDOUJDLEdBQUcsQ0FBQyxDQUFDQyxxQkFDSiw4REFBQ2IsK0RBQUtBOzRCQUF1QlEsTUFBTUs7MkJBQXZCQSxLQUFLQyxVQUFVOzs7Ozs7Ozs7O2dCQUdoQ1gsTUFDRU0sTUFBTSxDQUFDLENBQUNDLEdBQUdDLElBQU1BLEtBQUssR0FDdEJDLEdBQUcsQ0FBQyxDQUFDQyxxQkFDSiw4REFBQ2IsK0RBQUtBO3dCQUF1QlEsTUFBTUs7dUJBQXZCQSxLQUFLQyxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7O0FBTXpDO0tBeEJNWjtBQTBCTiwrREFBZUEsVUFBVUEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvY29tcG9uZW50cy9TZWN0aW9ucy9TZWN0aW9uTWFnYXppbmUxLnRzeD80NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBGQyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IENhcmQyLCB7IFRQb3N0Q2FyZCB9IGZyb20gXCJAL2NvbXBvbmVudHMvQ2FyZDIvQ2FyZDJcIjtcbmltcG9ydCBDYXJkNiBmcm9tIFwiQC9jb21wb25lbnRzL0NhcmQ2L0NhcmQ2XCI7XG5pbXBvcnQgRW1wdHkgZnJvbSBcIi4uL0VtcHR5XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VjdGlvbk1hZ2F6aW5lMVByb3BzIHtcbiAgcG9zdHM6IFRQb3N0Q2FyZFtdO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59XG5cbmNvbnN0IENvbXBvbmVudHM6IEZDPFNlY3Rpb25NYWdhemluZTFQcm9wcz4gPSAoeyBwb3N0cywgY2xhc3NOYW1lID0gXCJcIiB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BuYy1TZWN0aW9uTWFnYXppbmUxICR7Y2xhc3NOYW1lfWB9PlxuICAgICAgeyFwb3N0cy5sZW5ndGggPyAoXG4gICAgICAgIDxFbXB0eSAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0yIGdhcC02IDJ4bDpnYXAtN1wiPlxuICAgICAgICAgIHtwb3N0c1swXSAmJiA8Q2FyZDIgc2l6ZT1cImxhcmdlXCIgcG9zdD17cG9zdHNbMF19IC8+fVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBnYXAtNiAyeGw6Z2FwLTdcIj5cbiAgICAgICAgICAgIHtwb3N0c1xuICAgICAgICAgICAgICAuZmlsdGVyKChfLCBpKSA9PiBpIDwgNCAmJiBpID4gMClcbiAgICAgICAgICAgICAgLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgIDxDYXJkNiBrZXk9e2l0ZW0uZGF0YWJhc2VJZH0gcG9zdD17aXRlbX0gLz5cbiAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAge3Bvc3RzXG4gICAgICAgICAgICAuZmlsdGVyKChfLCBpKSA9PiBpID49IDQpXG4gICAgICAgICAgICAubWFwKChpdGVtKSA9PiAoXG4gICAgICAgICAgICAgIDxDYXJkNiBrZXk9e2l0ZW0uZGF0YWJhc2VJZH0gcG9zdD17aXRlbX0gLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb21wb25lbnRzO1xuIl0sIm5hbWVzIjpbIlJlYWN0IiwiQ2FyZDIiLCJDYXJkNiIsIkVtcHR5IiwiQ29tcG9uZW50cyIsInBvc3RzIiwiY2xhc3NOYW1lIiwiZGl2IiwibGVuZ3RoIiwic2l6ZSIsInBvc3QiLCJmaWx0ZXIiLCJfIiwiaSIsIm1hcCIsIml0ZW0iLCJkYXRhYmFzZUlkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/components/Sections/SectionMagazine1.tsx\n"));

/***/ })

}]);