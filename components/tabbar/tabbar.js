Component({
    data: {
        value: 'home',
        list: [{
                value: 'home',
                icon: 'home',
                ariaLabel: '้ฆ้กต'
            },
            {
                value: 'user',
                icon: 'user',
                ariaLabel: 'ๆ็'
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