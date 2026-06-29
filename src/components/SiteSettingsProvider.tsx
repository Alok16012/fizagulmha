'use client';

import { createContext, useContext } from 'react';
import { defaultHomeContent, type SiteSettings } from '@/data/homeContent';

const SiteSettingsContext = createContext<SiteSettings>(defaultHomeContent.site);

export function SiteSettingsProvider({ settings, children }: { settings: SiteSettings; children: React.ReactNode }) {
  return (
    <SiteSettingsContext.Provider value={{ ...defaultHomeContent.site, ...settings }}>
      {children}
    </SiteSettingsContext.Provider>
  );
}

export function useSiteSettings() {
  return useContext(SiteSettingsContext);
}
