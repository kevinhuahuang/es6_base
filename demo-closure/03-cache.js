console.log('--------------------闭包用途3：缓存----------------------------')
/**
 * 设想我们需要向接口请求所需数据，又不想保存在全局变量中，并且会多次使用，那么我们就需要将请求的数据存储起来，
 * 当调用这个函数的时候，首先在缓存中查找，如果找不到，则调用API，
 * 然后设置缓存并返回值，如果找到了，直接返回查找到的值即可。
 * 闭包正好可以做到这一点，因为它不会释放外部的引用，从而函数内部的值可以得以保留。
 * */
const getList = (function() {
    let data = {};
    const getData = () => {
        return new Promise((resolve, reject) => {
            let packageOptions = {
                url: '/your/api',
                params: {
                    normal: 1
                },
                success: function (rsp) {
                    data = rsp.data;
                    resolve();
                }
            };
            ajax(packageOptions);
        })
    }
    // 闭包存储data
    const result = async function (type) {
        if (JONS.stringify(data) === '{}') {
            await getData();
            return data;
        } else {
            return data;
        }
    }
    return result;
})();

// 第一次调用通过api请求数据
getList().then(res => {
    console.log(res);

    // 第二次调用则直接拿取缓存数据
    getList().then(res => {
        console.log(res);
    }
});