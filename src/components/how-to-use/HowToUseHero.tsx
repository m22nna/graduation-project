export default function HowToUseHero() {
  return (
    <div className="text-center mb-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 shadow-xl text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl pointer-events-none" />
      
      <span className="inline-block bg-white/20 text-white font-medium text-xs md:text-sm px-4 py-1.5 rounded-full mb-4 backdrop-blur-md border border-white/20">
        دليل المستخدم الشامل
      </span>
      <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-wide leading-tight">
        كيف تستخدم تطبيق المسارات الذكية؟
      </h1>
      <p className="text-base md:text-xl text-emerald-50 max-w-2xl mx-auto leading-relaxed">
        تعرّف على كيفية البحث عن مسارات المواصلات والوصول لوجهاتك باستخدام البحث الذكي، الأوامر الصوتية، وكاميرا ترجمة لغة الإشارة.
      </p>
    </div>
  );
}
