// await命令后面的Promise对象， 运行结果可能是rejected
// 所以最好把await命令放在try...catch代码中
async function myFunction () {
    try {
        await somethingThantReturnsAPromise()
    } catch (err) {
        console.log(err)
    }
}

//另一种写法
async function myFunction() {
    await somethingThatReturnsAPromise().catch(function (err){
        console.log(err)
    })
}