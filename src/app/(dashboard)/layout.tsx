"use client";

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider
} from "@/components/ui/sidebar";
import { BookOpen, BarChart3, TestTubeDiagonal, LayoutDashboard, Database } from 'lucide-react';
import { Logo } from '@/components/logo';
import PasswordGate from './password-gate';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const authenticated = sessionStorage.getItem('vkp-cfs-authenticated');
    if (authenticated === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSuccess = () => {
    sessionStorage.setItem('vkp-cfs-authenticated', 'true');
    setIsAuthenticated(true);
  };

  if (!isClient) {
    return null; // Or a loading spinner
  }

  if (!isAuthenticated) {
    return (
      <main className="flex-1 overflow-y-auto bg-background">
          <PasswordGate onSuccess={handleSuccess} />
      </main>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar side="left" collapsible="icon" className="border-r">
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
            <Logo className="size-6 text-primary group-data-[collapsible=icon]:size-8" />
            <span className="text-lg font-headline font-semibold group-data-[collapsible=icon]:hidden">
              VKP-CFS
            </span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" tooltip="Dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarGroup>
            <SidebarGroupLabel>Analysis</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/material-matrix" tooltip="Material Matrix">
                    <Database />
                    <span>Material Matrix</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/validation" tooltip="Validation">
                    <TestTubeDiagonal />
                    <span>Validation</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/results" tooltip="Results">
                    <BarChart3 />
                    <span>Results</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Resources</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton href="/dashboard/knowledge-hub" tooltip="Knowledge Hub">
                    <BookOpen />
                    <span>Knowledge Hub</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="flex flex-col h-full">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
