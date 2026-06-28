import { whatsappLink } from '@/lib/utils'
import { IconWhatsApp } from '@/components/ui/icons'

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink('Hi AM Perfume! I have a question about your fragrances.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="group fixed right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition-transform duration-300 hover:scale-105"
      style={{ bottom: 'calc(1.25rem + env(safe-area-inset-bottom))' }}
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-20" />
      <IconWhatsApp className="h-7 w-7" />
    </a>
  )
}
