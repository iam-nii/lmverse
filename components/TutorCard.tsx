// components/TutorCardWithAvatar.tsx
import Image from "next/image";
import { Star, BookOpen, Users, GraduationCap, DollarSign } from "lucide-react";

interface TutorCardWithAvatarProps {
  tutor: {
    id: string;
    full_name: string;
    about: string;
    profile_picture: string;
    is_approved: boolean;
  };
  rating?: number;
  lessonsCount?: number;
  coursesCount?: number;
  studentsCount?: number;
  hourlyRate?: number;
}

export default function TutorCardWithAvatar({ 
  tutor, 
  rating = 4.9, 
  lessonsCount = 185,
  coursesCount = 16,
  studentsCount = 100,
  hourlyRate = 20
}: TutorCardWithAvatarProps) {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
      {/* Header with rating and badge */}
      <div className="p-6 pb-0">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-full">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="font-semibold text-sm">{rating}</span>
          </div>
          <span className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
            IELTS
          </span>
        </div>

        {/* Avatar and name section */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-blue-100">
            <Image
              src={tutor.profile_picture || "/default-avatar.png"}
              alt={tutor.full_name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {tutor.full_name}
            </h3>
            <p className="text-gray-500 text-sm">English teacher</p>
          </div>
        </div>

        {/* About section */}
        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-2">
          {tutor.about}
        </p>

        {/* Stats with icons */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="flex flex-col items-center">
            <BookOpen size={18} className="text-blue-500 mb-1" />
            <span className="font-semibold text-gray-900">{lessonsCount}</span>
            <span className="text-xs text-gray-500">lessons</span>
          </div>
          <div className="flex flex-col items-center">
            <GraduationCap size={18} className="text-blue-500 mb-1" />
            <span className="font-semibold text-gray-900">{coursesCount}</span>
            <span className="text-xs text-gray-500">courses</span>
          </div>
          <div className="flex flex-col items-center">
            <Users size={18} className="text-blue-500 mb-1" />
            <span className="font-semibold text-gray-900">{studentsCount}+</span>
            <span className="text-xs text-gray-500">students</span>
          </div>
        </div>
      </div>

      {/* Footer with rate and CTA */}
      <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center">
          <DollarSign size={20} className="text-gray-400" />
          <span className="text-2xl font-bold text-gray-900">{hourlyRate}</span>
          <span className="text-gray-400 text-sm ml-1">/hr</span>
        </div>
        {tutor.is_approved ? (
            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-200">
          Approve
        </button>
        ) :
        (
            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-full text-sm shadow-md hover:shadow-lg transition-all duration-200">
          View More
        </button>

        )
    }        
      </div>
    </div>
  );
}