import { useState, useRef } from "react"
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
    avatar: "",
    cover: "",
    socialLinks: {
      instagram: "",
      youtube: "",
      twitter: ""
    }
  })
  
  const avatarInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData({ ...formData, cover: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

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
              <div className="space-y-4">
                <Label>Обложка профиля</Label>
                <div 
                  className="relative h-48 rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer overflow-hidden group"
                  onClick={() => coverInputRef.current?.click()}
                >
                  {formData.cover ? (
                    <>
                      <img 
                        src={formData.cover} 
                        alt="Cover" 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Icon name="Upload" size={32} className="text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                      <Icon name="Image" size={32} />
                      <span className="text-sm">Нажмите для загрузки обложки</span>
                      <span className="text-xs">Рекомендуемый размер: 1200x300</span>
                    </div>
                  )}
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Аватар профиля</Label>
                <div className="flex items-center gap-6">
                  <div 
                    className="relative w-32 h-32 rounded-full border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer overflow-hidden group flex-shrink-0"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    {formData.avatar ? (
                      <>
                        <img 
                          src={formData.avatar} 
                          alt="Avatar" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Icon name="Upload" size={24} className="text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-muted-foreground">
                        <Icon name="User" size={32} />
                        <span className="text-xs text-center px-2">Загрузить фото</span>
                      </div>
                    )}
                    <input
                      ref={avatarInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </div>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>• Квадратное изображение</p>
                    <p>• Минимум 200x200 пикселей</p>
                    <p>• Форматы: JPG, PNG</p>
                  </div>
                </div>
              </div>

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