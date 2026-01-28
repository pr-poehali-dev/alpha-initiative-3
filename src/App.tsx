import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { HomePage } from "@/pages/HomePage"
import { ProfilePage } from "@/pages/ProfilePage"
import { AuthPage } from "@/pages/AuthPage"
import { CreateAuthorPage } from "@/pages/CreateAuthorPage"

type Page = "auth" | "home" | "profile" | "createAuthor"

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
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("auth")
  const [currentUser, setCurrentUser] = useState<string>("")
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("")
  const [authorProfiles, setAuthorProfiles] = useState<AuthorProfile[]>([])
  const [userFollowing, setUserFollowing] = useState<string[]>([])

  useEffect(() => {
    const path = window.location.pathname
    const username = path.substring(1)
    
    const savedProfiles = localStorage.getItem("boosty_profiles")
    if (savedProfiles) {
      setAuthorProfiles(JSON.parse(savedProfiles))
    }

    const savedFollowing = localStorage.getItem("boosty_following")
    if (savedFollowing) {
      setUserFollowing(JSON.parse(savedFollowing))
    }

    if (username && savedProfiles) {
      const profiles = JSON.parse(savedProfiles) as AuthorProfile[]
      const profile = profiles.find(p => p.createdBy.toLowerCase() === username.toLowerCase())
      if (profile) {
        const savedUser = localStorage.getItem("boosty_user")
        if (savedUser) {
          setCurrentUser(savedUser)
          setSelectedAuthorId(profile.id)
          setCurrentPage("profile")
          return
        }
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
    const existingProfile = authorProfiles.find(p => p.createdBy === currentUser)
    
    if (existingProfile) {
      const updatedProfile: AuthorProfile = {
        ...existingProfile,
        ...profile,
        id: existingProfile.id,
        createdBy: existingProfile.createdBy,
        followers: existingProfile.followers
      }
      
      const updatedProfiles = authorProfiles.map(p => 
        p.id === existingProfile.id ? updatedProfile : p
      )
      
      setAuthorProfiles(updatedProfiles)
      localStorage.setItem("boosty_profiles", JSON.stringify(updatedProfiles))
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
    
    const updatedProfiles = [...authorProfiles, newProfile]
    setAuthorProfiles(updatedProfiles)
    localStorage.setItem("boosty_profiles", JSON.stringify(updatedProfiles))
    
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
    localStorage.setItem("boosty_profiles", JSON.stringify(updatedProfiles))
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
          onFollowToggle={handleFollowToggle}
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