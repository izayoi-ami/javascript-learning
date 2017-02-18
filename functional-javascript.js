function upperCaser(input){
  return input.toUpperCase();
}

module.exports = upperCaser;

function repeat(operation, num){
  if (num <= 0) return;
  operation();
  repeat(operation,--num);
}

module.exports = repeat;

function doubleList (xs){
  return xs.map((x) => 2*x);
}

module.exports = doubleList;

function getShortMessages(xs){
  return xs.filter((x) => (x.message.length < 50)).map((x) => x.message);

}
module.exports = getShortMessages;

function checkUsesValid(goodUsers){
  return function(xs){
    return xs.every((x) => goodUsers.some((u) => u.id == x.id));
  };
}
module.exports = checkUsesValid;

function countWords(ws){
  return ws.reduce((ans,w) => {
    ans[w] = ++ans[w] || 1;
    return ans;
  },{});
}
module.exports = countWords;

function reduce(xs, fn, init){
  return (function reduceOne(index, value){
    if (index > xs.length - 1) return value;
    return reduceOne(index+1, fn(value, xs[index], index, xs));
  })(0,init);
}

module.exports = reduce;

function duckCount() {
  return Array.prototype.slice.call(arguments).filter((x) => Object.prototype.hasOwnProperty.call(x, 'quack')).length;
}

module.exports = duckCount;


function logger(namespace){
  var slice = Array.prototype.slice; 
  return (function(){
    console.log.apply(console,[namespace].concat(slice.call(arguments)));
  });
}

module.exports = logger;

function bindLogger(namespace){
  return console.log.bind(console, namespace);
} 

module.exports = bindLogger;

function arrayMap(arr, fn){
  return arr.reduce((xs,x) =>{
    xs.push(fn(x));
    return xs;
  }, []);
}

module.exports = arrayMap;

function Spy(target, method){
  var result={'count': 0};
  var oldMethod = target[method];
  target[method] = function(){
    ++result.count;
    return oldMethod.apply(this,arguments);
  };
  return result;
}

module.exports = Spy;

function asyncRepeat(operation, num) {
  // modify this so it can be interrupted
  if (num <= 0) return;
  operation();
  if (num%10 === 0){
    setTimeout(()=>{
      asyncRepeat(operation, --num);
    });
  }
  else{ asyncRepeat(operation, --num); }

}

module.exports = asyncRepeat;

//function trampolineRepeat(operation, num){
  //if (num <= 0) return;
  //operation();
  //return num<=0 ? null : ()=>trampolineRepeat(operation,--num);
//}

//function trampoline(fn){
  //return (function(){
    //var res = fn.apply(this, arguments);
    //while (res instanceof Function) res = res();
    //return res;
  //});
//}

//module.exports = function(operation, num){
  //return trampoline(trampolineRepeat)(operation,num);
//}


function trampolineRepeat(operation, num){
  return ()=>{
    if (num <= 0) return;
    operation();
    return trampolineRepeat(operation, --num);
  };
}

function trampoline(fn){
  while (fn instanceof Function) fn = fn();
  return fn;
}

module.exports = function(operation, num){
  return trampoline(() => trampolineRepeat(operation, num));
};

function loadUsers(userIds, load, done){
  var completed = 0;
  var users = [];
  userIds.forEach((id)=>{
    load(id,(user)=>{
      users[id]=user;
      if (++completed == userIds.length) return done(users);
    });
  });
}

module.exports = loadUsers;

function getDependencies(tree){
  if (!(tree instanceof Object)) return [];
  if (!tree.hasOwnProperty("dependencies")) return [];
  var submodules = tree.dependencies;
  var names = Object.keys(submodules);
  var dlist = names.reduce((xs,x)=>xs.concat(`${x}@${submodules[x].version}`,getDependencies(submodules[x])),[]);
  return dlist.sort().reduce((xs,x) => xs.findIndex((y)=>x===y) !== -1?xs:xs.concat(x),[]);
}
module.exports = getDependencies;

//function curryN(fn, n){
  //var arity = isNaN(n) ? fn.length : n;
  //function curryOne(n, args){
    //args = args || [];
    //if (n<=0) return fn.apply(null, args);
    //return (x) => {
      //return curryOne(n-1, args.concat(x));
    //};
  //}
  //return curryOne(arity);
//}

function curryN(fn, n){
  n = n || fn.length;
  return (arg)=> n <= 1 ? fn(arg) : curryN(fn.bind(this,arg), n-1);
}

module.exports = curryN;

module.exports =  Function.call.bind(Array.prototype.slice);
