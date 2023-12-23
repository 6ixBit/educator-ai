export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen flex items-center px-8 sm:px-10 bg-login-bckg">
      {children}
    </div>
  );
}
