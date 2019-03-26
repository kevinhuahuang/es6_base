// async/await较Promise的三种优势
// 1.简洁 不需要写then, 不需要写匿名函数处理Promise的resolve值，也不需要定义多余的data变量，避免嵌套。
// 2.中间值，有这样的场景，调用Promise1,使用Promise1的返回结果去调用Promise2，然后使用两者的结果去调用Promise.
const makeRequest = () => {
    return promise1()
        .then(value1 => {
            return promise2(value1)
                .then(value2 => {
                    return promise3(value1, value2)
                })
        })
}

// 使用async/await, 代码会更直观
const makeRequest = async () => {
    const value1 = await promise()
    const value2 = await promise(value1)
    return promise3(value1, value2)


}

// 3条件语句
// 下面示例中，需要获取数据，然后根据返回数据决定是直接返回，还是继续获取更多的数据。
const makeRequest = () => {
    return getJSON()
        .then(data => {
            if (data.needsAnotherRequest) {
                return makeAnotherRequest(data)
                    .then(moreData => {
                        console.log(moreData)
                        return moreData
                    })
            } else {
                console.log(data)
                return data
            }
        })
}

// 使用async/await编写可以大大地提高可读性:
const makeRequest = async () => {
    const data = await getJSON()
    if (data.needsAnotherRequest) {
        const moreData = await makeAnotherRequest(data);
        console.log(moreData)
        return moreData
    } else {
        console.log(data)
        return data
    }
}

