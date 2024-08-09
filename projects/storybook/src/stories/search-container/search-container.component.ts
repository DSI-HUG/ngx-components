import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { NgxSearchContainerComponent, NgxSearchInputDirective } from '../../../../search-container/src/search-container.component';

@Component({
    selector: 'storybook-search-container',
    templateUrl: './search-container.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule,
        MatInputModule,
        NgxSearchContainerComponent,
        NgxSearchInputDirective,
        FormsModule,
        MatListModule],
    styleUrls: ['./search-container.scss']
})
export class StorybookSearchContainerComponent {
    @Input()
    public searchModel = '';

    @Input()
    public placeholder = 'Rechercher dans la liste';

    @Input()
    public clearTooltipLabel = 'Effacer la recherche';

    protected fullList: readonly string[] = [
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
        'guépard',
        'phoque',
        'bison',
        'poney',
        'alpaga',
        'kangourou',
        'pingouin',
        'raie',
        'autruche',
        'jaguar',
        'chameau',
        'oie',
        'lama',
        'perruche',
        'mouche',
        'iguane',
        'crabe'

    ];

    protected searchList: readonly string[] = this.fullList;

    protected searchQueryChanged(value: string): void {
        if (!value || value === '') {
            this.searchList = this.fullList;
        } else {
            this.searchList = this.fullList.filter(animal => animal.includes(value));

        }
    }
}
