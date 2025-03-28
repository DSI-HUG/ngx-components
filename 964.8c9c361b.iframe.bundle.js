(self.webpackChunkngx_components_workspace=self.webpackChunkngx_components_workspace||[]).push([[964],{"./projects/core/src/custom-operators.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{RX:()=>subscribeWith,x1:()=>filterMap});var rxjs__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),rxjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),rxjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/from.js"),rxjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js"),rxjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mergeWith.js");const filterMap=job=>source$=>source$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_1__.T)((value=>job(value))),(source$=>source$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_0__.p)((v=>void 0!==v)),(0,rxjs__WEBPACK_IMPORTED_MODULE_1__.T)((v=>v))))),subscribeWith=(...others)=>source$=>{const others$=1===(args=others).length&&Array.isArray(args[0])?args[0]:args;var args;return(0,rxjs__WEBPACK_IMPORTED_MODULE_2__.H)(others$).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_3__.U)(),(0,rxjs__WEBPACK_IMPORTED_MODULE_0__.p)((()=>!1)),(0,rxjs__WEBPACK_IMPORTED_MODULE_1__.T)((()=>{})),(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.X)(source$))}},"./projects/numeric-stepper/src/numeric-stepper.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>NgxNumericStepperComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),numeric_stepper_componentngResource=__webpack_require__("./projects/numeric-stepper/src/numeric-stepper.component.scss?ngResource"),numeric_stepper_componentngResource_default=__webpack_require__.n(numeric_stepper_componentngResource);var NgxNumericStepperComponent_1,coercion=__webpack_require__("./node_modules/@angular/cdk/fesm2022/coercion.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs_interop=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),custom_operators=__webpack_require__("./projects/core/src/custom-operators.ts"),Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),ReplaySubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/ReplaySubject.js"),timer=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js"),map=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),shareReplay=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js"),debounceTime=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/debounceTime.js"),withLatestFrom=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/withLatestFrom.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js"),switchMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),fromEvent=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/fromEvent.js"),mergeWith=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mergeWith.js"),startWith=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/startWith.js"),delay=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/delay.js"),combineLatestWith=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/combineLatestWith.js");let NgxNumericStepperComponent=class NgxNumericStepperComponent{static{NgxNumericStepperComponent_1=this}static TYPE_ERROR='Input element on the same mat-form-field must be type="number". With other input type, use increment or decrement events and implement your proper functions to change the value.';static STEP_FN_ERROR="Input element on the same mat-form-field must implement stepDown/stepUp functions.";static INPUT_ERROR='To use the automatic binding, you must specify the input field with a matInput reference. [input]="matInputRef"';layout="vertical";increment=new core.EventEmitter;decrement=new core.EventEmitter;input;set arrowIcons(value){this._arrowIcons=(0,coercion.he)(value)}get arrowIcons(){return this._arrowIcons}set showOnInit(value){this._showOnInit=(0,coercion.he)(value)}get showOnInit(){return this._showOnInit}hover=null;leftUp=void 0;leftDown=void 0;topUp=void 0;topDown=void 0;leftShadow=void 0;topShadow=void 0;widthShadow=void 0;heightShadow=void 0;disableUp=!1;disableDown=!1;clickArrow$=new Subject.B;show$=new ReplaySubject.m(1);elementRef=(0,core.inject)(core.ElementRef);changeDetectorRef=(0,core.inject)(core.ChangeDetectorRef);destroyRef=(0,core.inject)(core.DestroyRef);validateArrows$=new Subject.B;_arrowIcons=!1;_showOnInit=!1;arrowSize=32;parentAppearance;ngOnInit(){const calcPositions=(inputElement,formFieldElement,containerElement)=>{const containerBounds=containerElement?.getBoundingClientRect(),formFieldBounds=formFieldElement?.getBoundingClientRect()??{},inputBounds=inputElement?.getBoundingClientRect()??formFieldBounds,bounds=this.elementRef.nativeElement.getBoundingClientRect();if(this.validateArrows$.next(),formFieldElement?.setAttribute("hover",""),"horizontal"===this.layout){const height=containerBounds?.height||formFieldBounds.height;this.heightShadow=Math.min(54,height)+2,this.topShadow=(containerBounds?.top??inputBounds.top+(inputBounds.height-this.heightShadow)/2-5)-bounds.top,this.leftDown=this.leftShadow=formFieldBounds.left-bounds.left-28,this.leftUp=formFieldBounds.right-bounds.left,this.widthShadow=this.leftUp-this.leftDown+28,"FILL"===this.parentAppearance&&(this.heightShadow-=2),this.topUp=this.topDown=inputBounds.top+(inputBounds.height-this.arrowSize)/2-bounds.top}else"horizontal-inlay"===this.layout?(this.heightShadow=Math.min(54,containerBounds?.height||formFieldBounds.height)+4,this.topShadow=containerBounds?.top??inputBounds.top+(inputBounds.height-this.heightShadow)/2-5-bounds.top,this.leftDown=this.leftShadow=formFieldBounds.left-bounds.left,this.leftUp=formFieldBounds.right-bounds.left-28,this.widthShadow=this.leftUp-this.leftDown+28,"FILL"===this.parentAppearance&&(this.heightShadow-=2),this.topUp=this.topDown=inputBounds.top+(inputBounds.height-this.arrowSize)/2-bounds.top):(this.heightShadow=90,this.topShadow=inputBounds.top-bounds.top+(inputBounds.height-this.heightShadow)/2,this.leftShadow=(containerBounds?.left??formFieldBounds.left)-bounds.left,this.topUp=this.topShadow,this.topDown=this.topShadow+this.heightShadow-this.arrowSize,this.widthShadow=containerBounds?.width||formFieldBounds.width,this.leftUp=this.leftDown=formFieldBounds.left+(formFieldBounds.width-this.arrowSize)/2-bounds.left);this.changeDetectorRef.markForCheck()},linkedElements$=(0,timer.O)(100).pipe((0,map.T)((()=>{let formFieldElement,containerElement,inputElement,parentElement=this.elementRef.nativeElement.parentElement;for(;parentElement&&(("MAT-FORM-FIELD"===parentElement.tagName||parentElement.hasAttribute("ngx-numeric-stepper-form-field"))&&(formFieldElement=parentElement),parentElement.hasAttribute("ngx-numeric-stepper-container")&&(containerElement=parentElement),!containerElement||!formFieldElement);)parentElement=parentElement.parentElement;return formFieldElement&&(formFieldElement.setAttribute("ngx-numeric-stepper-form-field",this.layout),this.parentAppearance=formFieldElement.getAttribute("appearance")?.toUpperCase()),formFieldElement?(inputElement=formFieldElement.getElementsByTagName("INPUT")?.[0]||null,inputElement||console.error("ngx-numeric-stepper work only inside a mat-form-field or a [ngx-numeric-stepper-form-field] element containing an input element")):console.error("ngx-numeric-stepper work only inside a mat-form-field or a [ngx-numeric-stepper-form-field] element"),[inputElement,formFieldElement,containerElement]})),(0,filter.p)((([inputElement,formFieldElement])=>!!formFieldElement&&!!inputElement)),(0,shareReplay.t)({bufferSize:1,refCount:!1})),step=(inputElement,event,fn)=>{if(this[event].observed)this[event].emit();else{if("number"!==inputElement?.type)throw new Error(NgxNumericStepperComponent_1.TYPE_ERROR);if(!inputElement[fn])throw new Error(NgxNumericStepperComponent_1.STEP_FN_ERROR);if(!this.input?.ngControl?.control)throw new Error(NgxNumericStepperComponent_1.INPUT_ERROR);inputElement[fn](),this.input.ngControl.control.setValue(+inputElement.value)}this.validateArrows$.next()},step$=this.clickArrow$.pipe((0,debounceTime.B)(10),(0,withLatestFrom.E)(linkedElements$),(0,tap.M)((([isUp,[inputElement]])=>{isUp&&!this.disableUp&&inputElement&&step(inputElement,"increment","stepUp"),isUp||this.disableDown||!inputElement||step(inputElement,"decrement","stepDown")})),(0,shareReplay.t)({bufferSize:1,refCount:!1})),valueChange$=linkedElements$.pipe((0,custom_operators.x1)((([inputElement])=>inputElement)),(0,switchMap.n)((inputElement=>(0,fromEvent.R)(inputElement,"input").pipe((0,mergeWith.X)(step$,(0,fromEvent.R)(inputElement,"paste"),(0,fromEvent.R)(inputElement,"keypress"))))),(0,debounceTime.B)(50),(0,startWith.Z)(void 0));linkedElements$.pipe((0,switchMap.n)((([inputElement,formFieldElement,containerElement])=>{const element=containerElement??formFieldElement;return element?(0,fromEvent.R)(element,"mouseenter").pipe((0,switchMap.n)((()=>valueChange$)),(0,mergeWith.X)(this.show$.pipe((0,delay.c)(200))),(0,tap.M)((()=>calcPositions(inputElement,formFieldElement,containerElement))),(0,switchMap.n)((()=>(0,fromEvent.R)(element,"mouseleave"))),(0,delay.c)(400),(0,tap.M)((()=>{formFieldElement?.removeAttribute("hover")}))):[]})),(0,rxjs_interop.pQ)(this.destroyRef)).subscribe(),linkedElements$.pipe((0,custom_operators.x1)((([_,formFieldElement])=>formFieldElement)),(0,switchMap.n)((formFieldElement=>(0,fromEvent.R)(formFieldElement,"keydown"))),(0,filter.p)((event=>{const keyCode=event.code;return("ArrowUp"===keyCode||"ArrowDown"===keyCode)&&(this.clickArrow$.next("ArrowUp"===keyCode),!0)})),(0,rxjs_interop.pQ)(this.destroyRef)).subscribe((event=>(event.preventDefault(),!1))),linkedElements$.pipe((0,combineLatestWith.v)(this.validateArrows$),(0,custom_operators.x1)((([[inputElement]])=>inputElement)),(0,debounceTime.B)(1),(0,rxjs_interop.pQ)(this.destroyRef)).subscribe((inputElement=>{if(inputElement.disabled)this.disableDown=!0,this.disableUp=!0;else{const min=inputElement.min;this.disableDown=""!==min&&!isNaN(+min)&&+inputElement.value<=+min;const max=inputElement.max;this.disableUp=""!==max&&!isNaN(+max)&&+inputElement.value>=+max}this.changeDetectorRef.markForCheck()})),step$.pipe((0,rxjs_interop.pQ)(this.destroyRef)).subscribe(),this.showOnInit&&this.show$.next()}static propDecorators={layout:[{type:core.HostBinding,args:["attr.layout"]},{type:core.Input}],increment:[{type:core.Output}],decrement:[{type:core.Output}],input:[{type:core.Input}],arrowIcons:[{type:core.Input}],showOnInit:[{type:core.Input}],hover:[{type:core.HostBinding,args:["attr.hover"]}]}};NgxNumericStepperComponent=NgxNumericStepperComponent_1=(0,tslib_es6.Cg)([(0,core.Component)({changeDetection:core.ChangeDetectionStrategy.OnPush,selector:"ngx-numeric-stepper",template:'@if (leftUp !== null) {\n    <mat-icon\n        class="arrow noselect increment"\n        [attr.disabled]="disableUp || null"\n        [style.left.px]="leftUp"\n        [style.top.px]="topUp"\n        (click)="clickArrow$.next(true)">\n        {{ (!arrowIcons && \'add\') || (layout === \'vertical\' && \'keyboard_arrow_up\') || \'keyboard_arrow_right\' }}\n    </mat-icon>\n}\n@if (leftDown !== null) {\n    <mat-icon\n        class="arrow noselect decrement"\n        [attr.disabled]="disableDown || null"\n        [style.left.px]="leftDown"\n        [style.top.px]="topDown"\n        (click)="clickArrow$.next(false)">\n        {{ (!arrowIcons && \'remove\') || (layout === \'vertical\' && \'keyboard_arrow_down\') || \'keyboard_arrow_left\' }}\n    </mat-icon>\n}\n@if (widthShadow !== null) {\n    <div\n        class="shadow"\n        [style.left.px]="leftShadow"\n        [style.width.px]="widthShadow"\n        [style.top.px]="topShadow"\n        [style.height.px]="heightShadow"></div>\n}\n',imports:[icon.An],encapsulation:core.ViewEncapsulation.None,styles:[numeric_stepper_componentngResource_default()]})],NgxNumericStepperComponent)},"./projects/numeric-stepper/src/numeric-stepper.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,'[ngx-numeric-stepper-container] {\n  width: max-content;\n}\n\n[ngx-numeric-stepper-container] .mat-mdc-form-field:hover .mdc-text-field--filled,\n[ngx-numeric-stepper-form-field]:hover .mdc-text-field--filled {\n  overflow: visible;\n  background-color: transparent;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field:hover .mdc-text-field--filled .mat-mdcform-field-focus-overlay,\n[ngx-numeric-stepper-container] .mat-mdc-form-field:hover .mdc-text-field--filled .mat-mdc-form-field-focus-overlay,\n[ngx-numeric-stepper-container] .mat-mdc-form-field:hover .mdc-text-field--filled .mdc-line-ripple,\n[ngx-numeric-stepper-form-field]:hover .mdc-text-field--filled .mat-mdcform-field-focus-overlay,\n[ngx-numeric-stepper-form-field]:hover .mdc-text-field--filled .mat-mdc-form-field-focus-overlay,\n[ngx-numeric-stepper-form-field]:hover .mdc-text-field--filled .mdc-line-ripple {\n  transition: opacity ease-out;\n  opacity: 0;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field:hover .mdc-text-field--filled .mat-mdc-form-field-flex,\n[ngx-numeric-stepper-form-field]:hover .mdc-text-field--filled .mat-mdc-form-field-flex {\n  background-color: transparent;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field:hover .mdc-text-field--filled .shadow,\n[ngx-numeric-stepper-form-field]:hover .mdc-text-field--filled .shadow {\n  background-color: rgb(245, 245, 245);\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field:hover .mat-mdc-form-field-subscript-wrapper.mat-mdc-form-field-bottom-align,\n[ngx-numeric-stepper-form-field]:hover .mat-mdc-form-field-subscript-wrapper.mat-mdc-form-field-bottom-align {\n  visibility: hidden;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field[ngx-numeric-stepper-form-field=vertical]:not(.disabled):hover .mdc-floating-label,\n[ngx-numeric-stepper-form-field][ngx-numeric-stepper-form-field=vertical]:not(.disabled):hover .mdc-floating-label {\n  opacity: 0 !important;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field[ngx-numeric-stepper-form-field=vertical]:not(.disabled):hover.mat-mdc-form-field-invalid .mat-mdc-form-field-subscript-wrapper,\n[ngx-numeric-stepper-form-field][ngx-numeric-stepper-form-field=vertical]:not(.disabled):hover.mat-mdc-form-field-invalid .mat-mdc-form-field-subscript-wrapper {\n  visibility: hidden;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field[ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled) input:not([ngx-input-autosize]),\n[ngx-numeric-stepper-form-field][ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled) input:not([ngx-input-autosize]) {\n  width: calc(100% - 64px);\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field[ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover:not([float-label=always]) .mdc-floating-label.mat-mdc-empty,\n[ngx-numeric-stepper-form-field][ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover:not([float-label=always]) .mdc-floating-label.mat-mdc-empty {\n  padding-left: 23px;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field[ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover[ngx-input-autosize-form-field] .mat-mdc-form-field-infix,\n[ngx-numeric-stepper-form-field][ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover[ngx-input-autosize-form-field] .mat-mdc-form-field-infix {\n  padding: 1em 23px;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field[ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover[ngx-input-autosize-form-field].mat-mdc-form-field-appearance-outline .mat-mdc-form-field-infix,\n[ngx-numeric-stepper-form-field][ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover[ngx-input-autosize-form-field].mat-mdc-form-field-appearance-outline .mat-mdc-form-field-infix {\n  padding: 1em 18px;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field[ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover:not([ngx-input-autosize-form-field]).mat-mdc-form-field-appearance-fill input,\n[ngx-numeric-stepper-form-field][ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover:not([ngx-input-autosize-form-field]).mat-mdc-form-field-appearance-fill input {\n  margin: 0 18px;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field .noselect,\n[ngx-numeric-stepper-form-field] .noselect {\n  -webkit-touch-callout: none;\n  /* iOS Safari */\n  -webkit-user-select: none;\n  /* Chrome/Safari/Opera */\n  /* Konqueror */\n  /* Firefox */\n  /* Internet Explorer/Edge */\n  user-select: none;\n  /* Non-prefixed version, currently\n  not supported by any browser */\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field *,\n[ngx-numeric-stepper-form-field] * {\n  transition: opacity 250ms ease-out;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field input::-webkit-inner-spin-button,\n[ngx-numeric-stepper-container] .mat-mdc-form-field input::-webkit-outer-spin-button,\n[ngx-numeric-stepper-form-field] input::-webkit-inner-spin-button,\n[ngx-numeric-stepper-form-field] input::-webkit-outer-spin-button {\n  -webkit-appearance: none !important;\n  margin: 0 !important;\n  -moz-appearance: textfield !important;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field .mat-mdc-input-element,\n[ngx-numeric-stepper-form-field] .mat-mdc-input-element {\n  text-align: center;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field[ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover .mat-mdc-floating-label,\n[ngx-numeric-stepper-container] .mat-mdc-form-field[ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover input,\n[ngx-numeric-stepper-form-field][ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover .mat-mdc-floating-label,\n[ngx-numeric-stepper-form-field][ngx-numeric-stepper-form-field=horizontal-inlay]:not(.disabled):hover input {\n  z-index: 10001;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover .arrow,\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover .shadow,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover .arrow,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover .shadow {\n  opacity: 1;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover .mdc-notched-outline__trailing,\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover .mdc-notched-outline__leading,\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover .mdc-notched-outline__notch,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover .mdc-notched-outline__trailing,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover .mdc-notched-outline__leading,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover .mdc-notched-outline__notch {\n  border: 0 !important;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover .mat-mdc-form-field-text-suffix,\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover .mat-mdc-form-field-text-prefix,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover .mat-mdc-form-field-text-suffix,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover .mat-mdc-form-field-text-prefix {\n  opacity: 0;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover .mat-mdc-floating-label,\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover input,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover .mat-mdc-floating-label,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover input {\n  z-index: 10003;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover input,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover input {\n  position: relative;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover .arrow,\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled):hover .shadow, [ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled)[hover] .arrow,\n[ngx-numeric-stepper-container] .mat-mdc-form-field:not(.disabled)[hover] .shadow,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover .arrow,\n[ngx-numeric-stepper-form-field]:not(.disabled):hover .shadow,\n[ngx-numeric-stepper-form-field]:not(.disabled)[hover] .arrow,\n[ngx-numeric-stepper-form-field]:not(.disabled)[hover] .shadow {\n  visibility: visible;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper {\n  z-index: 10002;\n  position: relative;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper .arrow,\n[ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper .shadow,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper .arrow,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper .shadow {\n  position: absolute;\n  visibility: hidden;\n  opacity: 0;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper .arrow,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper .arrow {\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  box-sizing: border-box;\n  z-index: 10004;\n  height: 32px;\n  width: 32px;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper .arrow[disabled=true],\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper .arrow[disabled=true] {\n  cursor: default;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper .shadow,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper .shadow {\n  border-radius: 4px;\n  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3);\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper .increment,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper .increment {\n  border-radius: 4px 4px 0 0;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper .decrement,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper .decrement {\n  border-radius: 0 0 4px 4px;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper[ngx-layout=horizontal] .increment, [ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper[ngx-layout=horizontal-inlay] .increment,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper[ngx-layout=horizontal] .increment,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper[ngx-layout=horizontal-inlay] .increment {\n  border-radius: 0 4px 4px 0;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper[ngx-layout=horizontal] .decrement, [ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper[ngx-layout=horizontal-inlay] .decrement,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper[ngx-layout=horizontal] .decrement,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper[ngx-layout=horizontal-inlay] .decrement {\n  border-radius: 4px 0 0 4px;\n}\n[ngx-numeric-stepper-container] .mat-mdc-form-field ngx-numeric-stepper .shadow::after,\n[ngx-numeric-stepper-form-field] ngx-numeric-stepper .shadow::after {\n  content: "";\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n}',""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);