import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface queryState {
    query: string
    setTo: (newQuery: string) => void
}

export const useQueryStore = create<queryState>()(
    devtools(
        // persist(
        (set) => ({
            query: "",
            setTo: (newQuery) => set((state) => ({ query: newQuery })),
        }),
        {
            name: 'query-storage',
        }
    )
    // )
)