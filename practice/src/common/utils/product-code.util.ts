import * as crypto from 'crypto';
// Firstly, I coded in C++, and after that, I converted it with AI
export function generateProductCode(name: string): string {
  // lowercase
  const ss = name.toLowerCase();
  let s = '';
  let v: { idx: number; str: string }[] = [];

  let idx = 0;

  // find all longest strictly increasing substring
  for (let i = 0; i < ss.length; i++) {
    if (s.length === 0) {
      s += ss[i];
    } else {
      const a = s[s.length - 1];
      if (ss[i] > a) {
        s += ss[i];
      } else {
        v.push({ idx, str: s });
        s = ss[i];
        idx = i;
      }
    }
  }
  v.push({ idx, str: s });

  // find the length of longest sting
  let m = 0;
  for (const u of v) {
    if (u.str.length > m) m = u.str.length;
  }

  // concate
  let finalstring = '';
  let w: number[] = [];
  for (const u of v) {
    if (u.str.length === m) {
      finalstring += u.str;
      w.push(u.idx);
    }
  }

  //find first  last index 
  let firstidx: number;
  let lastidx: number;
  if (w.length === 1) {
    firstidx = w[0];
    lastidx = w[0] + m - 1;
  } else {
    firstidx = w[0];
    lastidx = w[w.length - 1] + m - 1;
  }

  //  Hash 
  const hash = crypto
    .createHash('sha256')
    .update(name)
    .digest('hex')
    .substring(0, 8);

 
  return `${hash}-${firstidx}${finalstring}${lastidx}`;
}
