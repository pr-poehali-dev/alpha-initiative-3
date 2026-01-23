import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef } from "react"
import Icon from "@/components/ui/icon"

interface Message {
  id: string
  sender: string
  text: string
  timestamp: Date
  images?: string[]
  translated?: string
}

interface ChatPageProps {
  userId: string
  currentUser: string
  onBack: () => void
}

const mockMessages: Message[] = [
  { id: "1", sender: "alex_dev", text: "Hey! How are you?", timestamp: new Date(Date.now() - 3600000) },
  { id: "2", sender: "current", text: "I'm good, thanks! Working on a new project", timestamp: new Date(Date.now() - 3500000) },
  { id: "3", sender: "alex_dev", text: "That's awesome! Can you share some details?", timestamp: new Date(Date.now() - 3400000) },
]

export function ChatPage({ userId, currentUser, onBack }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>(mockMessages)
  const [inputText, setInputText] = useState("")
  const [showTranslator, setShowTranslator] = useState(false)
  const [language, setLanguage] = useState<"en" | "ru">("en")
  const [selectedImages, setSelectedImages] = useState<File[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const chatPartner = "alex_dev"

  const handleSend = () => {
    if (!inputText.trim() && selectedImages.length === 0) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "current",
      text: inputText,
      timestamp: new Date(),
      images: selectedImages.length > 0 ? selectedImages.map((f) => URL.createObjectURL(f)) : undefined,
    }

    setMessages([...messages, newMessage])
    setInputText("")
    setSelectedImages([])
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setSelectedImages([...selectedImages, ...files])
  }

  const translateMessage = (messageId: string) => {
    setMessages(
      messages.map((msg) =>
        msg.id === messageId
          ? {
              ...msg,
              translated: language === "en" 
                ? "Translated to Russian: " + msg.text 
                : "Translated to English: " + msg.text,
            }
          : msg
      )
    )
  }

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
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulance type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.025,
        }}
      />

      <div className="relative z-10 w-full max-w-2xl mx-auto p-4 flex flex-col h-screen">
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
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBack}
                className="p-2 rounded-xl hover:bg-gray-100/30 transition-colors"
              >
                <Icon name="ArrowLeft" size={20} className="text-gray-700" />
              </motion.button>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center relative"
                  style={{
                    background: "linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))",
                    border: "2px solid rgba(255, 255, 255, 0.8)",
                  }}
                >
                  <Icon name="User" size={18} className="text-purple-600" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-800 text-sm">@{chatPartner}</h2>
                  <p className="text-xs text-green-600">Online</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTranslator(!showTranslator)}
              className={`p-2 rounded-xl transition-colors ${
                showTranslator ? "bg-purple-100/50" : "hover:bg-gray-100/30"
              }`}
            >
              <Icon name="Languages" size={20} className={showTranslator ? "text-purple-600" : "text-gray-700"} />
            </motion.button>
          </div>

          {/* Translator Controls */}
          <AnimatePresence>
            {showTranslator && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-3 pt-3 border-t border-white/30"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-600">Translate to:</span>
                  <button
                    onClick={() => setLanguage("en")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      language === "en"
                        ? "bg-purple-500 text-white"
                        : "bg-white/50 text-gray-700 hover:bg-white/70"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage("ru")}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      language === "ru"
                        ? "bg-purple-500 text-white"
                        : "bg-white/50 text-gray-700 hover:bg-white/70"
                    }`}
                  >
                    Русский
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-3 pb-4">
          {messages.map((msg) => {
            const isCurrentUser = msg.sender === "current"
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[75%] ${isCurrentUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div
                    className={`rounded-[20px] px-4 py-3 ${isCurrentUser ? "rounded-br-md" : "rounded-bl-md"}`}
                    style={{
                      background: isCurrentUser
                        ? "linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8))"
                        : "rgba(255, 255, 255, 0.5)",
                      backdropFilter: "blur(40px) saturate(180%)",
                      border: "1px solid rgba(255, 255, 255, 0.5)",
                      boxShadow: "0 4px 16px rgba(0, 0, 0, 0.06)",
                    }}
                  >
                    <p className={`text-sm ${isCurrentUser ? "text-white" : "text-gray-800"}`}>{msg.text}</p>

                    {msg.images && msg.images.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {msg.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt="attached"
                            className="rounded-lg w-full h-32 object-cover"
                          />
                        ))}
                      </div>
                    )}

                    {msg.translated && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-2 pt-2 border-t border-white/20"
                      >
                        <p className={`text-xs ${isCurrentUser ? "text-white/80" : "text-gray-600"}`}>
                          {msg.translated}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 px-2">
                    <span className="text-[10px] text-gray-500">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                    {showTranslator && !msg.translated && (
                      <button
                        onClick={() => translateMessage(msg.id)}
                        className="text-[10px] text-purple-600 hover:text-purple-700 font-medium"
                      >
                        Translate
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Image Preview */}
        {selectedImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 rounded-[20px] p-3"
            style={{
              background: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
            }}
          >
            <div className="flex gap-2 overflow-x-auto">
              {selectedImages.map((file, idx) => (
                <div key={idx} className="relative shrink-0">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <button
                    onClick={() => setSelectedImages(selectedImages.filter((_, i) => i !== idx))}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                  >
                    <Icon name="X" size={12} className="text-white" />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[24px] px-4 py-3"
          style={{
            background: "rgba(255, 255, 255, 0.45)",
            backdropFilter: "blur(40px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
            boxShadow: "0 -4px 16px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageSelect}
              accept="image/*"
              multiple
              className="hidden"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-xl hover:bg-gray-100/30 transition-colors"
            >
              <Icon name="ImagePlus" size={20} className="text-gray-600" />
            </motion.button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 bg-transparent text-gray-800 placeholder-gray-400 outline-none text-sm"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSend}
              className="p-2 rounded-xl transition-colors"
              style={{
                background: "linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9))",
              }}
            >
              <Icon name="Send" size={20} className="text-white" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
