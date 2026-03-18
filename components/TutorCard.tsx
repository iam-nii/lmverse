// components/TutorCard.tsx
import Image from "next/image";
import { Star, BookOpen, Users, GraduationCap, BadgeCheck } from "lucide-react";

interface TutorCardWithAvatarProps {
  tutor: {
    id: string;
    full_name: string;
    about: string;
    profile_picture: string;
    is_approved: boolean;
    role?: string;
  };
  rating?: number;
  lessonsCount?: number;
  coursesCount?: number;
  studentsCount?: number;
  variant?: "light" | "dark";
  onViewMore?: () => void;
}

export default function TutorCardWithAvatar({ 
  tutor, 
  rating = 4.9, 
  lessonsCount = 0,
  coursesCount = 0,
  studentsCount = 0,
  variant = "light",
  onViewMore
}: TutorCardWithAvatarProps) {

  const isDark = variant === "dark";
  const bgClass = isDark ? "bg-[#1e2235] border-[#262b40]" : "bg-white border-gray-100";
  const textTitleClass = isDark ? "text-white" : "text-gray-900";
  const textMutedClass = isDark ? "text-gray-400" : "text-gray-500";
  const textBodyClass = isDark ? "text-gray-300" : "text-gray-600";
  const statValClass = isDark ? "text-gray-100" : "text-gray-900";
  const footerBgClass = isDark ? "bg-[#262b40]" : "bg-gray-50 border-t border-gray-100";

  return (
    <div className={`max-w-sm rounded-[1rem] shadow-sm hover:shadow-xl overflow-hidden border transition-all duration-300 flex flex-col ${bgClass}`}>
      <div className="p-6 pb-0 flex-1">
        {/* Header with avatar, tags, name */}
        <div className="flex items-start gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#16476a]/20 shrink-0">
            <Image
              src={tutor.profile_picture || "/default-avatar.png"}
              alt={tutor.full_name || "Tutor"}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-1 w-full mt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider font-bold rounded-md ${isDark ? 'bg-[#409a38]/20 text-[#409a38]' : 'bg-green-100 text-green-700'}`}>
                🚀 Top Tutor
              </span>
              <div className={`flex items-center gap-1 px-2 py-0.5 rounded-md ${isDark ? 'bg-yellow-500/20 text-yellow-500' : 'bg-yellow-100 text-yellow-700'}`}>
                <Star size={12} className="fill-current" />
                <span className="font-semibold text-[10px]">{rating}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 mt-1">
              <h3 className={`text-lg font-bold leading-tight line-clamp-1 ${textTitleClass}`}>
                {tutor.full_name || "Unknown Tutor"}
              </h3>
              {tutor.is_approved && (
                <BadgeCheck size={16} className="text-[#409a38] shrink-0" />
              )}
            </div>
            <p className={`text-xs ${textMutedClass}`}>
              {tutor.role === 'tutor' ? "English Teacher" : tutor.role || "English Teacher"}
            </p>
          </div>
        </div>

        {/* About section */}
        <p className={`text-sm leading-relaxed mb-6 line-clamp-2 ${textBodyClass}`}>
          {tutor.about || "This tutor hasn't added a description yet."}
        </p>

        {/* Stats with icons */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="flex flex-col items-center text-center">
            <BookOpen size={16} className="text-[#16476a] mb-1" />
            <span className={`font-semibold text-sm ${statValClass}`}>{lessonsCount}</span>
            <span className={`text-[10px] ${textMutedClass}`}>lessons</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <GraduationCap size={16} className="text-[#16476a] mb-1" />
            <span className={`font-semibold text-sm ${statValClass}`}>{coursesCount}</span>
            <span className={`text-[10px] ${textMutedClass}`}>courses</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Users size={16} className="text-[#16476a] mb-1" />
            <span className={`font-semibold text-sm ${statValClass}`}>{studentsCount}+</span>
            <span className={`text-[10px] ${textMutedClass}`}>students</span>
          </div>
        </div>
      </div>

      {/* Footer with CTA */}
      <div className={`px-6 py-4 flex items-center justify-end mt-auto ${footerBgClass}`}>
        <button 
          onClick={onViewMore}
          className="px-5 py-2 bg-[#16476a] hover:bg-[#15364A] text-white font-semibold rounded-full text-sm shadow-sm transition-colors cursor-pointer"
        >
          View More
        </button>
      </div>
    </div>
  );
}