const {
    request
} = require('../../api/index')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        chatList: [{
            id: 1,
            msg: '您好，很高兴您的到来！',
            type: 0,
        }, {
            id: 2,
            msg: '开始您的提问吧～',
            type: 0,
        }],
        inputValue: '',
        loading: false,
    },

    bindKeyInput(e) {
        const value = e.detail.value
        this.setData({
            inputValue: value,
        })
    },

    onShareAppMessage (res) {
        return {
          title: 'chatgpt 对话机器人',
          path: '/pages/chatgpt/chatgpt',
        }
    },

    sumbmit() {
        const { inputValue, chatList, loading } = this.data
        if (loading) return
        const info = {
            msg: inputValue,
            type: 1
        }
        chatList.push(info)
        this.setData({
            chatList,
            inputValue: ''
        }, () => {
            this.sendMsgOpenAi(inputValue)
        })
    },

    sendMsgOpenAi(keyword) {
        this.setData({
            loading: true,
        })
        request({
            url: '/sendmsg',
            method: 'post',
            data: {
                keyword,
            }
        }).then((res) => {
            const { chatList } = this.data;
            const { msg } = res;
            const info = {
                type: 0,
                msg,
            }
            chatList.push(info)
            this.setData({
                chatList
            })
        }).finally(() => {
            this.setData({
                loading: false,
            })
        })
    },

    shareTopage() {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
    },
    
    jumpPage() {
        wx.navigateTo({
            url: '/pages/home/home',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.shareTopage()
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})