export interface Sample {
  name: string;
}
export const greet = (name: Sample): string => {
  return `Hello from caching, ${name.name}, change!`;
};