export interface Sample {
  name: string;
}
export const greet = (name: Sample): string => {
  return `Hello from caching, ${name.name}, change here, some more, so close, this probably fails!`;
};