"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[932],{"./node_modules/@angular/material/fesm2022/icon.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{An:()=>MatIcon,m_:()=>MatIconModule});var core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),fesm2022_core=__webpack_require__("./node_modules/@angular/material/fesm2022/core.mjs"),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),of=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/of.js"),Observable=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Observable.js"),isFunction=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/isFunction.js");var forkJoin=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/forkJoin.js"),Subscription=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subscription.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),catchError=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),finalize=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/finalize.js"),share=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/share.js"),take=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js"),http=__webpack_require__("./node_modules/@angular/common/fesm2022/http.mjs"),platform_browser=__webpack_require__("./node_modules/@angular/platform-browser/fesm2022/platform-browser.mjs");const _c0=["*"];let policy;function trustedHTMLFromString(html){return function getPolicy(){if(void 0===policy&&(policy=null,"undefined"!=typeof window)){const ttWindow=window;void 0!==ttWindow.trustedTypes&&(policy=ttWindow.trustedTypes.createPolicy("angular#components",{createHTML:s=>s}))}return policy}()?.createHTML(html)||html}function getMatIconNameNotFoundError(iconName){return Error(`Unable to find icon with the name "${iconName}"`)}function getMatIconFailedToSanitizeUrlError(url){return Error(`The URL provided to MatIconRegistry was not trusted as a resource URL via Angular's DomSanitizer. Attempted URL was "${url}".`)}function getMatIconFailedToSanitizeLiteralError(literal){return Error(`The literal provided to MatIconRegistry was not trusted as safe HTML by Angular's DomSanitizer. Attempted literal was "${literal}".`)}class SvgIconConfig{constructor(url,svgText,options){this.url=url,this.svgText=svgText,this.options=options}}class MatIconRegistry{constructor(_httpClient,_sanitizer,document,_errorHandler){this._httpClient=_httpClient,this._sanitizer=_sanitizer,this._errorHandler=_errorHandler,this._svgIconConfigs=new Map,this._iconSetConfigs=new Map,this._cachedIconsByUrl=new Map,this._inProgressUrlFetches=new Map,this._fontCssClassesByAlias=new Map,this._resolvers=[],this._defaultFontSetClass=["material-icons","mat-ligature-font"],this._document=document}addSvgIcon(iconName,url,options){return this.addSvgIconInNamespace("",iconName,url,options)}addSvgIconLiteral(iconName,literal,options){return this.addSvgIconLiteralInNamespace("",iconName,literal,options)}addSvgIconInNamespace(namespace,iconName,url,options){return this._addSvgIconConfig(namespace,iconName,new SvgIconConfig(url,null,options))}addSvgIconResolver(resolver){return this._resolvers.push(resolver),this}addSvgIconLiteralInNamespace(namespace,iconName,literal,options){const cleanLiteral=this._sanitizer.sanitize(core.SecurityContext.HTML,literal);if(!cleanLiteral)throw getMatIconFailedToSanitizeLiteralError(literal);const trustedLiteral=trustedHTMLFromString(cleanLiteral);return this._addSvgIconConfig(namespace,iconName,new SvgIconConfig("",trustedLiteral,options))}addSvgIconSet(url,options){return this.addSvgIconSetInNamespace("",url,options)}addSvgIconSetLiteral(literal,options){return this.addSvgIconSetLiteralInNamespace("",literal,options)}addSvgIconSetInNamespace(namespace,url,options){return this._addSvgIconSetConfig(namespace,new SvgIconConfig(url,null,options))}addSvgIconSetLiteralInNamespace(namespace,literal,options){const cleanLiteral=this._sanitizer.sanitize(core.SecurityContext.HTML,literal);if(!cleanLiteral)throw getMatIconFailedToSanitizeLiteralError(literal);const trustedLiteral=trustedHTMLFromString(cleanLiteral);return this._addSvgIconSetConfig(namespace,new SvgIconConfig("",trustedLiteral,options))}registerFontClassAlias(alias,classNames=alias){return this._fontCssClassesByAlias.set(alias,classNames),this}classNameForFontAlias(alias){return this._fontCssClassesByAlias.get(alias)||alias}setDefaultFontSetClass(...classNames){return this._defaultFontSetClass=classNames,this}getDefaultFontSetClass(){return this._defaultFontSetClass}getSvgIconFromUrl(safeUrl){const url=this._sanitizer.sanitize(core.SecurityContext.RESOURCE_URL,safeUrl);if(!url)throw getMatIconFailedToSanitizeUrlError(safeUrl);const cachedIcon=this._cachedIconsByUrl.get(url);return cachedIcon?(0,of.of)(cloneSvg(cachedIcon)):this._loadSvgIconFromConfig(new SvgIconConfig(safeUrl,null)).pipe((0,tap.M)((svg=>this._cachedIconsByUrl.set(url,svg))),(0,map.T)((svg=>cloneSvg(svg))))}getNamedSvgIcon(name,namespace=""){const key=iconKey(namespace,name);let config=this._svgIconConfigs.get(key);if(config)return this._getSvgFromConfig(config);if(config=this._getIconConfigFromResolvers(namespace,name),config)return this._svgIconConfigs.set(key,config),this._getSvgFromConfig(config);const iconSetConfigs=this._iconSetConfigs.get(namespace);return iconSetConfigs?this._getSvgFromIconSetConfigs(name,iconSetConfigs):function throwError(errorOrErrorFactory,scheduler){var errorFactory=(0,isFunction.T)(errorOrErrorFactory)?errorOrErrorFactory:function(){return errorOrErrorFactory},init=function(subscriber){return subscriber.error(errorFactory())};return new Observable.c(scheduler?function(subscriber){return scheduler.schedule(init,0,subscriber)}:init)}(getMatIconNameNotFoundError(key))}ngOnDestroy(){this._resolvers=[],this._svgIconConfigs.clear(),this._iconSetConfigs.clear(),this._cachedIconsByUrl.clear()}_getSvgFromConfig(config){return config.svgText?(0,of.of)(cloneSvg(this._svgElementFromConfig(config))):this._loadSvgIconFromConfig(config).pipe((0,map.T)((svg=>cloneSvg(svg))))}_getSvgFromIconSetConfigs(name,iconSetConfigs){const namedIcon=this._extractIconWithNameFromAnySet(name,iconSetConfigs);if(namedIcon)return(0,of.of)(namedIcon);const iconSetFetchRequests=iconSetConfigs.filter((iconSetConfig=>!iconSetConfig.svgText)).map((iconSetConfig=>this._loadSvgIconSetFromConfig(iconSetConfig).pipe((0,catchError.W)((err=>{const errorMessage=`Loading icon set URL: ${this._sanitizer.sanitize(core.SecurityContext.RESOURCE_URL,iconSetConfig.url)} failed: ${err.message}`;return this._errorHandler.handleError(new Error(errorMessage)),(0,of.of)(null)})))));return(0,forkJoin.p)(iconSetFetchRequests).pipe((0,map.T)((()=>{const foundIcon=this._extractIconWithNameFromAnySet(name,iconSetConfigs);if(!foundIcon)throw getMatIconNameNotFoundError(name);return foundIcon})))}_extractIconWithNameFromAnySet(iconName,iconSetConfigs){for(let i=iconSetConfigs.length-1;i>=0;i--){const config=iconSetConfigs[i];if(config.svgText&&config.svgText.toString().indexOf(iconName)>-1){const svg=this._svgElementFromConfig(config),foundIcon=this._extractSvgIconFromSet(svg,iconName,config.options);if(foundIcon)return foundIcon}}return null}_loadSvgIconFromConfig(config){return this._fetchIcon(config).pipe((0,tap.M)((svgText=>config.svgText=svgText)),(0,map.T)((()=>this._svgElementFromConfig(config))))}_loadSvgIconSetFromConfig(config){return config.svgText?(0,of.of)(null):this._fetchIcon(config).pipe((0,tap.M)((svgText=>config.svgText=svgText)))}_extractSvgIconFromSet(iconSet,iconName,options){const iconSource=iconSet.querySelector(`[id="${iconName}"]`);if(!iconSource)return null;const iconElement=iconSource.cloneNode(!0);if(iconElement.removeAttribute("id"),"svg"===iconElement.nodeName.toLowerCase())return this._setSvgAttributes(iconElement,options);if("symbol"===iconElement.nodeName.toLowerCase())return this._setSvgAttributes(this._toSvgElement(iconElement),options);const svg=this._svgElementFromString(trustedHTMLFromString("<svg></svg>"));return svg.appendChild(iconElement),this._setSvgAttributes(svg,options)}_svgElementFromString(str){const div=this._document.createElement("DIV");div.innerHTML=str;const svg=div.querySelector("svg");if(!svg)throw Error("<svg> tag not found");return svg}_toSvgElement(element){const svg=this._svgElementFromString(trustedHTMLFromString("<svg></svg>")),attributes=element.attributes;for(let i=0;i<attributes.length;i++){const{name,value}=attributes[i];"id"!==name&&svg.setAttribute(name,value)}for(let i=0;i<element.childNodes.length;i++)element.childNodes[i].nodeType===this._document.ELEMENT_NODE&&svg.appendChild(element.childNodes[i].cloneNode(!0));return svg}_setSvgAttributes(svg,options){return svg.setAttribute("fit",""),svg.setAttribute("height","100%"),svg.setAttribute("width","100%"),svg.setAttribute("preserveAspectRatio","xMidYMid meet"),svg.setAttribute("focusable","false"),options&&options.viewBox&&svg.setAttribute("viewBox",options.viewBox),svg}_fetchIcon(iconConfig){const{url:safeUrl,options}=iconConfig,withCredentials=options?.withCredentials??!1;if(!this._httpClient)throw function getMatIconNoHttpProviderError(){return Error("Could not find HttpClient for use with Angular Material icons. Please add provideHttpClient() to your providers.")}();if(null==safeUrl)throw Error(`Cannot fetch icon from URL "${safeUrl}".`);const url=this._sanitizer.sanitize(core.SecurityContext.RESOURCE_URL,safeUrl);if(!url)throw getMatIconFailedToSanitizeUrlError(safeUrl);const inProgressFetch=this._inProgressUrlFetches.get(url);if(inProgressFetch)return inProgressFetch;const req=this._httpClient.get(url,{responseType:"text",withCredentials}).pipe((0,map.T)((svg=>trustedHTMLFromString(svg))),(0,finalize.j)((()=>this._inProgressUrlFetches.delete(url))),(0,share.u)());return this._inProgressUrlFetches.set(url,req),req}_addSvgIconConfig(namespace,iconName,config){return this._svgIconConfigs.set(iconKey(namespace,iconName),config),this}_addSvgIconSetConfig(namespace,config){const configNamespace=this._iconSetConfigs.get(namespace);return configNamespace?configNamespace.push(config):this._iconSetConfigs.set(namespace,[config]),this}_svgElementFromConfig(config){if(!config.svgElement){const svg=this._svgElementFromString(config.svgText);this._setSvgAttributes(svg,config.options),config.svgElement=svg}return config.svgElement}_getIconConfigFromResolvers(namespace,name){for(let i=0;i<this._resolvers.length;i++){const result=this._resolvers[i](name,namespace);if(result)return(value=result).url&&value.options?new SvgIconConfig(result.url,null,result.options):new SvgIconConfig(result,null)}var value}static{this.ɵfac=function MatIconRegistry_Factory(__ngFactoryType__){return new(__ngFactoryType__||MatIconRegistry)(core["ɵɵinject"](http.Qq,8),core["ɵɵinject"](platform_browser.DomSanitizer),core["ɵɵinject"](common.DOCUMENT,8),core["ɵɵinject"](core.ErrorHandler))}}static{this.ɵprov=core["ɵɵdefineInjectable"]({token:MatIconRegistry,factory:MatIconRegistry.ɵfac,providedIn:"root"})}}("undefined"==typeof ngDevMode||ngDevMode)&&core["ɵsetClassMetadata"](MatIconRegistry,[{type:core.Injectable,args:[{providedIn:"root"}]}],(()=>[{type:http.Qq,decorators:[{type:core.Optional}]},{type:platform_browser.DomSanitizer},{type:void 0,decorators:[{type:core.Optional},{type:core.Inject,args:[common.DOCUMENT]}]},{type:core.ErrorHandler}]),null);new core.Optional,new core.SkipSelf,new core.Optional,http.Qq,platform_browser.DomSanitizer,core.ErrorHandler,new core.Optional,common.DOCUMENT;function cloneSvg(svg){return svg.cloneNode(!0)}function iconKey(namespace,name){return namespace+":"+name}const MAT_ICON_DEFAULT_OPTIONS=new core.InjectionToken("MAT_ICON_DEFAULT_OPTIONS"),MAT_ICON_LOCATION=new core.InjectionToken("mat-icon-location",{providedIn:"root",factory:function MAT_ICON_LOCATION_FACTORY(){const _document=(0,core.inject)(common.DOCUMENT),_location=_document?_document.location:null;return{getPathname:()=>_location?_location.pathname+_location.search:""}}});const funcIriAttributes=["clip-path","color-profile","src","cursor","fill","filter","marker","marker-start","marker-mid","marker-end","mask","stroke"],funcIriAttributeSelector=funcIriAttributes.map((attr=>`[${attr}]`)).join(", "),funcIriPattern=/^url\(['"]?#(.*?)['"]?\)$/;class MatIcon{get color(){return this._color||this._defaultColor}set color(value){this._color=value}get svgIcon(){return this._svgIcon}set svgIcon(value){value!==this._svgIcon&&(value?this._updateSvgIcon(value):this._svgIcon&&this._clearSvgElement(),this._svgIcon=value)}get fontSet(){return this._fontSet}set fontSet(value){const newValue=this._cleanupFontValue(value);newValue!==this._fontSet&&(this._fontSet=newValue,this._updateFontIconClasses())}get fontIcon(){return this._fontIcon}set fontIcon(value){const newValue=this._cleanupFontValue(value);newValue!==this._fontIcon&&(this._fontIcon=newValue,this._updateFontIconClasses())}constructor(_elementRef,_iconRegistry,ariaHidden,_location,_errorHandler,defaults){this._elementRef=_elementRef,this._iconRegistry=_iconRegistry,this._location=_location,this._errorHandler=_errorHandler,this.inline=!1,this._previousFontSetClass=[],this._currentIconFetch=Subscription.yU.EMPTY,defaults&&(defaults.color&&(this.color=this._defaultColor=defaults.color),defaults.fontSet&&(this.fontSet=defaults.fontSet)),ariaHidden||_elementRef.nativeElement.setAttribute("aria-hidden","true")}_splitIconName(iconName){if(!iconName)return["",""];const parts=iconName.split(":");switch(parts.length){case 1:return["",parts[0]];case 2:return parts;default:throw Error(`Invalid icon name: "${iconName}"`)}}ngOnInit(){this._updateFontIconClasses()}ngAfterViewChecked(){const cachedElements=this._elementsWithExternalReferences;if(cachedElements&&cachedElements.size){const newPath=this._location.getPathname();newPath!==this._previousPath&&(this._previousPath=newPath,this._prependPathToReferences(newPath))}}ngOnDestroy(){this._currentIconFetch.unsubscribe(),this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear()}_usingFontIcon(){return!this.svgIcon}_setSvgElement(svg){this._clearSvgElement();const path=this._location.getPathname();this._previousPath=path,this._cacheChildrenWithExternalReferences(svg),this._prependPathToReferences(path),this._elementRef.nativeElement.appendChild(svg)}_clearSvgElement(){const layoutElement=this._elementRef.nativeElement;let childCount=layoutElement.childNodes.length;for(this._elementsWithExternalReferences&&this._elementsWithExternalReferences.clear();childCount--;){const child=layoutElement.childNodes[childCount];1===child.nodeType&&"svg"!==child.nodeName.toLowerCase()||child.remove()}}_updateFontIconClasses(){if(!this._usingFontIcon())return;const elem=this._elementRef.nativeElement,fontSetClasses=(this.fontSet?this._iconRegistry.classNameForFontAlias(this.fontSet).split(/ +/):this._iconRegistry.getDefaultFontSetClass()).filter((className=>className.length>0));this._previousFontSetClass.forEach((className=>elem.classList.remove(className))),fontSetClasses.forEach((className=>elem.classList.add(className))),this._previousFontSetClass=fontSetClasses,this.fontIcon===this._previousFontIconClass||fontSetClasses.includes("mat-ligature-font")||(this._previousFontIconClass&&elem.classList.remove(this._previousFontIconClass),this.fontIcon&&elem.classList.add(this.fontIcon),this._previousFontIconClass=this.fontIcon)}_cleanupFontValue(value){return"string"==typeof value?value.trim().split(" ")[0]:value}_prependPathToReferences(path){const elements=this._elementsWithExternalReferences;elements&&elements.forEach(((attrs,element)=>{attrs.forEach((attr=>{element.setAttribute(attr.name,`url('${path}#${attr.value}')`)}))}))}_cacheChildrenWithExternalReferences(element){const elementsWithFuncIri=element.querySelectorAll(funcIriAttributeSelector),elements=this._elementsWithExternalReferences=this._elementsWithExternalReferences||new Map;for(let i=0;i<elementsWithFuncIri.length;i++)funcIriAttributes.forEach((attr=>{const elementWithReference=elementsWithFuncIri[i],value=elementWithReference.getAttribute(attr),match=value?value.match(funcIriPattern):null;if(match){let attributes=elements.get(elementWithReference);attributes||(attributes=[],elements.set(elementWithReference,attributes)),attributes.push({name:attr,value:match[1]})}}))}_updateSvgIcon(rawName){if(this._svgNamespace=null,this._svgName=null,this._currentIconFetch.unsubscribe(),rawName){const[namespace,iconName]=this._splitIconName(rawName);namespace&&(this._svgNamespace=namespace),iconName&&(this._svgName=iconName),this._currentIconFetch=this._iconRegistry.getNamedSvgIcon(iconName,namespace).pipe((0,take.s)(1)).subscribe((svg=>this._setSvgElement(svg)),(err=>{const errorMessage=`Error retrieving icon ${namespace}:${iconName}! ${err.message}`;this._errorHandler.handleError(new Error(errorMessage))}))}}static{this.ɵfac=function MatIcon_Factory(__ngFactoryType__){return new(__ngFactoryType__||MatIcon)(core["ɵɵdirectiveInject"](core.ElementRef),core["ɵɵdirectiveInject"](MatIconRegistry),core["ɵɵinjectAttribute"]("aria-hidden"),core["ɵɵdirectiveInject"](MAT_ICON_LOCATION),core["ɵɵdirectiveInject"](core.ErrorHandler),core["ɵɵdirectiveInject"](MAT_ICON_DEFAULT_OPTIONS,8))}}static{this.ɵcmp=core["ɵɵdefineComponent"]({type:MatIcon,selectors:[["mat-icon"]],hostAttrs:["role","img",1,"mat-icon","notranslate"],hostVars:10,hostBindings:function MatIcon_HostBindings(rf,ctx){2&rf&&(core["ɵɵattribute"]("data-mat-icon-type",ctx._usingFontIcon()?"font":"svg")("data-mat-icon-name",ctx._svgName||ctx.fontIcon)("data-mat-icon-namespace",ctx._svgNamespace||ctx.fontSet)("fontIcon",ctx._usingFontIcon()?ctx.fontIcon:null),core["ɵɵclassMap"](ctx.color?"mat-"+ctx.color:""),core["ɵɵclassProp"]("mat-icon-inline",ctx.inline)("mat-icon-no-color","primary"!==ctx.color&&"accent"!==ctx.color&&"warn"!==ctx.color))},inputs:{color:"color",inline:[2,"inline","inline",core.booleanAttribute],svgIcon:"svgIcon",fontSet:"fontSet",fontIcon:"fontIcon"},exportAs:["matIcon"],standalone:!0,features:[core["ɵɵInputTransformsFeature"],core["ɵɵStandaloneFeature"]],ngContentSelectors:_c0,decls:1,vars:0,template:function MatIcon_Template(rf,ctx){1&rf&&(core["ɵɵprojectionDef"](),core["ɵɵprojection"](0))},styles:["mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}"],encapsulation:2,changeDetection:0})}}("undefined"==typeof ngDevMode||ngDevMode)&&core["ɵsetClassMetadata"](MatIcon,[{type:core.Component,args:[{template:"<ng-content></ng-content>",selector:"mat-icon",exportAs:"matIcon",host:{role:"img",class:"mat-icon notranslate","[class]":'color ? "mat-" + color : ""',"[attr.data-mat-icon-type]":'_usingFontIcon() ? "font" : "svg"',"[attr.data-mat-icon-name]":"_svgName || fontIcon","[attr.data-mat-icon-namespace]":"_svgNamespace || fontSet","[attr.fontIcon]":"_usingFontIcon() ? fontIcon : null","[class.mat-icon-inline]":"inline","[class.mat-icon-no-color]":'color !== "primary" && color !== "accent" && color !== "warn"'},encapsulation:core.ViewEncapsulation.None,changeDetection:core.ChangeDetectionStrategy.OnPush,standalone:!0,styles:["mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}"]}]}],(()=>[{type:core.ElementRef},{type:MatIconRegistry},{type:void 0,decorators:[{type:core.Attribute,args:["aria-hidden"]}]},{type:void 0,decorators:[{type:core.Inject,args:[MAT_ICON_LOCATION]}]},{type:core.ErrorHandler},{type:void 0,decorators:[{type:core.Optional},{type:core.Inject,args:[MAT_ICON_DEFAULT_OPTIONS]}]}]),{color:[{type:core.Input}],inline:[{type:core.Input,args:[{transform:core.booleanAttribute}]}],svgIcon:[{type:core.Input}],fontSet:[{type:core.Input}],fontIcon:[{type:core.Input}]});class MatIconModule{static{this.ɵfac=function MatIconModule_Factory(__ngFactoryType__){return new(__ngFactoryType__||MatIconModule)}}static{this.ɵmod=core["ɵɵdefineNgModule"]({type:MatIconModule,imports:[fesm2022_core.yE,MatIcon],exports:[MatIcon,fesm2022_core.yE]})}static{this.ɵinj=core["ɵɵdefineInjector"]({imports:[fesm2022_core.yE,fesm2022_core.yE]})}}("undefined"==typeof ngDevMode||ngDevMode)&&core["ɵsetClassMetadata"](MatIconModule,[{type:core.NgModule,args:[{imports:[fesm2022_core.yE,MatIcon],exports:[MatIcon,fesm2022_core.yE]}]}],null,null)},"./node_modules/rxjs/dist/esm5/internal/operators/catchError.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{W:()=>catchError});var _observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js"),_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"),_util_lift__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js");function catchError(selector){return(0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.N)((function(source,subscriber){var handledResult,innerSub=null,syncUnsub=!1;innerSub=source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__._)(subscriber,void 0,void 0,(function(err){handledResult=(0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_2__.Tg)(selector(err,catchError(selector)(source))),innerSub?(innerSub.unsubscribe(),innerSub=null,handledResult.subscribe(subscriber)):syncUnsub=!0}))),syncUnsub&&(innerSub.unsubscribe(),innerSub=null,handledResult.subscribe(subscriber))}))}}}]);