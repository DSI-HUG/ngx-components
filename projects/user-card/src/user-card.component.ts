import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges, ViewEncapsulation } from '@angular/core';

import { UserCardDataProviderService } from './adapters/user-card-data-provider.service';
import { UserCardDataAdapterLegacyService } from './adapters/user-card-data-provider-legacy.service';
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
    private readonly userCardAdapterLegacy = inject(UserCardDataAdapterLegacyService);
    private readonly userCardAdapter = inject(UserCardDataProviderService);

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
            // Using shortTitle as a condition to determine which adapter to use for building the displayable user card.
            // If shortTitle is present, use the new adapter; otherwise, use the legacy adapter which will be removed in the future.
            this.userCard = (this.user?.shortTitle)
                ? this.userCardAdapter.buildDisplayableUserCard(this.user)
                : this.userCardAdapterLegacy.buildDisplayableUserCard(this.user);
        }
    }

}
