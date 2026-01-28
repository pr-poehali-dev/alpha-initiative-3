import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Icon from "@/components/ui/icon"

interface PostCardProps {
  title: string
  excerpt: string
  author: string
  authorAvatar?: string
  date: string
  likes: number
  comments: number
  isSubscriberOnly?: boolean
  isBlurred?: boolean
  image?: string
}

export function PostCard({ 
  title, 
  excerpt, 
  author, 
  authorAvatar, 
  date, 
  likes, 
  comments,
  isSubscriberOnly,
  isBlurred,
  image
}: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer relative">
      {image && (
        <div className="aspect-video bg-muted relative">
          <img 
            src={image} 
            alt={title} 
            className={`w-full h-full object-cover ${isBlurred ? 'blur-2xl' : ''}`}
          />
          {isSubscriberOnly && (
            <Badge className="absolute top-3 right-3 bg-primary z-10">
              <Icon name="Lock" size={12} className="mr-1" />
              Subscribers Only
            </Badge>
          )}
        </div>
      )}
      
      <div className={`p-5 space-y-4 ${isBlurred ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={authorAvatar} />
            <AvatarFallback className="text-xs">{author[0]}</AvatarFallback>
          </Avatar>
          <div className="text-sm">
            <div className="font-medium">{author}</div>
            <div className="text-muted-foreground">{date}</div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-3">{excerpt}</p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Heart" size={16} />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="MessageCircle" size={16} />
            <span>{comments}</span>
          </div>
        </div>
      </div>

      {isBlurred && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="text-center space-y-3 p-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Icon name="Lock" size={32} className="text-primary" />
            </div>
            <div>
              <h4 className="font-semibold text-lg">Subscribers Only</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Subscribe to view this content
              </p>
            </div>
            <Button size="sm" className="mt-2">
              Subscribe Now
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}