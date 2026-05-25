import { useState, useEffect } from 'react';

export function useAvatar() {
  const [avatarUrl, setAvatarUrlState] = useState<string | null>(null);

  useEffect(() => {
    // Carrega o avatar inicial se houver
    const stored = localStorage.getItem('estudacode-avatar');
    if (stored) {
      setAvatarUrlState(stored);
    }

    // Escuta mudanças de outras abas
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'estudacode-avatar') {
        setAvatarUrlState(e.newValue);
      }
    };
    
    // Escuta mudanças na mesma aba
    const handleCustom = (e: CustomEvent) => {
      setAvatarUrlState(e.detail);
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('avatar-change', handleCustom as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('avatar-change', handleCustom as EventListener);
    };
  }, []);

  const setAvatarUrl = (url: string | null) => {
    if (url) {
      localStorage.setItem('estudacode-avatar', url);
    } else {
      localStorage.removeItem('estudacode-avatar');
    }
    setAvatarUrlState(url);
    // Dispara o evento para atualizar os outros componentes na tela
    window.dispatchEvent(new CustomEvent('avatar-change', { detail: url }));
  };

  return { avatarUrl, setAvatarUrl };
}
