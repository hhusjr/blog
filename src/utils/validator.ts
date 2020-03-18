export type validator = (input: string, info?: string)=>string | true;
export const notEmptyValidator: validator = (val, info) => val && val.length > 0 || info || '请输入';

const getPasswordSecurityLevel = (password: string): number => {
  const upper = /[A-Z]/;
  const lower = /[a-z]/;
  const number = /[0-9]/;
  return (password.search(upper) !== -1 ? 1 : 0) + (password.search(lower) !== -1 ? 1 : 0) + (password.search(number) !== -1 ? 1 : 0);
}
export const passwordValidator: validator = (val, info) => val && val.length >= 8 && getPasswordSecurityLevel(val) === 3 || info || '密码至少需要8位且包含大写字母，小写字母与数字';

// eslint-disable-next-line no-control-regex
export const emailValidator: validator = (val, info) => val && /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(val) || info || '不是一个合法的邮箱';