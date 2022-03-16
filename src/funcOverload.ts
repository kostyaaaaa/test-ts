type Fn = (c: number) => number;

export function add(a: number): Fn;
export function add(a: number, b: number): number;

export function add(a: number, b?: number): number | Fn {
  if (b) {
    return a + b;
  }
  return (c) => a + c;
}
