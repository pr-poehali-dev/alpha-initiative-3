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
  image
}: PostCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
      {image && (
        <div className="aspect-video bg-muted relative">
          <img src={image} alt={title} className="w-full h-full object-cover" />
          {isSubscriberOnly && (
            <Badge className="absolute top-3 right-3 bg-primary">
              <Icon name="Lock" size={12} className="mr-1" />
              Для подписчиков
            </Badge>
          )}
        </div>
      )}
      
      <div className="p-5 space-y-4">
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
    </Card>
  )
}
