import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Icon from "@/components/ui/icon"

interface HeaderProps {
  onNavigate: (page: string) => void
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 font-bold text-2xl"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              B
            </div>
            <span>Boosty</span>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => onNavigate('explore')}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Обзор
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Тарифы
            </button>
            <button className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Помощь
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center relative">
            <Icon name="Search" size={18} className="absolute left-3 text-muted-foreground" />
            <Input 
              placeholder="Найти автора" 
              className="w-64 pl-10"
            />
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Icon name="Search" size={20} />
          </Button>

          <Button variant="outline">
            Войти
          </Button>

          <Button>
            Начать
          </Button>
        </div>
      </div>
    </header>
  )
}
