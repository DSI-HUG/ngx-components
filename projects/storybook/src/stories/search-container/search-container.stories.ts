import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { type Meta, moduleMetadata, type StoryObj } from '@storybook/angular';

import { NgxSearchContainerComponent, NgxSearchInputDirective } from '../../../../search-container/src/search-container.component';


const meta: Meta<NgxSearchContainerComponent> = {
    title: 'Components/Search Container',
    component: NgxSearchContainerComponent,
    decorators: [
        moduleMetadata({
            imports: [
                CommonModule,
                NgxSearchInputDirective,
                FormsModule,
                MatIconModule,
                MatListModule,
                MatTooltipModule
            ]
        })
    ],
    tags: ['autodocs'],
    parameters: {
        docs: {
            description: {
                component: 'The `NgxSearchContainerComponent` provides a flexible search interface with customizable tooltips for actions such as clearing, opening, and closing the search. It integrates with an input field via the `ngx-search-input` directive to enable search functionality.'
            }
        }
    },
    argTypes: {
        clearTooltip: {
            control: 'text',
            description: 'Tooltip text for the clear button in the search container. This is displayed when the user hovers over the clear button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Effacer la recherche' }
            }
        },
        openSearchTooltip: {
            description: 'Tooltip text for the button that opens the search. This is displayed when the user hovers over the search button.',
            control: 'text',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Ouvrir la recherche' }
            }
        },
        closeSearchTooltip: {
            description: 'Tooltip text for the button that closes the search. This is displayed when the user hovers over the close button.',
            control: 'text',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Quitter la recherche' }
            }
        }
    },
    args: {
        clearTooltip: 'Effacer la recherche',
        openSearchTooltip: 'Ouvrir la recherche',
        closeSearchTooltip: 'Quitter la recherche'
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
            <ngx-search-container 
              [clearTooltip]="clearTooltip" 
              [openSearchTooltip]="openSearchTooltip" 
              [closeSearchTooltip]="closeSearchTooltip">
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
    ...standard,
    args: {
        clearTooltip: 'Clear search',
        openSearchTooltip: 'Start searching',
        closeSearchTooltip: 'Close search'
    }
};

export const searchWithLists: Story = {
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
              <ngx-search-container [clearTooltip]="clearTooltip">
                <input ngx-search-input type="text" placeholder="Rechercher dans la liste" [(ngModel)]="searchModel" (ngModelChange)="searchQueryChanged($event)" />
              </ngx-search-container>
              <br />
              <div class="listsContainer">
                <div class="fullList">
                  <span>Liste complète</span>
                  <mat-list role="list">
                    <mat-list-item role="listitem" *ngFor="let animal of fullList">{{ animal }}</mat-list-item>
                  </mat-list>
                </div>
                <div class="searchList">
                  <span>Liste issue de la recherche</span>
                  <mat-list role="list">
                    <mat-list-item role="listitem" *ngFor="let animal of searchList">{{ animal }}</mat-list-item>
                  </mat-list>
                </div>
              </div>
            </section>
          `,
        styles: [`
            section {
              padding: 5rem;
              font-family: 'Roboto';
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
    }),
    args: {
        clearTooltip: 'Effacer la recherche'
    }
};
