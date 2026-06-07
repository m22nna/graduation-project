import { Mic, Camera, MapPin, Search, Navigation, Info, CheckCircle, LayoutGrid, FileClock, ShieldAlert, HeartHandshake, UserCog, HelpCircle } from "lucide-react";
import HowToUseHero from "@/components/how-to-use/HowToUseHero";
import VideoGuide from "@/components/how-to-use/VideoGuide";
import GuideCard from "@/components/how-to-use/GuideCard";

export default function HowToUse() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#60ba8b] via-[#32915a] to-[#217c47] py-10 px-4 md:px-8 text-slate-100" dir="rtl">
      <div className="max-w-5xl mx-auto">
        {/* Header Hero Section */}
        <HowToUseHero />

        {/* Video Placeholder Container */}
        <VideoGuide />

        {/* Core Features Section Heading */}
        <div className="mb-8 mt-12 border-r-4 border-white pr-4">
          <h2 className="text-2xl md:text-3xl font-black text-white">الخصائص الأساسية للبحث والتوجيه</h2>
          <p className="text-sm text-emerald-100 mt-1">تفاصيل الأدوات المتقدمة لتسهيل العثور على رحلاتك</p>
        </div>

        {/* Core Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          
          {/* Step 1: Destination Search */}
          <GuideCard
            icon={Search}
            stepText="1. تحديد نقطة البداية والنهاية"
            iconBgClass="bg-blue-50"
            iconColorClass="text-blue-600"
            description={
              <p>
                أدخل اسم المدينة والمحطة التي ترغب في الانطلاق منها في خانة <strong className="text-blue-600">From</strong>، والوجهة التي تريد الوصول إليها في خانة <strong className="text-orange-600">To</strong>.
              </p>
            }
          >
            <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl flex items-start gap-2.5">
              <Info size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-800 font-medium">
                تنبيه: للبحث الدقيق، يرجى كتابة اسم المدينة مصحوباً باسم المحطة (مثال: القاهرة - رمسيس).
              </p>
            </div>
          </GuideCard>

          {/* Step 2: Voice Command */}
          <GuideCard
            icon={Mic}
            stepText="2. استخدام البحث الصوتي"
            iconBgClass="bg-green-50"
            iconColorClass="text-green-600"
            description={
              <>
                <p>
                  اضغط على أيقونة الميكروفون المتاحة في الواجهة لبدء تسجيل صوتك. تحدث بالوجهة التي تريدها أو نقطة الانطلاق، وسيقوم النظام تلقائياً بتحويل كلامك لنصوص وتعبئتها في حقول البحث.
                </p>
                <ul className="mt-3 space-y-1.5 text-xs text-slate-500 list-disc list-inside">
                  <li>اضغط للبدء ثم تحدث بوضوح.</li>
                  <li>اضغط إيقاف لمراجعة التسجيل الصوتي.</li>
                  <li>اضغط إرسال لاعتماد الوجهة مباشرة.</li>
                </ul>
              </>
            }
          />

          {/* Step 3: Sign Language translation */}
          <GuideCard
            icon={Camera}
            stepText="3. كاميرا فك شفرة لغة الإشارة الذكية"
            iconBgClass="bg-emerald-50"
            iconColorClass="text-emerald-600"
            className="md:col-span-2"
            description={
              <p>
                نظام ذكاء اصطناعي متطور يتيح إدخال النصوص للمحطات باستخدام حركات اليد (لغة الإشارة).
              </p>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mb-2">الخطوة الأولى</span>
                <p className="text-xs text-slate-600 font-semibold">افتح الكاميرا ووجه كف يدك بوضوح أمام العدسة لتفعيل التتبع السحابي للهيكل العظمي لليد.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mb-2">الخطوة الثانية</span>
                <p className="text-xs text-slate-600 font-semibold">ثبّت إشارتك لمدة 1 ثانية لاعتماد الحرف تلقائياً وتشكيل الكلمة، أو استخدم الأزرار المساعدة لإضافة مسافات أو الحذف.</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <span className="inline-block text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md mb-2">الخطوة الثالثة</span>
                <p className="text-xs text-slate-600 font-semibold">بمجرد الانتهاء من صياغة اسم الوجهة بالكامل، اضغط على زر "حفظ الكلمة وإنهاء الجلسة" لتعبئتها مباشرة.</p>
              </div>
            </div>
          </GuideCard>

          {/* Step 4: Maps routing */}
          <GuideCard
            icon={MapPin}
            stepText="4. التوجيه عبر خرائط جوجل"
            iconBgClass="bg-orange-50"
            iconColorClass="text-orange-600"
            description={
              <p>
                بعد تحديد محطتك الحالية، يمكنك الضغط على زر <strong className="text-emerald-700">Open In Google Maps</strong> للحصول على توجيه حي ومسار ملاحة مباشر من موقعك الفعلي إلى المحطة المحددة فورياً.
              </p>
            }
          />

          {/* Step 5: Dashboard and Accounts */}
          <GuideCard
            icon={Navigation}
            stepText="5. لوحة التحكم والسجلات"
            iconBgClass="bg-purple-50"
            iconColorClass="text-purple-600"
            description={
              <p>
                سجل دخولك لحفظ عمليات البحث والوصول لقائمة السجلات السابقة (History). بالنسبة للمسؤولين والمدراء، توفر لوحة التحكم (Dashboard) أدوات إحصائية وإدارة كاملة للمحطات، الأدوار، والمسارات.
              </p>
            }
          />

        </div>

        {/* All Pages Details Section Heading */}
        <div className="mb-8 mt-16 border-r-4 border-white pr-4">
          <h2 className="text-2xl md:text-3xl font-black text-white">دليل تفصيلي لصفحات التطبيق</h2>
          <p className="text-sm text-emerald-100 mt-1">شرح مفصل لوظائف ومحتويات كل صفحة في القائمة الرئيسية</p>
        </div>

        {/* Pages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          
          {/* Page 1: Overview */}
          <GuideCard
            icon={LayoutGrid}
            stepText="صفحة نظرة عامة (Overview)"
            iconBgClass="bg-slate-100"
            iconColorClass="text-slate-700"
            description={
              <p>
                هي الصفحة الرئيسية التعارفية للتطبيق. تحتوي على قسم الإحصائيات العامة للمسارات النشطة، وقسم مخصص للأسئلة الشائعة (FAQ) لمساعدتك في فهم خدماتنا بشكل سريع، بالإضافة إلى روابط التنقل السريع.
              </p>
            }
          />

          {/* Page 2: Home Search */}
          <GuideCard
            icon={Search}
            stepText="صفحة البحث والتوجيه (Home)"
            iconBgClass="bg-green-100"
            iconColorClass="text-green-700"
            description={
              <p>
                المحرك التشغيلي الرئيسي للتطبيق. هنا يمكنك إدخال بيانات رحلتك والبحث عن المسارات المتاحة، والتفاعل المباشر مع واجهات الإدخال الصوتي، وكاميرا فك شفرة لغة الإشارة الذكية، وعرض النتائج والمسارات بالتفصيل.
              </p>
            }
          />

          {/* Page 3: Our Routes */}
          <GuideCard
            icon={HelpCircle}
            stepText="صفحة مساراتنا (Our Routes)"
            iconBgClass="bg-blue-100"
            iconColorClass="text-blue-700"
            description={
              <p>
                تستعرض هذه الصفحة جميع خطوط السير والمسارات المسجلة في التطبيق. يمكنك البحث عن مسار معين لاستعراض المحطات التي يمر بها، زمن الرحلة، وتفاصيل الأوقات والأسعار المخصصة لكل وجهة.
              </p>
            }
          />

          {/* Page 4: History */}
          <GuideCard
            icon={FileClock}
            stepText="صفحة السجل (History)"
            iconBgClass="bg-yellow-100"
            iconColorClass="text-yellow-700"
            description={
              <p>
                خاصة بالمستخدمين المسجلين فقط. تقوم بحفظ وتوثيق عمليات البحث الأخيرة التي قمت بها لتتمكن من الرجوع إليها سريعاً في أي وقت بنقرة واحدة، كما تتيح لك إمكانية تفريغ وحذف سجل البحث.
              </p>
            }
          />

          {/* Page 5: Profile / Info */}
          <GuideCard
            icon={UserCog}
            stepText="صفحة المعلومات العامة (General Info)"
            iconBgClass="bg-indigo-100"
            iconColorClass="text-indigo-700"
            description={
              <p>
                تمكنك من إدارة وتعديل حسابك الشخصي؛ حيث يمكنك مراجعة وتعديل بريدك الإلكتروني، اسم المستخدم، وتحديث كلمة المرور الخاصة بك بشكل آمن وسهل.
              </p>
            }
          />

          {/* Page 6: Dashboard */}
          <GuideCard
            icon={ShieldAlert}
            stepText="لوحة تحكم المسؤولين (Dashboard)"
            iconBgClass="bg-rose-100"
            iconColorClass="text-rose-700"
            description={
              <p>
                لوحة إدارية مخصصة لأعضاء الإدارة والمسؤولين والمدراء فقط. تتيح لهم المراقبة والإحصاء العام، وتوفر خيارات متقدمة لإدارة وتعديل وإضافة المحطات، المستخدمين، الأدوار، ومسارات المواصلات مباشرة.
              </p>
            }
          />

          {/* Page 7: Contact Us */}
          <GuideCard
            icon={HeartHandshake}
            stepText="صفحة تواصل معنا (Contact Us)"
            iconBgClass="bg-pink-100"
            iconColorClass="text-pink-700"
            className="md:col-span-2"
            description={
              <p>
                تتيح لك التواصل المباشر مع فريق الدعم الفني وإدارة التطبيق. يمكنك إرسال تعليقاتك، مقترحاتك، أو الإبلاغ عن أي مشكلة فنية تواجهها أثناء الاستخدام لضمان حصولك على أفضل تجربة.
              </p>
            }
          />

        </div>

        {/* Footer Support/Contact Tip */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-6 text-white text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-right">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-emerald-400">
              <CheckCircle size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm">لديك استفسار إضافي؟</h4>
              <p className="text-xs text-slate-300">فريقنا متواجد دائماً للإجابة على جميع تساؤلاتك.</p>
            </div>
          </div>
          <a
            href="/contact"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold text-xs md:text-sm text-white transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-900/40"
          >
            تواصل معنا
          </a>
        </div>
      </div>
    </div>
  );
}
