import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Bell, ChevronRight, Check } from "lucide-react";
import Image from "next/image";
import { useTutorStore } from "@/store/TutorStore";
import TutorCard from "@/components/TutorCard";
import { Tutor } from "@/types/types";

export default function Teachers() {
  const { fetchTutors, approveTutor, rejectTutor, tutors, loading, error } = useTutorStore();
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);

  useEffect(() => {
    fetchTutors();
  }, []);

  if (loading) return <div className="p-8 text-gray-500">Loading tutors...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  const handleToggleActivation = async (tutor: Tutor) => {
    try {
      if (tutor.is_approved) {
        await rejectTutor(tutor.id);
        setSelectedTutor({ ...tutor, is_approved: false, status: "rejected" });
      } else {
        await approveTutor(tutor.id);
        setSelectedTutor({ ...tutor, is_approved: true, status: "approved" });
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // List View
  if (!selectedTutor) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-h-screen bg-[#F8FAFC]">
        {/* Top Navigation Bar */}
        <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-100">
          <div className="flex-1 max-w-xl relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#16476a]/20 transition-all font-medium"
            />
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 text-gray-400 hover:text-[#16476a] transition-colors rounded-full hover:bg-gray-100">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
              <Image src="/default-avatar.png" alt="Admin" width={36} height={36} className="object-cover" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="p-8 max-w-[1400px] mx-auto">
          <div className="mb-8 max-w-2xl">
            <h1 className="text-3xl font-bold text-[#1e2235] mb-2 tracking-tight">Teachers</h1>
            <p className="text-gray-500">Search for specific subjects and find the teachers you're ready to take a course with.</p>
          </div>

          <div className="space-y-10">
            <section>
              <div className="flex items-center justify-between mb-6 pb-2 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 tracking-tight">All Levels</h2>
                <button className="text-[#16476a] font-semibold text-sm hover:underline hover:text-[#1D4760] transition-colors">View all &gt;</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tutors.tutors.map((tutor, index) => (
                  <TutorCard 
                    key={tutor.id} 
                    tutor={tutor}
                    rating={4.9}
                    lessonsCount={Math.floor(Math.random() * 200) + 10}
                    coursesCount={Math.floor(Math.random() * 30) + 5}
                    studentsCount={Math.floor(Math.random() * 300) + 50}
                    variant={index % 2 === 0 ? "dark" : "light"}
                    onViewMore={() => setSelectedTutor(tutor)}
                  />
                ))}
                {tutors.tutors.length === 0 && (
                  <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-gray-100 border-dashed">
                    <p className="text-gray-500 mb-2">No teachers found.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        </main>
      </motion.div>
    );
  }

  // Detail View
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 min-h-screen bg-[#F8FAFC]">
      {/* Top Header */}
      <header className="flex items-center px-8 py-4 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
          <button onClick={() => setSelectedTutor(null)} className="hover:text-[#16476a] transition-colors">
            Teachers
          </button>
          <ChevronRight size={16} className="text-gray-300" />
          <span className="text-gray-900 font-semibold">{selectedTutor.full_name || "Tutor Details"}</span>
        </div>
      </header>

      {/* Main Detail Content */}
      <main className="p-8 max-w-5xl mx-auto">
        {/* Detail Header & Action */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 bg-white p-6 rounded-[1rem] shadow-sm border border-gray-100">
          <div className="flex items-start gap-6">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shrink-0 shadow-sm">
              <Image 
                src={selectedTutor.profile_picture || "/default-avatar.png"} 
                alt={selectedTutor.full_name || "Tutor"} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="mt-1">
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2 tracking-tight">
                {selectedTutor.full_name || "Unknown Tutor"}
                {selectedTutor.is_approved && <Check className="text-white bg-[#409a38] rounded-full p-0.5" size={18} />}
              </h1>
              <p className="text-gray-500 mt-1">{selectedTutor.email}</p>
              <div className="flex items-center gap-2 mt-3 text-xs font-semibold uppercase tracking-wider">
                <span className={`px-2.5 py-1 rounded-md ${selectedTutor.status === 'approved' ? 'bg-green-100 text-green-700' : selectedTutor.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  Status: {selectedTutor.status || "Pending"}
                </span>
                <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md">
                  {selectedTutor.role === "tutor" ? "Teacher" : selectedTutor.role || "Tutor"}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 bg-[#f8e5fe]/50 px-5 py-3.5 rounded-[1rem] border border-[#e8ccf1] shadow-sm">
            <span className="text-sm font-bold tracking-tight text-[#6e2a8d]">Activate teacher account</span>
            <button 
              onClick={() => handleToggleActivation(selectedTutor)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#6e2a8d]/30 focus:ring-offset-2 ${selectedTutor.is_approved ? 'bg-[#16476a]' : 'bg-gray-300'}`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${selectedTutor.is_approved ? 'translate-x-[22px]' : 'translate-x-1'}`} />
            </button>
            <div className="w-[20px] h-[20px] rounded-full border border-[#6e2a8d]/50 flex items-center justify-center text-[#6e2a8d] font-bold text-[10px] ml-1 cursor-help hover:bg-[#6e2a8d]/10 transition-colors" title="Toggle to approve or suspend the tutor">
              ?
            </div>
          </div>
        </div>

        {/* Details Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-[1rem] shadow-sm border border-gray-100 h-full">
              <h2 className="text-lg font-bold text-gray-900 mb-4 tracking-tight border-b border-gray-100 pb-3">About the Teacher</h2>
              <p className="text-gray-600 leading-relaxed text-sm whitespace-pre-wrap">
                {selectedTutor.about || "This tutor hasn't provided a biography yet."}
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-[1rem] shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 tracking-tight border-b border-gray-100 pb-3">Contact Info</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex justify-between items-center">
                  <span className="text-gray-500">Phone:</span>
                  <span className="font-semibold text-gray-900">{selectedTutor.phone_number || "N/A"}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500">Joined:</span>
                  <span className="font-semibold text-gray-900">{new Date(selectedTutor.created_at).toLocaleDateString()}</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-gray-500">Experience:</span>
                  <span className="font-semibold text-gray-900">{selectedTutor.experience ? `${selectedTutor.experience} years` : "N/A"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
