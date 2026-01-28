import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Icon from "@/components/ui/icon"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthorProfile } from "@/App"

interface HomePageProps {
  onNavigate: (page: string, authorId?: string) => void
  authorProfiles: AuthorProfile[]
}

const featuredAuthors = [
  { id: '1', name: 'Анна Иванова', avatar: '', subscribers: 12500, category: 'Иллюстрация' },
  { id: '2', name: 'Дмитрий Петров', avatar: '', subscribers: 8300, category: 'Музыка' },
  { id: '3', name: 'Мария Сидорова', avatar: '', subscribers: 15000, category: 'Подкасты' },
  { id: '4', name: 'Алексей Козлов', avatar: '', subscribers: 6700, category: 'Видео' }
]

const categories = [
  { icon: 'Palette', name: 'Искусство', count: 1234 },
  { icon: 'Music', name: 'Музыка', count: 892 },
  { icon: 'Video', name: 'Видео', count: 2100 },
  { icon: 'Mic', name: 'Подкасты', count: 567 },
  { icon: 'BookOpen', name: 'Блоги', count: 1890 },
  { icon: 'Code', name: 'Разработка', count: 456 }
]

export function HomePage({ onNavigate, authorProfiles }: HomePageProps) {
  const allAuthors = [...featuredAuthors, ...authorProfiles.map(p => ({
    id: p.id,
    name: p.displayName,
    avatar: p.avatar,
    subscribers: 0,
    category: p.category
  }))]
  return (
    <div className="min-h-screen">
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Поддержите любимых авторов
            </h1>
            <p className="text-xl text-muted-foreground">
              Платформа для монетизации творчества. Создавайте контент, получайте поддержку от подписчиков и развивайте свой проект.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="text-lg px-8"
                onClick={() => onNavigate('createAuthor')}
              >
                Начать зарабатывать
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8">
                Найти авторов
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/30">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Популярные категории</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, idx) => (
              <Card 
                key={idx}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer group"
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Icon name={category.icon as any} size={24} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">{category.name}</div>
                    <div className="text-sm text-muted-foreground">{category.count} авторов</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Популярные авторы</h2>
            <Button variant="ghost">
              Показать всех
              <Icon name="ChevronRight" size={16} className="ml-1" />
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {allAuthors.map((author) => (
              <Card 
                key={author.id}
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => onNavigate('profile', author.id)}
              >
                <div className="flex flex-col items-center text-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={author.avatar} />
                    <AvatarFallback className="text-xl bg-primary/10">
                      {author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">{author.name}</h3>
                    <p className="text-sm text-muted-foreground">{author.category}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {author.subscribers.toLocaleString()} подписчиков
                    </p>
                  </div>
                  <Button 
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      onNavigate('profile', author.id)
                    }}
                  >
                    Subscribe
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Почему Boosty?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Icon name="DollarSign" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Гибкая монетизация</h3>
                <p className="text-muted-foreground">Подписки, донаты, платный контент — выбирайте удобный формат</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Icon name="Users" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Активное сообщество</h3>
                <p className="text-muted-foreground">Общайтесь с подписчиками и создавайте лояльную аудиторию</p>
              </div>
              <div className="text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Icon name="BarChart" size={32} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Аналитика</h3>
                <p className="text-muted-foreground">Отслеживайте статистику и рост вашей аудитории</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 border-t">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="font-bold text-xl mb-4">Boosty</div>
              <p className="text-sm text-muted-foreground">
                Платформа для монетизации творчества
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Авторам</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Как начать</li>
                <li>Тарифы</li>
                <li>Правила</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Поддержка</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Помощь</li>
                <li>FAQ</li>
                <li>Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Следите за нами</h4>
              <div className="flex gap-3">
                <Button variant="outline" size="icon">
                  <Icon name="Twitter" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button variant="outline" size="icon">
                  <Icon name="Youtube" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2026 Boosty. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  )
}