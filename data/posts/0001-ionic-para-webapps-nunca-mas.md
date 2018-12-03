---
title: "Ionic para WebApps: Nunca más"
slug: ionic-para-webapps-nunca-mas
date: 2016-03-28 20:15
---
Recientemente en el trabajo decidimos utilizar [Ionic Framework](https://ionicframework.com/) para el proyecto de una webapp, la idea era que dicha webapp debía correr en las últimas versiones de los principales navegadores (Lo que incluye IE11 y Edge).

Al recibir las especificaciones vimos que **Ionic podía encajar bien en el proyecto**, ¿Por qué?


- Corto tiempo de desarrollo (3 semanas).
- La webapp, a demás, tenía que empaquetarse con Cordova, el hábitat natural de Ionic.
- No era una app de funcionalidades fantasiosas y encajaba bien en lo que los componentes de Ionic aportaban.
- Había utilizado anteriormente la capa de CSS de Ionic para un proyecto anterior y fue muy bien, así que sólo teníamos que enfrentarnos al 'ionic-bundle'.

Comienza el desarrollo, nos remangamos, preparamos las tareas de Gulp para transpilar todo y comenzamos a trabajar.

A mitad del desarrollo vimos que elegir Ionic fue un error, pero no había vuelta atrás.

## Todo framework te ata

Y te ata hasta el punto en que el **hacer o no un hack como una casa**, depende de algo tan nimio como alinear un elemento aquí o allí.

Era habitual el querer poner elementos en ciertos lugares que resultaban absurdamente inaccesibles, es remarcable lo fácil que es encontrarse con elementos alineados a la derecha con position: absolute y right: 0 (o right: 15px para simular el padding).

Ionic viene con un montón de variables que puedes modificar para que el Framework se adapte a tus necesidades generales de color y layout, **pero la mitad de las variables que necesité no llegué a encontrarlas**.

Los componentes de Ionic están muy bien si no te sales absolutamente nada del tiesto, pero por cómo está pensado Ionic internamente (y las magias que hace, que es otra historia), hace que las ataduras sean todavía más severas, mucho más de lo que te ataría un simple framework de JS o CSS.

## El routing

Oh el routing...

Ionic tiene una funcionalidad muy cool que es el poder **dividir el histórico de navegación en varios caminos distintos** cuando utilizamos los tabs de navegación, de forma que en cada tab tenemos un histórico.

Esto está muy bien cuando permanecemos en Cordova, pero nada bien cuando estamos en una webapp, donde el usuario tiene acceso a un botón 'atrás' de la UI del navegador y la posibilidad de recargar la página, rompiendo completamente el histórico.

## Soporte para IE

Recordemos que Ionic (al menos la versión estable a día de hoy, la 1.2.x) está pensado para correr sin problemas en iOS y Android, por lo que utilizan características de CSS **ignorando IE**, como por ejemplo Flexbox (Está en IE11, pero repleto de bugs), y hay algunos componentes que utilizan flexbox cuando menos te lo esperas (Flexbox para una alineación HORIZONTAL, good job ionic).

Por suerte este fue el menor de nuestros problemas.

## Magia negra... que el mundo jamás debería conocer

A tí, querido lector, te propongo un experimento.

Abre un proyecto de Ionic con muchos componentes y compara el cómo los defines en tus plantillas con el DOM resultante. **Vas a flipar**.

Son innumerables las magias que hace Ionic para muchas cosas que pueden parecernos de lo más estúpido de implementar por nosotros mismos. Nos hemos encontrado con componentes que, al indicarles ciertos atributos toma estos atributos como one-time-bindings por defecto (Que a veces tienen sentido pero muchas otras veces no) y resulta imposible cambiar el valor a posteriori sin manipular el DOM directamente.

## Resumiendo

Si en vez de usar Ionic hubieramos hecho la webapp con CSS from scratch y utilizado Angular con sus 3-4 módulos más habituales habríamos obtenido un mejor resultado y más mantenible, ahorrándonos muchos problemas y explicaciones en la documentación.

Está claro que no todos los proyectos son iguales y los hay donde Ionic funciona perfectamente, pero este desde luego no fue uno de esos proyectos.
