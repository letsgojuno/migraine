import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import Image from "next/image";
import Link from "next/link";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Image
        src="/google.svg"
        alt="Google logo"
        width={48}
        height={48}
        className="mb-4"
      />
      <h1 className="text-2xl font-bold mb-2">
        Welcome, {session.user.name || "User"}!
      </h1>
      <p className="mb-6">You have successfully signed in with Google.</p>
      <form action="/api/auth/signout" method="POST">
        <button
          type="submit"
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px] bg-blue-600 text-white"
        >
          Sign out
        </button>
      </form>
      <Link href="/" className="mt-4 text-blue-600 underline">
        Back to Home
      </Link>
    </div>
  );
}
