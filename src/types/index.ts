export type MaterialMember = {
    id: number;
    name: string;
    thickness: number; // in mm
    yieldStrength: number; // in MPa
    webHeight: number; // in mm
    flangeWidth: number; // in mm
    lipLength: number; // in mm
  };
  
  export type ValidationDataPoint = {
    load: number;
    displacement: number;
  };
  