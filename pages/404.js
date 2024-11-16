import routes from "@/utils/routes";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4">
          Sorry, the page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href={routes.home} className="text-blue-500 mt-6 inline-block">
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
