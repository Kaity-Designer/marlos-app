// Chat is full-screen — override parent layout to skip BottomNav and padding
export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
