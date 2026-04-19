export type StudentInput = {
  Stu_Name: string;
  Stu_Age?: number;
  Stu_JobExp?: string;
  Stu_GPA?: number;
  Stu_Major?: string;
  Stu_Courses?: string;
  Stu_GradYr?: number;
  Stu_PhnNumb?: string;
  Stu_Email: string;
  Uni_id: number;
};

export type CompanyInput = {
  Cmp_Name: string;
  Cmp_Requirement?: string;
  Cmp_PhnNumb?: string;
  Cmp_Email?: string;
};

export type UniversityInput = {
  Uni_Name: string;
  Uni_PhnNumb?: string;
  Uni_Email?: string;
};

export type AppStatus = 'applied' | 'reviewing' | 'accepted' | 'rejected';

export type StudentMajorGPA = {
  Stu_Major: string | null;
  Stu_GPA: number | null;
};
