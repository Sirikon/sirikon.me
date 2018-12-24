---
title: "ECMAScript 6: Symbols"
slug: ecmascript-6-symbols
date: 2015-09-28 15:00
published: true
---
Hoy nos toca repasar una de las últimas novedades en el mundillo del desarrollo web, los **Symbols de ECMAScript 6**.

Aprovechando que la especificación está lista es hora de ponerse en serio con lo nuevo que viene, y empezamos con ni más ni menos que la nueva incorporación en la selecta familia de los **tipos primitivos** (string, number, boolean, null, undefined... y ahora symbol).

## ¿Qué son los Symbols?

Un symbol es un **tipo de dato único e inmutable** (no es comparable con ningún otro, y no podemos cambiar su estado una vez creado) utilizado como identificador para propiedades de objetos, podemos entenderlo como un ID o un token. ¿No queda claro? Un ejemplo todo lo puede:

```js
const PASSWORD = Symbol("Password");
var user = new Object();
user.name = "Peter";
user[PASSWORD] = "1234";
console.log(JSON.stringify(user))     // { "name": "Peter" }
console.log(user["Password"])         // undefined
console.log(user[Symbol("Password")]) // undefined
console.log(user[PASSWORD])           // "1234"
```

En el ejemplo podemos ver que primero definimos un nuevo symbol constante llamado PASSWORD, creamos un objeto vacío llamado user, al cual le asignamos un name y un password, pero para el password usamos el symbol creado como clave.

Hasta aquí todo bien, pero cuando hacemos un JSON.stringify (para obtener la representación del objeto en JSON) no hay rastro del password, esto es porque **las propiedades de un objeto que usen un symbol como clave serán ignoradas en los JSON.stringify()**.

Si intentamos acceder al password usando de clave el string "Password" no servirá de nada, lo he puesto para dejar claro que no es lo mismo Symbol("Password") que "Password"... de hecho **Symbol("Password") tampoco es igual a Symbol("Password")** (recordad, los symbols no son comparables) como podemos ver en el segundo intento.

Es más, en el constructor del Symbol el parámetro "Password" que le pasamos en este caso es opcional, no se usa como identificador, **sino como una descripción para ayudar a la depuración**.

Este hecho de que los symbols sean completamente únicos obliga a una cosa: si quieres utilizar el symbol (o acceder a la propiedad de la cual el symbol es clave) **necesitas sí o sí la referencia del mismo**, no puedes generar un symbol equivalente de la nada y utilizarlo como si fueran lo mismo.

Esto nos permite cosas como, por ejemplo, que una librería **guarde información dentro de un objeto utilizando symbols privados**, de forma que otras funciones externas a la librería **no puedan modificar o acceder a esta información** y corromper el funcionamiento de la librería.

## Extendiendo funcionalidad con Symbols

En ECMAScript 5 algunas funcionalidades del lenguaje estaban incluidas en los objetos aunque no eran expuestas a los desarrolladores (como por ejemplo el funcionamiento de iteradores).

Pero ahora podemos definir dichas funcionalidades para nuestros objetos y hacer que, por ejemplo, un objeto creado por nosotros sea iterable según nuestra propia implementación:

```js
// Instanciamos un objeto nuevo
var range = new Object();
// Con valores start y end
range.start = 4;
range.end = 7;

// Definimos el iterador usando el Symbol correspondiente
range[Symbol.iterator] = function(){
  var _this = this;
  _this.count = _this.start;
  return {
    // Es preciso que el iterador devuelva la función 'next'...
    next: function(){
      // Y que la cual devuelva un resultado en formato
      // {value: anything, done: bool}
      var result = {value: _this.count};
      if(_this.count <= _this.end){
        result.done = false;
        _this.count++;
      }else{
        result.value = undefined;
        result.done = true;
      }
      return result;
    }
  }
}

// Probamos la iteración
for(var i of range){
  console.log(i); // 4, 5, 6, 7
}
```

Esta explicación es muy superficial para todo lo que pueden dar de sí los symbols, para aprender más sobre ellos os recomiendo pasaros por [su página correspondiente en MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Symbol), a demás de [este post](http://2ality.com/2014/12/es6-symbols.html) y [este otro post](http://blog.keithcirkel.co.uk/metaprogramming-in-es6-symbols/).

Agur!
