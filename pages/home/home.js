const {
    request
} = require('../../api/index')

const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [],
        imgHttps: app.globalData.imgHttps,
        pageSize: 40,
        pageNo: 1,
        hasMore: true,
        category_id: '',
        categoryList: [],
        loading: false,
    },

    getImageList() {
        const { pageSize, pageNo, list, category_id } = this.data;
        this.setData({
            loading: true
        })
        request({
            url: `/get_image_list?pageSize=${pageSize}&pageNo=${pageNo}&category_id=${category_id}`,
        }).then((res) => {
            const {
                data,
                hasMore
            } = res;
            console.log(hasMore, '')
            this.setData({
                list: pageNo === 1 ? data : list.concat(data),
                hasMore,
                loading: false
            })
        })
    },

    getImageCategoryList() {
        request({
            url: `/get_category_list`,
        }).then((res) => {
            const { data } = res;
            this.setData({
                categoryList: [{id: '', category_name: '全部'}].concat(data),
            })
        })
    },
    priviewImg(e) {
        const { currentTarget } = e;
        const { dataset } = currentTarget;
        const {
            list,
            imgHttps
        } = this.data;
        const urls = list.map(item => imgHttps + item.img_key);
        wx.previewImage({
            current: imgHttps + dataset.img, // 当前显示图片的 http 链接
            urls // 需要预览的图片 http 链接列表
        })
    },

    chooseCategory(e) {
        const { currentTarget } = e;
        const { dataset } = currentTarget;
        this.setData({
            category_id: dataset.id,
            pageNo: 1,
            list: [],
        }, () => {
            this.getImageList()
        })
    },
    onShareAppMessage (res) {
        return {
          title: '多玩表情',
          path: '/pages/home/home',
        }
    },
    shareTopage() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.shareTopage()
        this.getImageList()
        this.getImageCategoryList()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {
        const { hasMore, pageNo } = this.data;

        console.log(hasMore, 'xxx')
        if (!hasMore) return
        this.setData({
            pageNo: pageNo + 1,
        }, () => {
            this.getImageList()
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})