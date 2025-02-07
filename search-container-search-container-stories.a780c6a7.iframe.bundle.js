(self.webpackChunkngx_components_workspace=self.webpackChunkngx_components_workspace||[]).push([[816],{"./projects/core/src/services/media.service.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Lp:()=>NgxMediaService});var tslib__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__("./node_modules/tslib/tslib.es6.mjs"),_angular_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js"),rxjs__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/map.js"),rxjs__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js"),rxjs__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js");const mediaQueryDefinitions=new _angular_core__WEBPACK_IMPORTED_MODULE_0__.InjectionToken("MEDIA_QUERY_DEFINITIONS"),simplifiedMediaQueryDefinitions=[{alias:"xs",mediaQuery:"(max-width: 599px)"},{alias:"sm",mediaQuery:"(min-width: 600px) and (max-width: 959px)"},{alias:"md",mediaQuery:"(min-width: 860px) and (max-width: 1279px)"},{alias:"lg",mediaQuery:"(min-width: 1280px)"}];let NgxMediaService=class NgxMediaService{isHandset$;isMobile$;mediaChanged$=new rxjs__WEBPACK_IMPORTED_MODULE_1__.t("lg");mql={};zone=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(_angular_core__WEBPACK_IMPORTED_MODULE_0__.NgZone);mediaDefinitions=(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.inject)(mediaQueryDefinitions,{optional:!0});constructor(){this.mediaDefinitions||(this.mediaDefinitions=simplifiedMediaQueryDefinitions),this.mediaDefinitions.forEach((mediaDefinition=>{const{alias,mediaQuery}=mediaDefinition;this.mql[alias]=window.matchMedia(mediaQuery),this.mql[alias].addEventListener("change",this.onMqlEvent.bind(this,alias)),this.mql[alias].matches&&(this.mediaChanged$=new rxjs__WEBPACK_IMPORTED_MODULE_1__.t(alias))})),this.isHandset$=this.mediaChanged$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.T)((alias=>"xs"===alias)),(0,rxjs__WEBPACK_IMPORTED_MODULE_3__.F)(),(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.t)({bufferSize:1,refCount:!1})),this.isMobile$=this.mediaChanged$.pipe((0,rxjs__WEBPACK_IMPORTED_MODULE_2__.T)((alias=>"xs"===alias||"sm"===alias)),(0,rxjs__WEBPACK_IMPORTED_MODULE_3__.F)(),(0,rxjs__WEBPACK_IMPORTED_MODULE_4__.t)({bufferSize:1,refCount:!1}))}ngOnDestroy(){Object.keys(this.mql).forEach((alias=>{this.mql[alias].removeEventListener("change",this.onMqlEvent),delete this.mql[alias]}))}onMqlEvent(alias,event){this.zone.run((()=>{event.matches&&this.mediaChanged$.next(alias)}))}static ctorParameters=()=>[]};NgxMediaService=(0,tslib__WEBPACK_IMPORTED_MODULE_5__.Cg)([(0,_angular_core__WEBPACK_IMPORTED_MODULE_0__.Injectable)({providedIn:"root"})],NgxMediaService)},"./projects/search-container/src/search-container.component.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{A:()=>NgxSearchContainerComponent,l:()=>NgxSearchInputDirective});var tslib_es6=__webpack_require__("./node_modules/tslib/tslib.es6.mjs");var search_container_componentngResource=__webpack_require__("./projects/search-container/src/search-container.component.scss?ngResource"),search_container_componentngResource_default=__webpack_require__.n(search_container_componentngResource),common=__webpack_require__("./node_modules/@angular/common/fesm2022/common.mjs"),core=__webpack_require__("./node_modules/@angular/core/fesm2022/core.mjs"),rxjs_interop=__webpack_require__("./node_modules/@angular/core/fesm2022/rxjs-interop.mjs"),fesm2022_forms=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),icon=__webpack_require__("./node_modules/@angular/material/fesm2022/icon.mjs"),tooltip=__webpack_require__("./node_modules/@angular/material/fesm2022/tooltip.mjs"),media_service=__webpack_require__("./projects/core/src/services/media.service.ts"),BehaviorSubject=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js"),switchMap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/switchMap.js"),first=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/first.js"),tap=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/tap.js"),distinctUntilChanged=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/distinctUntilChanged.js"),shareReplay=__webpack_require__("./node_modules/rxjs/dist/esm5/internal/operators/shareReplay.js");let NgxSearchInputDirective=class NgxSearchInputDirective{ngControl=(0,core.inject)(fesm2022_forms.vO);elementRef=(0,core.inject)(core.ElementRef);constructor(){this.focus()}focus(){this.elementRef.nativeElement.focus()}static ctorParameters=()=>[]};NgxSearchInputDirective=(0,tslib_es6.Cg)([(0,core.Directive)({selector:"[ngx-search-input]",standalone:!0})],NgxSearchInputDirective);let NgxSearchContainerComponent=class NgxSearchContainerComponent{cleared=new core.EventEmitter;clearTooltip="Effacer la recherche";openSearchTooltip="Ouvrir la recherche";closeSearchTooltip="Quitter la recherche";mobileSearch;activeSearch$=new BehaviorSubject.t(!1);searchInputValue$;set searchInput(searchInput){if(!searchInput)throw new Error("You need to add the attribute ngx-search-input to the NgxSearchContainerComponent");if(!searchInput.ngControl)throw new Error("You need to add the attribute ngModel to the NgxSearchContainerComponent");this._searchInput=searchInput}set right(value){this._right=value}get right(){return this._right}mediaService=(0,core.inject)(media_service.Lp);zone=(0,core.inject)(core.NgZone);destroyRef=(0,core.inject)(core.DestroyRef);_searchInput;_right=null;_resetWhenInactiveSearch=!1;constructor(){this.activeSearch$.pipe((0,switchMap.n)((activeSearch=>this.zone.onStable.pipe((0,first.$)(),(0,tap.M)((()=>{!activeSearch&&this._resetWhenInactiveSearch&&this.reset(),this._searchInput?.focus(),this._resetWhenInactiveSearch=!0}))))),(0,rxjs_interop.pQ)(this.destroyRef)).subscribe()}ngAfterContentInit(){this.searchInputValue$=this._searchInput?.ngControl?.valueChanges?.pipe((0,distinctUntilChanged.F)(),(0,shareReplay.t)({bufferSize:1,refCount:!1}))??void 0}reset(){this._searchInput?.ngControl?.reset(),this.cleared.emit()}static ctorParameters=()=>[];static propDecorators={cleared:[{type:core.Output}],clearTooltip:[{type:core.Input}],openSearchTooltip:[{type:core.Input}],closeSearchTooltip:[{type:core.Input}],mobileSearch:[{type:core.ContentChild,args:["mobileSearch"]}],searchInput:[{type:core.ContentChild,args:[NgxSearchInputDirective]}],right:[{type:core.Input}]}};NgxSearchContainerComponent=(0,tslib_es6.Cg)([(0,core.Component)({selector:"ngx-search-container",template:'@if (mediaService.isHandset$ | async) {\n    <div class="ngx-search-container-mobile mobile" [class.active]="activeSearch$ | async" #mobileSearch>\n        @if (activeSearch$ | async) {\n            <mat-icon class="icon-close-search" [matTooltip]="closeSearchTooltip" (click)="activeSearch$.next(false)">\n                arrow_back\n            </mat-icon>\n            <ng-container *ngTemplateOutlet="searchContainerTpl"></ng-container>\n        } @else {\n            <mat-icon class="icon-open-search" [matTooltip]="openSearchTooltip" (click)="activeSearch$.next(true)">\n                search\n            </mat-icon>\n        }\n    </div>\n} @else {\n    <ng-container *ngTemplateOutlet="searchContainerTpl"></ng-container>\n}\n\n<ng-template #searchContainerTpl>\n    <div class="ngx-search-container">\n        <mat-icon>search</mat-icon>\n        <ng-content></ng-content>\n        @if (searchInputValue$ | async) {\n            <mat-icon class="icon-clear" [matTooltip]="clearTooltip" (click)="reset()">close</mat-icon>\n        }\n        <ng-container *ngTemplateOutlet="right"></ng-container>\n    </div>\n</ng-template>\n',encapsulation:core.ViewEncapsulation.None,changeDetection:core.ChangeDetectionStrategy.OnPush,imports:[common.AsyncPipe,common.NgTemplateOutlet,icon.An,tooltip.oV],styles:[search_container_componentngResource_default()]})],NgxSearchContainerComponent)},"./projects/story-book/src/search-container/search-container.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{__namedExportsOrder:()=>__namedExportsOrder,customTooltips:()=>customTooltips,default:()=>__WEBPACK_DEFAULT_EXPORT__,initialValue:()=>initialValue,searchWithLists:()=>searchWithLists,standard:()=>standard});var _angular_forms__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__("./node_modules/@angular/forms/fesm2022/forms.mjs"),_angular_material_list__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__("./node_modules/@angular/material/fesm2022/list.mjs"),_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("./node_modules/@angular/material/fesm2022/tooltip.mjs"),_storybook_angular__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/@storybook/angular/dist/index.mjs"),_search_container_src_search_container_component__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./projects/search-container/src/search-container.component.ts");const __WEBPACK_DEFAULT_EXPORT__={title:"Components/Search Container",component:_search_container_src_search_container_component__WEBPACK_IMPORTED_MODULE_1__.A,decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_search_container_src_search_container_component__WEBPACK_IMPORTED_MODULE_1__.l,_angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__.oV,_angular_forms__WEBPACK_IMPORTED_MODULE_3__.YN]})],tags:["autodocs"],parameters:{docs:{description:{component:"The `NgxSearchContainerComponent` provides a flexible search interface with customizable tooltips for actions such as clearing, opening, and closing the search. It integrates with an input field via the `ngx-search-input` directive to enable search functionality."}},backgrounds:{default:"Dark"}},argTypes:{clearTooltip:{control:"text",description:"Tooltip text for the clear button in the search container. This is displayed when the user hovers over the clear button.",table:{type:{summary:"string"},defaultValue:{summary:"Effacer la recherche"}}},openSearchTooltip:{description:"Tooltip text for the button that opens the search. This is displayed when the user hovers over the search button.",control:"text",table:{type:{summary:"string"},defaultValue:{summary:"Ouvrir la recherche"}}},closeSearchTooltip:{description:"Tooltip text for the button that closes the search. This is displayed when the user hovers over the close button.",control:"text",table:{type:{summary:"string"},defaultValue:{summary:"Quitter la recherche"}}}},args:{clearTooltip:"Effacer la recherche",openSearchTooltip:"Ouvrir la recherche",closeSearchTooltip:"Quitter la recherche"}},standard={parameters:{docs:{description:{story:"Displays a basic search container with default tooltips. Includes an input field for search queries."}}},render:args=>({props:args,template:'\n            <ngx-search-container\n              [clearTooltip]="clearTooltip"\n              [openSearchTooltip]="openSearchTooltip"\n              [closeSearchTooltip]="closeSearchTooltip">\n              <input ngx-search-input type="text" placeholder="Rechercher dans la liste" [(ngModel)]="searchModel" />\n            </ngx-search-container>\n          '})},customTooltips={parameters:{docs:{description:{story:"Shows the search container with custom tooltip texts for clear, open, and close actions."}}},...standard,args:{clearTooltip:"Clear search",openSearchTooltip:"Start searching",closeSearchTooltip:"Close search"}},searchWithLists={decorators:[(0,_storybook_angular__WEBPACK_IMPORTED_MODULE_0__.moduleMetadata)({imports:[_angular_material_list__WEBPACK_IMPORTED_MODULE_4__.jt,_angular_material_list__WEBPACK_IMPORTED_MODULE_4__.YE]})],parameters:{docs:{description:{story:"Demonstrates the search container with a full list and search functionality. The search input filters the list based on user input and displays the results in separate sections."}}},render:args=>({props:{...args,fullList:["lion","tigre","éléphant","giraffe","panda","koala","limace","cygne","chat","ours","faisan","dauphin","paon","furet","panda","phoque","crocodile","gorille","raie","chinchilla","cafard","faisan","corbeau","dromadaire","alpaga","aigle","espadon","canari","guépard"],searchList:[],searchModel:"",searchQueryChanged(event){this.searchList=event&&""!==event?this.fullList.filter((animal=>animal.includes(event))):this.fullList}},template:'\n            <section>\n              <ngx-search-container [clearTooltip]="clearTooltip">\n                <input ngx-search-input type="text" placeholder="Rechercher dans la liste" [(ngModel)]="searchModel" (ngModelChange)="searchQueryChanged($event)" />\n              </ngx-search-container>\n              <br />\n              <div class="listsContainer">\n                <div class="fullList">\n                  <span>Liste complète</span>\n                  <mat-list role="list">\n                    @for (animal of fullList; track $index) {\n                        <mat-list-item role="listitem">{{ animal }}</mat-list-item>\n                    }\n                  </mat-list>\n                </div>\n                <div class="searchList">\n                  <span>Liste issue de la recherche</span>\n                  <mat-list role="list">\n                    @for (animal of searchList; track $index) {\n                        <mat-list-item role="listitem">{{ animal }}</mat-list-item>\n                    }\n                  </mat-list>\n                </div>\n              </div>\n            </section>\n          ',styles:["\n            section {\n              padding: 5rem;\n              font-family: 'Roboto';\n              background-color: initial;\n            }\n\n            .listsContainer {\n              display: flex;\n              gap: 5px;\n            }\n\n            .fullList,\n            .searchList {\n              flex: auto;\n            }\n\n            .mdc-list-item.mdc-list-item--with-one-line {\n              height: 24px;\n            }\n          "]}),args:{clearTooltip:"Effacer la recherche"}},initialValue={parameters:{docs:{description:{story:"Demonstrates the search container with an initial value."}}},render:args=>({props:{...args,search:"My initial search",log:event=>{console.log(event)}},template:'\n            <section>\n              <ngx-search-container clearTooltip="Clear search">\n                <input ngx-search-input type="text" placeholder="Search..." [(ngModel)]="search" (ngModelChange)="log($event)" />\n              </ngx-search-container>\n              <br />\n              <span>Current value:</span>\n              <pre>{{search}}</pre>\n            </section>\n          ',styles:["\n            section {\n              padding: 5rem;\n              font-family: 'Roboto';\n              background-color: initial;\n            }\n          "]})},__namedExportsOrder=["standard","customTooltips","searchWithLists","initialValue"];standard.parameters={...standard.parameters,docs:{...standard.parameters?.docs,source:{originalSource:'{\n  parameters: {\n    docs: {\n      description: {\n        story: \'Displays a basic search container with default tooltips. Includes an input field for search queries.\'\n      }\n    }\n  },\n  render: args => ({\n    props: args,\n    template: `\n            <ngx-search-container\n              [clearTooltip]="clearTooltip"\n              [openSearchTooltip]="openSearchTooltip"\n              [closeSearchTooltip]="closeSearchTooltip">\n              <input ngx-search-input type="text" placeholder="Rechercher dans la liste" [(ngModel)]="searchModel" />\n            </ngx-search-container>\n          `\n  })\n}',...standard.parameters?.docs?.source}}},customTooltips.parameters={...customTooltips.parameters,docs:{...customTooltips.parameters?.docs,source:{originalSource:"{\n  parameters: {\n    docs: {\n      description: {\n        story: 'Shows the search container with custom tooltip texts for clear, open, and close actions.'\n      }\n    }\n  },\n  ...standard,\n  args: {\n    clearTooltip: 'Clear search',\n    openSearchTooltip: 'Start searching',\n    closeSearchTooltip: 'Close search'\n  }\n}",...customTooltips.parameters?.docs?.source}}},searchWithLists.parameters={...searchWithLists.parameters,docs:{...searchWithLists.parameters?.docs,source:{originalSource:"{\n  decorators: [moduleMetadata({\n    imports: [MatList, MatListItem]\n  })],\n  parameters: {\n    docs: {\n      description: {\n        story: 'Demonstrates the search container with a full list and search functionality. The search input filters the list based on user input and displays the results in separate sections.'\n      }\n    }\n  },\n  render: args => ({\n    props: {\n      ...args,\n      fullList: ['lion', 'tigre', 'éléphant', 'giraffe', 'panda', 'koala', 'limace', 'cygne', 'chat', 'ours', 'faisan', 'dauphin', 'paon', 'furet', 'panda', 'phoque', 'crocodile', 'gorille', 'raie', 'chinchilla', 'cafard', 'faisan', 'corbeau', 'dromadaire', 'alpaga', 'aigle', 'espadon', 'canari', 'guépard'],\n      searchList: [],\n      searchModel: '',\n      searchQueryChanged(event: string): void {\n        // If search query is empty, reset searchList to fullList\n        if (!event || event === '') {\n          this['searchList'] = this['fullList'] as string[];\n        } else {\n          this['searchList'] = (this['fullList'] as string[]).filter((animal: string) => animal.includes(event));\n        }\n      }\n    },\n    template: `\n            <section>\n              <ngx-search-container [clearTooltip]=\"clearTooltip\">\n                <input ngx-search-input type=\"text\" placeholder=\"Rechercher dans la liste\" [(ngModel)]=\"searchModel\" (ngModelChange)=\"searchQueryChanged($event)\" />\n              </ngx-search-container>\n              <br />\n              <div class=\"listsContainer\">\n                <div class=\"fullList\">\n                  <span>Liste complète</span>\n                  <mat-list role=\"list\">\n                    @for (animal of fullList; track $index) {\n                        <mat-list-item role=\"listitem\">{{ animal }}</mat-list-item>\n                    }\n                  </mat-list>\n                </div>\n                <div class=\"searchList\">\n                  <span>Liste issue de la recherche</span>\n                  <mat-list role=\"list\">\n                    @for (animal of searchList; track $index) {\n                        <mat-list-item role=\"listitem\">{{ animal }}</mat-list-item>\n                    }\n                  </mat-list>\n                </div>\n              </div>\n            </section>\n          `,\n    styles: [`\n            section {\n              padding: 5rem;\n              font-family: 'Roboto';\n              background-color: initial;\n            }\n\n            .listsContainer {\n              display: flex;\n              gap: 5px;\n            }\n\n            .fullList,\n            .searchList {\n              flex: auto;\n            }\n\n            .mdc-list-item.mdc-list-item--with-one-line {\n              height: 24px;\n            }\n          `]\n  }),\n  args: {\n    clearTooltip: 'Effacer la recherche'\n  }\n}",...searchWithLists.parameters?.docs?.source}}},initialValue.parameters={...initialValue.parameters,docs:{...initialValue.parameters?.docs,source:{originalSource:'{\n  parameters: {\n    docs: {\n      description: {\n        story: \'Demonstrates the search container with an initial value.\'\n      }\n    }\n  },\n  render: args => ({\n    props: {\n      ...args,\n      search: \'My initial search\',\n      log: (event: string): void => {\n        console.log(event);\n      }\n    },\n    template: `\n            <section>\n              <ngx-search-container clearTooltip="Clear search">\n                <input ngx-search-input type="text" placeholder="Search..." [(ngModel)]="search" (ngModelChange)="log($event)" />\n              </ngx-search-container>\n              <br />\n              <span>Current value:</span>\n              <pre>{{search}}</pre>\n            </section>\n          `,\n    styles: [`\n            section {\n              padding: 5rem;\n              font-family: \'Roboto\';\n              background-color: initial;\n            }\n          `]\n  })\n}',...initialValue.parameters?.docs?.source}}}},"./projects/search-container/src/search-container.component.scss?ngResource":(module,__unused_webpack_exports,__webpack_require__)=>{var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/noSourceMaps.js"),___CSS_LOADER_EXPORT___=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js")(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);___CSS_LOADER_EXPORT___.push([module.id,"ngx-search-container {\n  flex: 1 1 auto;\n  display: flex;\n  padding-left: 0.5rem;\n}\nngx-search-container .ngx-search-container {\n  width: 100%;\n  transition: 0.3s ease-in-out;\n  border-radius: 4px;\n  height: 40px;\n  display: flex;\n}\nngx-search-container .ngx-search-container.mobile {\n  justify-self: flex-end;\n}\nngx-search-container .ngx-search-container:not(.mobile) {\n  min-width: 35vw;\n  max-width: 800px;\n}\nngx-search-container .ngx-search-container .mat-icon {\n  padding: 0.5rem;\n}\nngx-search-container .ngx-search-container .icon-clear {\n  cursor: pointer;\n}\nngx-search-container .ngx-search-container input {\n  width: 100%;\n  background: none;\n  border: none;\n  outline: none;\n  font-size: 1.2rem;\n}\nngx-search-container .ngx-search-container input:focus {\n  outline: none;\n}\nngx-search-container .ngx-search-container-mobile {\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n  height: 40px;\n}\nngx-search-container .ngx-search-container-mobile.active {\n  display: flex;\n  align-items: center;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100vw;\n  height: 56px;\n  z-index: 10;\n}\nngx-search-container .ngx-search-container-mobile .mat-icon {\n  padding: 0.5rem;\n}\nngx-search-container .ngx-search-container-mobile .icon-close-search,\nngx-search-container .ngx-search-container-mobile .icon-open-search {\n  cursor: pointer;\n}",""]),module.exports=___CSS_LOADER_EXPORT___.toString()}}]);