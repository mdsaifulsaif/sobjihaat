"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

const loginSchema = z
  .object({
    email: z.string().email("সঠিক ইমেইল দিন").optional().or(z.literal("")),
    mobile: z
      .string()
      .min(11, "সঠিক মোবাইল নম্বর দিন")
      .optional()
      .or(z.literal("")),
    password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে"),
  })
  .refine((data) => data.email || data.mobile, {
    message: "ইমেইল অথবা মোবাইল নম্বর দিতে হবে",
    path: ["email"],
  });

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("phone");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      console.log("🔐 Login Data:", { ...data, tab: activeTab });
      await new Promise((resolve) => setTimeout(resolve, 1200));
      return data;
    },
    onSuccess: () => {
      alert("🎉 Login Successful! Check console for data.");
      reset();
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  const onSubmit = (data: LoginForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* ==================== LEFT SIDE - ILLUSTRATION ==================== */}
          <div className="gradient-hero p-12 flex flex-col justify-center items-center text-center hidden md:flex">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-6 leading-tight">
              Welcome Back to
              <br />
              <span className="text-[#22C55E]">GrocerBanga!</span>
            </h2>
            <p className="text-[#6B7280] mb-10 max-w-md text-lg">
              Login to quickly reorder your favorites and check delivery status.
            </p>

            <Image
              src="/images/log.jpg"
              alt="Fresh Family Shopping"
              width={500}
              height={500}
              className="rounded-3xl shadow-lg w-full max-w-md object-cover"
            />

            <div className="mt-10 text-sm text-[#6B7280]">
              Trusted by 50,000+ happy customers 🌿
            </div>
          </div>

          {/* ==================== RIGHT SIDE - LOGIN FORM ==================== */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-8 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="w-14 h-14 bg-[#22C55E] rounded-2xl flex items-center justify-center text-3xl">
                  🥕
                </div>
              </div>
              <h1 className="text-3xl font-semibold text-[#1F2937]">
                Account Login
              </h1>
              <p className="text-[#6B7280] mt-2">
                Enter your credentials to access your account
              </p>
            </div>

            {/* Email / Phone Tabs */}
            <div className="flex gap-2 bg-gray-100 p-1.5 rounded-2xl mb-8">
              <button
                onClick={() => setActiveTab("email")}
                className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === "email"
                    ? "bg-[#22C55E] text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-white"
                }`}
              >
                ✉️ Email
              </button>
              <button
                onClick={() => setActiveTab("phone")}
                className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === "phone"
                    ? "bg-[#22C55E] text-white shadow-sm"
                    : "bg-white text-gray-600 hover:bg-white"
                }`}
              >
                📞 Phone No.
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Email or Mobile Field */}
              {activeTab === "email" ? (
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Your Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#22C55E] transition-all"
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Mobile Number
                  </label>
                  <input
                    {...register("mobile")}
                    type="tel"
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#22C55E] transition-all"
                    placeholder="017XXXXXXXX"
                  />
                  {errors.mobile && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.mobile.message}
                    </p>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-[#1F2937]">
                    Password
                  </label>
                  <a
                    href="#"
                    className="text-sm text-[#22C55E] hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#22C55E] transition-all"
                  placeholder="Your secure password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="btn-primary w-full py-4 text-lg font-semibold rounded-2xl disabled:opacity-70"
              >
                {mutation.isPending ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Links */}
            <p className="text-center mt-8 text-[#6B7280]">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-[#22C55E] font-semibold hover:underline"
              >
                Create one here
              </a>
            </p>

            {/* Social Login */}
            <div className="mt-8">
              <p className="text-center text-sm text-[#6B7280] mb-4">
                Or login with
              </p>
              <div className="flex justify-center gap-4">
                <button className="w-12 h-12 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors flex items-center justify-center">
                  G
                </button>
                <button className="w-12 h-12 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors flex items-center justify-center text-blue-600 text-2xl">
                  f
                </button>
                <button className="w-12 h-12 border border-gray-200 rounded-2xl hover:border-gray-300 transition-colors flex items-center justify-center text-xl">
                  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
