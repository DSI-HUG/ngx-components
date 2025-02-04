(self.webpackChunkngx_components_workspace=self.webpackChunkngx_components_workspace||[]).push([[853],{"./projects/snackbar/src/snackbar.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Q:()=>NgxSnackbarComponent});var NgxSnackbarComponent_1,tslib__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_snackbar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./projects/snackbar/src/snackbar.component.scss?ngResource"),_snackbar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_9___default=__webpack_require__.n(_snackbar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_9__),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),rxjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js"),rxjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/delay.js"),rxjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/debounce.js"),rxjs__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js"),rxjs__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js");let NgxSnackbarComponent=class NgxSnackbarComponent{static{NgxSnackbarComponent_1=this}static INSTANCES=[];onAnimationDone=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.EventEmitter;delay=0;duration=0;outerContainerElement;elementRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef);host;marginTop=6;timestamp=+new Date;enterAnimationDuration=350;adaptAnimationDuration=225;leaveAnimationDuration=175;anchor;_alignments={};animate$=new rxjs__WEBPACK_IMPORTED_MODULE_1__.B;animate$sub;set alignment(value){this._alignments={bottom:!1,left:!1,right:!1,top:!1},value&&value.split(/\s+/g).forEach((align=>this._alignments[align]=!0)),this._alignments.bottom=(!this._alignments.top||!this._alignments.bottom)&&this._alignments.bottom,this._alignments.left=(!this._alignments.right||!this._alignments.left)&&this._alignments.left}destroyRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.DestroyRef);constructor(){this.host=this.elementRef.nativeElement,NgxSnackbarComponent_1.INSTANCES||(NgxSnackbarComponent_1.INSTANCES=[]),NgxSnackbarComponent_1.INSTANCES.push(this);const applyParams=styles=>{Object.keys(styles).forEach((key=>{this.host.style[key]=styles[key]}))};this.animate$sub=this.animate$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.M)((animation=>applyParams(animation.before))),(0,rxjs__WEBPACK_IMPORTED_MODULE_3__.c)(1),(0,rxjs__WEBPACK_IMPORTED_MODULE_2__.M)((animation=>{this.host.style.transitionDuration=`${animation.duration}ms`,this.host.style.transitionTimingFunction=animation.easing,this.host.style.transitionProperty=Object.keys(animation.before).join(",")})),(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.s)((animation=>(0,rxjs__WEBPACK_IMPORTED_MODULE_5__.O)(animation.delay||1))),(0,rxjs__WEBPACK_IMPORTED_MODULE_2__.M)((animation=>applyParams(animation.after))),(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.s)((animation=>(0,rxjs__WEBPACK_IMPORTED_MODULE_5__.O)(animation.duration))),(0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.pQ)(this.destroyRef)).subscribe((()=>{this.host.style.transitionDuration="",this.host.style.transitionTimingFunction="",this.host.style.transitionProperty=""}))}onResize(){this.setNewWidth()}ngOnInit(){const anchors=[];Object.keys(this._alignments).forEach((key=>{this._alignments[key]&&anchors.push(key)})),anchors.sort(((x,y)=>x>y?1:-1));const anchor=anchors.reduce(((acc,curr)=>acc+=""===acc?curr:`-${curr}`),"");this.anchor=anchor}ngAfterViewInit(){this.outerContainerElement?this.host.classList.add("absolute"):this.outerContainerElement=this.host.ownerDocument.body,this.setPosition(),this.launchEnterAnimation(),(0,rxjs__WEBPACK_IMPORTED_MODULE_5__.O)(this.duration+this.delay).pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_7__.s)(1),(0,rxjs__WEBPACK_IMPORTED_MODULE_2__.M)((()=>{this.duration&&this.launchLeaveAnimation()})),(0,rxjs__WEBPACK_IMPORTED_MODULE_3__.c)(this.leaveAnimationDuration),(0,_angular_core_rxjs_interop__WEBPACK_IMPORTED_MODULE_6__.pQ)(this.destroyRef)).subscribe((()=>this.onAnimationDone.emit()))}ngOnDestroy(){NgxSnackbarComponent_1.INSTANCES.length&&NgxSnackbarComponent_1.INSTANCES.filter((instance=>this.outerContainerElement===instance.outerContainerElement)).filter((instance=>this.anchor===instance.anchor)).forEach((instance=>{if(instance.timestamp>this.timestamp){const height=this.host.getBoundingClientRect().height;instance.launchAdaptAnimation(height)}})),NgxSnackbarComponent_1.INSTANCES=NgxSnackbarComponent_1.INSTANCES.filter((instance=>this!==instance)),this.animate$sub.unsubscribe()}animationDone(event){this.onAnimationDone.emit(event)}increaseElevation(){const zIndex=window.getComputedStyle(this.host).zIndex;this.host.style.zIndex=(+zIndex+1).toString()}decreaseElevation(){const zIndex=window.getComputedStyle(this.host).zIndex;this.host.style.zIndex=(+zIndex-1).toString()}computePosition(){const innerContainerElementBounds=this.host.getBoundingClientRect(),innerContainerWidth=innerContainerElementBounds.width,innerContainerHeight=innerContainerElementBounds.height,instancesInSameZone=NgxSnackbarComponent_1.INSTANCES.filter((instance=>this.outerContainerElement===instance.outerContainerElement)).filter((instance=>this.anchor===instance.anchor)).filter((instance=>this!==instance));let precedentInstanceHeight=0;if(instancesInSameZone){const precedentInstance=instancesInSameZone[instancesInSameZone.length-1];if(precedentInstance){precedentInstanceHeight=precedentInstance.elementRef.nativeElement.getBoundingClientRect().height}}return{innerContainerWidth,innerContainerHeight,precedentInstanceHeight,computedHeight:instancesInSameZone.map((instance=>instance.elementRef.nativeElement.getBoundingClientRect().height)).reduce(((acc,curr)=>acc+=curr+this.marginTop),0)}}setPosition(){const{innerContainerWidth,innerContainerHeight,computedHeight}=this.computePosition();"left"===this.anchor&&(this.host.style.left="2%",this.host.style.bottom=`calc(33% + ${computedHeight}px)`),"right"===this.anchor&&(this.host.style.left=`calc(98% - ${innerContainerWidth}px)`,this.host.style.bottom=`calc(33% + ${computedHeight}px)`),"top"===this.anchor&&(this.host.style.left=`calc(50% - ${innerContainerWidth/2}px )`,this.host.style.bottom=`calc(92% - ${innerContainerHeight}px)`),"bottom"===this.anchor&&(this.host.style.left=`calc(50% - ${innerContainerWidth/2}px )`,this.host.style.bottom=`calc(2% + ${computedHeight}px)`),"bottom-left"===this.anchor&&(this.host.style.left="2%",this.host.style.bottom=`calc(2% + ${computedHeight}px)`),"bottom-right"===this.anchor&&(this.host.style.left=`calc(98% - ${innerContainerWidth}px)`,this.host.style.bottom=`calc(2% + ${computedHeight}px)`),"left-top"===this.anchor&&(this.host.style.left="2%",this.host.style.bottom=`calc(92% - ${innerContainerHeight}px - ${computedHeight}px)`),"right-top"===this.anchor&&(this.host.style.left=`calc(98% - ${innerContainerWidth}px)`,this.host.style.bottom=`calc(92% - ${innerContainerHeight}px - ${computedHeight}px)`)}setNewWidth(){const{innerContainerWidth}=this.computePosition();"top"!==this.anchor&&"bottom"!==this.anchor||(this.elementRef.nativeElement.style.left=`calc(50% - ${innerContainerWidth/2}px )`)}launchAdaptAnimation(height){let direction=1;this._alignments.top&&(direction=-1);const transform=window.getComputedStyle(this.host).transform,sixth=parseFloat(transform.split(",").slice(-1).pop()||"0");this.animate$.next({before:{transform:`${transform}`},after:{transform:`matrix(1,0,0,1,0,${sixth+(height+this.marginTop)*direction})`},duration:this.adaptAnimationDuration,easing:"ease"})}launchEnterAnimation(){let direction=-1;this._alignments.top&&(direction=1),this.animate$.next({before:{opacity:"0",transform:`translateY(${200*direction}%)`},after:{opacity:"1",transform:"translateY(0)"},delay:this.delay,duration:this.enterAnimationDuration,easing:"ease"})}launchLeaveAnimation(){this.animate$.next({before:{opacity:"1"},after:{opacity:"0"},duration:this.leaveAnimationDuration,easing:"ease"})}static ctorParameters=()=>[];static propDecorators={onAnimationDone:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Output}],delay:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],duration:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],outerContainerElement:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],alignment:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input}],onResize:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.HostListener,args:["window:resize",[]]}]}};NgxSnackbarComponent=NgxSnackbarComponent_1=(0,tslib__WEBPACK_IMPORTED_MODULE_8__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Component)({changeDetection:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,selector:"ngx-snackbar",template:"<ng-content></ng-content>",standalone:!0,styles:[_snackbar_component_scss_ngResource__WEBPACK_IMPORTED_MODULE_9___default()]})],NgxSnackbarComponent)},"./projects/status/src/status.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{NgxStatusComponent:()=>NgxStatusComponent});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),status_componentngResource=__webpack_require__("./projects/status/src/status.component.scss?ngResource"),status_componentngResource_default=__webpack_require__.n(status_componentngResource);var core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs_interop=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs"),fesm2022_button=__webpack_require__("./node_modules/@angular/material/fesm2022/button.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),snackbar_component=__webpack_require__("./projects/snackbar/src/snackbar.component.ts"),Subject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),scheduler_async=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/async.js"),lift=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),OperatorSubscriber=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"),innerFrom=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");var timer=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js");function throttleTime(duration,scheduler,config){void 0===scheduler&&(scheduler=scheduler_async.E);var duration$=(0,timer.O)(duration,scheduler);return function throttle(durationSelector,config){return(0,lift.N)((function(source,subscriber){var _a=null!=config?config:{},_b=_a.leading,leading=void 0===_b||_b,_c=_a.trailing,trailing=void 0!==_c&&_c,hasValue=!1,sendValue=null,throttled=null,isComplete=!1,endThrottling=function(){null==throttled||throttled.unsubscribe(),throttled=null,trailing&&(send(),isComplete&&subscriber.complete())},cleanupThrottling=function(){throttled=null,isComplete&&subscriber.complete()},startThrottle=function(value){return throttled=(0,innerFrom.Tg)(durationSelector(value)).subscribe((0,OperatorSubscriber._)(subscriber,endThrottling,cleanupThrottling))},send=function(){if(hasValue){hasValue=!1;var value=sendValue;sendValue=null,subscriber.next(value),!isComplete&&startThrottle(value)}};source.subscribe((0,OperatorSubscriber._)(subscriber,(function(value){hasValue=!0,sendValue=value,(!throttled||throttled.closed)&&(leading?send():startThrottle(value))}),(function(){isComplete=!0,(!(trailing&&hasValue&&throttled)||throttled.closed)&&subscriber.complete()})))}))}((function(){return duration$}),config)}var switchMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),catchError=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/catchError.js"),empty=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/empty.js"),dialog=__webpack_require__("./node_modules/@angular/material/fesm2022/dialog.mjs"),from=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/from.js"),take=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js");let NgxStatusDetailDialogService=class NgxStatusDetailDialogService{dialog=(0,core.inject)(dialog.bZ);open$(dialogData){return(0,from.H)(Promise.all([__webpack_require__.e(4),__webpack_require__.e(809)]).then(__webpack_require__.bind(__webpack_require__,"./projects/status/src/status-detail/status-detail.component.ts"))).pipe((0,take.s)(1),(0,switchMap.n)((dialogComponent=>{const dialogConfig={disableClose:!1,hasBackdrop:!0,width:"700px",panelClass:"ngx-status-panel",data:dialogData};return this.dialog.open(dialogComponent.NgxStatusDetailComponent,dialogConfig).afterClosed()})))}};NgxStatusDetailDialogService=(0,tslib_es6.Cg)([(0,core.Injectable)({providedIn:"root"})],NgxStatusDetailDialogService);let NgxStatusComponent=class NgxStatusComponent{get status(){return this._status}set status(value){this._status=value,this.statusIcon=this.getStatusIcon(value?.type)}close=new core.EventEmitter;statusIcon;displayDetailedStatus$=new Subject.B;statusDetailDialogService=(0,core.inject)(NgxStatusDetailDialogService);destroyRef=(0,core.inject)(core.DestroyRef);_status;constructor(){this.displayDetailedStatus$.pipe(throttleTime(1e3),(0,switchMap.n)((status=>this.statusDetailDialogService.open$(status).pipe((0,catchError.W)((err=>(console.error("Failed to open status detail dialog",err),empty.w)))))),(0,rxjs_interop.pQ)(this.destroyRef)).subscribe()}executeAction(action){action?.callback&&"function"==typeof action.callback&&(action.callback(),action.terminal&&this.close.next())}getStatusIcon(statusType){switch(statusType){case"success":return"check";case"warn":return"warning";case"danger":return"error_outline";case"primary":return"notifications";default:return"info"}}static ctorParameters=()=>[];static propDecorators={status:[{type:core.Input}]}};NgxStatusComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"ngx-status",template:'@if (status) {\n    <ngx-snackbar\n        alignment="bottom right"\n        [class.hasInfo]="!!status.technicalText"\n        class="ngx-snackbar ngx-snackbar-{{ status.type }} {{ status.className }}">\n        @if (statusIcon) {\n            <mat-icon>{{ statusIcon }}</mat-icon>\n        }\n        <span>\n            <b>{{ status.title }}</b>\n            @if (status.text; as text) {\n                <p [innerHTML]="text"></p>\n            }\n            @if (status.actions?.length) {\n                <div class="user-defined-actions">\n                    @for (action of status.actions; track $index) {\n                        <button type="button" mat-button (click)="executeAction(action)" [class]="action.className">\n                            {{ action.label }}\n                        </button>\n                    }\n                </div>\n            }\n            <span class="action-container">\n                @if (status.technicalText) {\n                    <mat-icon class="info" inline (click)="displayDetailedStatus$.next(status)">info</mat-icon>\n                }\n                <mat-icon class="close" inline (click)="close.next()">close</mat-icon>\n            </span>\n        </span>\n    </ngx-snackbar>\n}\n',changeDetection:core.ChangeDetectionStrategy.OnPush,encapsulation:core.ViewEncapsulation.None,standalone:!0,imports:[fesm2022_button.$z,icon.An,snackbar_component.Q],styles:[status_componentngResource_default()]})],NgxStatusComponent)},"./node_modules/rxjs/dist/esm5/internal/operators/debounce.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{s:()=>debounce});var _util_lift__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),_util_noop__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/noop.js"),_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"),_observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");function debounce(durationSelector){return(0,_util_lift__WEBPACK_IMPORTED_MODULE_0__.N)((function(source,subscriber){var hasValue=!1,lastValue=null,durationSubscriber=null,emit=function(){if(null==durationSubscriber||durationSubscriber.unsubscribe(),durationSubscriber=null,hasValue){hasValue=!1;var value=lastValue;lastValue=null,subscriber.next(value)}};source.subscribe((0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__._)(subscriber,(function(value){null==durationSubscriber||durationSubscriber.unsubscribe(),hasValue=!0,lastValue=value,durationSubscriber=(0,_OperatorSubscriber__WEBPACK_IMPORTED_MODULE_1__._)(subscriber,emit,_util_noop__WEBPACK_IMPORTED_MODULE_2__.l),(0,_observable_innerFrom__WEBPACK_IMPORTED_MODULE_3__.Tg)(durationSelector(value)).subscribe(durationSubscriber)}),(function(){emit(),subscriber.complete()}),void 0,(function(){lastValue=durationSubscriber=null})))}))}},"./node_modules/rxjs/dist/esm5/internal/operators/delay.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{c:()=>delay});var scheduler_async=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/scheduler/async.js"),concat=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/concat.js"),take=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js"),lift=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),OperatorSubscriber=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js"),noop=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/noop.js");var mapTo=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mapTo.js"),mergeMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js"),innerFrom=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js");function delayWhen(delayDurationSelector,subscriptionDelay){return subscriptionDelay?function(source){return(0,concat.x)(subscriptionDelay.pipe((0,take.s)(1),function ignoreElements(){return(0,lift.N)((function(source,subscriber){source.subscribe((0,OperatorSubscriber._)(subscriber,noop.l))}))}()),source.pipe(delayWhen(delayDurationSelector)))}:(0,mergeMap.Z)((function(value,index){return(0,innerFrom.Tg)(delayDurationSelector(value,index)).pipe((0,take.s)(1),(0,mapTo.u)(value))}))}var timer=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/observable/timer.js");function delay(due,scheduler){void 0===scheduler&&(scheduler=scheduler_async.E);var duration=(0,timer.O)(due,scheduler);return delayWhen((function(){return duration}))}},"./projects/snackbar/src/snackbar.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,":host {\n  /* mandatory styles */\n  position: absolute;\n  bottom: 0;\n  left: 0;\n  display: block;\n  box-sizing: border-box;\n  z-index: 25;\n  /* class added if a container if specified for the snackbar*/\n}\n:host.absolute {\n  position: absolute !important;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()},"./projects/status/src/status.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,'ngx-status .ngx-snackbar {\n  font-family: "Roboto";\n  display: flex;\n  border: 0;\n  border-radius: 3px;\n  line-height: 20px;\n  min-width: 250px;\n  overflow: hidden;\n  padding: 1rem;\n  width: 30vw;\n  z-index: 1010;\n  align-items: center;\n  gap: 1rem;\n}\nngx-status .ngx-snackbar:before {\n  font-size: 2rem;\n}\nngx-status .ngx-snackbar > .mat-icon {\n  overflow: visible;\n}\nngx-status .ngx-snackbar > span {\n  width: calc(100% - 24px);\n}\nngx-status .ngx-snackbar > span b {\n  display: block;\n  font-size: 12px;\n  font-weight: 500;\n  padding-right: 2.5rem;\n  text-transform: uppercase;\n}\nngx-status .ngx-snackbar > span p {\n  font-weight: 300;\n}\nngx-status .ngx-snackbar .action-container {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n}\nngx-status .ngx-snackbar .action-container mat-icon {\n  cursor: pointer;\n  margin-left: 0.5rem;\n  opacity: 0.8;\n  transition: opacity 200ms ease;\n}\nngx-status .ngx-snackbar .action-container mat-icon:hover {\n  opacity: 1;\n}',""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);