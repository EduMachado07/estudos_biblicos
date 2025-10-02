import { useGetStudiesModel } from "./app/(Studies)/get/getStudies.model";
import { GetStudiesPage } from "./app/(Studies)/get/page";
import { Navbar } from "./components/Navbar";
import { GetStudyAllService } from "./service/implementations/GetStudyAllService";
// import Footer from "./components/Footer";

function App() {
  const getStudyAll = new GetStudyAllService()
  const methods = useGetStudiesModel({
    getAllStudiesService: getStudyAll
  });
  return (
    <>
      <main className="bg-[#efefef] min-h-screen pb-4 px-[2vw] lg:px-[8vw] w-full flex flex-col gap-4 md:gap-8">
        <Navbar {...methods}  />
        <hr className="-mt-4" />

        <GetStudiesPage {...methods} />

        <hr />
        {/* <Footer /> */}
      </main>
    </>
  );
}

export default App;
