export interface Patient {
    id: string;
    firstName: string;
    surname: string;
    email: string;
    socialSecurity: string;
}

export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    about: string;
    location: string;
    link_linkedin: string;
    link_facebook: string;
    link_twitter: string;
    link_instagram: string;
    role: string;
};

export type UserProfileData = {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    about: string;
    location: string;
    link_linkedin: string;
    link_facebook: string;
    link_twitter: string;
    link_instagram: string;
    role: string;
};



//COUNTRIES
export type Country = {
    code: string;
    name: string;
    flag: string;
  };
  
  export type OnSelect = (country: Country) => void;
  
  export type Countries = Country[];
  