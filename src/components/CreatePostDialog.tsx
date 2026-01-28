import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import Icon from "@/components/ui/icon"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface CreatePostDialogProps {
  onCreatePost: (post: {
    title: string
    content: string
    image?: string
    isSubscriberOnly: boolean
  }) => void
}

export function CreatePostDialog({ onCreatePost }: CreatePostDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [image, setImage] = useState<string>("")
  const [isSubscriberOnly, setIsSubscriberOnly] = useState(false)
  const imageInputRef = useRef<HTMLInputElement>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!title || !content) return

    onCreatePost({
      title,
      content,
      image: image || undefined,
      isSubscriberOnly
    })

    setTitle("")
    setContent("")
    setImage("")
    setIsSubscriberOnly(false)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Icon name="Plus" size={18} className="mr-2" />
          Create Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Share content with your subscribers
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label>Image (optional)</Label>
            <div 
              className="relative h-48 rounded-lg border-2 border-dashed border-border hover:border-primary transition-colors cursor-pointer overflow-hidden group"
              onClick={() => imageInputRef.current?.click()}
            >
              {image ? (
                <>
                  <img 
                    src={image} 
                    alt="Post" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Icon name="Upload" size={32} className="text-white" />
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground">
                  <Icon name="Image" size={32} />
                  <span className="text-sm">Click to upload image</span>
                </div>
              )}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
            <div className="flex items-start gap-3">
              <Icon name="Lock" size={20} className="text-primary mt-0.5" />
              <div>
                <Label htmlFor="subscriber-only" className="cursor-pointer">
                  Subscribers Only
                </Label>
                <p className="text-sm text-muted-foreground">
                  Only your subscribers can see this post
                </p>
              </div>
            </div>
            <Switch
              id="subscriber-only"
              checked={isSubscriberOnly}
              onCheckedChange={setIsSubscriberOnly}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" className="flex-1" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleSubmit}
              disabled={!title || !content}
            >
              Publish Post
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
