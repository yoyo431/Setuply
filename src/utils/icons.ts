import {
  Keyboard,
  Mouse,
  Headphones,
  Layers,
  Mic,
  Video,
  Laptop,
  Fan,
  BatteryCharging,
  Cable,
  Usb,
  Monitor,
  Gamepad2,
  Cpu,
  HardDrive,
  Package,
  type LucideIcon,
} from 'lucide-react'

// خريطة الأيقونات المستخدمة في التصنيفات — يمكن التوسع فيها مستقبلًا
export const iconMap: Record<string, LucideIcon> = {
  Keyboard,
  Mouse,
  Headphones,
  Layers,
  Mic,
  Video,
  Laptop,
  Fan,
  BatteryCharging,
  Cable,
  Usb,
  Monitor,
  Gamepad2,
  Cpu,
  HardDrive,
}

export function getIcon(name: string): LucideIcon {
  return iconMap[name] || Package
}
