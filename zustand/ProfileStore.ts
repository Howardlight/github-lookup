import { GithubProfile } from '@/types'
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface ProfileState {
    profile: GithubProfile | undefined | null
    setTo: (newProfile: GithubProfile | undefined | null) => void
}

export const useProfileStore = create<ProfileState>()(
    devtools(
        // persist(
        (set) => ({
            profile: undefined,
            setTo: (newProfile) => set((state) => ({ profile: newProfile })),
        }),
        {
            name: 'profile-storage',
        }
    )
    // )
)