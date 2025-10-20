"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";
import { Modal } from "@/components/ui/modal";
import { RegisterFormApp } from "./user-register-page";
import { userLoginUsingPost } from "@/api/userController";
import { useToast } from "@/components/ui/toast";

export function SignupFormApp({ onLoginSuccess }: { onLoginSuccess?: () => void,
}) {
  const { showToast } = useToast();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    // 获取表单数据
    const form = e.currentTarget;
    const account = (form.querySelector('#account') as HTMLInputElement).value;
    const password = (form.querySelector('#password') as HTMLInputElement).value;
    try {
      // 构建登录请求参数
      const loginData = {
        userAccount: account,
        userPassword: password,
      };
      // 调用登录API
      const response = await userLoginUsingPost(loginData);
      // 处理响应
      if (response.data.code === 0) {
        // 保存用户ID到localStorage或sessionStorage（如果需要）
        // localStorage.setItem('userId', response.data.data);
        // 显示登录成功提示
        showToast('登录成功！', 'success');
        // 重置表单
        form.reset();
        // 登录成功后通知父组件
        if (onLoginSuccess) {
          onLoginSuccess();
        }
      } else {
        console.error('登录失败:', response.data.message);
        showToast(`登录失败: ${response.data.message || '未知错误'}`, 'error');
        // 重置表单
        form.reset();
      }
    } catch (error) {
      console.error('登录请求异常:', error);  
      showToast('网络异常，请稍后重试', 'error');
    }
  };
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  
  const openRegisterModal = () => {
    setIsRegisterModal(true);
    setIsMobileMenuOpen(false); // 关闭移动菜单
  };
  
  const closeRegisterModal = () => {
    setIsRegisterModal(false);
  };





  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to Aceternity
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Login to aceternity if you can because we don&apos;t have a login flow
        yet
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="account">Account</Label>
          <Input id="account" placeholder="Enter your account" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" placeholder="••••••••" type="password" />
        </LabelInputContainer>
 <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
     <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="button"
          onClick={openRegisterModal}
        >
          注册 &rarr;
          <BottomGradient />
        </button>
           <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          登录 &rarr;
          <BottomGradient />
        </button>
 </div>
     

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />

        <div className="flex flex-col space-y-4">
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              GitHub
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              Google
            </span>
            <BottomGradient />
          </button>
          <button
            className="group/btn shadow-input relative flex h-10 w-full items-center justify-start space-x-2 rounded-md bg-gray-50 px-4 font-medium text-black dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_#262626]"
            type="submit"
          >
            <IconBrandOnlyfans className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-sm text-neutral-700 dark:text-neutral-300">
              OnlyFans
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
        <Modal isOpen={isRegisterModal} onClose={closeRegisterModal}>
        <RegisterFormApp onRegisterSuccess={closeRegisterModal} />
      </Modal>
    </div>
    
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};
