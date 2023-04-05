export default interface UserCreateType {
    id: string;
    fullname: string;
    username: string;
    password: string;
    phone: string;
    role: string;
    kode: number;
    verified: boolean;
}

export default interface UserRequestData extends Request {
    userData: UserCreateType;
    authorization: any;
}

// id: uuidv4(),
// fullname,
// password : await bcrypt.hash(password, await bcrypt.genSalt(10)),
// phone,
// role: "user",
// kode,
// verified: false