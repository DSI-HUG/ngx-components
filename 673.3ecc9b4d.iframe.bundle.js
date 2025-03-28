/*! For license information please see 673.3ecc9b4d.iframe.bundle.js.LICENSE.txt */
"use strict";(self.webpackChunkngx_components_workspace=self.webpackChunkngx_components_workspace||[]).push([[673],{"./node_modules/@angular/core/fesm2022/rxjs-interop.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{pQ:()=>takeUntilDestroyed});var _angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Observable.js"),rxjs_operators__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js");function takeUntilDestroyed(destroyRef){destroyRef||((0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.assertInInjectionContext)(takeUntilDestroyed),destroyRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.DestroyRef));const destroyed$=new rxjs__WEBPACK_IMPORTED_MODULE_1__.c((observer=>destroyRef.onDestroy(observer.next.bind(observer))));return source=>source.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.Q)(destroyed$))}},"./node_modules/@angular/material/fesm2022/tooltip.mjs":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{oV:()=>MatTooltip});var rxjs_operators__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js"),_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__("./node_modules/@angular/cdk/fesm2022/coercion.mjs"),_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_11__=__webpack_require__("./node_modules/@angular/cdk/fesm2022/keycodes.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),_angular_common__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/cdk/fesm2022/platform.mjs"),_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/cdk/fesm2022/a11y.mjs"),_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/@angular/cdk/fesm2022/bidi.mjs"),_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/@angular/cdk/fesm2022/overlay.mjs"),_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/cdk/fesm2022/scrolling.mjs"),_angular_cdk_portal__WEBPACK_IMPORTED_MODULE_10__=__webpack_require__("./node_modules/@angular/cdk/fesm2022/portal.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/Subject.js"),_angular_animations__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("./node_modules/@angular/animations/fesm2022/animations.mjs"),_angular_material_core__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("./node_modules/@angular/material/fesm2022/core.mjs");const _c0=["tooltip"];function getMatTooltipInvalidPositionError(position){return Error(`Tooltip position "${position}" is invalid.`)}const MAT_TOOLTIP_SCROLL_STRATEGY=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("mat-tooltip-scroll-strategy",{providedIn:"root",factory:()=>{const overlay=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__.hJ);return()=>overlay.scrollStrategies.reposition({scrollThrottle:20})}});const MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER={provide:MAT_TOOLTIP_SCROLL_STRATEGY,deps:[_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__.hJ],useFactory:function MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY(overlay){return()=>overlay.scrollStrategies.reposition({scrollThrottle:20})}};const MAT_TOOLTIP_DEFAULT_OPTIONS=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("mat-tooltip-default-options",{providedIn:"root",factory:function MAT_TOOLTIP_DEFAULT_OPTIONS_FACTORY(){return{showDelay:0,hideDelay:0,touchendHideDelay:1500}}}),passiveListenerOptions=(0,_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.BQ)({passive:!0});class MatTooltip{_overlay=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__.hJ);_elementRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef);_scrollDispatcher=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__.R);_viewContainerRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewContainerRef);_ngZone=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone);_platform=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_platform__WEBPACK_IMPORTED_MODULE_2__.OD);_ariaDescriber=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__.vr);_focusMonitor=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__.FN);_dir=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_cdk_bidi__WEBPACK_IMPORTED_MODULE_5__.dS);_injector=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injector);_defaultOptions=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(MAT_TOOLTIP_DEFAULT_OPTIONS,{optional:!0});_overlayRef;_tooltipInstance;_portal;_position="below";_positionAtOrigin=!1;_disabled=!1;_tooltipClass;_scrollStrategy=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(MAT_TOOLTIP_SCROLL_STRATEGY);_viewInitialized=!1;_pointerExitEventsInitialized=!1;_tooltipComponent=TooltipComponent;_viewportMargin=8;_currentPosition;_cssClassPrefix="mat-mdc";_ariaDescriptionPending;_dirSubscribed=!1;get position(){return this._position}set position(value){value!==this._position&&(this._position=value,this._overlayRef&&(this._updatePosition(this._overlayRef),this._tooltipInstance?.show(0),this._overlayRef.updatePosition()))}get positionAtOrigin(){return this._positionAtOrigin}set positionAtOrigin(value){this._positionAtOrigin=(0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.he)(value),this._detach(),this._overlayRef=null}get disabled(){return this._disabled}set disabled(value){const isDisabled=(0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.he)(value);this._disabled!==isDisabled&&(this._disabled=isDisabled,isDisabled?this.hide(0):this._setupPointerEnterEventsIfNeeded(),this._syncAriaDescription(this.message))}get showDelay(){return this._showDelay}set showDelay(value){this._showDelay=(0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.OE)(value)}_showDelay;get hideDelay(){return this._hideDelay}set hideDelay(value){this._hideDelay=(0,_angular_cdk_coercion__WEBPACK_IMPORTED_MODULE_6__.OE)(value),this._tooltipInstance&&(this._tooltipInstance._mouseLeaveHideDelay=this._hideDelay)}_hideDelay;touchGestures="auto";get message(){return this._message}set message(value){const oldMessage=this._message;this._message=null!=value?String(value).trim():"",!this._message&&this._isTooltipVisible()?this.hide(0):(this._setupPointerEnterEventsIfNeeded(),this._updateTooltipMessage()),this._syncAriaDescription(oldMessage)}_message="";get tooltipClass(){return this._tooltipClass}set tooltipClass(value){this._tooltipClass=value,this._tooltipInstance&&this._setTooltipClass(this._tooltipClass)}_passiveListeners=[];_document=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_common__WEBPACK_IMPORTED_MODULE_7__.DOCUMENT);_touchstartTimeout=null;_destroyed=new rxjs__WEBPACK_IMPORTED_MODULE_8__.B;_isDestroyed=!1;constructor(){const defaultOptions=this._defaultOptions;defaultOptions&&(this._showDelay=defaultOptions.showDelay,this._hideDelay=defaultOptions.hideDelay,defaultOptions.position&&(this.position=defaultOptions.position),defaultOptions.positionAtOrigin&&(this.positionAtOrigin=defaultOptions.positionAtOrigin),defaultOptions.touchGestures&&(this.touchGestures=defaultOptions.touchGestures),defaultOptions.tooltipClass&&(this.tooltipClass=defaultOptions.tooltipClass)),this._viewportMargin=8}ngAfterViewInit(){this._viewInitialized=!0,this._setupPointerEnterEventsIfNeeded(),this._focusMonitor.monitor(this._elementRef).pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.Q)(this._destroyed)).subscribe((origin=>{origin?"keyboard"===origin&&this._ngZone.run((()=>this.show())):this._ngZone.run((()=>this.hide(0)))}))}ngOnDestroy(){const nativeElement=this._elementRef.nativeElement;this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this._overlayRef&&(this._overlayRef.dispose(),this._tooltipInstance=null),this._passiveListeners.forEach((([event,listener])=>{nativeElement.removeEventListener(event,listener,passiveListenerOptions)})),this._passiveListeners.length=0,this._destroyed.next(),this._destroyed.complete(),this._isDestroyed=!0,this._ariaDescriber.removeDescription(nativeElement,this.message,"tooltip"),this._focusMonitor.stopMonitoring(nativeElement)}show(delay=this.showDelay,origin){if(this.disabled||!this.message||this._isTooltipVisible())return void this._tooltipInstance?._cancelPendingAnimations();const overlayRef=this._createOverlay(origin);this._detach(),this._portal=this._portal||new _angular_cdk_portal__WEBPACK_IMPORTED_MODULE_10__.A8(this._tooltipComponent,this._viewContainerRef);const instance=this._tooltipInstance=overlayRef.attach(this._portal).instance;instance._triggerElement=this._elementRef.nativeElement,instance._mouseLeaveHideDelay=this._hideDelay,instance.afterHidden().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.Q)(this._destroyed)).subscribe((()=>this._detach())),this._setTooltipClass(this._tooltipClass),this._updateTooltipMessage(),instance.show(delay)}hide(delay=this.hideDelay){const instance=this._tooltipInstance;instance&&(instance.isVisible()?instance.hide(delay):(instance._cancelPendingAnimations(),this._detach()))}toggle(origin){this._isTooltipVisible()?this.hide():this.show(void 0,origin)}_isTooltipVisible(){return!!this._tooltipInstance&&this._tooltipInstance.isVisible()}_createOverlay(origin){if(this._overlayRef){const existingStrategy=this._overlayRef.getConfig().positionStrategy;if((!this.positionAtOrigin||!origin)&&existingStrategy._origin instanceof _angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef)return this._overlayRef;this._detach()}const scrollableAncestors=this._scrollDispatcher.getAncestorScrollContainers(this._elementRef),strategy=this._overlay.position().flexibleConnectedTo(this.positionAtOrigin&&origin||this._elementRef).withTransformOriginOn(`.${this._cssClassPrefix}-tooltip`).withFlexibleDimensions(!1).withViewportMargin(this._viewportMargin).withScrollableContainers(scrollableAncestors);return strategy.positionChanges.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.Q)(this._destroyed)).subscribe((change=>{this._updateCurrentPositionClass(change.connectionPair),this._tooltipInstance&&change.scrollableViewProperties.isOverlayClipped&&this._tooltipInstance.isVisible()&&this._ngZone.run((()=>this.hide(0)))})),this._overlayRef=this._overlay.create({direction:this._dir,positionStrategy:strategy,panelClass:`${this._cssClassPrefix}-tooltip-panel`,scrollStrategy:this._scrollStrategy()}),this._updatePosition(this._overlayRef),this._overlayRef.detachments().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.Q)(this._destroyed)).subscribe((()=>this._detach())),this._overlayRef.outsidePointerEvents().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.Q)(this._destroyed)).subscribe((()=>this._tooltipInstance?._handleBodyInteraction())),this._overlayRef.keydownEvents().pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.Q)(this._destroyed)).subscribe((event=>{this._isTooltipVisible()&&event.keyCode===_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_11__._f&&!(0,_angular_cdk_keycodes__WEBPACK_IMPORTED_MODULE_11__.rp)(event)&&(event.preventDefault(),event.stopPropagation(),this._ngZone.run((()=>this.hide(0))))})),this._defaultOptions?.disableTooltipInteractivity&&this._overlayRef.addPanelClass(`${this._cssClassPrefix}-tooltip-panel-non-interactive`),this._dirSubscribed||(this._dirSubscribed=!0,this._dir.change.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_9__.Q)(this._destroyed)).subscribe((()=>{this._overlayRef&&this._updatePosition(this._overlayRef)}))),this._overlayRef}_detach(){this._overlayRef&&this._overlayRef.hasAttached()&&this._overlayRef.detach(),this._tooltipInstance=null}_updatePosition(overlayRef){const position=overlayRef.getConfig().positionStrategy,origin=this._getOrigin(),overlay=this._getOverlayPosition();position.withPositions([this._addOffset({...origin.main,...overlay.main}),this._addOffset({...origin.fallback,...overlay.fallback})])}_addOffset(position){const isLtr=!this._dir||"ltr"==this._dir.value;return"top"===position.originY?position.offsetY=-8:"bottom"===position.originY?position.offsetY=8:"start"===position.originX?position.offsetX=isLtr?-8:8:"end"===position.originX&&(position.offsetX=isLtr?8:-8),position}_getOrigin(){const isLtr=!this._dir||"ltr"==this._dir.value,position=this.position;let originPosition;if("above"==position||"below"==position)originPosition={originX:"center",originY:"above"==position?"top":"bottom"};else if("before"==position||"left"==position&&isLtr||"right"==position&&!isLtr)originPosition={originX:"start",originY:"center"};else if("after"==position||"right"==position&&isLtr||"left"==position&&!isLtr)originPosition={originX:"end",originY:"center"};else if("undefined"==typeof ngDevMode||ngDevMode)throw getMatTooltipInvalidPositionError(position);const{x,y}=this._invertPosition(originPosition.originX,originPosition.originY);return{main:originPosition,fallback:{originX:x,originY:y}}}_getOverlayPosition(){const isLtr=!this._dir||"ltr"==this._dir.value,position=this.position;let overlayPosition;if("above"==position)overlayPosition={overlayX:"center",overlayY:"bottom"};else if("below"==position)overlayPosition={overlayX:"center",overlayY:"top"};else if("before"==position||"left"==position&&isLtr||"right"==position&&!isLtr)overlayPosition={overlayX:"end",overlayY:"center"};else if("after"==position||"right"==position&&isLtr||"left"==position&&!isLtr)overlayPosition={overlayX:"start",overlayY:"center"};else if("undefined"==typeof ngDevMode||ngDevMode)throw getMatTooltipInvalidPositionError(position);const{x,y}=this._invertPosition(overlayPosition.overlayX,overlayPosition.overlayY);return{main:overlayPosition,fallback:{overlayX:x,overlayY:y}}}_updateTooltipMessage(){this._tooltipInstance&&(this._tooltipInstance.message=this.message,this._tooltipInstance._markForCheck(),(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.afterNextRender)((()=>{this._tooltipInstance&&this._overlayRef.updatePosition()}),{injector:this._injector}))}_setTooltipClass(tooltipClass){this._tooltipInstance&&(this._tooltipInstance.tooltipClass=tooltipClass,this._tooltipInstance._markForCheck())}_invertPosition(x,y){return"above"===this.position||"below"===this.position?"top"===y?y="bottom":"bottom"===y&&(y="top"):"end"===x?x="start":"start"===x&&(x="end"),{x,y}}_updateCurrentPositionClass(connectionPair){const{overlayY,originX,originY}=connectionPair;let newPosition;if(newPosition="center"===overlayY?this._dir&&"rtl"===this._dir.value?"end"===originX?"left":"right":"start"===originX?"left":"right":"bottom"===overlayY&&"top"===originY?"above":"below",newPosition!==this._currentPosition){const overlayRef=this._overlayRef;if(overlayRef){const classPrefix=`${this._cssClassPrefix}-tooltip-panel-`;overlayRef.removePanelClass(classPrefix+this._currentPosition),overlayRef.addPanelClass(classPrefix+newPosition)}this._currentPosition=newPosition}}_setupPointerEnterEventsIfNeeded(){!this._disabled&&this.message&&this._viewInitialized&&!this._passiveListeners.length&&(this._platformSupportsMouseEvents()?this._passiveListeners.push(["mouseenter",event=>{let point;this._setupPointerExitEventsIfNeeded(),void 0!==event.x&&void 0!==event.y&&(point=event),this.show(void 0,point)}]):"off"!==this.touchGestures&&(this._disableNativeGesturesIfNecessary(),this._passiveListeners.push(["touchstart",event=>{const touch=event.targetTouches?.[0],origin=touch?{x:touch.clientX,y:touch.clientY}:void 0;this._setupPointerExitEventsIfNeeded(),this._touchstartTimeout&&clearTimeout(this._touchstartTimeout);this._touchstartTimeout=setTimeout((()=>{this._touchstartTimeout=null,this.show(void 0,origin)}),this._defaultOptions?.touchLongPressShowDelay??500)}])),this._addListeners(this._passiveListeners))}_setupPointerExitEventsIfNeeded(){if(this._pointerExitEventsInitialized)return;this._pointerExitEventsInitialized=!0;const exitListeners=[];if(this._platformSupportsMouseEvents())exitListeners.push(["mouseleave",event=>{const newTarget=event.relatedTarget;newTarget&&this._overlayRef?.overlayElement.contains(newTarget)||this.hide()}],["wheel",event=>this._wheelListener(event)]);else if("off"!==this.touchGestures){this._disableNativeGesturesIfNecessary();const touchendListener=()=>{this._touchstartTimeout&&clearTimeout(this._touchstartTimeout),this.hide(this._defaultOptions?.touchendHideDelay)};exitListeners.push(["touchend",touchendListener],["touchcancel",touchendListener])}this._addListeners(exitListeners),this._passiveListeners.push(...exitListeners)}_addListeners(listeners){listeners.forEach((([event,listener])=>{this._elementRef.nativeElement.addEventListener(event,listener,passiveListenerOptions)}))}_platformSupportsMouseEvents(){return!this._platform.IOS&&!this._platform.ANDROID}_wheelListener(event){if(this._isTooltipVisible()){const elementUnderPointer=this._document.elementFromPoint(event.clientX,event.clientY),element=this._elementRef.nativeElement;elementUnderPointer===element||element.contains(elementUnderPointer)||this.hide()}}_disableNativeGesturesIfNecessary(){const gestures=this.touchGestures;if("off"!==gestures){const element=this._elementRef.nativeElement,style=element.style;("on"===gestures||"INPUT"!==element.nodeName&&"TEXTAREA"!==element.nodeName)&&(style.userSelect=style.msUserSelect=style.webkitUserSelect=style.MozUserSelect="none"),"on"!==gestures&&element.draggable||(style.webkitUserDrag="none"),style.touchAction="none",style.webkitTapHighlightColor="transparent"}}_syncAriaDescription(oldMessage){this._ariaDescriptionPending||(this._ariaDescriptionPending=!0,this._ariaDescriber.removeDescription(this._elementRef.nativeElement,oldMessage,"tooltip"),this._isDestroyed||(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.afterNextRender)({write:()=>{this._ariaDescriptionPending=!1,this.message&&!this.disabled&&this._ariaDescriber.describe(this._elementRef.nativeElement,this.message,"tooltip")}},{injector:this._injector}))}static ɵfac=function MatTooltip_Factory(__ngFactoryType__){return new(__ngFactoryType__||MatTooltip)};static ɵdir=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({type:MatTooltip,selectors:[["","matTooltip",""]],hostAttrs:[1,"mat-mdc-tooltip-trigger"],hostVars:2,hostBindings:function MatTooltip_HostBindings(rf,ctx){2&rf&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mat-mdc-tooltip-disabled",ctx.disabled)},inputs:{position:[0,"matTooltipPosition","position"],positionAtOrigin:[0,"matTooltipPositionAtOrigin","positionAtOrigin"],disabled:[0,"matTooltipDisabled","disabled"],showDelay:[0,"matTooltipShowDelay","showDelay"],hideDelay:[0,"matTooltipHideDelay","hideDelay"],touchGestures:[0,"matTooltipTouchGestures","touchGestures"],message:[0,"matTooltip","message"],tooltipClass:[0,"matTooltipClass","tooltipClass"]},exportAs:["matTooltip"]})}("undefined"==typeof ngDevMode||ngDevMode)&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTooltip,[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Directive,args:[{selector:"[matTooltip]",exportAs:"matTooltip",host:{class:"mat-mdc-tooltip-trigger","[class.mat-mdc-tooltip-disabled]":"disabled"}}]}],(()=>[]),{position:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matTooltipPosition"]}],positionAtOrigin:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matTooltipPositionAtOrigin"]}],disabled:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matTooltipDisabled"]}],showDelay:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matTooltipShowDelay"]}],hideDelay:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matTooltipHideDelay"]}],touchGestures:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matTooltipTouchGestures"]}],message:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matTooltip"]}],tooltipClass:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Input,args:["matTooltipClass"]}]});class TooltipComponent{_changeDetectorRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectorRef);_elementRef=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ElementRef);_isMultiline=!1;message;tooltipClass;_showTimeoutId;_hideTimeoutId;_triggerElement;_mouseLeaveHideDelay;_animationsDisabled;_tooltip;_closeOnInteraction=!1;_isVisible=!1;_onHide=new rxjs__WEBPACK_IMPORTED_MODULE_8__.B;_showAnimation="mat-mdc-tooltip-show";_hideAnimation="mat-mdc-tooltip-hide";constructor(){const animationMode=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.ANIMATION_MODULE_TYPE,{optional:!0});this._animationsDisabled="NoopAnimations"===animationMode}show(delay){null!=this._hideTimeoutId&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=setTimeout((()=>{this._toggleVisibility(!0),this._showTimeoutId=void 0}),delay)}hide(delay){null!=this._showTimeoutId&&clearTimeout(this._showTimeoutId),this._hideTimeoutId=setTimeout((()=>{this._toggleVisibility(!1),this._hideTimeoutId=void 0}),delay)}afterHidden(){return this._onHide}isVisible(){return this._isVisible}ngOnDestroy(){this._cancelPendingAnimations(),this._onHide.complete(),this._triggerElement=null}_handleBodyInteraction(){this._closeOnInteraction&&this.hide(0)}_markForCheck(){this._changeDetectorRef.markForCheck()}_handleMouseLeave({relatedTarget}){relatedTarget&&this._triggerElement.contains(relatedTarget)||(this.isVisible()?this.hide(this._mouseLeaveHideDelay):this._finalizeAnimation(!1))}_onShow(){this._isMultiline=this._isTooltipMultiline(),this._markForCheck()}_isTooltipMultiline(){const rect=this._elementRef.nativeElement.getBoundingClientRect();return rect.height>24&&rect.width>=200}_handleAnimationEnd({animationName}){animationName!==this._showAnimation&&animationName!==this._hideAnimation||this._finalizeAnimation(animationName===this._showAnimation)}_cancelPendingAnimations(){null!=this._showTimeoutId&&clearTimeout(this._showTimeoutId),null!=this._hideTimeoutId&&clearTimeout(this._hideTimeoutId),this._showTimeoutId=this._hideTimeoutId=void 0}_finalizeAnimation(toVisible){toVisible?this._closeOnInteraction=!0:this.isVisible()||this._onHide.next()}_toggleVisibility(isVisible){const tooltip=this._tooltip.nativeElement,showClass=this._showAnimation,hideClass=this._hideAnimation;if(tooltip.classList.remove(isVisible?hideClass:showClass),tooltip.classList.add(isVisible?showClass:hideClass),this._isVisible!==isVisible&&(this._isVisible=isVisible,this._changeDetectorRef.markForCheck()),isVisible&&!this._animationsDisabled&&"function"==typeof getComputedStyle){const styles=getComputedStyle(tooltip);"0s"!==styles.getPropertyValue("animation-duration")&&"none"!==styles.getPropertyValue("animation-name")||(this._animationsDisabled=!0)}isVisible&&this._onShow(),this._animationsDisabled&&(tooltip.classList.add("_mat-animation-noopable"),this._finalizeAnimation(isVisible))}static ɵfac=function TooltipComponent_Factory(__ngFactoryType__){return new(__ngFactoryType__||TooltipComponent)};static ɵcmp=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({type:TooltipComponent,selectors:[["mat-tooltip-component"]],viewQuery:function TooltipComponent_Query(rf,ctx){if(1&rf&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0,7),2&rf){let _t;_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]())&&(ctx._tooltip=_t.first)}},hostAttrs:["aria-hidden","true"],hostBindings:function TooltipComponent_HostBindings(rf,ctx){1&rf&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("mouseleave",(function TooltipComponent_mouseleave_HostBindingHandler($event){return ctx._handleMouseLeave($event)}))},decls:4,vars:4,consts:[["tooltip",""],[1,"mdc-tooltip","mat-mdc-tooltip",3,"animationend","ngClass"],[1,"mat-mdc-tooltip-surface","mdc-tooltip__surface"]],template:function TooltipComponent_Template(rf,ctx){if(1&rf){const _r1=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0,"div",1,0),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("animationend",(function TooltipComponent_Template_div_animationend_0_listener($event){return _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵresetView"](ctx._handleAnimationEnd($event))})),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2,"div",2),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]()()}2&rf&&(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("mdc-tooltip--multiline",ctx._isMultiline),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass",ctx.tooltipClass),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3),_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.message))},dependencies:[_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass],styles:['.mat-mdc-tooltip{position:relative;transform:scale(0);display:inline-flex}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-surface{word-break:normal;overflow-wrap:anywhere;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center;will-change:transform,opacity;background-color:var(--mdc-plain-tooltip-container-color, var(--mat-sys-inverse-surface));color:var(--mdc-plain-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));border-radius:var(--mdc-plain-tooltip-container-shape, var(--mat-sys-corner-extra-small));font-family:var(--mdc-plain-tooltip-supporting-text-font, var(--mat-sys-body-small-font));font-size:var(--mdc-plain-tooltip-supporting-text-size, var(--mat-sys-body-small-size));font-weight:var(--mdc-plain-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));line-height:var(--mdc-plain-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));letter-spacing:var(--mdc-plain-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking))}.mat-mdc-tooltip-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:right}.mat-mdc-tooltip-panel{line-height:normal}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}'],encapsulation:2,changeDetection:0})}("undefined"==typeof ngDevMode||ngDevMode)&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TooltipComponent,[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.Component,args:[{selector:"mat-tooltip-component",encapsulation:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewEncapsulation.None,changeDetection:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ChangeDetectionStrategy.OnPush,host:{"(mouseleave)":"_handleMouseLeave($event)","aria-hidden":"true"},imports:[_angular_common__WEBPACK_IMPORTED_MODULE_7__.NgClass],template:'<div\n  #tooltip\n  class="mdc-tooltip mat-mdc-tooltip"\n  [ngClass]="tooltipClass"\n  (animationend)="_handleAnimationEnd($event)"\n  [class.mdc-tooltip--multiline]="_isMultiline">\n  <div class="mat-mdc-tooltip-surface mdc-tooltip__surface">{{message}}</div>\n</div>\n',styles:['.mat-mdc-tooltip{position:relative;transform:scale(0);display:inline-flex}.mat-mdc-tooltip::before{content:"";top:0;right:0;bottom:0;left:0;z-index:-1;position:absolute}.mat-mdc-tooltip-panel-below .mat-mdc-tooltip::before{top:-8px}.mat-mdc-tooltip-panel-above .mat-mdc-tooltip::before{bottom:-8px}.mat-mdc-tooltip-panel-right .mat-mdc-tooltip::before{left:-8px}.mat-mdc-tooltip-panel-left .mat-mdc-tooltip::before{right:-8px}.mat-mdc-tooltip._mat-animation-noopable{animation:none;transform:scale(1)}.mat-mdc-tooltip-surface{word-break:normal;overflow-wrap:anywhere;padding:4px 8px;min-width:40px;max-width:200px;min-height:24px;max-height:40vh;box-sizing:border-box;overflow:hidden;text-align:center;will-change:transform,opacity;background-color:var(--mdc-plain-tooltip-container-color, var(--mat-sys-inverse-surface));color:var(--mdc-plain-tooltip-supporting-text-color, var(--mat-sys-inverse-on-surface));border-radius:var(--mdc-plain-tooltip-container-shape, var(--mat-sys-corner-extra-small));font-family:var(--mdc-plain-tooltip-supporting-text-font, var(--mat-sys-body-small-font));font-size:var(--mdc-plain-tooltip-supporting-text-size, var(--mat-sys-body-small-size));font-weight:var(--mdc-plain-tooltip-supporting-text-weight, var(--mat-sys-body-small-weight));line-height:var(--mdc-plain-tooltip-supporting-text-line-height, var(--mat-sys-body-small-line-height));letter-spacing:var(--mdc-plain-tooltip-supporting-text-tracking, var(--mat-sys-body-small-tracking))}.mat-mdc-tooltip-surface::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;border:1px solid rgba(0,0,0,0);border-radius:inherit;content:"";pointer-events:none}.mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:left}[dir=rtl] .mdc-tooltip--multiline .mat-mdc-tooltip-surface{text-align:right}.mat-mdc-tooltip-panel{line-height:normal}.mat-mdc-tooltip-panel.mat-mdc-tooltip-panel-non-interactive{pointer-events:none}@keyframes mat-mdc-tooltip-show{0%{opacity:0;transform:scale(0.8)}100%{opacity:1;transform:scale(1)}}@keyframes mat-mdc-tooltip-hide{0%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0.8)}}.mat-mdc-tooltip-show{animation:mat-mdc-tooltip-show 150ms cubic-bezier(0, 0, 0.2, 1) forwards}.mat-mdc-tooltip-hide{animation:mat-mdc-tooltip-hide 75ms cubic-bezier(0.4, 0, 1, 1) forwards}']}]}],(()=>[]),{_tooltip:[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.ViewChild,args:["tooltip",{static:!0}]}]});(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.hZ)("state",[(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.wk)("initial, void, hidden",(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.iF)({opacity:0,transform:"scale(0.8)"})),(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.wk)("visible",(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.iF)({transform:"scale(1)"})),(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.kY)("* => visible",(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.i0)("150ms cubic-bezier(0, 0, 0.2, 1)")),(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.kY)("* => hidden",(0,_angular_animations__WEBPACK_IMPORTED_MODULE_12__.i0)("75ms cubic-bezier(0.4, 0, 1, 1)"))]);class MatTooltipModule{static ɵfac=function MatTooltipModule_Factory(__ngFactoryType__){return new(__ngFactoryType__||MatTooltipModule)};static ɵmod=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({type:MatTooltipModule,imports:[_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__.Pd,_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__.z_,_angular_material_core__WEBPACK_IMPORTED_MODULE_13__.yE,MatTooltip,TooltipComponent],exports:[MatTooltip,TooltipComponent,_angular_material_core__WEBPACK_IMPORTED_MODULE_13__.yE,_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__.Gj]});static ɵinj=_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({providers:[MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],imports:[_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__.Pd,_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__.z_,_angular_material_core__WEBPACK_IMPORTED_MODULE_13__.yE,_angular_material_core__WEBPACK_IMPORTED_MODULE_13__.yE,_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__.Gj]})}("undefined"==typeof ngDevMode||ngDevMode)&&_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](MatTooltipModule,[{type:_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgModule,args:[{imports:[_angular_cdk_a11y__WEBPACK_IMPORTED_MODULE_4__.Pd,_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_1__.z_,_angular_material_core__WEBPACK_IMPORTED_MODULE_13__.yE,MatTooltip,TooltipComponent],exports:[MatTooltip,TooltipComponent,_angular_material_core__WEBPACK_IMPORTED_MODULE_13__.yE,_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_3__.Gj],providers:[MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]}]}],null,null)},"./node_modules/rxjs/dist/esm5/internal/operators/first.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{$:()=>first});var EmptyError=(0,__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js").L)((function(_super){return function EmptyErrorImpl(){_super(this),this.name="EmptyError",this.message="no elements in sequence"}})),filter=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/filter.js"),take=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/take.js"),lift=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/lift.js"),OperatorSubscriber=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js");function defaultErrorFactory(){return new EmptyError}var identity=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/util/identity.js");function first(predicate,defaultValue){var hasDefaultValue=arguments.length>=2;return function(source){return source.pipe(predicate?(0,filter.p)((function(v,i){return predicate(v,i,source)})):identity.D,(0,take.s)(1),hasDefaultValue?function defaultIfEmpty(defaultValue){return(0,lift.N)((function(source,subscriber){var hasValue=!1;source.subscribe((0,OperatorSubscriber._)(subscriber,(function(value){hasValue=!0,subscriber.next(value)}),(function(){hasValue||subscriber.next(defaultValue),subscriber.complete()})))}))}(defaultValue):function throwIfEmpty(errorFactory){return void 0===errorFactory&&(errorFactory=defaultErrorFactory),(0,lift.N)((function(source,subscriber){var hasValue=!1;source.subscribe((0,OperatorSubscriber._)(subscriber,(function(value){hasValue=!0,subscriber.next(value)}),(function(){return hasValue?subscriber.complete():subscriber.error(errorFactory())})))}))}((function(){return new EmptyError})))}}}}]);