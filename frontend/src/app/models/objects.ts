export interface Esemeny {
    id: number,
    nev: string,
    helyszin: string,
    orszag: string,
    kapacitas: number,
    elvegzett: boolean,
    
    userId: string,
    userName: string
}
export interface MyJSONObj {
    hiba: Hiba[];
}

export interface Hiba {
    code: string;
    description: number;
}

export interface Szerepkorok {
  name: string;
}

export interface DefaultSzerepkorok {
    id: number;
    name: string;
}
  
export interface Felhasznalok {
    userName: string;
    email: string;
    roleName: string;
}

export interface Jogok {
    name: string;
}

export interface MultiSelect {
    item_id: number;
    item_text: string;
}

export interface MailFormData {
    email: string;
  }