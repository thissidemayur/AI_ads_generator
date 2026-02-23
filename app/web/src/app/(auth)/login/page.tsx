import { LoginForm } from "@/features/auth/compononts/loginForm";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const errorType = params.error as string | undefined;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm errorMessage={errorType} />
    </div>
  );
}
