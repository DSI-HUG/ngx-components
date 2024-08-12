import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

import { NgxSearchContainerComponent, NgxSearchInputDirective } from '../../../../search-container/src/search-container.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';


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
            MatTooltipModule,
          ],
        }),
      ],
    tags: ['autodocs'],
      argTypes: {
        clearTooltip: { control: 'text' },
        openSearchTooltip: { control: 'text' },
        closeSearchTooltip: { control: 'text' },
      },
    };
    export default meta;

    type Story = StoryObj<NgxSearchContainerComponent>;

    export const standard: Story = {
        render: (args) => ({
          props: args,
          template: `
            <ngx-search-container 
              [clearTooltip]="clearTooltip" 
              [openSearchTooltip]="openSearchTooltip" 
              [closeSearchTooltip]="closeSearchTooltip">
              <input ngx-search-input type="text" placeholder="Rechercher dans la liste" [(ngModel)]="searchModel" />
            </ngx-search-container>
          `,
        }),
        args: {
          clearTooltip: 'Effacer la recherche',
          openSearchTooltip: 'Ouvrir la recherche',
          closeSearchTooltip: 'Quitter la recherche'
        },
      };
      
      export const customTooltips: Story = {
        ...standard,
        args: {
          clearTooltip: 'Clear search',
          openSearchTooltip: 'Start searching',
          closeSearchTooltip: 'Close search'
        },
      };

      export const searchWithLists: Story = {
        render: (args) => ({
          props: {
            ...args,
            fullList: ['lion', 'tigre', 'éléphant', 'giraffe', 'panda', 'koala', 'limace',
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
                    this['searchList'] = this['fullList'] as Array<string>;
                } else {
                    this['searchList'] = (this['fullList']  as Array<string>).filter((animal: string) => animal.includes(event)) as Array<string>;
        
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
          `],
        }),
        args: {
          clearTooltip: 'Effacer la recherche',
        },
      };