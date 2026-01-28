import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

interface SubscriptionTierProps {
  name: string
  price: number
  description: string
  benefits: string[]
  isPopular?: boolean
}

export function SubscriptionTier({ 
  name, 
  price, 
  description, 
  benefits,
  isPopular 
}: SubscriptionTierProps) {
  return (
    <Card className={`p-6 relative ${isPopular ? 'border-primary border-2' : ''}`}>
      {isPopular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
          Популярный
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-xl mb-1">{name}</h3>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">₽/мес</span>
        </div>

        <Button className="w-full" variant={isPopular ? "default" : "outline"}>
          Подписаться
        </Button>

        <div className="space-y-3 pt-2">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <Icon name="Check" size={18} className="text-primary mt-0.5 flex-shrink-0" />
              <span className="text-sm">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
