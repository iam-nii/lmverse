import { motion } from "framer-motion";
import { useTutorStore } from "@/store/TutorStore";
import { useEffect } from "react";
import TutorCard from "@/components/TutorCard"

export default function Teachers() {
  const { fetchTutors, tutors, loading, error } = useTutorStore();
  useEffect(() => {
    fetchTutors();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <motion.div className="">
      <h1>Teachers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {tutors.tutors.map((tutor) => (
        <TutorCard 
          key={tutor.id} 
          tutor={tutor}
          // These could come from your database or be calculated
          rating={4.9}
          lessonsCount={185}
          coursesCount={16}
          studentsCount={100}
          hourlyRate={20}
        />
      ))}
      </div>
    </motion.div>
  );
}
