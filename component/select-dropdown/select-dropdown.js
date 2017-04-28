/**
 * 自定义下拉组件
 */
// let _comDate = {
//     select_showLi: false
//         // select_list: ''
// }
let _comEvent = {
    // 是否显示下拉列表
    showUl: function(e) {
        this.setData({
            select_showLi: !this.data.select_showLi
        })
    },
    mySelect: function(e) {
        this.setData({
            selected: e.target.dataset.item.key,
            selected_value: e.target.dataset.item.value
        })
    }
}

// let selectDropdown = {
//     show: function(data) {
//         this._page.setData({ 'select_showLi': false })
//         if (data) {
//             Object.assign(this._configs, data)
//         }
//     }
// }

function SelectDropdown(list) {
    //定义组件的一些回调
    let _comDate = {
            select_showLi: false,
            select_list: list
        }
        // 拿到当前页面对象
    let pages = getCurrentPages()
    let curPage = pages[pages.length - 1]
        //把组件的事件“合并到”页面对象上
    Object.assign(curPage, _comEvent)

    this._page = curPage

    // Object.assign(curPage, selectDropdown)
    //附加到page上，方便访问
    // curPage.selectDropdown = this

    curPage.setData(_comDate)

    return this
}
// var selectDropdown = {};
// selectDropdown.select = {
//     data: {
//         // selected_value: a,
//         select_showLi: false
//             // select_list: a
//     },
//     // 是否显示下拉列表
//     showUl: function(e) {
//         this.setData({
//             select_showLi: !this.data.select_showLi
//         })
//     },
//     mySelect: function(e) {
//         this.setData({
//             selected: e.target.dataset.item.key,
//             selected_value: e.target.dataset.item.value
//         })
//     }
// }

module.exports = {
    SelectDropdown
}