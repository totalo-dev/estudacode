import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Pega o cookie de autenticação mockado
  const token = request.cookies.get('estudacode-token');
  
  // Rotas que devem ser protegidas
  const protectedRoutes = [
    '/dashboard',
    '/trilhas',
    '/projetos',
    '/perfil',
    '/configuracoes',
    '/busca',
    '/certificado',
    '/notificacoes',
    '/onboarding'
  ];
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  );

  // Se for uma rota protegida e não tiver o cookie, redireciona para cadastro
  if (isProtectedRoute && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/cadastro';
    return NextResponse.redirect(url);
  }

  // Se o usuário já estiver logado e tentar acessar /login ou /cadastro, manda pro dashboard
  const isAuthRoute = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/cadastro';
  if (isAuthRoute && token) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Ignora rotas da API, arquivos estáticos e de build do Next.js
  matcher: ['/((?!api|_next/static|_next/image|favicon_io|favicon.ico).*)'],
};
