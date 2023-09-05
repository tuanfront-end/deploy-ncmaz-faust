"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "src_container_singles_single-2_single-2_tsx";
exports.ids = ["src_container_singles_single-2_single-2_tsx"];
exports.modules = {

/***/ "./src/container/singles/single-2/single-2.tsx":
/*!*****************************************************!*\
  !*** ./src/container/singles/single-2/single-2.tsx ***!
  \*****************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_NcImage_NcImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/NcImage/NcImage */ \"./src/components/NcImage/NcImage.tsx\");\n/* harmony import */ var _utils_getPostDataFromPostFragment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/utils/getPostDataFromPostFragment */ \"./src/utils/getPostDataFromPostFragment.ts\");\n/* harmony import */ var _SingleHeader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../SingleHeader */ \"./src/container/singles/SingleHeader.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_SingleHeader__WEBPACK_IMPORTED_MODULE_4__]);\n_SingleHeader__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\nconst SingleType2 = ({ post })=>{\n    //\n    const { title, content, date, author, databaseId, excerpt, featuredImage } = (0,_utils_getPostDataFromPostFragment__WEBPACK_IMPORTED_MODULE_3__.getPostDataFromPostFragment)(post || {});\n    //\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: `pt-8 lg:pt-16`,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n                className: \"container rounded-xl\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"max-w-screen-md mx-auto\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_SingleHeader__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                            post: {\n                                ...post\n                            },\n                            hiddenDesc: true\n                        }, void 0, false, {\n                            fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/container/singles/single-2/single-2.tsx\",\n                            lineNumber: 19,\n                            columnNumber: 11\n                        }, undefined),\n                        !featuredImage?.sourceUrl && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"my-5 border-b border-neutral-200 dark:border-neutral-800 \"\n                        }, void 0, false, {\n                            fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/container/singles/single-2/single-2.tsx\",\n                            lineNumber: 21,\n                            columnNumber: 13\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/container/singles/single-2/single-2.tsx\",\n                    lineNumber: 18,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/container/singles/single-2/single-2.tsx\",\n                lineNumber: 17,\n                columnNumber: 7\n            }, undefined),\n            featuredImage?.sourceUrl && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_NcImage_NcImage__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                alt: title,\n                containerClassName: \"container my-10 sm:my-12\",\n                className: \"w-full rounded-xl\",\n                src: featuredImage?.sourceUrl || \"\",\n                width: featuredImage?.mediaDetails?.width || 1000,\n                height: featuredImage?.mediaDetails?.height || 750,\n                sizes: \"(max-width: 1024px) 100vw, 1280px\",\n                priority: true\n            }, void 0, false, {\n                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/container/singles/single-2/single-2.tsx\",\n                lineNumber: 28,\n                columnNumber: 9\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/container/singles/single-2/single-2.tsx\",\n        lineNumber: 15,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SingleType2);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29udGFpbmVyL3NpbmdsZXMvc2luZ2xlLTIvc2luZ2xlLTIudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFrQztBQUNpQjtBQUMrQjtBQUN2QztBQUkzQyxNQUFNSSxjQUF5QixDQUFDLEVBQUVDLElBQUksRUFBRTtJQUN0QyxFQUFFO0lBQ0YsTUFBTSxFQUFFQyxLQUFLLEVBQUVDLE9BQU8sRUFBRUMsSUFBSSxFQUFFQyxNQUFNLEVBQUVDLFVBQVUsRUFBRUMsT0FBTyxFQUFFQyxhQUFhLEVBQUUsR0FDeEVWLCtGQUEyQkEsQ0FBQ0csUUFBUSxDQUFDO0lBQ3ZDLEVBQUU7SUFFRixxQkFDRSw4REFBQ1E7UUFBSUMsV0FBVyxDQUFDLGFBQWEsQ0FBQzs7MEJBRTdCLDhEQUFDQztnQkFBT0QsV0FBVTswQkFDaEIsNEVBQUNEO29CQUFJQyxXQUFVOztzQ0FDYiw4REFBQ1gscURBQVlBOzRCQUFDRSxNQUFNO2dDQUFFLEdBQUdBLElBQUk7NEJBQUM7NEJBQUdXLFVBQVU7Ozs7Ozt3QkFDMUMsQ0FBQ0osZUFBZUssMkJBQ2YsOERBQUNKOzRCQUFJQyxXQUFVOzs7Ozs7Ozs7Ozs7Ozs7OztZQU1wQkYsZUFBZUssMkJBQ2QsOERBQUNoQixtRUFBT0E7Z0JBQ05pQixLQUFLWjtnQkFDTGEsb0JBQW1CO2dCQUNuQkwsV0FBVTtnQkFDVk0sS0FBS1IsZUFBZUssYUFBYTtnQkFDakNJLE9BQU9ULGVBQWVVLGNBQWNELFNBQVM7Z0JBQzdDRSxRQUFRWCxlQUFlVSxjQUFjQyxVQUFVO2dCQUMvQ0MsT0FBTztnQkFDUEMsUUFBUTs7Ozs7Ozs7Ozs7O0FBS2xCO0FBRUEsaUVBQWVyQixXQUFXQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbnRhaW5lci9zaW5nbGVzL3NpbmdsZS0yL3NpbmdsZS0yLnRzeD8xYjE4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBGQyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IE5jSW1hZ2UgZnJvbSBcIkAvY29tcG9uZW50cy9OY0ltYWdlL05jSW1hZ2VcIjtcbmltcG9ydCB7IGdldFBvc3REYXRhRnJvbVBvc3RGcmFnbWVudCB9IGZyb20gXCJAL3V0aWxzL2dldFBvc3REYXRhRnJvbVBvc3RGcmFnbWVudFwiO1xuaW1wb3J0IFNpbmdsZUhlYWRlciBmcm9tIFwiLi4vU2luZ2xlSGVhZGVyXCI7XG5pbXBvcnQgeyBTaW5nbGVUeXBlMVByb3BzIH0gZnJvbSBcIi4uL3NpbmdsZS9zaW5nbGVcIjtcbmludGVyZmFjZSBQcm9wcyBleHRlbmRzIFNpbmdsZVR5cGUxUHJvcHMge31cblxuY29uc3QgU2luZ2xlVHlwZTI6IEZDPFByb3BzPiA9ICh7IHBvc3QgfSkgPT4ge1xuICAvL1xuICBjb25zdCB7IHRpdGxlLCBjb250ZW50LCBkYXRlLCBhdXRob3IsIGRhdGFiYXNlSWQsIGV4Y2VycHQsIGZlYXR1cmVkSW1hZ2UgfSA9XG4gICAgZ2V0UG9zdERhdGFGcm9tUG9zdEZyYWdtZW50KHBvc3QgfHwge30pO1xuICAvL1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2BwdC04IGxnOnB0LTE2YH0+XG4gICAgICB7LyogU0lOR0xFIEhFQURFUiAqL31cbiAgICAgIDxoZWFkZXIgY2xhc3NOYW1lPVwiY29udGFpbmVyIHJvdW5kZWQteGxcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtYXgtdy1zY3JlZW4tbWQgbXgtYXV0b1wiPlxuICAgICAgICAgIDxTaW5nbGVIZWFkZXIgcG9zdD17eyAuLi5wb3N0IH19IGhpZGRlbkRlc2MgLz5cbiAgICAgICAgICB7IWZlYXR1cmVkSW1hZ2U/LnNvdXJjZVVybCAmJiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm15LTUgYm9yZGVyLWIgYm9yZGVyLW5ldXRyYWwtMjAwIGRhcms6Ym9yZGVyLW5ldXRyYWwtODAwIFwiPjwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9oZWFkZXI+XG5cbiAgICAgIHsvKiBGRUFUVVJFRCBJTUFHRSAqL31cbiAgICAgIHtmZWF0dXJlZEltYWdlPy5zb3VyY2VVcmwgJiYgKFxuICAgICAgICA8TmNJbWFnZVxuICAgICAgICAgIGFsdD17dGl0bGV9XG4gICAgICAgICAgY29udGFpbmVyQ2xhc3NOYW1lPVwiY29udGFpbmVyIG15LTEwIHNtOm15LTEyXCJcbiAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcm91bmRlZC14bFwiXG4gICAgICAgICAgc3JjPXtmZWF0dXJlZEltYWdlPy5zb3VyY2VVcmwgfHwgXCJcIn1cbiAgICAgICAgICB3aWR0aD17ZmVhdHVyZWRJbWFnZT8ubWVkaWFEZXRhaWxzPy53aWR0aCB8fCAxMDAwfVxuICAgICAgICAgIGhlaWdodD17ZmVhdHVyZWRJbWFnZT8ubWVkaWFEZXRhaWxzPy5oZWlnaHQgfHwgNzUwfVxuICAgICAgICAgIHNpemVzPXtcIihtYXgtd2lkdGg6IDEwMjRweCkgMTAwdncsIDEyODBweFwifVxuICAgICAgICAgIHByaW9yaXR5XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2luZ2xlVHlwZTI7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJOY0ltYWdlIiwiZ2V0UG9zdERhdGFGcm9tUG9zdEZyYWdtZW50IiwiU2luZ2xlSGVhZGVyIiwiU2luZ2xlVHlwZTIiLCJwb3N0IiwidGl0bGUiLCJjb250ZW50IiwiZGF0ZSIsImF1dGhvciIsImRhdGFiYXNlSWQiLCJleGNlcnB0IiwiZmVhdHVyZWRJbWFnZSIsImRpdiIsImNsYXNzTmFtZSIsImhlYWRlciIsImhpZGRlbkRlc2MiLCJzb3VyY2VVcmwiLCJhbHQiLCJjb250YWluZXJDbGFzc05hbWUiLCJzcmMiLCJ3aWR0aCIsIm1lZGlhRGV0YWlscyIsImhlaWdodCIsInNpemVzIiwicHJpb3JpdHkiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/container/singles/single-2/single-2.tsx\n");

/***/ })

};
;