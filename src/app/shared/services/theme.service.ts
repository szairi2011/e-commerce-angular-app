import { Injectable } from '@angular/core';

type ThemeMode = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'theme';

  get current(): ThemeMode {
    const saved = localStorage.getItem(this.storageKey) as ThemeMode | null;
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  init(): void {
    this.apply(this.current);
  }

  toggle(): ThemeMode {
    const next: ThemeMode = this.current === 'dark' ? 'light' : 'dark';
    this.set(next);
    return next;
  }

  set(mode: ThemeMode): void {
    localStorage.setItem(this.storageKey, mode);
    this.apply(mode);
  }

  private apply(mode: ThemeMode): void {
    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }
}


