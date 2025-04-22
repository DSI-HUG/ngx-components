export const sidenavContentAccordion1 = `
<mat-accordion multi>
    <mat-expansion-panel expandLink="/item1/group1">
        <mat-expansion-panel-header>
            <mat-panel-title> Singe</mat-panel-title>
        </mat-expansion-panel-header>
        <mat-accordion multi>
            <mat-expansion-panel expandLink="/item1/group1/subgroup1">
                <mat-expansion-panel-header>
                    <mat-panel-title> Chimpanzé</mat-panel-title>
                </mat-expansion-panel-header>
                <mat-nav-list role="navigation">
                    <a mat-list-item routerLink="/item1/group1/subgroup1/page1" routerLinkActive="active-link">Chimpanzé 01</a>
                    <a mat-list-item routerLink="/item1/group1/subgroup1/page2" routerLinkActive="active-link">Chimpanzé 02</a>
                    <a mat-list-item routerLink="/item1/group1/subgroup1/page3" routerLinkActive="active-link">Chimpanzé 03</a>
                </mat-nav-list>
            </mat-expansion-panel>
            <mat-expansion-panel disabled>
                <mat-expansion-panel-header>
                    <mat-panel-title> Capucin</mat-panel-title>
                </mat-expansion-panel-header>
                <mat-nav-list role="navigation">
                    <a mat-list-item>Capucin 01</a>
                    <a mat-list-item>Capucin 02</a>
                    <a mat-list-item>Capucin 03</a>
                </mat-nav-list>
            </mat-expansion-panel>
            <mat-expansion-panel expandLink="/item1/group1/subgroup2" routerLinkActive="active-link">
                <mat-expansion-panel-header>
                    <mat-panel-title> Mandrill</mat-panel-title>
                </mat-expansion-panel-header>
                <mat-nav-list role="navigation">
                    <a mat-list-item routerLink="/item1/group1/subgroup2/page1" routerLinkActive="active-link">Mandrill 01</a>
                    <a mat-list-item routerLink="/item1/group1/subgroup2/page2" routerLinkActive="active-link">Mandrill 02</a>
                    <a mat-list-item routerLink="/item1/group1/subgroup2/page3" routerLinkActive="active-link">Mandrill 03</a>
                </mat-nav-list>
            </mat-expansion-panel>
        </mat-accordion>
    </mat-expansion-panel>
    <mat-expansion-panel disabled>
        <mat-expansion-panel-header>
            <mat-panel-title> Giraffe</mat-panel-title>
        </mat-expansion-panel-header>
    </mat-expansion-panel>
    <mat-expansion-panel expandLink="/item1/group2" routerLinkActive="active-link">
        <mat-expansion-panel-header>
            <mat-panel-title> Félins</mat-panel-title>
        </mat-expansion-panel-header>
        <mat-nav-list role="navigation">
            <a mat-list-item routerLink="/item1/group2/page1" routerLinkActive="active-link">Chat</a>
            <a mat-list-item routerLink="/item1/group2/page2" routerLinkActive="active-link">Lion</a>
            <a mat-list-item routerLink="/item1/group2/page3" routerLinkActive="active-link">Léopard</a>
        </mat-nav-list>
    </mat-expansion-panel>
</mat-accordion>`;

export const sidenavContentAccordion1Template = `
<!-- Content Template : Accordion N°1 -->
<ng-template #contentAccordion1>
    ${sidenavContentAccordion1}
</ng-template>`;
