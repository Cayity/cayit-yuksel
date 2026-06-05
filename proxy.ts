import { NextRequest, NextResponse } from 'next/server'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login') && !pathname.startsWith('/admin/api/')) {
    const token = request.cookies.get('admin_token')?.value
    const validToken = process.env.ADMIN_TOKEN

    if (!token || token !== validToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  const locale = pathname.startsWith('/en') ? 'en' : 'tr'
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)
  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
