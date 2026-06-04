import AdminPanel from './AdminPanel'
import { getContent } from '@/lib/content'

export default function AdminPage() {
  const content = getContent()
  return <AdminPanel initialContent={content} />
}
