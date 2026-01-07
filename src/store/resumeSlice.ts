import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  profileImage: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  organization: string;
  startYear: string;
  endYear: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  startYear: string;
  endYear: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  selectedTemplate: number;
  resumeName: string;
}

const initialState: ResumeData = {
  personalInfo: {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    profileImage: '',
  },
  workExperience: [
    { id: '1', jobTitle: '', organization: '', startYear: '', endYear: '' }
  ],
  education: [
    { id: '1', degree: '', institution: '', startYear: '', endYear: '' }
  ],
  skills: [''],
  selectedTemplate: 0,
  resumeName: 'My Resume',
};

const resumeSlice = createSlice({
  name: 'resume',
  initialState,
  reducers: {
    setPersonalInfo: (state, action: PayloadAction<PersonalInfo>) => {
      state.personalInfo = action.payload;
    },
    setWorkExperience: (state, action: PayloadAction<WorkExperience[]>) => {
      state.workExperience = action.payload;
    },
    addWorkExperience: (state) => {
      state.workExperience.push({
        id: Date.now().toString(),
        jobTitle: '',
        organization: '',
        startYear: '',
        endYear: '',
      });
    },
    removeWorkExperience: (state, action: PayloadAction<string>) => {
      state.workExperience = state.workExperience.filter(exp => exp.id !== action.payload);
    },
    setEducation: (state, action: PayloadAction<Education[]>) => {
      state.education = action.payload;
    },
    addEducation: (state) => {
      state.education.push({
        id: Date.now().toString(),
        degree: '',
        institution: '',
        startYear: '',
        endYear: '',
      });
    },
    removeEducation: (state, action: PayloadAction<string>) => {
      state.education = state.education.filter(edu => edu.id !== action.payload);
    },
    setSkills: (state, action: PayloadAction<string[]>) => {
      state.skills = action.payload;
    },
    addSkill: (state) => {
      state.skills.push('');
    },
    removeSkill: (state, action: PayloadAction<number>) => {
      state.skills.splice(action.payload, 1);
    },
    setSelectedTemplate: (state, action: PayloadAction<number>) => {
      state.selectedTemplate = action.payload;
    },
    setResumeName: (state, action: PayloadAction<string>) => {
      state.resumeName = action.payload;
    },
    resetResume: () => initialState,
  },
});

export const {
  setPersonalInfo,
  setWorkExperience,
  addWorkExperience,
  removeWorkExperience,
  setEducation,
  addEducation,
  removeEducation,
  setSkills,
  addSkill,
  removeSkill,
  setSelectedTemplate,
  setResumeName,
  resetResume,
} = resumeSlice.actions;

export default resumeSlice.reducer;
