import "./globals.css";
import AuthContext from "./AuthContext";
import { Session } from "next-auth";
import Sidebar from "@/components/layout/Sidebar";
import FollowBar from "@/components/layout/Followbar";
import { Toaster } from "react-hot-toast";

import RegisterModal from "@/components/Modals/RegisterModal";
import LoginModal from "@/components/Modals/LoginModal";

import { headers } from "next/headers";

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`http://localhost:3000/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <html lang="en">
      <body>
        <AuthContext session={session}>
          <Toaster />
          <div className="h-screen bg-white">
            <div className="container h-full mx-auto xl:px-[30px] max-w-[full] bg-white">
              <div className="grid grid-cols-8 h-full">
                <LoginModal />
                <RegisterModal />
                <Sidebar />
                <div className="col-span-6 lg:col-span-4 border-x-[1px] border-neutral-200">
                  {children}
                </div>
                <FollowBar />
              </div>
            </div>
          </div>
        </AuthContext>
      </body>
    </html>
  );
}

export const metada = {
  title: "My twitter",
  description: "My twitter description",
};
