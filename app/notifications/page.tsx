import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";

export default async function Home() {
  return (
    <div>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </div>
  );
}
