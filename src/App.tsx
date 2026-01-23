import { useState } from "react"
import { AuthPage } from "./pages/AuthPage"
import { ChatListPage } from "./pages/ChatListPage"
import { ChatPage } from "./pages/ChatPage"

type Screen = "auth" | "chatList" | "chat"

function App() {
  const [screen, setScreen] = useState<Screen>("auth")
  const [currentUser, setCurrentUser] = useState<string>("")
  const [selectedChatUserId, setSelectedChatUserId] = useState<string>("")

  const handleAuth = (nickname: string) => {
    setCurrentUser(nickname)
    setScreen("chatList")
  }

  const handleSelectChat = (userId: string) => {
    setSelectedChatUserId(userId)
    setScreen("chat")
  }

  const handleBackToChatList = () => {
    setScreen("chatList")
  }

  const handleLogout = () => {
    setCurrentUser("")
    setScreen("auth")
  }

  if (screen === "auth") {
    return <AuthPage onAuth={handleAuth} />
  }

  if (screen === "chatList") {
    return (
      <ChatListPage
        currentUser={currentUser}
        onSelectChat={handleSelectChat}
        onLogout={handleLogout}
      />
    )
  }

  if (screen === "chat") {
    return (
      <ChatPage
        userId={selectedChatUserId}
        currentUser={currentUser}
        onBack={handleBackToChatList}
      />
    )
  }

  return null
}

export default App