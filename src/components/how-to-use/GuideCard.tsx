import React from "react";

interface GuideCardProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  stepText: string;
  description: React.ReactNode;
  iconBgClass?: string;
  iconColorClass?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function GuideCard({
  icon: Icon,
  stepText,
  description,
  iconBgClass = "bg-blue-50",
  iconColorClass = "text-blue-600",
  className = "",
  children,
}: GuideCardProps) {
  return (
    <div className={`bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-start gap-4">
        <div className={`w-12 h-12 rounded-2xl ${iconBgClass} ${iconColorClass} flex items-center justify-center flex-shrink-0`}>
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-slate-800 mb-2">{stepText}</h3>
          <div className="text-sm text-slate-600 leading-relaxed">
            {description}
          </div>
          {children && <div className="mt-4">{children}</div>}
        </div>
      </div>
    </div>
  );
}
