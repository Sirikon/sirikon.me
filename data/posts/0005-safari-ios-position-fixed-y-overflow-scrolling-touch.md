---
title: "Safari iOS: position:fixed y overflow-scrolling:touch"
slug: safari-ios-position-fixed-y-overflow-scrolling-touch
date: 2015-05-07 12:00
published: true
---
Recientemente he trabajado en un proyecto HTML5 con una UI muy compleja, he llegado a dedicar una semana entera a sólo una pantalla de la docena de pantallas con las que cuenta la aplicación.

Mientras me peleaba precisamente con dicha pantalla, **me encontré con un extraño problema**.

Quería hacer un div con `overflow:scroll`, al cual para hacer que quedara más fluido en iOS, añadí `-webkit-overflow-scrolling:touch`. Después necesitaba que uno de los elementos dentro del div con scroll pudiera ser arrastrado fuera de dicho contenedor, así que mediante Javascript le aplico `position:fixed` cuando es tocado para que pueda salir fuera de su contenedor y a partir de aquí lo muevo con `transform:translate3d(...)`.

El problema es que en Chrome de escritorio y Android Browser funcionaba correctamente... **pero no en iOS**, en iOS el elemento desaparecía al pulsarlo. Con el inspector descubrí que el elemento estaba bien posicionado, pero **estaba oculto ya que había sobresalido de su contenedor con overflow:scroll, pero esto no debería suceder ya que tiene `position:fixed`**!. Por alguna razón cuando un contenedor tiene -webkit-overflow-scrolling:touch ningún elemento hijo puede visualizarse fuera de él.

**Resultado:** Al final por exigencias de la interfaz y otros problemas de la misma hice que, al pulsar el elemento, lo clonara, lo añadiera como hijo al body y lo animara mientras el original permanecía oculto, de esta forma podía eludir al contenedor con scroll que no me permitía mostrar nada más allá de él. Para afrontar el problema debería bastar con desactivar `-webkit-overflow-scrolling:touch` cuando sea necesario sacar un elemento fuera del contenedor, aunque si con el elemento fuera necesitáis poder hacer scroll en el contenedor sí tendréis que recurrir a lo que hice yo.

Para comprobar el problema podéis acceder a [este test](/tests/safari_ios_position_fixed.html) desde Safari en iOS.

**UPDATE #1**: No me había dado cuenta de que también sucede en Safari de Escritorio, podéis comprobarlo vosotros mismos.

Saludos!
