import { useState } from "react";
interface FAQItemProps {
  q: string;
  a: string;
}

const FAQItem = ({ q, a }: FAQItemProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b py-4">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center  flex-row-reverse text-right"
      >
        <span className="font-semibold text-lg" style={{color:"var(--main-internal-color)"}}>{q}</span>
        <span className="text-2xl" style={{color:"var(--main-internal-color)"}}>{open ? "−" : "+"}</span>
      </button>

      {open && <p className="mt-2 text-base text-right" >{a}</p>}
    </div>
  );
};

const FAQSection = () => {
  const faqData = [
    { q: "هل لازم أكون عامل حساب أو تسجيل دخول؟", a: "لا مش لازم لو محتاج تعرف المواصلات بس. لكن علشان تقدر تشوف تاريخ رحلاتك لازم يكون عندك حساب" },
    { q: "هل النظام بيدعم مناطق معينة بس؟", a: "حاليا بنغطى القاهرة والجيزة بس لكن هنضيف مناطق جديدة تدريجيا " },
    { q: "هل أقدر أشوف تفاصيل عن الرحلة؟", a: "طبعا تقدر تشوف كل التفاصيل المتاحة من جزء المسارات من الجزء اللى فوق" },
    { q: "هل البيانات دقيقة؟", a: "طبعا دقيقة باكبر قدر ممكن حسب المعلومات المتاحة وبنحاول نحدثها باستمرار" },
    { q: "طيب ايه الحاجة اللى بتميزنا؟", a: "النظام بتاعنا يقدر يساعد كمان اصحاب الصم والبكم" },
    
  ];

  return (
    <div className="questions">
      <div className="title w-fit m-auto">
        <h2 className="text-2xl font-bold mb-2 text-white mt-3" >اكتر الاسئلة الشائعة؟</h2>
        <hr className=" text-base mb-7" style={{color:"var(--main-hover-color)"}}></hr>
      </div>
    <div className=" mx-auto bg-white shadow-lg rounded-2xl p-8 mt-15 container ">
      

      {faqData.map((item, i) => (
        <FAQItem key={i} q={item.q} a={item.a} />
      ))}
    </div>
    </div>
  );
};


export default FAQSection;
