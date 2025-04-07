export const sidenavContentNavList1 = `
<!-- Content Template : NavList N°1 -->
<ng-template #contentNavList1>
    <mat-list role="list">
        <h3 matSubheader>Menu</h3>
        <mat-nav-list role="navigation">
            <a mat-list-item role="listitem" routerLink="/item3/page1" routerLinkActive="active-link">Entrée</a>
            <a mat-list-item role="listitem" routerLink="/item3/page2" routerLinkActive="active-link">Plat</a>
            <a mat-list-item role="listitem" routerLink="/item3/page3" routerLinkActive="active-link">Dessert</a>
        </mat-nav-list>
    </mat-list>
</ng-template>`;
