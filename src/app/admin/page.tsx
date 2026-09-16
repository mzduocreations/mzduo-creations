import { isAuthenticated } from "@/lib/auth";
import { getAllImages } from "@/models/image";
import LoginForm from "@/components/admin/LoginForm";
import Dashboard from "@/components/admin/Dashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | MZDUO creations",
};

export default async function AdminPage() {
  const authed = await isAuthenticated();

  if (!authed) {
    return <LoginForm />;
  }

  let images = [] as Awaited<ReturnType<typeof getAllImages>>;
  try {
    images = await getAllImages();
  } catch {
    images = [];
  }

  return <Dashboard initialImages={images} />;
}
