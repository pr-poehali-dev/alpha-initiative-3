import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { HomePage } from "@/pages/HomePage"
import { ProfilePage } from "@/pages/ProfilePage"
import { AuthPage } from "@/pages/AuthPage"
import { CreateAuthorPage } from "@/pages/CreateAuthorPage"

type Page = "auth" | "home" | "profile" | "createAuthor"

export interface Post {
  id: string
  authorId: string
  title: string
  content: string
  image?: string
  isSubscriberOnly: boolean
  createdAt: string
  likes: number
  comments: number
}

export interface AuthorProfile {
  id: string
  displayName: string
  category: string
  bio: string
  avatar: string
  cover: string
  socialLinks: {
    instagram: string
    youtube: string
    twitter: string
  }
  subscriptions: {
    id: string
    name: string
    price: string
    currency: string
    benefits: string[]
    previewImage: string
  }[]
  createdBy: string
  followers: string[]
  posts?: Post[]
}

const mockProfiles: AuthorProfile[] = [
  {
    id: 'mock-1',
    displayName: 'Анна Иванова',
    createdBy: 'ANNA_ART',
    category: 'Иллюстрация',
    bio: 'Профессиональный иллюстратор и художник',
    avatar: '',
    cover: '',
    socialLinks: { instagram: '', youtube: '', twitter: '' },
    subscriptions: [
      { id: '1', name: 'Basic', price: '5', currency: 'USD', benefits: ['Access to posts'], previewImage: '' }
    ],
    followers: [],
    posts: []
  },
  {
    id: 'mock-2',
    displayName: 'Дмитрий Петров',
    createdBy: 'DMITRY_MUSIC',
    category: 'Музыка',
    bio: 'Музыкант и композитор',
    avatar: '',
    cover: '',
    socialLinks: { instagram: '', youtube: '', twitter: '' },
    subscriptions: [
      { id: '1', name: 'Basic', price: '10', currency: 'USD', benefits: ['Early access to music'], previewImage: '' }
    ],
    followers: [],
    posts: []
  },
  {
    id: 'mock-3',
    displayName: 'Мария Сидорова',
    createdBy: 'MARIA_PODCAST',
    category: 'Подкасты',
    bio: 'Ведущая подкастов о саморазвитии',
    avatar: '',
    cover: '',
    socialLinks: { instagram: '', youtube: '', twitter: '' },
    subscriptions: [
      { id: '1', name: 'Basic', price: '3', currency: 'USD', benefits: ['Exclusive episodes'], previewImage: '' }
    ],
    followers: [],
    posts: []
  },
  {
    id: 'mock-4',
    displayName: 'Алексей Козлов',
    createdBy: 'ALEX_VIDEO',
    category: 'Видео',
    bio: 'Видеограф и режиссер',
    avatar: '',
    cover: '',
    socialLinks: { instagram: '', youtube: '', twitter: '' },
    subscriptions: [
      { id: '1', name: 'Basic', price: '7', currency: 'USD', benefits: ['Behind the scenes content'], previewImage: '' }
    ],
    followers: [],
    posts: []
  }
]

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("auth")
  const [currentUser, setCurrentUser] = useState<string>("")
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("")
  const [authorProfiles, setAuthorProfiles] = useState<AuthorProfile[]>(mockProfiles)
  const [userFollowing, setUserFollowing] = useState<string[]>([])
  const [userSubscriptions, setUserSubscriptions] = useState<string[]>([])

  useEffect(() => {
    const path = window.location.pathname
    const username = path.substring(1)
    
    const savedProfiles = localStorage.getItem("boosty_profiles")
    let allProfiles = [...mockProfiles]
    
    if (savedProfiles) {
      const userProfiles = JSON.parse(savedProfiles) as AuthorProfile[]
      allProfiles = [...mockProfiles, ...userProfiles]
      setAuthorProfiles(allProfiles)
    }

    const savedFollowing = localStorage.getItem("boosty_following")
    if (savedFollowing) {
      setUserFollowing(JSON.parse(savedFollowing))
    }

    const savedSubscriptions = localStorage.getItem("boosty_subscriptions")
    if (savedSubscriptions) {
      setUserSubscriptions(JSON.parse(savedSubscriptions))
    }

    if (username) {
      const profile = allProfiles.find(p => p.createdBy.toLowerCase() === username.toLowerCase())
      if (profile) {
        const savedUser = localStorage.getItem("boosty_user")
        if (savedUser) {
          setCurrentUser(savedUser)
        }
        setSelectedAuthorId(profile.id)
        setCurrentPage("profile")
        return
      }
    }
    
    const savedUser = localStorage.getItem("boosty_user")
    if (savedUser) {
      setCurrentUser(savedUser)
      setCurrentPage("home")
    }
  }, [])

  useEffect(() => {
    if (currentPage === "profile" && selectedAuthorId) {
      const profile = authorProfiles.find(p => p.id === selectedAuthorId)
      if (profile) {
        window.history.pushState({}, '', `/${profile.createdBy}`)
      }
    } else if (currentPage === "home") {
      window.history.pushState({}, '', '/')
    }
  }, [currentPage, selectedAuthorId, authorProfiles])

  const handleAuth = (nickname: string) => {
    setCurrentUser(nickname)
    localStorage.setItem("boosty_user", nickname)
    setCurrentPage("home")
  }

  const handleLogout = () => {
    setCurrentUser("")
    localStorage.removeItem("boosty_user")
    setCurrentPage("auth")
  }

  const handleNavigate = (page: string, authorId?: string) => {
    if (page === "profile" && authorId) {
      setSelectedAuthorId(authorId)
      setCurrentPage("profile")
    } else if (page === "home") {
      setCurrentPage("home")
    } else if (page === "createAuthor") {
      setCurrentPage("createAuthor")
    }
  }

  const handleCreateProfile = (profile: Omit<AuthorProfile, 'id' | 'createdBy' | 'followers'>) => {
    const userProfiles = authorProfiles.filter(p => !p.id.startsWith('mock-'))
    const existingProfile = userProfiles.find(p => p.createdBy === currentUser)
    
    if (existingProfile) {
      const updatedProfile: AuthorProfile = {
        ...existingProfile,
        ...profile,
        id: existingProfile.id,
        createdBy: existingProfile.createdBy,
        followers: existingProfile.followers
      }
      
      const updatedUserProfiles = userProfiles.map(p => 
        p.id === existingProfile.id ? updatedProfile : p
      )
      
      const allProfiles = [...mockProfiles, ...updatedUserProfiles]
      setAuthorProfiles(allProfiles)
      localStorage.setItem("boosty_profiles", JSON.stringify(updatedUserProfiles))
      setSelectedAuthorId(existingProfile.id)
      setCurrentPage("profile")
      return
    }
    
    const newProfile: AuthorProfile = {
      ...profile,
      id: Date.now().toString(),
      createdBy: currentUser,
      followers: []
    }
    
    const updatedUserProfiles = [...userProfiles, newProfile]
    const allProfiles = [...mockProfiles, ...updatedUserProfiles]
    setAuthorProfiles(allProfiles)
    localStorage.setItem("boosty_profiles", JSON.stringify(updatedUserProfiles))
    
    setSelectedAuthorId(newProfile.id)
    setCurrentPage("profile")
  }

  const handleFollowToggle = (authorId: string) => {
    let updatedFollowing: string[]
    
    if (userFollowing.includes(authorId)) {
      updatedFollowing = userFollowing.filter(id => id !== authorId)
    } else {
      updatedFollowing = [...userFollowing, authorId]
    }
    
    setUserFollowing(updatedFollowing)
    localStorage.setItem("boosty_following", JSON.stringify(updatedFollowing))
    
    const updatedProfiles = authorProfiles.map(profile => {
      if (profile.id === authorId) {
        if (updatedFollowing.includes(authorId)) {
          return { ...profile, followers: [...new Set([...profile.followers, currentUser])] }
        } else {
          return { ...profile, followers: profile.followers.filter(f => f !== currentUser) }
        }
      }
      return profile
    })
    
    setAuthorProfiles(updatedProfiles)
    
    const userProfiles = updatedProfiles.filter(p => !p.id.startsWith('mock-'))
    localStorage.setItem("boosty_profiles", JSON.stringify(userProfiles))
  }

  const handleAddPost = (authorId: string, post: Omit<Post, 'id' | 'authorId' | 'createdAt' | 'likes' | 'comments'>) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      authorId,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0
    }

    const updatedProfiles = authorProfiles.map(profile => {
      if (profile.id === authorId) {
        return {
          ...profile,
          posts: [...(profile.posts || []), newPost]
        }
      }
      return profile
    })

    setAuthorProfiles(updatedProfiles)
    
    const userProfiles = updatedProfiles.filter(p => !p.id.startsWith('mock-'))
    localStorage.setItem("boosty_profiles", JSON.stringify(userProfiles))
  }

  const handleSubscribe = (authorId: string) => {
    const updatedSubscriptions = [...userSubscriptions, authorId]
    setUserSubscriptions(updatedSubscriptions)
    localStorage.setItem("boosty_subscriptions", JSON.stringify(updatedSubscriptions))
  }

  if (currentPage === "auth") {
    return <AuthPage onAuth={handleAuth} />
  }

  return (
    <div className="min-h-screen">
      <Header 
        onNavigate={handleNavigate} 
        currentUser={currentUser} 
        userProfile={authorProfiles.find(p => p.createdBy === currentUser)}
        onLogout={handleLogout} 
      />
      
      {currentPage === "home" && (
        <HomePage onNavigate={handleNavigate} authorProfiles={authorProfiles} />
      )}
      
      {currentPage === "profile" && (
        <ProfilePage 
          authorId={selectedAuthorId}
          authorProfiles={authorProfiles}
          currentUser={currentUser}
          isFollowing={userFollowing.includes(selectedAuthorId)}
          isSubscribed={userSubscriptions.includes(selectedAuthorId)}
          onFollowToggle={handleFollowToggle}
          onSubscribe={handleSubscribe}
          onAddPost={handleAddPost}
          onEditProfile={() => setCurrentPage("createAuthor")}
          onBack={() => setCurrentPage("home")} 
        />
      )}
      
      {currentPage === "createAuthor" && (
        <CreateAuthorPage
          onBack={() => setCurrentPage("home")}
          onComplete={handleCreateProfile}
          existingProfile={authorProfiles.find(p => p.createdBy === currentUser)}
        />
      )}
    </div>
  )
}

export default App