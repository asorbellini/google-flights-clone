const baseURL = 'https://sky-scrapper.p.rapidapi.com'

const getHeaders = () => ({
    'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
    'x-rapidapi-host': import.meta.env.VITE_RAPIDAPI_HOST
})

const withTimeout = (ms, controller) => {
    setTimeout(()=> controller.abort(),ms)
}

const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
}

export const apiClient = {
    async get(endpoint, params) {
        const qs = params ? `?${new URLSearchParams(params)}` : ''
        const controller = new AbortController()
        const cancel = withTimeout(12000, controller)

        try {
            const res = await fetch(`${baseURL}${endpoint}${qs}`, {
                method: 'GET',
                headers: getHeaders(),
                signal: controller.signal,
            })
            handleResponse(res)
            return res.json()
        } finally {
            clearTimeout(cancel)
        }
    }
}