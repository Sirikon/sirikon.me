---
title: Mi opinión sobre Xamarin.Forms tras dos meses
slug: xamarin-forms-after-two-months
date: 2017-01-19 22:30
---
En la oficina entró proyecto nuevo, que había que desarrollar en Xamarin.Forms, y yo ya manifesté mi interés en desarrollar aplicaciones móviles, pues me apetecía asomar la cabeza fuera de lo que es el Front-End web y ver qué hay ahí fuera.

Encontré luces y sombras.

---

La simple idea de Xamarin siempre me ha parecido fantástica, en vez de utilizar Java en Android y Objetive-C/Swift en iOS, utilicemos C# en los dos, permitiendo compartir código entre plataformas y repetirnos menos.

En la vida real, de la idea a la ejecución hay mucho camino.

Digamos que instalar y echar a andar un entorno de desarrollo Xamarin en Windows es una experiencia bastante mejorable, es todo lo que voy a decir al respecto, no es el tema en cuestión.

---

## Y Forms bajó de los cielos para mostrarnos la luz

Una luz a medio encender.

Primero de todo, vengo del desarrollo web, los navegadores web tienen unos cuantos años de experiencia a las espaldas, y unas cuantas millones de líneas de código también, así que un desarrollador web tiene una herramienta milenaria para hacer cualquier cosa.

Por ponernos en contexto, Xamarin.Forms inicialmente era sólo una forma de hacer pantallas muy simples y limitadas que fueran multiplataforma, pero se ha venido a más al descubrir el potencial de la idea.

Y yo, acostumbrado al abanico de posibilidades de CSS y la versatilidad de los frameworks Javascript, fui a enfrentarme a Xamarin.Forms.

## Luces

Evidentemente, el simple hecho de tener un proyecto 100% multiplataforma con 0 líneas de código específico para ninguna plataforma es una buena luz, pero me gustó alguna cosa concreta.

### Layout

Con Xamarin.Forms me he encontrado un sistema de Layout bastante conseguido que cubre lo que he ido necesitando, haciendo por ejemplo que el tan temido alineamiento vertical en web (ya no tanto, pero hey, la coña sigue) fuera una tontería aquí.

### Pages & Views

Me he sentido muy cómodo teniendo un concepto similar a los componentes que suelo hacer en desarrollo web, pudiendo montar una jerarquía de elementos. Aunque la interoperabilidad entre ciertos tipos de página pueda parecer ‘hacky’ en algunos momentos, funciona y se entiende.

### Converters

Aunque no me termina de convencer el que un formateador y un parseador vayan juntos (teniendo en cuenta que, lo que he necesitado por ahora, han sido 12 formateadores y 0 parseadores) vuelvo a sentirme cómodo con el concepto.

### Fallback a Nativo

Voy a soltar un spoiler, **en aplicaciones de verdad, al final, acabas haciendo algo de código para cada plataforma**. Al menos, este código casi siempre será de visualización. Y al menos, el sistema para extender elementos existentes con código nativo es bastante sencillo (con una clase y un decorador, estás listo).

## Sombras

### Incompleto

La sensación constante que me da con Xamarin.Forms es que está incompleto. Está claro que no puede abarcar el 100% de los casos de uso, y que algo se tiene que quedar fuera, pero no me parece serio que cosas tan sencillas como **un control Image que no se cargue el rendimiento, cambiar márgenes y alineación internos de los botones o modificar la altura de línea de los labels** no estén.

Esta sensación de que está incompleto se acompaña de la necesidad de tener que rellenar los huecos que faltan con código propio, un código que me resulta bastante obvio, y que me hace preguntarme una y otra vez por qué no estaba ya ahí.

### Data Binding

Aquí también podría usar la baza de incompleto. El Data Binding que viene con Xamarin requiere demasiado código por cada objeto que queramos hacer bindeable u observable, requiere todavía más para bindear properties heredados de Pages o Views, por no hablar de algún bug.

### Navegación

Xamarin.Forms no tiene un sistema de navegación consistente, a veces me daba la sensación de que algunas cosas eran demasiado mágicas.

Acabé creando un servicio que se encargara de la navegación en vez de usar los caminos tradicionales.

### Debugging

Más de una vez me he encontrado en la necesidad de comentar todo e ir descomentando progresivamente elementos en XAML para detectar qué está provocando ese error que Visual Studio no me explica, y se limita a decir “Unhandled Exeption”.

## Conclusión

Xamarin.Forms es una buena idea, pero es una idea que se podría ejecutar mucho mejor.

No me es cómodo empezar un proyecto Xamarin.Forms, y mucho menos instalar todo lo necesario en mi máquina.

Las comparaciones son odiosas, pero me es inevitable viendo lo poquísimo que tardo y lo productivo que soy haciendo algo muy similar con React Native.

Antes de terminar, quisiera comentar que tengo la suerte de tener auténticos máquinas como compañeros, como Javier Suárez, que me ha ayudado un montón y que me ha hecho entender mejor Xamarin.Forms. Le debo unas Cruzcampos, que creo que es lo que se bebe en Sevilla.

Happy Coding!
