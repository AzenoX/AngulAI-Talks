export let bearer:string|null = null;
export let userId:string|null = null;
export let userName:string|null = null;

export const setBearer = (token: string) => {
  bearer = token;
}
export const setUserId = (user_id: string) => {
  userId = user_id;
}
export const setUserName = (name: string) => {
  userName = name;
}
