export const sidenavContentAccordion2 = `
<!-- Content Template : Accordion N°2 -->
<ng-template #contentAccordion2>
    <mat-accordion multi>
        <mat-expansion-panel expandLink="/item2/group1">
            <mat-expansion-panel-header>
                <mat-panel-title> Serpentard</mat-panel-title>
            </mat-expansion-panel-header>
            <mat-nav-list role="navigation">
                <a mat-list-item routerLink="/item2/group1/page1" routerLinkActive="active-link">Draven Selwyn</a>
                <a mat-list-item routerLink="/item2/group1/page2" routerLinkActive="active-link">Vesper Malthorne</a>
                <a mat-list-item routerLink="/item2/group1/page3" routerLinkActive="active-link">Sylas Morven</a>
            </mat-nav-list>
        </mat-expansion-panel>

        <mat-expansion-panel disabled>
            <mat-expansion-panel-header>
                <mat-panel-title> Gryffondor</mat-panel-title>
            </mat-expansion-panel-header>
        </mat-expansion-panel>

        <mat-expansion-panel expandLink="/item2/group2">
            <mat-expansion-panel-header>
                <mat-panel-title> Serdaigle</mat-panel-title>
            </mat-expansion-panel-header>
            <mat-nav-list role="navigation">
                <a mat-list-item routerLink="/item2/group2/page1" routerLinkActive="active-link">Lyra Thorne</a>
                <a mat-list-item routerLink="/item2/group2/page2" routerLinkActive="active-link">Orion Wexley</a>
                <a mat-list-item routerLink="/item2/group2/page3" routerLinkActive="active-link">Céline Rowe</a>
            </mat-nav-list>
        </mat-expansion-panel>
    </mat-accordion>
</ng-template>`;
