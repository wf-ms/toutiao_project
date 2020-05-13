// 封装本地存储操作模块

// 1.存储数据
export const setItem = (key, value) => {
    //将数组,对象转化为json格式再存储
    if (typeof value == 'object') {
        value = JSON.stringify(value)
    }
    window.localStorage.setItem(key, value)
}

// 2.获取数据
export const getItem = key => {
    const data = window.localStorage.getItem(key)
    try {
        return JSON.parse(data)
    } catch (error) {
        return data
    }
}

// 3.删除数据
export const removeItem = key => {
    window.localStorage.removeItem(key)
}