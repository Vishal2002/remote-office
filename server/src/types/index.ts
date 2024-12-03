export interface UserDocument {
    _id: string;
    email: string;
    password: string;
    name: string;
    avatar: string;
    userType: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
  }
  
  export interface RoomDocument {
    _id: string;
    name: string;
    description: string;
    createdBy: string;
    furniture: FurnitureItem[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface FurnitureItem {
    type: string;
    position: {
      x: number;
      y: number;
    };
    interaction?: string;
  }
  
  export interface Position {
    x: number;
    y: number;
  }