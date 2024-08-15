import { CommonModule } from '@angular/common';
import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxOverlayComponent } from '../../../../overlay/src/overlay.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { provideAnimations } from '@angular/platform-browser/animations';

const meta: Meta<NgxOverlayComponent> = {
    title: 'Components/Overlay',
    component: NgxOverlayComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideAnimations(),  // Fournit les animations à l'application
            ],
        }),
        moduleMetadata({
            imports: [
                CommonModule, MatButtonModule, MatIconModule, MatFormFieldModule, FormsModule, MatInputModule, ReactiveFormsModule
            ]
        })
    ],
    tags: ['autodocs'],
    argTypes: {
        width: {
            table: {
                type: { summary: 'string' }
            }
        },
        widthForMobile: {
            table: {
                type: { summary: 'string' }
            }
        },
        isMobile: {
            table: {
                type: { summary: 'boolean' }
            }
        },
        overlayBackdropClass: {
            table: {
                type: { summary: 'string' }
            }
        },
        overlayContainerClass: {
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        width: "400px",
        widthForMobile: "200px",
        isMobile: false,
        overlayBackdropClass: '',
        overlayContainerClass: ''
    },
    parameters: {
        docs: {
            description: {
                component: 'This component allows you to display an overlay which will be visible above your page'
            }
        }
    }
};
export default meta;
type Story = StoryObj<NgxOverlayComponent>;

export const standard: Story = {
    render: args => ({
        props: {
            ...args,
            selected: '',
            items: [
                { text: 'Refresh' },
                { text: 'Settings' },
                { text: 'Help', disabled: true },
                { text: 'Sign Out' }
            ],
            select(text: string): void {
                this["selected"] = text;
            }
        },
        template: `
        <section class="overlay">
                    <button mat-icon-button (click)="menu.show($event)">
                        <mat-icon>more_vert</mat-icon>
                    </button>

                <ngx-overlay #menu overlayContainerClass="ngx-menu" [width]="width" [widthForMobile]="widthForMobile" [isMobile]="isMobile">
                    <div class="ngx-menu-content button-menu">
                        <button mat-button class="ngx-menu-item" *ngFor="let item of items" (click)="select(item.text); menu.close()">
                            {{ item.text }}
                        </button>
                    </div>
                </ngx-overlay>
        </section>
      `
    })
};

export const overlayWidth: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can configure the width of your overlay with <code>width</code>'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            widthChanged(value: string): void {
                this['width'] = value;
            }
        },
        template: `
        <section class="overlay">
                    <button mat-icon-button (click)="menu.show($event)">
                        <mat-icon>more_vert</mat-icon>
                    </button>

                <ngx-overlay #menu overlayContainerClass="ngx-menu" [width]="width" overlayContainerClass="customContainerForWidth">
                    <div class="ngx-menu-content button-menu">
                        Try to modify the width of the NgxOverlay component. This text will be limited in width by this value
                        <br /><br />
                        Current width: [{{menu.width}}]
                    </div>
                </ngx-overlay>

                <div class="grouped">
                        <mat-form-field appearance="outline">
                            <mat-label>width</mat-label>
                            <input matInput type="string" [ngModel]="width" (ngModelChange)="widthChanged($event)" />
                            <mat-hint><strong>try 900</strong> </mat-hint>
                        </mat-form-field>
                </div>
        </section>
      `
    })
};

/**
   @todo: Je ne sais pas comment fonctionne l'overlay sur mobile, supprimer les tags quand OK
**/
export const overlayForMobile: Story = {
    tags: ['!dev', '!autodocs'], // Pour disable sur le menu à gauche !dev, et sur la doc !autodocs
    parameters: {
        docs: {
            description: {
                story: 'You can also set a <code>widthForMobile</code> which will be taken into account if you set <code>isMobile</code> to true.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="overlay">
                    <button #owner mat-icon-button (click)="menu.show($event)">
                        <mat-icon>more_vert</mat-icon>
                    </button>

                <ngx-overlay #menu overlayContainerClass="ngx-menu" [width]="width" [widthForMobile]="widthForMobile" [isMobile]="isMobile" overlayContainerClass="customContainerForWidth" [ownerElement]="owner">
                    <div class="ngx-menu-content button-menu">
                        Try to modify the width of the NgxOverlay component this text will be limited in width by this value
                        <br /><br />
                        Current width: [{{menu.width}}]
                    </div>
                </ngx-overlay>
        </section>
      `
    }),
    args: {
        widthForMobile: '200px',
        isMobile: true
    }
};

export const overlayClass: Story = {
    parameters: {
        docs: {
            description: {
                story: 'You can provide two custom css classes to the component: <ul><li><code>overlayContainerClass</code>allows you to customize the overlay itself</li><li><code>overlayBackdropClass</code>allows you to customize the overlay backdrop</li></ul>'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            selected: '',
            items: [
                { text: 'Refresh' },
                { text: 'Settings' },
                { text: 'Help', disabled: true },
                { text: 'Sign Out' }
            ],
            select(text: string): void {
                this["selected"] = text;
            }
        },
        template: `
        <section class="overlay">
                        <span class="iconOverlayContainer">                        
                            <button mat-icon-button (click)="menu.show($event)">
                                <mat-icon>more_vert</mat-icon>
                            </button>
                            < Click here
                        </span>

                <ngx-overlay #menu [overlayContainerClass]="overlayContainerClass" [overlayBackdropClass]="overlayBackdropClass">
                    <div class="ngx-menu-content button-menu">
                        <button mat-button class="ngx-menu-item" *ngFor="let item of items" (click)="select(item.text); menu.close()">
                            {{ item.text }}
                        </button>
                    </div>
                </ngx-overlay>
        </section>
      `
    }),
    args: {
        overlayContainerClass: "myCustomContainerClass",
        overlayBackdropClass: "myCustomBackdropClass"
    }
};

export const textContainerExample: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Example of the NgxOverlay component containing an entire text, with a custom style'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            selected: '',
            items: [
                { text: 'Refresh' },
                { text: 'Settings' },
                { text: 'Help', disabled: true },
                { text: 'Sign Out' }
            ],
            select(text: string): void {
                this["selected"] = text;
            }
        },
        template: `
        <section class="overlay">
                        <span class="iconOverlayContainer">
                                                    Click here >
                        
<button mat-icon-button (click)="ipsum.show($event)">
    <mat-icon>more_vert</mat-icon>
</button>
                        </span>


<ngx-overlay #ipsum [overlayContainerClass]="overlayContainerClass" [overlayBackdropClass]="overlayBackdropClass">
<div class="ngx-menu-content">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla euismod, lacus nec imperdiet pretium, purus nisi hendrerit velit, non laoreet est velit sit amet arcu. Cras eget malesuada tortor. Aliquam vitae libero tellus. Quisque at velit sed arcu feugiat imperdiet ut quis augue. Cras laoreet eleifend tellus varius laoreet. Vestibulum vulputate sagittis sapien, eget euismod metus. Sed ut lacus at risus tristique blandit. Cras at nibh augue. Nam felis felis, facilisis sed fringilla a, porta id magna. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc eget velit a enim pharetra volutpat quis eget lacus. Donec imperdiet magna metus, auctor pretium nibh dictum eu. Sed pharetra tristique sodales. Nam dapibus porta imperdiet. Pellentesque elementum
    tristique molestie. Sed at dolor et mauris vehicula vestibulum. Maecenas cursus vulputate convallis. Quisque eu imperdiet nunc. Nunc ut feugiat eros. Integer aliquam nibh nec est sollicitudin dictum at et diam. Aliquam neque magna, condimentum non dolor in, faucibus malesuada mauris. Sed dictum massa neque, quis venenatis justo consequat sed. Fusce imperdiet purus nec neque vestibulum, vel placerat enim porta. Duis turpis purus, suscipit vitae scelerisque sed, sollicitudin a sem. Nullam orci risus, suscipit non mollis non, semper sit amet enim. In vel eros justo. Etiam gravida dolor vitae commodo tincidunt. Ut consequat id odio ac scelerisque. Phasellus fringilla et nisi at convallis. Nunc efficitur est in luctus interdum. Curabitur risus turpis, gravida in ex
    id, elementum convallis augue. Duis laoreet condimentum purus, sit amet vulputate dolor finibus ac. Proin consectetur ullamcorper orci ut ullamcorper. Vivamus ornare leo vel urna molestie porta. Vivamus malesuada velit eros, non rutrum urna elementum ut. Pellentesque sed lorem tempor, consectetur sem in, condimentum justo. Vivamus eu nunc interdum, mattis turpis nec, accumsan neque. Integer convallis porttitor turpis feugiat placerat. Nulla sodales ex in neque lobortis, vel mollis turpis interdum. Mauris pharetra ex a justo maximus, at semper metus feugiat. Nullam aliquet tortor nec tortor auctor venenatis. Proin id laoreet eros, id sodales mi. Vestibulum mollis orci nec orci posuere dapibus. Integer placerat, nisl id aliquam interdum, diam est vestibulum purus,
    non venenatis turpis lacus in felis. Vestibulum pulvinar velit tortor, ut convallis turpis condimentum ut. Nunc auctor hendrerit augue, sed malesuada quam. Etiam varius interdum risus, eget gravida libero convallis sed. Aliquam tempor orci at ex ullamcorper mollis. Fusce imperdiet ut ex in gravida. Curabitur iaculis non diam vel consequat. Praesent a magna posuere, feugiat mauris nec, sollicitudin ligula. Sed faucibus viverra velit eget porttitor. Suspendisse a sem gravida, tincidunt lacus vitae, lobortis ante. Nulla nisl quam, ultrices non nunc eget, commodo luctus metus. Curabitur nulla erat, gravida in nulla vel, commodo vestibulum ligula. Quisque quis lectus vel urna luctus gravida eget id risus.
</div>
</ngx-overlay>
        </section>
      `
    }),
    args: {
        overlayContainerClass: 'customContainerForLorem',
        overlayBackdropClass: 'myCustomBackdropClass',
        width: "100vw"
    }
};

/**
   @todo: Je ne sais pas comment fonctionne l'input ownerElement, supprimer les tags quand OK
**/
export const ownerElement: Story = {
    tags: ['!dev', '!autodocs'], // Pour disable sur le menu à gauche !dev, et sur la doc !autodocs
    parameters: {
        docs: {
            description: {
                story: 'You can provide two custom css classes to the component: <ul><li><code>overlayContainerClass</code>allows you to customize the overlay itself</li><li><code>overlayBackdropClass</code>allows you to customize the overlay backdrop</li></ul>'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            selected: '',
            items: [
                { text: 'Refresh' },
                { text: 'Settings' },
                { text: 'Help', disabled: true },
                { text: 'Sign Out' }
            ],
            select(text: string): void {
                this["selected"] = text;
            }
        },
        template: `
        <section class="overlay">
                        <span class="iconOverlayContainer">                        
                            <button mat-icon-button (click)="menu.show($event)">
                                <mat-icon>more_vert</mat-icon>
                            </button>
                            < Click here
                        </span>

                        <div class="ownerContainer">
                            <span id="owner" #owner>I am is owner</span>
                        </div>

                <ngx-overlay #menu [overlayContainerClass]="overlayContainerClass" [overlayBackdropClass]="overlayBackdropClass" [ownerElement]="owner">
                    <div class="ngx-menu-content button-menu">
                        <button mat-button class="ngx-menu-item" *ngFor="let item of items" (click)="select(item.text); menu.close()">
                            {{ item.text }}
                        </button>
                    </div>
                </ngx-overlay>
        </section>
      `
    }),
    args: {
        overlayContainerClass: "myCustomContainerClass",
        overlayBackdropClass: "myCustomBackdropClass"
    }
};

export const navigationExample: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Here an example of navigation through the component'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            selected: '',
            items: [
                { text: 'Refresh' },
                { text: 'Settings' },
                { text: 'Help', disabled: true },
                { text: 'Sign Out' }
            ],
            select(text: string): void {
                this["selected"] = text;
            }
        },
        template: `
        <section class="overlay">
                        <span class="iconOverlayContainer">                        
                            <button mat-icon-button (click)="anchorMenu.show($event)">
                                <mat-icon>more_vert</mat-icon>
                            </button>
                            Clicking these will navigate
                        </span>
                    <ngx-overlay #anchorMenu overlayContainerClass="ngx-menu" positions="start top start bottom">
                        <div class="ngx-menu-content anchor-menu">
                            <a class="ngx-menu-item" *ngFor="let item of items" href="http://www.google.com" target="_blank">
                                {{ item.text }}
                            </a>
                        </div>
                    </ngx-overlay>
        </section>
      `
    })
};