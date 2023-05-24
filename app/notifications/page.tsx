import Header from "@/components/Header";
import NotificationsFeed from "@/components/NotificationsFeed";

export async function Page() {
  return (
    <div>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </div>
  );
}
export default Page;
