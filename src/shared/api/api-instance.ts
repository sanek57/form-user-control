export const userApi = {
    getFromLocalStorage<T>(key: string): T | null {
        try {
            const item = localStorage.getItem(key)
            if (item === null) return null
            return JSON.parse(item) as T
        } catch (e) {
            console.error('Ошибка чтения из localStorage:', e)
            return null
        }
    },
    saveToLocalStorage<T>(key: string, value: T): void {
        try {
            const serialized = JSON.stringify(value)
            localStorage.setItem(key, serialized)
        } catch (e) {
            console.error('Ошибка сохранения в localStorage:', e)
        }
    },
}
