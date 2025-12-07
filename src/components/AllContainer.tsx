import TransItem from "./TransItem";

const data = [
  {
    id: 1,
    busNumber: "152",
    price: 15,
    lastStation: "Tahrir Square",
    type: "Bus",
  },
  {
    id: 2,
    busNumber: "45A",
    price: 12,
    lastStation: "Ramses Station",
    type: "Bus",
  },
  {
    id: 3,
    busNumber: "89B",
    price: 10,
    lastStation: "Nasr City",
    type: "Bus",
  },
  {
    id: 4,
    busNumber: "67C",
    price: 9,
    lastStation: "Heliopolis",
    type: "Bus",
  },
];

function AllContainer() {
  return (
    <div
      className="
        bg-white shadow-md 
        grid gap-6 sm:grid-cols-2 
        w-full md:w-[95%] max-w-6xl mx-auto
        transition-all duration-300 

        rounded-[2rem] md:rounded-2xl
        my-0 md:my-10
        p-4 sm:p-8
      "
    >
      {data.map((trans) => (
        <TransItem key={trans.id} trans={trans} />
      ))}
    </div>
  );
}

export default AllContainer;
