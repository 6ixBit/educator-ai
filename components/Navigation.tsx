export default function Navigation({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm text-foreground">
        {children}
      </div>
    </nav>
  );
}
