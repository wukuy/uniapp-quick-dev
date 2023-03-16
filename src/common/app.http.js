import { toQuery } from './utils'
import { API_URL } from './app.config'

const SuccessCode = 200

/**
 * 处理数据请求和文件上传
 * @param { * } options
 * @returns
 * @example
 * 数据请求
 * http({
 *      url: 'admin/sys-file/page'
 * })
 * 文件上传
 * http({
 *      url: 'admin/sys-file/page',
 *      upload: true,
 *      filePath: tempFilePaths[0],
 *      name: 'file',
 *      formData: {
 *          'user': 'test'
 *      },
 * })
 */

export default function request({ url, data = {}, header, raw, showToast = true, upload = false, filePath, formData, name, params, ...otherOptions }) {
    return new Promise((resolve, reject) => {
        // 拼接query
        if(params && typeof params === 'object' && Object.keys(params).length) {
            url = toQuery(params, url)
        }

        upload ? uni.uploadFile ? upload.request({
            url: new URL(url, API_URL).href,
            data,
            // 文件上传特有参数
            name,
            filePath,
            formData,
            ...otherOptions,
            header: {
                ...header
            },
            success: (res) => {
                // HTTP状态码处理
                if(res.statusCode === 200) {
                    const { data, code } = res.data

                    // 返回原始数据
                    if(raw) {
                        +code === SuccessCode ? resolve(res.data) : reject(res.data)
                    }else {
                        +code === SuccessCode ? resolve(data) : reject(data)
                    }

                    // 是否显示异常提示
                    if(showToast) {
                        if(+code !== SuccessCode) {
                            uni.showToast({
                                title: res.data.msg,
                                icon: 'none'
                            })
                        }
                    }
                }else {
                    reject(res)

                    // 后台未抛数据
                    if(typeof res.data === 'string') {
                        uni.showToast({
                            title: `${res.data}(${res.statusCode})`,
                            icon: 'none'
                        })
                    // 后台抛出异常
                    }else if(typeof res.data === 'object') {
                        uni.showToast({
                            title: `${res.data.data}(${res.statusCode})`,
                            icon: 'none'
                        })
                    }
                }
            },
            fail(err) {
                reject(err)

                uni.showToast({
                    title: JSON.stringify(err),
                    icon: 'none'
                })
            }
        })
    })
}
