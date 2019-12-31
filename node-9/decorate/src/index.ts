// 类装饰器
function anotationClass(id) {
  console.log("类装饰器 evaluated", id);
  return target => console.log("类装饰器 return", id);
}
// 方法装饰器
function anotationMethods(id) {
  console.log("方法装饰器 evaluated", id);
  return (target, property, descriptor) => console.log("方法装饰器 return", id);
}

@anotationClass(1)
@anotationClass(2)
class Example {
  @anotationMethods(1)
  @anotationMethods(2)
  method() {
    console.log("Example ........method");
  }
}
class Maths {
  @log
  add(a, b) {
    return a + b;
  }
}
/**
 *
 * @param target 目标对象
 * @param name 方法名
 * @param descriptor 描述对象
 */
function log(target, name, descriptor) {
  //   console.log("target", target);
  //   console.log("name", name);
  //   console.log("descriptor", descriptor);
  const oldValue = descriptor.value;
  descriptor.value = function() {
    console.log("arguments", ...arguments);
    return oldValue.apply(null, arguments);
  };
  return descriptor;
}

const maths = new Maths();
maths.add(1, 2);
console.log("add......");
