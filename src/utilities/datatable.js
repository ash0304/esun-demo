export const paginationOptions = {
    enabled: true,
    mode: 'records',
    nextLabel: '下一頁',
    prevLabel: '上一頁',
    rowsPerPageLabel: '每頁資料筆數',
    ofLabel: '/',
    pageLabel: '目前頁數',
    perPage: 25,
    perPageDropdown: [10, 25, 50, 100],
    dropdownAllowAll: false
};

export let serverReq = {
    sort: { field: "", type: "" },
    page: 1,
    perPage: 25
    //columnFilters: {},
}

export function resetServerReq(){
    serverReq = {
        sort: { field: "", type: "" },
        page: 1,
        perPage: 25
    }
}

export function updateParams(newProps) {
    serverReq = Object.assign({}, serverReq, newProps);
}

export function onPageChange(params, loadItemsFunc) {
    updateParams({ page: params.currentPage });
    loadItemsFunc(serverReq);
}

export function onPerPageChange(params, loadItemsFunc) {
    updateParams({ perPage: params.currentPerPage, page: 1 });
    loadItemsFunc(serverReq);
}

export function onSortChange(params, loadItemsFunc) {
    updateParams({
        sort: { type: params[0].type, field: params[0].field },
        page: 1
    });
    loadItemsFunc(serverReq);
}

// export function onColumnFilter(params) {
//     updateParams(params);
//     loadItems();
// }