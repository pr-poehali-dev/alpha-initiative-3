import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Icon from "@/components/ui/icon"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SubscriptionTier } from "@/components/SubscriptionTier"
import { PostCard } from "@/components/PostCard"
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

interface SubscriptionTierData {
  id: string
  name: string
  price: string
  currency: string
  benefits: string[]
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
  const [currentStep, setCurrentStep] = useState(1)
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

  const [subscriptions, setSubscriptions] = useState<SubscriptionTierData[]>([
    { id: "1", name: "Basic", price: "5", currency: "USD", benefits: ["Access to basic content", "Support the author"] },
  ])
  
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

  const addSubscriptionTier = () => {
    setSubscriptions([
      ...subscriptions,
      { id: Date.now().toString(), name: "", price: "", currency: "USD", benefits: [""] }
    ])
  }

  const removeSubscriptionTier = (id: string) => {
    setSubscriptions(subscriptions.filter(s => s.id !== id))
  }

  const updateSubscription = (id: string, field: keyof SubscriptionTierData, value: string | string[]) => {
    setSubscriptions(subscriptions.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ))
  }

  const addBenefit = (tierIndex: number) => {
    const newSubs = [...subscriptions]
    newSubs[tierIndex].benefits.push("")
    setSubscriptions(newSubs)
  }

  const updateBenefit = (tierIndex: number, benefitIndex: number, value: string) => {
    const newSubs = [...subscriptions]
    newSubs[tierIndex].benefits[benefitIndex] = value
    setSubscriptions(newSubs)
  }

  const removeBenefit = (tierIndex: number, benefitIndex: number) => {
    const newSubs = [...subscriptions]
    newSubs[tierIndex].benefits.splice(benefitIndex, 1)
    setSubscriptions(newSubs)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onComplete()
  }

  return (
    <div className="min-h-screen py-8 bg-secondary/20">
      <div className="container max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          <Icon name="ArrowLeft" size={18} className="mr-2" />
          Назад
        </Button>

        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                1
              </div>
              <span className="font-medium">Профиль</span>
            </div>
            <div className={`h-px w-16 ${currentStep >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                2
              </div>
              <span className="font-medium">Подписки</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="p-8 h-fit">
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Создайте профиль автора</h1>
                    <p className="text-muted-foreground">
                      Заполните информацию о себе
                    </p>
                  </div>

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
                          <span className="text-sm">Нажмите для загрузки</span>
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
                    <Label>Аватар</Label>
                    <div className="flex items-center gap-4">
                      <div 
                        className="relative w-24 h-24 rounded-full border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer overflow-hidden group flex-shrink-0"
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
                              <Icon name="Upload" size={20} className="text-white" />
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                            <Icon name="User" size={28} />
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
                      <p className="text-sm text-muted-foreground">
                        Квадратное изображение минимум 200x200px
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="displayName">Отображаемое имя</Label>
                    <Input
                      id="displayName"
                      placeholder="Как вас будут видеть подписчики"
                      value={formData.displayName}
                      onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Категория</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
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
                    <Label htmlFor="bio">О себе</Label>
                    <Textarea
                      id="bio"
                      placeholder="Расскажите о себе и своем творчестве..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Социальные сети</Label>
                    
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

                  <Button 
                    type="button"
                    className="w-full h-12 text-lg"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentStep(2)
                    }}
                  >
                    Далее: Настроить подписки
                    <Icon name="ArrowRight" size={18} className="ml-2" />
                  </Button>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold">Настройте подписки</h1>
                    <p className="text-muted-foreground">
                      Создайте тарифы для подписчиков
                    </p>
                  </div>

                  <div className="space-y-4">
                    {subscriptions.map((tier, tierIndex) => (
                      <Card key={tier.id} className="p-4">
                        <div className="space-y-4">
                          <div className="flex items-start justify-between">
                            <Label>Уровень {tierIndex + 1}</Label>
                            {subscriptions.length > 1 && (
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeSubscriptionTier(tier.id)}
                              >
                                <Icon name="X" size={16} />
                              </Button>
                            )}
                          </div>

                          <div className="grid gap-4">
                            <Input
                              placeholder="Название уровня (Basic, Premium)"
                              value={tier.name}
                              onChange={(e) => updateSubscription(tier.id, 'name', e.target.value)}
                            />

                            <div className="grid grid-cols-2 gap-2">
                              <Input
                                type="number"
                                placeholder="Цена"
                                value={tier.price}
                                onChange={(e) => updateSubscription(tier.id, 'price', e.target.value)}
                              />
                              <Select 
                                value={tier.currency} 
                                onValueChange={(value) => updateSubscription(tier.id, 'currency', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="USD">$ USD</SelectItem>
                                  <SelectItem value="EUR">€ EUR</SelectItem>
                                  <SelectItem value="RUB">₽ RUB</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Преимущества</Label>
                            {tier.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-center gap-2">
                                <Input
                                  placeholder="Что получит подписчик"
                                  value={benefit}
                                  onChange={(e) => updateBenefit(tierIndex, benefitIndex, e.target.value)}
                                />
                                {tier.benefits.length > 1 && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeBenefit(tierIndex, benefitIndex)}
                                  >
                                    <Icon name="X" size={16} />
                                  </Button>
                                )}
                              </div>
                            ))}
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => addBenefit(tierIndex)}
                            >
                              <Icon name="Plus" size={16} className="mr-2" />
                              Добавить
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={addSubscriptionTier}
                    >
                      <Icon name="Plus" size={18} className="mr-2" />
                      Добавить уровень
                    </Button>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentStep(1)
                      }}
                    >
                      <Icon name="ArrowLeft" size={18} className="mr-2" />
                      Назад
                    </Button>
                    <Button 
                      type="button"
                      className="flex-1 h-12 text-lg"
                      onClick={(e) => {
                        e.preventDefault()
                        handleSubmit(e as any)
                      }}
                    >
                      Создать профиль
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Card>

          <div className="space-y-6">
            <div className="sticky top-24">
              <h2 className="text-2xl font-bold mb-4">Превью</h2>
              
              {currentStep === 1 && (
                <Card className="overflow-hidden">
                  <div className="relative h-32 bg-gradient-to-r from-primary/20 to-accent/20">
                    {formData.cover && (
                      <img src={formData.cover} alt="Cover" className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-6 -mt-12">
                    <Avatar className="w-24 h-24 border-4 border-background mb-4">
                      <AvatarImage src={formData.avatar} />
                      <AvatarFallback className="text-2xl bg-primary/10">
                        {formData.displayName ? formData.displayName[0].toUpperCase() : '?'}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-bold">
                      {formData.displayName || 'Ваше имя'}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {formData.category || 'Категория'}
                    </p>
                    <p className="mt-4 text-sm">
                      {formData.bio || 'Здесь будет ваше описание...'}
                    </p>
                  </div>
                </Card>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Ваши уровни подписок:</h3>
                  <div className="grid gap-4">
                    {subscriptions.map((tier) => {
                      const currencySymbol = tier.currency === 'USD' ? '$' : tier.currency === 'EUR' ? '€' : '₽'
                      return (
                        <SubscriptionTier
                          key={tier.id}
                          name={tier.name || 'Tier name'}
                          price={parseInt(tier.price) || 0}
                          description="Subscription tier"
                          benefits={tier.benefits.filter(b => b.trim())}
                          currency={currencySymbol}
                        />
                      )
                    })}
                  </div>

                  <div className="mt-8">
                    <h3 className="font-semibold mb-4">Пример поста:</h3>
                    <PostCard
                      title="Мой первый пост на Boosty"
                      excerpt="Привет! Это мой первый пост для подписчиков. Здесь я буду делиться эксклюзивным контентом..."
                      author={formData.displayName || 'Автор'}
                      authorAvatar={formData.avatar}
                      date="Сегодня"
                      likes={0}
                      comments={0}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}