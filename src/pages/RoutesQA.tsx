// import RoutesTable from "@/components/RoutesTable";
// import Contact from "../components/Contact";

// function RoutesQA() {
    

//     return (
//         <div>
//             <RoutesTable />
//             <Contact />
//         </div>
//     );
// }

// export default RoutesQA;

import RoutesTable from "@/components/RoutesTable";

function RoutesQA() {
  return (
    <div className="w-full min-h-screen px-4 md:px-8 lg:px-4 py-10 flex flex-col gap-8">

      {/* جدول خطوط السير */}
      <div className="max-w-6xl mx-auto w-full">
        <RoutesTable />
      </div>

    </div>
  );
}

export default RoutesQA;
