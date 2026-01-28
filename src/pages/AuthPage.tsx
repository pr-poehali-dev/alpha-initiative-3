import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

interface AuthPageProps {
  onAuth: (nickname: string) => void
}

export function AuthPage({ onAuth }: AuthPageProps) {
  const [nickname, setNickname] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (nickname.trim()) {
      onAuth(nickname.trim())
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/5">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-primary-foreground text-3xl font-bold mx-auto mb-4">
            B
          </div>
          <h1 className="text-3xl font-bold">Добро пожаловать</h1>
          <p className="text-muted-foreground">
            Введите никнейм, чтобы продолжить
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Ваш никнейм"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="text-center text-lg h-12"
              autoFocus
            />
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg"
            disabled={!nickname.trim()}
          >
            Войти
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground">
          Никнейм будет использоваться для отображения в системе
        </p>
      </Card>
    </div>
  )
}
