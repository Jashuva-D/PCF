
export function getUserEmail(webAPI: ComponentFramework.WebApi, userid: string): Promise<string> {
    return webAPI.retrieveRecord("systemuser", userid, "?$select=internalemailaddress").then((user: any) => {
        return user.internalemailaddress || "";
    });
}