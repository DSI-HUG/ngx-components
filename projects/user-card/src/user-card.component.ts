import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { UserCardAdapterService } from './adapters/user-card-adapter.services';
import { UserCardAdapteLegacyService } from './adapters/user-card-adapter-legacy.services';
import { UserCardDisplayModel } from './adapters/user-card-display.model';
import { NgxUserCardIntl } from './providers';
import { NgxUserCard } from './user-card.model';


@Component({
    selector: 'ngx-user-card',
    styleUrls: ['./user-card.component.scss'],
    templateUrl: './user-card.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        NgClass
    ]
})
export class NgxUserCardComponent implements OnChanges {

    @Input()
    public user!: NgxUserCard;

    protected userCard!: UserCardDisplayModel;
    protected readonly intl = inject(NgxUserCardIntl, { optional: true });

    private _expanded = true;
    private readonly userCardAdapterLegacy = inject(UserCardAdapteLegacyService);
    private readonly userCardAdapter = inject(UserCardAdapterService);

    @Input()
    public set expanded(value: BooleanInput) {
        this._expanded = coerceBooleanProperty(value);
    }

    public get expanded(): BooleanInput {
        return this._expanded;
    }

    @Input()
    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['user']) {
            this.userCard = (this.user?.userCardBadgeColor)
                ? this.userCardAdapter.buildDisplayableUserCard(this.user)
                : this.userCardAdapterLegacy.buildDisplayableUserCard(this.user);
        }
    }

}
