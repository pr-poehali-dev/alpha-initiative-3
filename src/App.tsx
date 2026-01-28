import { useState, useEffect } from "react"
import { Header } from "@/components/Header"
import { HomePage } from "@/pages/HomePage"
import { ProfilePage } from "@/pages/ProfilePage"
import { AuthPage } from "@/pages/AuthPage"
import { CreateAuthorPage } from "@/pages/CreateAuthorPage"

type Page = "auth" | "home" | "profile" | "createAuthor"

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("auth")
  const [currentUser, setCurrentUser] = useState<string>("")
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("")

  useEffect(() => {
    const savedUser = localStorage.getItem("boosty_user")
    if (savedUser) {
      setCurrentUser(savedUser)
      setCurrentPage("home")
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

  if (currentPage === "auth") {
    return <AuthPage onAuth={handleAuth} />
  }

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} currentUser={currentUser} onLogout={handleLogout} />
      
      {currentPage === "home" && (
        <HomePage onNavigate={handleNavigate} />
      )}
      
      {currentPage === "profile" && (
        <ProfilePage 
          authorId={selectedAuthorId} 
          onBack={() => setCurrentPage("home")} 
        />
      )}
      
      {currentPage === "createAuthor" && (
        <CreateAuthorPage
          onBack={() => setCurrentPage("home")}
          onComplete={() => setCurrentPage("home")}
        />
      )}
    </div>
  )
}

export default App