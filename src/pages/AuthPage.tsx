import { motion } from "framer-motion"
import { useState } from "react"
import Icon from "@/components/ui/icon"

interface AuthPageProps {
  onAuth: (nickname: string) => void
}

export function AuthPage({ onAuth }: AuthPageProps) {
  const [nickname, setNickname] = useState("")
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nickname.trim()) {
      onAuth(nickname.trim())
    }
  }

  return (
    <main className="relative min-h-screen px-6 py-10 flex items-center justify-center overflow-hidden">
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

      <motion.div
        className="fixed z-0 w-[450px] h-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)",
          filter: "blur(70px)",
          bottom: "-5%",
          left: "20%",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md"
      >
        <div
          className="rounded-[28px] px-8 py-10 overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(40px) saturate(180%)",
            WebkitBackdropFilter: "blur(40px) saturate(180%)",
            boxShadow: `
              inset 0 1px 1px rgba(255, 255, 255, 0.9),
              inset 0 -1px 1px rgba(255, 255, 255, 0.1),
              0 0 0 1px rgba(255, 255, 255, 0.6),
              0 2px 4px rgba(0, 0, 0, 0.02),
              0 8px 16px rgba(0, 0, 0, 0.06),
              0 32px 64px rgba(0, 0, 0, 0.08)
            `,
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          <div className="flex flex-col items-center text-center mb-8">
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                boxShadow: `
                  inset 0 1px 2px rgba(255, 255, 255, 1),
                  0 4px 8px rgba(0, 0, 0, 0.04)
                `,
              }}
            >
              <Icon name="MessageCircle" size={36} className="text-purple-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">SMS Chat</h1>
            <p className="text-sm text-gray-600">
              {isLogin ? "Welcome back! Enter your nickname" : "Create your account with a nickname"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 mb-2">
                Nickname
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
                className="w-full px-4 py-3 rounded-xl text-gray-800 placeholder-gray-400"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.6)",
                  boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.05)",
                }}
                required
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
              style={{
                background: "linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9))",
                boxShadow: "0 4px 16px rgba(147, 51, 234, 0.3)",
              }}
            >
              <Icon name={isLogin ? "LogIn" : "UserPlus"} size={20} />
              {isLogin ? "Sign In" : "Sign Up"}
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        </div>
      </motion.div>
    </main>
  )
}
