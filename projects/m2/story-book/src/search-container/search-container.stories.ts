import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatList, MatListItem } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { NgxSearchContainerIntl, provideNgxSearchContainer } from '@hug/ngx-search-container';
import { applicationConfig, type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxSearchContainerComponent, NgxSearchInputDirective } from '../../../search-container/src/search-container.component';

@Injectable()
export class CustomNgxSearchContainerIntl extends NgxSearchContainerIntl {
    public override openSearch = '***My custom openSearch***';
    public override clearSearch = '***My custom clearSearch***';
}

const meta: Meta<NgxSearchContainerComponent> = {
    title: 'Components/Search Container',
    component: NgxSearchContainerComponent,
    decorators: [
        applicationConfig({
            providers: [
                provideNgxSearchContainer({ customIntl: CustomNgxSearchContainerIntl })
            ]
        }),
        moduleMetadata({
            imports: [
                NgxSearchInputDirective,
                MatTooltip,
                FormsModule
            ]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'The `NgxSearchContainerComponent` provides a flexible search interface with customizable tooltips for actions such as clearing, opening, and closing the search.It integrates with an input field via the `ngx-search-input` directive to enable search functionality. The tooltip for the clear button is now defined by intl.clearSearch (previously clearTooltip).'
            }
        },
        backgrounds: {
            // Set default background value for all component stories
            default: 'Dark'
        }
    }
};
export default meta;

type Story = StoryObj<NgxSearchContainerComponent>;

export const standard: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Displays a basic search container with default tooltips. Includes an input field for search queries.'
            }
        }
    },
    render: args => ({
        props: args,
        template: `
            <ngx-search-container>
              <input ngx-search-input type="text" placeholder="Rechercher dans la liste" [(ngModel)]="searchModel" />
            </ngx-search-container>
          `
    })
};

export const customTooltips: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Shows the search container with custom tooltip texts for clear, open, and close actions.'
            }
        }
    },
    ...standard
};

export const searchWithLists: Story = {
    decorators: [
        moduleMetadata({
            imports: [
                MatList, MatListItem
            ]
        })
    ],
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the search container with a full list and search functionality. The search input filters the list based on user input and displays the results in separate sections.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            fullList: ['lion',
                'tigre',
                'éléphant',
                'giraffe',
                'panda',
                'koala',
                'limace',
                'cygne',
                'chat',
                'ours',
                'faisan',
                'dauphin',
                'paon',
                'furet',
                'panda',
                'phoque',
                'crocodile',
                'gorille',
                'raie',
                'chinchilla',
                'cafard',
                'faisan',
                'corbeau',
                'dromadaire',
                'alpaga',
                'aigle',
                'espadon',
                'canari',
                'guépard'],
            searchList: [],
            searchModel: '',
            searchQueryChanged(event: string): void {
                // If search query is empty, reset searchList to fullList
                if (!event || event === '') {
                    this['searchList'] = this['fullList'] as string[];
                } else {
                    this['searchList'] = (this['fullList'] as string[]).filter((animal: string) => animal.includes(event));

                }
            }
        },
        template: `
            <section>
              <ngx-search-container>
                <input ngx-search-input type="text" placeholder="Rechercher dans la liste" [(ngModel)]="searchModel" (ngModelChange)="searchQueryChanged($event)" />
              </ngx-search-container>
              <br />
              <div class="listsContainer">
                <div class="fullList">
                  <span>Liste complète</span>
                  <mat-list role="list">
                    @for (animal of fullList; track $index) {
                        <mat-list-item role="listitem">{{ animal }}</mat-list-item>
                    }
                  </mat-list>
                </div>
                <div class="searchList">
                  <span>Liste issue de la recherche</span>
                  <mat-list role="list">
                    @for (animal of searchList; track $index) {
                        <mat-list-item role="listitem">{{ animal }}</mat-list-item>
                    }
                  </mat-list>
                </div>
              </div>
            </section>
          `,
        styles: [`
            section {
              padding: 5rem;
              font-family: 'Roboto';
              background-color: initial;
            }

            .listsContainer {
              display: flex;
              gap: 5px;
            }

            .fullList,
            .searchList {
              flex: auto;
            }

            .mdc-list-item.mdc-list-item--with-one-line {
              height: 24px;
            }
          `]
    })
};

export const initialValue: Story = {
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the search container with an initial value.'
            }
        }
    },
    render: args => ({
        props: {
            ...args,
            search: 'My initial search',
            log: (event: string): void => {
                console.log(event);
            }
        },
        template: `
            <section>
              <ngx-search-container>
                <input ngx-search-input type="text" placeholder="Search..." [(ngModel)]="search" (ngModelChange)="log($event)" />
              </ngx-search-container>
              <br />
              <span>Current value:</span>
              <pre>{{search}}</pre>
            </section>
          `,
        styles: [`
            section {
              padding: 5rem;
              font-family: 'Roboto';
              background-color: initial;
            }
          `]
    })
};
