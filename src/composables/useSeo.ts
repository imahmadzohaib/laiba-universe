import { onMounted } from 'vue'
import type { RouteSeo } from '@/data/content'

/** Sets document title + meta description for a route. */
export function useSeo(meta: RouteSeo) {
  const apply = () => {
    document.title = meta.title
    setMeta('name', 'description', meta.description)
    setMeta('property', 'og:title', meta.title)
    setMeta('property', 'og:description', meta.description)
    setMeta('name', 'twitter:title', meta.title)
    setMeta('name', 'twitter:description', meta.description)
  }
  onMounted(apply)
  // Also apply immediately for in-SPA navigations.
  apply()
}

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  if (typeof document === 'undefined') return
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}
