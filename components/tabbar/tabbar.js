Component({
    data: {
        value: 'home',
        list: [{
                value: 'home',
                icon: 'home',
                ariaLabel: '首页'
            },
            {
                value: 'user',
                icon: 'user',
                ariaLabel: '我的'
            },
        ],
    },

    methods: {
        onChange(e) {
            this.setData({
                value: e.detail.value,
            });
        },
    },
});