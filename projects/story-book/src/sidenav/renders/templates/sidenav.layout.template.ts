export const sidenavLayout = (content: string): string => `<div class="page layout">
    <div class="page layout">
        <div class="layout-header"></div>
        <div class="layout-container">
            <div class="layout-sidebar"></div>
            <div class="layout-panel">
                ${content}
            </div>
            <div class="layout-content"></div>
        </div>
    </div>
</div>`;
