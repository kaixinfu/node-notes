const buf1 = Buffer.alloc(10);
const buf2 = Buffer.from('a');
const buf3 = Buffer.from('哒哒哒');
console.log('buf1', buf1);
console.log('buf2', buf2, buf2.toString());
console.log('buf3', buf3, buf3.toString());
console.log('...1', Buffer.concat([buf2, buf3]))
console.log('...2', Buffer.concat([buf2, buf3]).toString())