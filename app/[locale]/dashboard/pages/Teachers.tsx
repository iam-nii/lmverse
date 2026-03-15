import { motion } from "framer-motion";
import { useTutorStore } from "@/store/TutorStore";
import { useEffect } from "react";

export default function Teachers() {
  const { fetchTutors, tutors, loading, error } = useTutorStore();
  useEffect(() => {
    fetchTutors();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <motion.div>
      <h1>Teachers</h1>
      <div>
        {tutors.tutors.map((tutor) => (
          <div key={tutor.id}>
            <h2>{tutor.full_name}</h2>
            <p>{tutor.email}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
