import { FormsModule } from '@angular/forms';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

import { NgxSplitAreaDirective } from '../../../splitter/m2/split-area.directive';
import { NgxSplitterComponent } from '../../../splitter/m2/splitter.component';

const meta: Meta<NgxSplitterComponent> = {
    title: 'Components/Splitter',
    component: NgxSplitterComponent,
    decorators: [
        moduleMetadata({
            imports: [
                NgxSplitAreaDirective
            ]
        })
    ],
    tags: ['autodocs'],
    argTypes: {
        direction: {
            description: 'Sets the direction of the split, which can either be `horizontal` or `vertical`.',
            control: 'select',
            options: ['horizontal', 'vertical'],
            table: {
                type: { summary: 'NgxSplitterDirection' },
                defaultValue: { summary: 'horizontal' }
            }
        },
        gutterSize: {
            description: 'Specifies the width of the gutter in pixels.',
            control: 'number',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '10' }
            }
        },
        disabled: {
            description: 'Determines whether the splitter is active or disabled.',
            control: 'boolean',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        dragStart: {
            description: 'Event triggered when the user starts dragging the cursor.',
            action: 'dragStart',
            table: {
                type: { summary: 'EventEmitter<void>' }
            }
        },
        dragProgress: {
            description: 'Event triggered during the cursor drag, providing the progress as a percentage.',
            action: 'dragProgress',
            table: {
                type: { summary: 'EventEmitter<number>' }
            }
        },
        dragEnd: {
            description: 'Event triggered when the user stops dragging the cursor.',
            action: 'dragEnd',
            table: {
                type: { summary: 'EventEmitter<void>' }
            }
        }
    },
    parameters: {
        docs: {
            description: {
                component: 'The `NgxSplitterComponent` allows splitting a container into resizable parts either horizontally or vertically. It supports dynamic resizing, event callbacks during drag operations, and flexible gutter sizing.'
            }
        }
    },
    args: {
        direction: 'horizontal',
        gutterSize: '10',
        disabled: false
    }
};
export default meta;

type Story = StoryObj<NgxSplitterComponent>;

export const standard: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story demonstrates the standard usage of `NgxSplitterComponent`, where the container is split into two resizable areas in a horizontal direction. The first area takes 25% of the space, while the second area takes 75%.'
            }
        }
    },
    render: args => ({
        props: args,
        template: `
        <section class="splitter">
            <ngx-splitter [direction]="direction" [gutterSize]="gutterSize" [disabled]="disabled" order="1">
                <ngx-split-area size="25" minSizePixel="100">
                    <p>Lorem ipsum dolor sit amet...</p>
                </ngx-split-area>
                <ngx-split-area size="75" minSizePixel="100">
                    <p>Sed ut perspiciatis unde omnis iste natus erro...</p>
                </ngx-split-area>
            </ngx-splitter>
        </section>
        `
    }),
    args: {
        direction: 'horizontal'
    }
};

export const verticalSplit: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story illustrates a vertical splitter, dividing the container into two areas. The first area occupies 25% of the height, while the second takes 75%.'
            }
        }
    },
    render: args => ({
        props: args,
        template: `
        <section class="splitter">
            <ngx-splitter [direction]="direction" [gutterSize]="gutterSize" [disabled]="disabled" order="1">
                <ngx-split-area size="25" minSizePixel="100">Area 1</ngx-split-area>
                <ngx-split-area size="75" minSizePixel="100">Area 2</ngx-split-area>
            </ngx-splitter>
        </section>
        `
    }),
    args: {
        direction: 'vertical'
    }
};

export const disabledSplitter: Story = {
    parameters: {
        docs: {
            description: {
                story: 'In this story, the splitter is disabled, preventing the user from resizing the areas.'
            }
        }
    },
    render: args => ({
        props: args,
        template: `
        <section class="splitter">
            <ngx-splitter [direction]="direction" [gutterSize]="gutterSize" [disabled]="disabled" order="1">
                <ngx-split-area size="25" minSizePixel="100">Area 1</ngx-split-area>
                <ngx-split-area size="75" minSizePixel="100">Area 2</ngx-split-area>
            </ngx-splitter>
        </section>
        `
    }),
    args: {
        disabled: true
    }
};

export const gutterSizeControl: Story = {
    decorators: [
        moduleMetadata({
            imports: [
                MatButtonToggleGroup, MatButtonToggle
            ]
        })
    ],
    parameters: {
        docs: {
            description: {
                story: 'This story showcases the ability to control the gutter size dynamically. Use the buttons to change the gutter size between predefined values.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            changeGutterSize(size: number): void {
                this['gutterSize'] = size;
            }
        },
        template: `
        <section class="splitter bigger">
            <ngx-splitter [direction]="direction" [gutterSize]="gutterSize" [disabled]="disabled" order="1">
                <ngx-split-area size="25" minSizePixel="100">Area 1</ngx-split-area>
                <ngx-split-area size="75" minSizePixel="100">Area 2</ngx-split-area>
            </ngx-splitter>
            <br />
            <div class="matButtonContainer">
                <mat-button-toggle-group name="gutterSize" (change)="changeGutterSize($event.value)" [value]="gutterSize">
                    <mat-button-toggle value="5">5px</mat-button-toggle>
                    <mat-button-toggle value="10">10px</mat-button-toggle>
                    <mat-button-toggle value="45">45px</mat-button-toggle>
                    <mat-button-toggle value="100">100px</mat-button-toggle>
                </mat-button-toggle-group>
            </div>
        </section>
        `
    })
};

export const combinedSplitters: Story = {
    parameters: {
        docs: {
            description: {
                story: 'This story presents a combination of two splitters: a vertical splitter nested inside a horizontal splitter. This allows creating a complex layout with resizable areas in both directions.'
            }
        }
    },
    render: args => ({
        props: {
            ...args
        },
        template: `
        <section class="splitter combined">
            <!-- Horizontal Splitter -->
            <ngx-splitter [direction]="'horizontal'" [gutterSize]="gutterSize" order="1">
                <!-- First Horizontal Area -->
                <ngx-split-area size="50" minSizePixel="100">
                    <!-- Vertical Splitter Inside the First Horizontal Area -->
                    <ngx-splitter [direction]="'vertical'" [gutterSize]="gutterSize" order="1">
                        <!-- First Vertical Area -->
                        <ngx-split-area size="50" minSizePixel="100">
                            <p>Content in the first vertical area...</p>
                        </ngx-split-area>
                        <!-- Second Vertical Area -->
                        <ngx-split-area size="50" minSizePixel="100">
                            <p>Content in the second vertical area...</p>
                        </ngx-split-area>
                    </ngx-splitter>
                </ngx-split-area>
                <!-- Second Horizontal Area -->
                <ngx-split-area size="50" minSizePixel="100">
                    <p>Content in the second horizontal area...</p>
                </ngx-split-area>
            </ngx-splitter>
        </section>
        `
    })
};


export const customizableSplitAreas: Story = {
    decorators: [
        moduleMetadata({
            imports: [
                MatFormField, MatLabel, FormsModule, MatInput
            ]
        })
    ],
    parameters: {
        docs: {
            description: {
                story: 'This story provides an example of how to customize the properties of each split area dynamically. It allows changing the size and minimum size of each area through input fields.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            firstAreaSize: 50,
            secondAreaSize: 50,
            firstAreaMinSize: 100,
            secondAreaMinSize: 10,
            firstAreaSizeChanged(size: number): void {
                if (size > 100) {
                    size = 100;
                } else if (size < 0) {
                    size = 0;
                }
                this['firstAreaSize'] = size;
                this['secondAreaSize'] = 100 - size;
            },
            secondAreaSizeChanged(size: number): void {
                if (size > 100) {
                    size = 100;
                } else if (size < 0) {
                    size = 0;
                }
                this['secondAreaSize'] = size;
                this['firstAreaSize'] = 100 - size;
            },
            firstAreaMinSizeChanged(size: number): void {
                this['firstAreaMinSize'] = size;
            },
            secondAreaMinSizeChanged(size: number): void {
                this['secondAreaMinSize'] = size;
            }
        },
        template: `
        <section class="splitter bigger">
            <ngx-splitter [direction]="direction" [gutterSize]="gutterSize" [disabled]="disabled" order="1" class="colored">
                <ngx-split-area #firstSplitArea [size]="firstAreaSize" [minSizePixel]="firstAreaMinSize">
                    Area 1
                    <div class="minContainer left" [style.width.px]="firstAreaMinSize">FirstArea minSize</div>
                </ngx-split-area>
                <ngx-split-area #secondSplitArea [size]="secondAreaSize" [minSizePixel]="secondAreaMinSize">
                    Area 2
                    <div class="minContainer right" [style.width.px]="secondAreaMinSize">SecondArea minSize</div>
                </ngx-split-area>
            </ngx-splitter>
            <br />
            <div class="matButtonContainer">
                <div class="formfield">
                    <mat-form-field appearance="outline">
                        <mat-label>First Area Size (%)</mat-label>
                        <input matInput type="number" [ngModel]="firstAreaSize" (ngModelChange)="firstAreaSizeChanged($event)" />
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                        <mat-label>Second Area Size (%)</mat-label>
                        <input matInput type="number" [ngModel]="secondAreaSize" (ngModelChange)="secondAreaSizeChanged($event)" />
                    </mat-form-field>
                </div>
                <div class="formfield">
                    <mat-form-field appearance="outline">
                        <mat-label>First Area Minimum Size (px)</mat-label>
                        <input matInput type="number" [ngModel]="firstAreaMinSize" (ngModelChange)="firstAreaMinSizeChanged($event)" />
                    </mat-form-field>
                    <mat-form-field appearance="outline">
                        <mat-label>Second Area Minimum Size (px)</mat-label>
                        <input matInput type="number" [ngModel]="secondAreaMinSize" (ngModelChange)="secondAreaMinSizeChanged($event)" />
                    </mat-form-field>
                </div>
            </div>
        </section>
        `
    })
};
