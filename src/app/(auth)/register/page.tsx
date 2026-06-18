"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "নাম কমপক্ষে ২ অক্ষর হতে হবে"),
    email: z.string().email("সঠিক ইমেইল দিন").optional().or(z.literal("")),
    mobile: z
      .string()
      .min(11, "সঠিক মোবাইল নম্বর দিন")
      .optional()
      .or(z.literal("")),
    password: z.string().min(6, "পাসওয়ার্ড কমপক্ষে ৬ অক্ষর হতে হবে"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "পাসওয়ার্ড মিলছে না",
    path: ["confirmPassword"],
  })
  .refine((data) => data.email || data.mobile, {
    message: "ইমেইল অথবা মোবাইল নম্বর দিতে হবে",
    path: ["email"],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [activeTab, setActiveTab] = useState<"email" | "phone">("email");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: RegisterForm) => {
      console.log("📋 Registration Data:", { ...data, tab: activeTab });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return data;
    },
    onSuccess: () => {
      alert("🎉 Registration Successful! Check console for data.");
      reset();
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const onSubmit = (data: RegisterForm) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* ==================== LEFT SIDE - IMAGE ==================== */}
          <div className="gradient-hero p-12 flex flex-col justify-center items-center text-center hidden md:flex">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F2937] mb-6 leading-tight">
              Start Your Fresh
              <br />
              Journey with <span className="text-[#22C55E]">Sobjihaat</span>
            </h2>
            <p className="text-[#6B7280] mb-10 max-w-md text-lg">
              Join thousands of families getting fresh groceries delivered daily
            </p>

            <Image
              src="/images/reg.jpg"
              alt="Fresh Family Shopping"
              width={500}
              height={500}
              className="rounded-3xl shadow-lg w-full max-w-md object-cover"
            />

            <div className="mt-10 text-sm text-[#6B7280]">
              Trusted by 50,000+ happy customers 🌿
            </div>
          </div>

          {/* ==================== RIGHT SIDE - FORM ==================== */}
          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <div className="mb-8 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-4">
                <div className="w-14 h-14 bg-[#22C55E] rounded-2xl flex items-center justify-center text-3xl">
                  🥕
                </div>
              </div>
              <h1 className="text-3xl font-semibold text-[#1F2937]">
                Get Started Now
              </h1>
              <p className="text-[#6B7280] mt-2">
                Enter your credentials to create your account
              </p>
            </div>

            {/* Tabs */}
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
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-[#1F2937] mb-2">
                  Your Full Name
                </label>
                <input
                  {...register("fullName")}
                  type="text"
                  className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#22C55E] transition-all"
                  placeholder="Type your name"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              {/* Email or Mobile */}
              {activeTab === "email" ? (
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Your Email
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#22C55E] transition-all"
                    placeholder="joneemail@gmail.com"
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
                    Your Mobile Number
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

              {/* Password Fields in One Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Password
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#22C55E] transition-all"
                    placeholder="Your password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#1F2937] mb-2">
                    Confirm Password
                  </label>
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:border-[#22C55E] transition-all"
                    placeholder="Your password"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 w-5 h-5 accent-[#22C55E]"
                  required
                />
                <p className="text-sm text-[#6B7280]">
                  I agree to the{" "}
                  <span className="text-[#22C55E] hover:underline cursor-pointer">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="text-[#22C55E] hover:underline cursor-pointer">
                    Privacy Policy
                  </span>
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={mutation.isPending}
                className="btn-primary w-full py-4 text-lg font-semibold rounded-2xl disabled:opacity-70"
              >
                {mutation.isPending ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="text-center mt-8 text-[#6B7280]">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-[#22C55E] font-semibold hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
