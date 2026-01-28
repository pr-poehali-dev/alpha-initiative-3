import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Icon from "@/components/ui/icon"
import { PostCard } from "@/components/PostCard"
import { SubscriptionTier } from "@/components/SubscriptionTier"
import { AuthorProfile } from "@/App"

interface ProfilePageProps {
  authorId: string
  authorProfiles: AuthorProfile[]
  onBack: () => void
}

const mockPosts = [
  {
    title: "Новый урок: Основы акварельной живописи",
    excerpt: "В этом уроке я покажу базовые техники работы с акварелью, которые помогут вам создавать красивые работы с первых шагов.",
    author: "Анна Иванова",
    date: "2 дня назад",
    likes: 156,
    comments: 23,
    isSubscriberOnly: false
  },
  {
    title: "Эксклюзивный контент: Портрет шаг за шагом",
    excerpt: "Подробный процесс создания портрета от наброска до финальных деталей. Только для подписчиков.",
    author: "Анна Иванова",
    date: "5 дней назад",
    likes: 234,
    comments: 45,
    isSubscriberOnly: true
  },
  {
    title: "Обзор материалов для начинающих художников",
    excerpt: "Расскажу какие кисти, краски и бумагу я рекомендую для старта в акварели и почему именно их.",
    author: "Анна Иванова",
    date: "1 неделю назад",
    likes: 189,
    comments: 31,
    isSubscriberOnly: false
  }
]

const subscriptionTiers = [
  {
    name: "Базовый",
    price: 199,
    description: "Доступ к базовому контенту",
    benefits: [
      "Доступ к публичным постам",
      "Участие в общих обсуждениях",
      "Уведомления о новом контенте"
    ]
  },
  {
    name: "Стандарт",
    price: 499,
    description: "Расширенный доступ и бонусы",
    benefits: [
      "Все из базового тарифа",
      "Эксклюзивные посты и уроки",
      "Доступ к архиву материалов",
      "Скидки на курсы 10%"
    ],
    isPopular: true
  },
  {
    name: "Премиум",
    price: 999,
    description: "Максимум возможностей",
    benefits: [
      "Все из стандартного тарифа",
      "Персональные консультации 1 раз в месяц",
      "Закрытый чат с автором",
      "Ранний доступ к новому контенту",
      "Скидки на курсы 20%"
    ]
  }
]

export function ProfilePage({ authorId, authorProfiles, onBack }: ProfilePageProps) {
  const profile = authorProfiles.find(p => p.id === authorId)
  
  if (!profile) {
    return (
      <div className="min-h-screen">
        <div className="relative h-64 bg-gradient-to-r from-primary/20 to-accent/20">
          <Button 
            variant="ghost" 
            className="absolute top-4 left-4 bg-background/80 backdrop-blur"
            onClick={onBack}
          >
            <Icon name="ArrowLeft" size={18} className="mr-2" />
            Назад
          </Button>
        </div>

        <div className="container">
          <div className="relative -mt-20 pb-8">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
              <Avatar className="w-32 h-32 border-4 border-background">
                <AvatarImage src="" />
                <AvatarFallback className="text-4xl">АИ</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div>
                  <h1 className="text-3xl font-bold">Анна Иванова</h1>
                  <p className="text-muted-foreground">Художник и иллюстратор</p>
                </div>
                
                <div className="flex gap-6 text-sm">
                  <div>
                    <span className="font-semibold">12.5K</span>
                    <span className="text-muted-foreground ml-1">подписчиков</span>
                  </div>
                  <div>
                    <span className="font-semibold">234</span>
                    <span className="text-muted-foreground ml-1">постов</span>
                  </div>
                </div>

                <p className="text-muted-foreground max-w-2xl">
                  Обучаю акварельной живописи и делюсь процессом создания иллюстраций. 
                  Создаю уроки для начинающих и опытных художников. 
                  Подписывайтесь, чтобы получать эксклюзивный контент!
                </p>

                <div className="flex gap-3">
                  <Button>
                    <Icon name="Heart" size={18} className="mr-2" />
                    Подписаться
                  </Button>
                  <Button variant="outline">
                    <Icon name="Bell" size={18} className="mr-2" />
                    Уведомления
                  </Button>
                  <Button variant="outline" size="icon">
                    <Icon name="Share2" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="posts" className="py-8">
            <TabsList>
              <TabsTrigger value="posts">Посты</TabsTrigger>
              <TabsTrigger value="subscriptions">Подписки</TabsTrigger>
              <TabsTrigger value="about">О себе</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockPosts.map((post, idx) => (
                  <PostCard key={idx} {...post} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="subscriptions" className="mt-8">
              <div className="max-w-5xl">
                <h2 className="text-2xl font-bold mb-6">Выберите уровень подписки</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {subscriptionTiers.map((tier, idx) => (
                    <SubscriptionTier key={idx} {...tier} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-8">
              <div className="max-w-3xl space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-3">О себе</h3>
                  <p className="text-muted-foreground">
                    Привет! Я Анна, профессиональный иллюстратор и художник с 10-летним опытом. 
                    Моя специализация — акварельная живопись и цифровая иллюстрация. 
                    Обучаю рисованию онлайн и офлайн, провожу мастер-классы и марафоны.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Достижения</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <Icon name="Award" size={18} className="text-primary mt-0.5" />
                      <span>Победитель конкурса иллюстраций "ArtVision 2024"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Award" size={18} className="text-primary mt-0.5" />
                      <span>Автор курса "Акварель для начинающих" с 5000+ студентами</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Icon name="Award" size={18} className="text-primary mt-0.5" />
                      <span>Сотрудничество с издательством "Азбука"</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-3">Социальные сети</h3>
                  <div className="flex gap-3">
                    <Button variant="outline">
                      <Icon name="Instagram" size={18} className="mr-2" />
                      Instagram
                    </Button>
                    <Button variant="outline">
                      <Icon name="Youtube" size={18} className="mr-2" />
                      YouTube
                    </Button>
                    <Button variant="outline">
                      <Icon name="Mail" size={18} className="mr-2" />
                      Email
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen">
      <div className="relative h-64 bg-gradient-to-r from-primary/20 to-accent/20">
        {profile.cover && (
          <img src={profile.cover} alt="Cover" className="w-full h-full object-cover" />
        )}
        <Button 
          variant="ghost" 
          className="absolute top-4 left-4 bg-background/80 backdrop-blur"
          onClick={onBack}
        >
          <Icon name="ArrowLeft" size={18} className="mr-2" />
          Назад
        </Button>
      </div>

      <div className="container">
        <div className="relative -mt-20 pb-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src={profile.avatar} />
              <AvatarFallback className="text-4xl">
                {profile.displayName[0]?.toUpperCase() || '?'}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-3">
              <div>
                <h1 className="text-3xl font-bold">{profile.displayName}</h1>
                <p className="text-muted-foreground">{profile.category}</p>
              </div>
              
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="font-semibold">0</span>
                  <span className="text-muted-foreground ml-1">подписчиков</span>
                </div>
                <div>
                  <span className="font-semibold">0</span>
                  <span className="text-muted-foreground ml-1">постов</span>
                </div>
              </div>

              <p className="text-muted-foreground max-w-2xl">
                {profile.bio}
              </p>

              <div className="flex gap-3">
                <Button>
                  <Icon name="Heart" size={18} className="mr-2" />
                  Подписаться
                </Button>
                <Button variant="outline">
                  <Icon name="Bell" size={18} className="mr-2" />
                  Уведомления
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Share2" size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="subscriptions" className="py-8">
          <TabsList>
            <TabsTrigger value="subscriptions">Подписки</TabsTrigger>
            <TabsTrigger value="about">О себе</TabsTrigger>
          </TabsList>

          <TabsContent value="subscriptions" className="mt-8">
            <div className="max-w-5xl">
              <h2 className="text-2xl font-bold mb-6">Выберите уровень подписки</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {profile.subscriptions.map((tier) => {
                  const currencySymbol = tier.currency === 'USD' ? '$' : tier.currency === 'EUR' ? '€' : '₽'
                  return (
                    <SubscriptionTier 
                      key={tier.id} 
                      name={tier.name}
                      price={parseInt(tier.price)}
                      description="Subscription tier"
                      benefits={tier.benefits}
                      currency={currencySymbol}
                    />
                  )
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-8">
            <div className="max-w-3xl space-y-6">
              <div>
                <h3 className="font-semibold text-lg mb-3">О себе</h3>
                <p className="text-muted-foreground">{profile.bio}</p>
              </div>

              {(profile.socialLinks.instagram || profile.socialLinks.youtube || profile.socialLinks.twitter) && (
                <div>
                  <h3 className="font-semibold text-lg mb-3">Социальные сети</h3>
                  <div className="flex gap-3 flex-wrap">
                    {profile.socialLinks.instagram && (
                      <Button variant="outline" asChild>
                        <a href={profile.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                          <Icon name="Instagram" size={18} className="mr-2" />
                          Instagram
                        </a>
                      </Button>
                    )}
                    {profile.socialLinks.youtube && (
                      <Button variant="outline" asChild>
                        <a href={profile.socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                          <Icon name="Youtube" size={18} className="mr-2" />
                          YouTube
                        </a>
                      </Button>
                    )}
                    {profile.socialLinks.twitter && (
                      <Button variant="outline" asChild>
                        <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                          <Icon name="Twitter" size={18} className="mr-2" />
                          Twitter
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}