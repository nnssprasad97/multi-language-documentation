"use client";

import Link from 'next/link';
import React from 'react';
import Search from '@/components/Search';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import VersionSelector from '@/components/VersionSelector';

interface HeaderProps {
  lang: string;
}

export default function Header({ lang }: HeaderProps) {

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link href={`/${lang}/docs/v1/introduction`} prefetch={false} className="text-xl font-bold">
          Docs Platform
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Search />
        <VersionSelector />
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
