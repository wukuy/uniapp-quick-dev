// 转为query
export default function toQuery(query, url = '') {
    const queryArr = []
    for(const key in query) {
        // eslint-disable-next-line no-prototype-builtins
        if(query.hasOwnProperty(key)) {
            queryArr.push(`${key}=${query[key]}`)
        }
    }
    if(url.indexOf('?') > -1) {
        url = `${url}&${queryArr.join('&')}`
    }else {
        url = `${url}?${queryArr.join('&')}`
    }

    return url
}
