import { courseContext, Lesson, Module } from '@/types/courseContent/types';
import React, { createContext, useContext, useState } from 'react';

// Make all properties optional for incremental form filling
type ContentFormContextType = Partial<courseContext>;

interface FormContextValue{
    formData: ContentFormContextType;
    updateFormData: (data: Partial<courseContext>)=>void;
}
const FormContext = createContext<FormContextValue | null>(null);

export const useCourseContentContext = () => {
    const context = useContext(FormContext);
    if(!context){
        throw new Error(
            "useCourseContentContext must be used within a ContentFormProvider"
        )
    }
    return context;
};

export const ContentFormProvider =({children}:{children: React.ReactNode})=>{
    const [formData, setFormData] = useState<ContentFormContextType>({});
    const updateFormData = (data: Partial<courseContext>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
  return (
      <FormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormContext.Provider>
  );
}