import users from "../data/user.json";

export class ultilities {
    public getUserInfo(userName: string): any {
        try {
            return users.filter((user: any) => user.firstName === userName)[0];
        } catch (err) {
            throw err;
        }
    }
}
export default new ultilities();