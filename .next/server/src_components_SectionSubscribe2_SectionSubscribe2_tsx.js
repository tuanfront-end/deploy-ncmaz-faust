"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "src_components_SectionSubscribe2_SectionSubscribe2_tsx";
exports.ids = ["src_components_SectionSubscribe2_SectionSubscribe2_tsx"];
exports.modules = {

/***/ "./src/components/SectionSubscribe2/SectionSubscribe2.tsx":
/*!****************************************************************!*\
  !*** ./src/components/SectionSubscribe2/SectionSubscribe2.tsx ***!
  \****************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_Badge_Badge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/components/Badge/Badge */ \"./src/components/Badge/Badge.tsx\");\n/* harmony import */ var _MyImage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MyImage */ \"./src/components/MyImage.tsx\");\n/* harmony import */ var _contains_site_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/contains/site-settings */ \"./src/contains/site-settings.ts\");\n/* harmony import */ var _AddSubscriberForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../AddSubscriberForm */ \"./src/components/AddSubscriberForm.tsx\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_AddSubscriberForm__WEBPACK_IMPORTED_MODULE_5__]);\n_AddSubscriberForm__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\n\nconst SectionSubscribe2 = ({ className = \"\" })=>{\n    if (_contains_site_settings__WEBPACK_IMPORTED_MODULE_4__.NC_SITE_SETTINGS.newsletter_section.enable === false) {\n        return null;\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: `nc-SectionSubscribe2 relative flex flex-col lg:flex-row items-center ${className}`,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex-shrink-0 mb-14 lg:mb-0 lg:me-10 lg:w-2/5\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                        className: \"font-semibold text-4xl\",\n                        children: _contains_site_settings__WEBPACK_IMPORTED_MODULE_4__.NC_SITE_SETTINGS.newsletter_section.title\n                    }, void 0, false, {\n                        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/SectionSubscribe2/SectionSubscribe2.tsx\",\n                        lineNumber: 21,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                        className: \"block mt-6 text-neutral-500 dark:text-neutral-400\",\n                        children: _contains_site_settings__WEBPACK_IMPORTED_MODULE_4__.NC_SITE_SETTINGS.newsletter_section.description\n                    }, void 0, false, {\n                        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/SectionSubscribe2/SectionSubscribe2.tsx\",\n                        lineNumber: 24,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n                        className: \"space-y-5 mt-10\",\n                        children: _contains_site_settings__WEBPACK_IMPORTED_MODULE_4__.NC_SITE_SETTINGS.newsletter_section.features_list.map((item, index)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                                className: \"flex items-center space-x-4 rtl:space-x-reverse\",\n                                children: [\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Badge_Badge__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                        name: \"0\" + (index + 1),\n                                        color: !index ? \"red\" : index == 1 ? \"indigo\" : \"green\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/SectionSubscribe2/SectionSubscribe2.tsx\",\n                                        lineNumber: 34,\n                                        columnNumber: 17\n                                    }, undefined),\n                                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                        className: \"font-medium text-neutral-700 dark:text-neutral-300\",\n                                        children: item\n                                    }, void 0, false, {\n                                        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/SectionSubscribe2/SectionSubscribe2.tsx\",\n                                        lineNumber: 38,\n                                        columnNumber: 17\n                                    }, undefined)\n                                ]\n                            }, index, true, {\n                                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/SectionSubscribe2/SectionSubscribe2.tsx\",\n                                lineNumber: 30,\n                                columnNumber: 15\n                            }, undefined))\n                    }, void 0, false, {\n                        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/SectionSubscribe2/SectionSubscribe2.tsx\",\n                        lineNumber: 27,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AddSubscriberForm__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                        className: \"mt-10 relative max-w-sm\"\n                    }, void 0, false, {\n                        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/SectionSubscribe2/SectionSubscribe2.tsx\",\n                        lineNumber: 45,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/SectionSubscribe2/SectionSubscribe2.tsx\",\n                lineNumber: 20,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex-grow\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_MyImage__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n                    alt: \"subsc\",\n                    sizes: \"(max-width: 768px) 100vw, 50vw\",\n                    src: _contains_site_settings__WEBPACK_IMPORTED_MODULE_4__.NC_SITE_SETTINGS.newsletter_section.right_image,\n                    width: 1450,\n                    height: 638\n                }, void 0, false, {\n                    fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/SectionSubscribe2/SectionSubscribe2.tsx\",\n                    lineNumber: 48,\n                    columnNumber: 9\n                }, undefined)\n            }, void 0, false, {\n                fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/SectionSubscribe2/SectionSubscribe2.tsx\",\n                lineNumber: 47,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/leanhtuan/Desktop/NCMAZ_FAUST/front-end/ncmaz-faust/src/components/SectionSubscribe2/SectionSubscribe2.tsx\",\n        lineNumber: 17,\n        columnNumber: 5\n    }, undefined);\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SectionSubscribe2);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9TZWN0aW9uU3Vic2NyaWJlMi9TZWN0aW9uU3Vic2NyaWJlMi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFrQztBQUNXO0FBQ1o7QUFDMkI7QUFDUDtBQU1yRCxNQUFNSyxvQkFBZ0QsQ0FBQyxFQUFFQyxZQUFZLEVBQUUsRUFBRTtJQUN2RSxJQUFJSCxxRUFBZ0JBLENBQUNJLGtCQUFrQixDQUFDQyxNQUFNLEtBQUssT0FBTztRQUN4RCxPQUFPO0lBQ1Q7SUFFQSxxQkFDRSw4REFBQ0M7UUFDQ0gsV0FBVyxDQUFDLHFFQUFxRSxFQUFFQSxVQUFVLENBQUM7OzBCQUU5Riw4REFBQ0c7Z0JBQUlILFdBQVU7O2tDQUNiLDhEQUFDSTt3QkFBR0osV0FBVTtrQ0FDWEgscUVBQWdCQSxDQUFDSSxrQkFBa0IsQ0FBQ0ksS0FBSzs7Ozs7O2tDQUU1Qyw4REFBQ0M7d0JBQUtOLFdBQVU7a0NBQ2JILHFFQUFnQkEsQ0FBQ0ksa0JBQWtCLENBQUNNLFdBQVc7Ozs7OztrQ0FFbEQsOERBQUNDO3dCQUFHUixXQUFVO2tDQUNYSCxxRUFBZ0JBLENBQUNJLGtCQUFrQixDQUFDUSxhQUFhLENBQUNDLEdBQUcsQ0FDcEQsQ0FBQ0MsTUFBTUMsc0JBQ0wsOERBQUNDO2dDQUVDYixXQUFVOztrREFFViw4REFBQ0wsK0RBQUtBO3dDQUNKbUIsTUFBTSxNQUFPRixDQUFBQSxRQUFRO3dDQUNyQkcsT0FBTyxDQUFDSCxRQUFRLFFBQVFBLFNBQVMsSUFBSSxXQUFXOzs7Ozs7a0RBRWxELDhEQUFDTjt3Q0FBS04sV0FBVTtrREFDYlc7Ozs7Ozs7K0JBUkVDOzs7Ozs7Ozs7O2tDQWNiLDhEQUFDZCwwREFBaUJBO3dCQUFDRSxXQUFVOzs7Ozs7Ozs7Ozs7MEJBRS9CLDhEQUFDRztnQkFBSUgsV0FBVTswQkFDYiw0RUFBQ0osZ0RBQU9BO29CQUNOb0IsS0FBSTtvQkFDSkMsT0FBTTtvQkFDTkMsS0FBS3JCLHFFQUFnQkEsQ0FBQ0ksa0JBQWtCLENBQUNrQixXQUFXO29CQUNwREMsT0FBTztvQkFDUEMsUUFBUTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLbEI7QUFFQSxpRUFBZXRCLGlCQUFpQkEsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb25TdWJzY3JpYmUyL1NlY3Rpb25TdWJzY3JpYmUyLnRzeD85NTA5Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBGQyB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEJhZGdlIGZyb20gXCJAL2NvbXBvbmVudHMvQmFkZ2UvQmFkZ2VcIjtcbmltcG9ydCBNeUltYWdlIGZyb20gXCIuLi9NeUltYWdlXCI7XG5pbXBvcnQgeyBOQ19TSVRFX1NFVFRJTkdTIH0gZnJvbSBcIkAvY29udGFpbnMvc2l0ZS1zZXR0aW5nc1wiO1xuaW1wb3J0IEFkZFN1YnNjcmliZXJGb3JtIGZyb20gXCIuLi9BZGRTdWJzY3JpYmVyRm9ybVwiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNlY3Rpb25TdWJzY3JpYmUyUHJvcHMge1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG59XG5cbmNvbnN0IFNlY3Rpb25TdWJzY3JpYmUyOiBGQzxTZWN0aW9uU3Vic2NyaWJlMlByb3BzPiA9ICh7IGNsYXNzTmFtZSA9IFwiXCIgfSkgPT4ge1xuICBpZiAoTkNfU0lURV9TRVRUSU5HUy5uZXdzbGV0dGVyX3NlY3Rpb24uZW5hYmxlID09PSBmYWxzZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2BuYy1TZWN0aW9uU3Vic2NyaWJlMiByZWxhdGl2ZSBmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGl0ZW1zLWNlbnRlciAke2NsYXNzTmFtZX1gfVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleC1zaHJpbmstMCBtYi0xNCBsZzptYi0wIGxnOm1lLTEwIGxnOnctMi81XCI+XG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtNHhsXCI+XG4gICAgICAgICAge05DX1NJVEVfU0VUVElOR1MubmV3c2xldHRlcl9zZWN0aW9uLnRpdGxlfVxuICAgICAgICA8L2gyPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJibG9jayBtdC02IHRleHQtbmV1dHJhbC01MDAgZGFyazp0ZXh0LW5ldXRyYWwtNDAwXCI+XG4gICAgICAgICAge05DX1NJVEVfU0VUVElOR1MubmV3c2xldHRlcl9zZWN0aW9uLmRlc2NyaXB0aW9ufVxuICAgICAgICA8L3NwYW4+XG4gICAgICAgIDx1bCBjbGFzc05hbWU9XCJzcGFjZS15LTUgbXQtMTBcIj5cbiAgICAgICAgICB7TkNfU0lURV9TRVRUSU5HUy5uZXdzbGV0dGVyX3NlY3Rpb24uZmVhdHVyZXNfbGlzdC5tYXAoXG4gICAgICAgICAgICAoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgICAgICAgPGxpXG4gICAgICAgICAgICAgICAga2V5PXtpbmRleH1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBzcGFjZS14LTQgcnRsOnNwYWNlLXgtcmV2ZXJzZVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8QmFkZ2VcbiAgICAgICAgICAgICAgICAgIG5hbWU9e1wiMFwiICsgKGluZGV4ICsgMSl9XG4gICAgICAgICAgICAgICAgICBjb2xvcj17IWluZGV4ID8gXCJyZWRcIiA6IGluZGV4ID09IDEgPyBcImluZGlnb1wiIDogXCJncmVlblwifVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tZWRpdW0gdGV4dC1uZXV0cmFsLTcwMCBkYXJrOnRleHQtbmV1dHJhbC0zMDBcIj5cbiAgICAgICAgICAgICAgICAgIHtpdGVtfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIClcbiAgICAgICAgICApfVxuICAgICAgICA8L3VsPlxuICAgICAgICA8QWRkU3Vic2NyaWJlckZvcm0gY2xhc3NOYW1lPVwibXQtMTAgcmVsYXRpdmUgbWF4LXctc21cIiAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtZ3Jvd1wiPlxuICAgICAgICA8TXlJbWFnZVxuICAgICAgICAgIGFsdD1cInN1YnNjXCJcbiAgICAgICAgICBzaXplcz1cIihtYXgtd2lkdGg6IDc2OHB4KSAxMDB2dywgNTB2d1wiXG4gICAgICAgICAgc3JjPXtOQ19TSVRFX1NFVFRJTkdTLm5ld3NsZXR0ZXJfc2VjdGlvbi5yaWdodF9pbWFnZX1cbiAgICAgICAgICB3aWR0aD17MTQ1MH1cbiAgICAgICAgICBoZWlnaHQ9ezYzOH1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgU2VjdGlvblN1YnNjcmliZTI7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJCYWRnZSIsIk15SW1hZ2UiLCJOQ19TSVRFX1NFVFRJTkdTIiwiQWRkU3Vic2NyaWJlckZvcm0iLCJTZWN0aW9uU3Vic2NyaWJlMiIsImNsYXNzTmFtZSIsIm5ld3NsZXR0ZXJfc2VjdGlvbiIsImVuYWJsZSIsImRpdiIsImgyIiwidGl0bGUiLCJzcGFuIiwiZGVzY3JpcHRpb24iLCJ1bCIsImZlYXR1cmVzX2xpc3QiLCJtYXAiLCJpdGVtIiwiaW5kZXgiLCJsaSIsIm5hbWUiLCJjb2xvciIsImFsdCIsInNpemVzIiwic3JjIiwicmlnaHRfaW1hZ2UiLCJ3aWR0aCIsImhlaWdodCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/SectionSubscribe2/SectionSubscribe2.tsx\n");

/***/ })

};
;