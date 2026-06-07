import { Film } from "lucide-react";

export default function VideoGuide() {
  return (
    <div className="mb-14 bg-white rounded-3xl border border-slate-200/80 shadow-md p-6 overflow-hidden">
      <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
        <div className="p-2 bg-rose-50 text-rose-500 rounded-xl">
          <Film size={22} />
        </div>
        <h3 className="text-lg font-bold text-slate-800">الشرح المرئي التطبيقي</h3>
      </div>
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-inner">
        <video 
          src="/how-to-use.mp4" 
          controls 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
