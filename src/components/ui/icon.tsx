import { icons, LucideProps } from 'lucide-react'

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string
  fallback?: string
}

const Icon = ({ name, fallback = 'CircleAlert', ...props }: IconProps) => {
  const LucideIcon = icons[name as keyof typeof icons] || icons[fallback as keyof typeof icons]
  
  if (!LucideIcon) {
    console.warn(`Icon "${name}" not found, and fallback "${fallback}" also not found`)
    return null
  }

  return <LucideIcon {...props} />
}

export default Icon
