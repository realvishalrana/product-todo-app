import HeaderWrapper from "@/components/HeaderWrapper";
import WithAuth from "@/hoc/WithAuth";

const Home = () => {
  return (
    <HeaderWrapper>
      <div className="p-6 h-full flex flex-col justify-center items-center">
        <h1 className="text-4xl sm:text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to the Product Management App!
        </h1>
        <p className="text-lg sm:text-base md:text-lg text-gray-600 mb-6 text-center sm:px-4">
          This is a simple and efficient application to help you manage your
          tasks and track your progress. With this app, you can:
        </p>
        <ul className="text-lg sm:text-base md:text-lg text-gray-600 list-disc pl-5 space-y-2">
          <li>Add new tasks: Quickly add tasks to your to-do list.</li>
          <li>Edit existing tasks: Update and modify your tasks easily.</li>
          <li>Delete tasks: Remove tasks when you&apos;re done with them.</li>
          <li>Track progress: Keep track of your tasks&apos; completion status.</li>
        </ul>
      </div>
    </HeaderWrapper>
  );
};

export default WithAuth(Home);
