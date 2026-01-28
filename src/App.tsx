import { useState } from "react"
import { Header } from "@/components/Header"
import { HomePage } from "@/pages/HomePage"
import { ProfilePage } from "@/pages/ProfilePage"

type Page = "home" | "profile"

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("")

  const handleNavigate = (page: string, authorId?: string) => {
    if (page === "profile" && authorId) {
      setSelectedAuthorId(authorId)
      setCurrentPage("profile")
    } else if (page === "home") {
      setCurrentPage("home")
    }
  }

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} />
      
      {currentPage === "home" && (
        <HomePage onNavigate={handleNavigate} />
      )}
      
      {currentPage === "profile" && (
        <ProfilePage 
          authorId={selectedAuthorId} 
          onBack={() => setCurrentPage("home")} 
        />
      )}
    </div>
  )
}

export default App