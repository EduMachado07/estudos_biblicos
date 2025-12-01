import { Outlet } from "react-router";
import Footer from "./components/Footer";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <main className="bg-[#efefef] min-h-dvh pb-8 px-[3vw] lg:px-[8vw] w-full flex flex-col gap-4 md:gap-8">
        <Navbar />
        <hr className="-mt-3" />

        <section className="flex-1">
          <Outlet />
        </section>

        {/* <GetStudiesPage {...methods} /> */}

        <hr />
        <Footer />
      </main>
    </>
  );
}

export default App;
