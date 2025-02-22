
import dynamic from "next/dynamic";
const DashboardView = dynamic(
  () => import("@/sections/dashboard/views/dashboard-view"),
  {
    ssr: true,
  }
);

const Dashboard = () => {
  return (
    <DashboardView>
      {/* <OfferTable /> */}
    </DashboardView>
  );
};

export default Dashboard;
