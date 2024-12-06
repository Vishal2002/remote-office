export interface UserDocument {
    _id: any;
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

  export interface SpaceElements{
    id:string;
    elementId:string;
    spacedId:string;
    x:number;
    y:number;
    space:SpaceDocument;
  }

  export interface SpaceDocument{
    _id:string;
    creatorId: string;
    name:string;
    width:number;
    height:number;
    elements:SpaceElements[];
    thumbnail:string;
  }
  
  export interface Avatar{
    _id:string;
    name:string;
    imgUrl:string;

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