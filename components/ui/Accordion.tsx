'use client'
import { useState } from 'react'

export interface AccordionItem {
  title: string
  content: React.ReactNode
}

export default function Accordion({
  items,
  defaultOpen = 0,
}: {
  items: AccordionItem[]
  defaultOpen?: number | null
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen)

  return (
    <div className="border-t border-ink/10">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <div key={item.title} className="border-b border-ink/10">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-4 text-left"
            >
              <span className="font-body text-[13px] font-semibold uppercase tracking-[0.12em] text-ink">
                {item.title}
              </span>
              <span className="relative h-4 w-4 shrink-0 text-gold-deep">
                <span className="absolute left-1/2 top-1/2 h-[1.5px] w-3.5 -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span
                  className={`absolute left-1/2 top-1/2 h-3.5 w-[1.5px] -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 ${
                    isOpen ? 'rotate-90' : ''
                  }`}
                />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-5 font-body text-sm leading-relaxed text-ink-soft">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
