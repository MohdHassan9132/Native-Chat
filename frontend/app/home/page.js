import HomePage from "@/components/home/HomePage";

export const metadata = {
  title: "Chats — nativeChat",
  description: "Your nativeChat conversations.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Home() {
  return <HomePage />;
}
