export interface userregister {
    userName: string;
    name: string;
    phone: string;
    email: string;
    password: string
}

export interface registerconfirm {
    userid: number;
    username: string;
    otptext: string;
}

export interface usercred {
    email: string;
    password: string;
}

export interface loginresp {
    accessToken: string;
    username: string;
    // refreshToken: string;
    role: string;
    requestID: any
}

export interface menu {
    codeAR: string;
    code: string;
    name: string;
    icons: string;
}

export interface resetpassword {
    username: string;
    oldpassword: string;
    newpassword: string;
}

export interface updatepassword {
    username: string
    password: string
    otptext: string
}

export interface menupermission {
    userrole:string;
    code: string;
    codeAR: string;
    menucode:string;
    menucodeAR:string;
    name: string;
    haveview: boolean,
    haveadd: boolean,
    haveedit: boolean,
    havedelete: boolean,
}



export interface users {
    username: string;
    name: string;
    email: string;
    phone: string;
    isactive: boolean;
    statusname: string;
    role: string;
}

export interface orders {
    orderNo: string;
    orderType: string;
    orderTotal: string;
    createdBy: string;
    createdOn: string;
}

export interface roles {
    code: string
    name: string
    status: boolean
}
export interface updateuser {
    username: string;
    role: string;
    status:boolean
}

export interface menus {
    code: string
    codeAR: string
    name: string
    status: boolean
}