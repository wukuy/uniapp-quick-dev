import http from '@/common/app.http.js'

export const getList = () => http({
    url: 'admin/sys-file/page?ab=2',
    method: 'post',
    params: { a: 1 },
    data: { a: 2 }
})

export const upload = (filePath, formData) => http({
    url: 'admin/sys-file/upload',
    name: 'file',
    upload: true,
    filePath,
    formData,
    method: 'post'
})
