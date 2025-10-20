"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect } from "react";
import FocusCardsApp from "@/app/components/focus-cards-app";
import { Modal } from "@/components/ui/modal";
import { SignupFormApp } from "@/app/page/user/user-login-page";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLoginUser } from "@/stores/user";
import { getLoginUserUsingGet, userLogoutUsingPost } from "@/api/userController";
import Link from 'next/link'
export default function NavbarApp() {
  const navItems = [
    {
      name: "主页",
      link: "/",
    },
    {
      name: "图片管理",
      link: "/page/picture/manage-picture-page", // 改为实际路由路径
      },
  {
  name: "创建图片",
  link: "/page/picture/add-picture-page", // 改为实际路由路径
  },
    {
      name: "用户管理",
      link: "/user/user-management-page",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { loginUser, setLoginUser, fetchLoginUser } = useLoginUser();
  
  // 页面加载时检查用户登录状态
  useEffect(() => {
    fetchLoginUser();
  }, [fetchLoginUser]);
  
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsMobileMenuOpen(false); // 关闭移动菜单
  };
  
  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };
  
  // 退出登录函数
  const handleLogout = async () => {
    try {
      await userLogoutUsingPost();
      // 清除用户信息
      setLoginUser({ userName: '未登录' });
    } catch (error) {
      console.error('退出登录失败:', error);
    }
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            {loginUser.userName !== '未登录' ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <NavbarButton variant="secondary">
                    {loginUser.userName}
                  </NavbarButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout}>
                    退出登录
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <NavbarButton variant="secondary" onClick={openLoginModal}>Login</NavbarButton>
            )}
            <NavbarButton variant="primary">Book a call</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => {
              const isInternal = item.link.startsWith('/') && !item.link.startsWith('//');
              
              if (isInternal) {
                return (
                  <Link
                    key={`mobile-link-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-neutral-600 dark:text-neutral-300"
                  >
                    <span className="block">{item.name}</span>
                  </Link>
                );
              }
              
              return (
                <a
                  key={`mobile-link-${idx}`}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="relative text-neutral-600 dark:text-neutral-300"
                >
                  <span className="block">{item.name}</span>
                </a>
              );
            })}
            <div className="flex w-full flex-col gap-4">
              {loginUser.userName !== '未登录' ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <NavbarButton
                      variant="primary"
                      className="w-full justify-center"
                    >
                      {loginUser.userName}
                    </NavbarButton>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={handleLogout}>
                      退出登录
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <NavbarButton
                  onClick={openLoginModal}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              )}
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book a call
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      <Modal isOpen={isLoginModalOpen} onClose={closeLoginModal}>
        <SignupFormApp onLoginSuccess={closeLoginModal} />
      </Modal>
    </div>
  );
}

