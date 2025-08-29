import TransitionLayout from "./auth-animation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TransitionLayout>{children}</TransitionLayout>;
}
