import api from "./api"

export default {
    async upload(file) {
        try {
            const data = new FormData()
            data.append('image', {
                uri: file.uri,
                name: file.fileName,
                type: file.mimeType,
            })
            
            const res = await api.post("/images/upload", data, {
                headers: {'Content-Type': 'multipart/form-data'}
            })

            return {
                success: true,
                data: res.data,
            }
        } catch (err) {
            return {
                success: false,
                message: err?.response?.data?.message ?? err.message,
            }
        }
    },
}
