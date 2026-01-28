import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface SubscriptionTierProps {
  name: string
  price: number
  description?: string
  benefits: string[]
  isPopular?: boolean
  currency?: string
  authorName?: string
  userNickname?: string
  onSubscribe?: () => void
}

export function SubscriptionTier({ 
  name, 
  price, 
  description, 
  benefits,
  isPopular,
  currency = '₽',
  authorName,
  userNickname,
  onSubscribe
}: SubscriptionTierProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('paypal')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = async () => {
    try {
      await fetch('https://functions.poehali.dev/8791a299-0819-4202-93b5-b9c49fe0853e', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          authorName: authorName || 'Unknown',
          tierName: name,
          tierPrice: price.toString(),
          currency: currency,
          paymentMethod: paymentMethod,
          userNickname: userNickname || 'Anonymous'
        })
      })
    } catch (error) {
      console.error('Failed to notify admin:', error)
    }
    
    setIsSubscribed(true)
    onSubscribe?.()
    
    setTimeout(() => {
      setIsDialogOpen(false)
    }, 2000)
  }
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
          <span className="text-3xl font-bold">{currency === '$' && currency}{price}{currency !== '$' && ` ${currency}`}</span>
          <span className="text-muted-foreground">/mo</span>
        </div>

        <Button 
          className="w-full" 
          variant={isPopular ? "default" : "outline"}
          onClick={() => setIsDialogOpen(true)}
        >
          Subscribe
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Subscribe to {name}</DialogTitle>
              <DialogDescription>
                {currency === '$' && currency}{price}{currency !== '$' && ` ${currency}`}/month
              </DialogDescription>
            </DialogHeader>

            {!isSubscribed ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Choose payment method:</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <div className="flex-1">
                        <Label htmlFor="paypal" className="font-semibold cursor-pointer">
                          PayPal
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          zoid.ketevan@gmail.com
                        </p>
                        <p className="text-xs text-amber-600 dark:text-amber-500 mt-1 font-medium">
                          ⚠️ Use "Family and Friends" option
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4">
                      <RadioGroupItem value="btc" id="btc" />
                      <div className="flex-1">
                        <Label htmlFor="btc" className="font-semibold cursor-pointer">
                          Bitcoin (BTC)
                        </Label>
                        <p className="text-xs text-muted-foreground mt-2 font-mono break-all">
                          1LHwjpMPtuhzNjUp6nXMXaFmu5EGinvWNY
                        </p>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <p className="text-sm font-medium">Instructions:</p>
                  <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Send payment to the address above</li>
                    <li>Keep your transaction ID</li>
                    <li>Click "Confirm Payment" below</li>
                    <li>Admin will verify and activate your subscription</li>
                  </ol>
                </div>

                <Button 
                  className="w-full" 
                  onClick={handleSubscribe}
                >
                  Confirm Payment
                </Button>
              </div>
            ) : (
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="Check" size={32} className="text-green-600 dark:text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600 dark:text-green-500">
                    Subscription Confirmed!
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Your payment is being verified. You'll get access soon.
                  </p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

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