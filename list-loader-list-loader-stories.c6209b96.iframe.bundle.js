(self.webpackChunk=self.webpackChunk||[]).push([[982],{"./node_modules/css-loader/dist/runtime/api.js":module=>{"use strict";module.exports=function(cssWithMappingToString){var list=[];return list.toString=function toString(){return this.map((function(item){var content="",needLayer=void 0!==item[5];return item[4]&&(content+="@supports (".concat(item[4],") {")),item[2]&&(content+="@media ".concat(item[2]," {")),needLayer&&(content+="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {")),content+=cssWithMappingToString(item),needLayer&&(content+="}"),item[2]&&(content+="}"),item[4]&&(content+="}"),content})).join("")},list.i=function i(modules,media,dedupe,supports,layer){"string"==typeof modules&&(modules=[[null,modules,void 0]]);var alreadyImportedModules={};if(dedupe)for(var k=0;k<this.length;k++){var id=this[k][0];null!=id&&(alreadyImportedModules[id]=!0)}for(var _k=0;_k<modules.length;_k++){var item=[].concat(modules[_k]);dedupe&&alreadyImportedModules[item[0]]||(void 0!==layer&&(void 0===item[5]||(item[1]="@layer".concat(item[5].length>0?" ".concat(item[5]):""," {").concat(item[1],"}")),item[5]=layer),media&&(item[2]?(item[1]="@media ".concat(item[2]," {").concat(item[1],"}"),item[2]=media):item[2]=media),supports&&(item[4]?(item[1]="@supports (".concat(item[4],") {").concat(item[1],"}"),item[4]=supports):item[4]="".concat(supports)),list.push(item))}},list}},"./node_modules/css-loader/dist/runtime/noSourceMaps.js":module=>{"use strict";module.exports=function(i){return i[1]}},"./projects/story-book/src/list-loader/list-loader.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,default:()=>list_loader_stories,standard:()=>standard,withLabel:()=>withLabel,withLongLabel:()=>withLongLabel});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var list_loader_componentngResource=__webpack_require__("./projects/list-loader/src/list-loader.component.scss?ngResource"),list_loader_componentngResource_default=__webpack_require__.n(list_loader_componentngResource),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs");let NgxListLoaderComponent=class NgxListLoaderComponent{label;static propDecorators={label:[{type:core.Input}]}};NgxListLoaderComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"ngx-list-loader",template:'<div class="container">\n    <div class="spinner">\n        <div class="bounce1"></div>\n        <div class="bounce2"></div>\n        <div class="bounce3"></div>\n    </div>\n    @if (label) {\n        <div class="label">{{ label }}</div>\n    }\n</div>\n',changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:[list_loader_componentngResource_default()]})],NgxListLoaderComponent);const list_loader_stories={title:"Components/List Loader",component:NgxListLoaderComponent,tags:["autodocs"],parameters:{docs:{description:{component:"The `NgxListLoaderComponent` is used to display a loading indicator when fetching large amounts of data. It includes a spinner animation and an optional label for context."}}},argTypes:{label:{description:"The label text displayed alongside the loader.",control:{type:"text"},table:{type:{summary:"string"},defaultValue:{summary:""}}}}},standard={parameters:{docs:{description:{story:"Displays the default loader without a label. This is useful when no additional context is needed."}}},args:{label:""}},withLabel={parameters:{docs:{description:{story:"Shows the loader with a custom label. This can be used to provide additional information or context while the data is loading."}}},args:{label:"Loading data, please wait..."}},withLongLabel={parameters:{docs:{description:{story:"Displays the loader with a long label to test how it handles extended text. This is useful to ensure that the layout accommodates longer messages."}}},args:{label:"This is a very long label that we use to test how the loader handles extended text. It should wrap or truncate gracefully depending on the design."}},__namedExportsOrder=["standard","withLabel","withLongLabel"];standard.parameters={...standard.parameters,docs:{...standard.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    docs: {\n      description: {\n        story: 'Displays the default loader without a label. This is useful when no additional context is needed.'\n      }\n    }\n  },\n  args: {\n    label: ''\n  }\n}",...standard.parameters?.docs?.source}}},withLabel.parameters={...withLabel.parameters,docs:{...withLabel.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    docs: {\n      description: {\n        story: 'Shows the loader with a custom label. This can be used to provide additional information or context while the data is loading.'\n      }\n    }\n  },\n  args: {\n    label: 'Loading data, please wait...'\n  }\n}",...withLabel.parameters?.docs?.source}}},withLongLabel.parameters={...withLongLabel.parameters,docs:{...withLongLabel.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    docs: {\n      description: {\n        story: 'Displays the loader with a long label to test how it handles extended text. This is useful to ensure that the layout accommodates longer messages.'\n      }\n    }\n  },\n  args: {\n    label: 'This is a very long label that we use to test how the loader handles extended text. It should wrap or truncate gracefully depending on the design.'\n  }\n}",...withLongLabel.parameters?.docs?.source}}}},"./projects/list-loader/src/list-loader.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,':host {\n  display: flex;\n  font-family: "Roboto";\n  flex: 1 1 auto;\n  height: 100%;\n  align-items: center;\n}\n:host > .container {\n  flex: 1 1 auto;\n  display: flex;\n  flex-direction: column;\n  margin-bottom: 1rem;\n  margin-top: 1rem;\n}\n:host > .container > .spinner {\n  margin: auto;\n  width: 60px;\n  text-align: center;\n  display: flex;\n  justify-content: space-around;\n}\n:host > .container > .spinner > div {\n  width: 10px;\n  height: 10px;\n  border-radius: 100%;\n  display: inline-block;\n  animation: sk-bouncedelay 1.4s infinite ease-in-out both;\n}\n:host > .container > .spinner > .bounce1 {\n  animation-delay: -0.32s;\n}\n:host > .container > .spinner > .bounce2 {\n  animation-delay: -0.16s;\n}\n@keyframes sk-bouncedelay {\n  0%, 80%, 100% {\n    transform: scale(0);\n  }\n  40% {\n    transform: scale(1);\n  }\n}\n:host > .container > .label {\n  text-align: center;\n  font-size: 0.9rem;\n  margin-top: 1rem;\n}',""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);