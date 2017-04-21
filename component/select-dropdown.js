/**
 * 自定义下拉组件
 */
var selectDropdown = {};
selectDropdown.select = {
    data: {
        // selected_value: a,
        select_showLi: false
            // select_list: a
    },
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

module.exports = {
    selectDropdown
}