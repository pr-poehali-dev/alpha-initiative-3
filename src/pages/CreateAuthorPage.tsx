import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Icon from "@/components/ui/icon"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface CreateAuthorPageProps {
  onBack: () => void
  onComplete: () => void
}

const categories = [
  "Искусство",
  "Музыка",
  "Видео",
  "Подкасты",
  "Блоги",
  "Разработка",
  "Образование",
  "Игры",
  "Другое"
]

export function CreateAuthorPage({ onBack, onComplete }: CreateAuthorPageProps) {
  const [formData, setFormData] = useState({
    displayName: "",
    category: "",
    bio: "",
    socialLinks: {
      instagram: "",
      youtube: "",
      twitter: ""
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete()
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container max-w-3xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={18} className="mr-2" />
          Назад
        </Button>

        <Card className="p-8">
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold">Создайте профиль автора</h1>
              <p className="text-muted-foreground">
                Заполните информацию о себе, чтобы начать зарабатывать
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="displayName">Отображаемое имя *</Label>
                <Input
                  id="displayName"
                  placeholder="Как вас будут видеть подписчики"
                  value={formData.displayName}
                  onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Категория *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                  required
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">О себе *</Label>
                <Textarea
                  id="bio"
                  placeholder="Расскажите о себе и своем творчестве..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={5}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Минимум 50 символов
                </p>
              </div>

              <div className="space-y-4">
                <Label>Социальные сети (необязательно)</Label>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Instagram" size={20} className="text-muted-foreground" />
                    <Input
                      placeholder="instagram.com/username"
                      value={formData.socialLinks.instagram}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Youtube" size={20} className="text-muted-foreground" />
                    <Input
                      placeholder="youtube.com/@channel"
                      value={formData.socialLinks.youtube}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, youtube: e.target.value }
                      })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Twitter" size={20} className="text-muted-foreground" />
                    <Input
                      placeholder="twitter.com/username"
                      value={formData.socialLinks.twitter}
                      onChange={(e) => setFormData({
                        ...formData,
                        socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <Button 
                  type="submit" 
                  className="w-full h-12 text-lg"
                  disabled={!formData.displayName || !formData.category || formData.bio.length < 50}
                >
                  Создать профиль
                </Button>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <Icon name="Info" size={18} className="text-primary mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Следующий шаг:</p>
                      <p>После создания профиля вы сможете настроить уровни подписок и начать публиковать контент.</p>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
