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
    },

    getImageList() {
        request({
            url: '/get_image_list?category_id=30',
        }).then((res) => {
            const {
                data
            } = res;
            this.setData({
                list: data
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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getImageList()
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
        console.log('22')
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})