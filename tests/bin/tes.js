var o={a:1,b:2};
var o2=o;
o.a=2;
o2=null;
console.log(o);
console.log(o2);

if(!o2)console.log(o);