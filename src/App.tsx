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
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("auth")
  const [currentUser, setCurrentUser] = useState<string>("")
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("")
  const [authorProfiles, setAuthorProfiles] = useState<AuthorProfile[]>([])

  useEffect(() => {
    const savedUser = localStorage.getItem("boosty_user")
    if (savedUser) {
      setCurrentUser(savedUser)
      setCurrentPage("home")
    }
    
    const savedProfiles = localStorage.getItem("boosty_profiles")
    if (savedProfiles) {
      setAuthorProfiles(JSON.parse(savedProfiles))
    }
  }, [])

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

  const handleCreateProfile = (profile: Omit<AuthorProfile, 'id' | 'createdBy'>) => {
    const newProfile: AuthorProfile = {
      ...profile,
      id: Date.now().toString(),
      createdBy: currentUser
    }
    
    const updatedProfiles = [...authorProfiles, newProfile]
    setAuthorProfiles(updatedProfiles)
    localStorage.setItem("boosty_profiles", JSON.stringify(updatedProfiles))
    
    setSelectedAuthorId(newProfile.id)
    setCurrentPage("profile")
  }

  if (currentPage === "auth") {
    return <AuthPage onAuth={handleAuth} />
  }

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} currentUser={currentUser} onLogout={handleLogout} />
      
      {currentPage === "home" && (
        <HomePage onNavigate={handleNavigate} authorProfiles={authorProfiles} />
      )}
      
      {currentPage === "profile" && (
        <ProfilePage 
          authorId={selectedAuthorId}
          authorProfiles={authorProfiles}
          onBack={() => setCurrentPage("home")} 
        />
      )}
      
      {currentPage === "createAuthor" && (
        <CreateAuthorPage
          onBack={() => setCurrentPage("home")}
          onComplete={handleCreateProfile}
        />
      )}
    </div>
  )
}

export default App