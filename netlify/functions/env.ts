export function defineEnvVariable(name: string, parseArray: true): string[];
export function defineEnvVariable(name: string, parseArray: false): string;
export function defineEnvVariable(name: string, parseArray?: undefined): string;
export function defineEnvVariable(name: string, parseArray = false) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`The env variable with name ${name} should be defined!`);
  }
  if (parseArray) {
    return value.split(",");
  }
  return value;
}
