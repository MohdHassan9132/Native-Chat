import InitialDetailsPage from "@/components/initials/InitialDetailsPage";

export const metadata = {
  title: "Create Your Profile — nativeChat",
  description: "Add your name and photo to finish setting up nativeChat.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Initials() {
  return <InitialDetailsPage />;
}
