import { motion } from "framer-motion"
import { useState } from "react"
import Icon from "@/components/ui/icon"

interface User {
  id: string
  nickname: string
  status: "online" | "offline"
  avatar?: string
  lastMessage?: string
  unreadCount?: number
}

interface ChatListPageProps {
  currentUser: string
  onSelectChat: (userId: string) => void
  onLogout: () => void
}

const mockUsers: User[] = [
  { id: "1", nickname: "alex_dev", status: "online", lastMessage: "Hey! How are you?", unreadCount: 2 },
  { id: "2", nickname: "maria_design", status: "online", lastMessage: "Check out this design", unreadCount: 0 },
  { id: "3", nickname: "john_photos", status: "offline", lastMessage: "Thanks for the photos!", unreadCount: 0 },
  { id: "4", nickname: "kate_travel", status: "online", lastMessage: "Where are you now?", unreadCount: 1 },
  { id: "5", nickname: "mike_music", status: "offline", lastMessage: "Great song!", unreadCount: 0 },
]

export function ChatListPage({ currentUser, onSelectChat, onLogout }: ChatListPageProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [users] = useState<User[]>(mockUsers)

  const filteredUsers = users.filter((user) =>
    user.nickname.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const onlineCount = users.filter((u) => u.status === "online").length

  return (
    <main className="relative min-h-screen flex overflow-hidden">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-50 via-white to-slate-100" />

      {/* Animated gradient orbs */}
      <motion.div
        className="fixed z-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "-10%",
          left: "-10%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="fixed z-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "30%",
          right: "-20%",
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
        }}
      />

      <div className="relative z-10 w-full max-w-md mx-auto p-4 flex flex-col h-screen">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[24px] px-6 py-4 mb-4"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            boxShadow: `
              inset 0 1px 1px rgba(255, 255, 255, 0.9),
              0 0 0 1px rgba(255, 255, 255, 0.6),
              0 4px 16px rgba(0, 0, 0, 0.06)
            `,
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">SMS Chat</h1>
              <p className="text-xs text-gray-600">@{currentUser}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100/50">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-medium text-green-700">{onlineCount} online</span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onLogout}
                className="p-2 rounded-xl hover:bg-red-100/30 transition-colors"
              >
                <Icon name="LogOut" size={20} className="text-red-600" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-[20px] px-4 py-3 mb-4"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(40px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.9)",
          }}
        >
          <div className="flex items-center gap-2">
            <Icon name="Search" size={18} className="text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search users..."
              className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm"
            />
          </div>
        </motion.div>

        {/* User List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 overflow-y-auto space-y-2 pb-4"
        >
          {filteredUsers.map((user, index) => (
            <motion.button
              key={user.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectChat(user.id)}
              className="w-full rounded-[20px] px-4 py-3 flex items-center gap-3"
              style={{
                background: "rgba(255, 255, 255, 0.45)",
                backdropFilter: "blur(40px) saturate(180%)",
                border: "1px solid rgba(255, 255, 255, 0.5)",
                boxShadow: `
                  inset 0 1px 1px rgba(255, 255, 255, 0.9),
                  0 4px 16px rgba(0, 0, 0, 0.04)
                `,
              }}
            >
              <div className="relative">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))",
                    border: "2px solid rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <Icon name="User" size={20} className="text-purple-600" />
                </div>
                {user.status === "online" && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                )}
              </div>

              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <h3 className="font-semibold text-gray-800 text-sm truncate">@{user.nickname}</h3>
                  {user.unreadCount! > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-purple-500 text-white text-xs font-bold min-w-[20px] text-center">
                      {user.unreadCount}
                    </span>
                  )}
                </div>
                {user.lastMessage && (
                  <p className="text-xs text-gray-500 truncate">{user.lastMessage}</p>
                )}
              </div>

              <Icon name="ChevronRight" size={18} className="text-gray-400 shrink-0" />
            </motion.button>
          ))}
        </motion.div>
      </div>
    </main>
  )
}
