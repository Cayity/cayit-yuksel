import AdminPanel from './AdminPanel'
import { getContent } from '@/lib/content'

export default async function AdminPage() {
  const content = await getContent()
  return <AdminPanel initialContent={content} />
}
