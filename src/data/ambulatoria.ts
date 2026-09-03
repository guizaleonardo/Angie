import type { Bloque, Item } from '../types';

/** Datos maestros de rondas ambulatorias extraídos del HTML. No se modifican desde la UI. */

export const AMB_BLOQUES: Bloque[] = [
  {
    "codigo": "ID",
    "nombre": "Identificación correcta del usuario",
    "tipo": "transversal"
  },
  {
    "codigo": "HM",
    "nombre": "Higiene de manos: insumos y condiciones del punto",
    "tipo": "transversal"
  },
  {
    "codigo": "MM",
    "nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal"
  },
  {
    "codigo": "PE",
    "nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal"
  },
  {
    "codigo": "RT",
    "nombre": "Rotulación y trazabilidad",
    "tipo": "transversal"
  },
  {
    "codigo": "MD",
    "nombre": "Medicamentos, insumos y dispositivos",
    "tipo": "transversal"
  },
  {
    "codigo": "EN",
    "nombre": "Entorno seguro y riesgo de caídas",
    "tipo": "transversal"
  },
  {
    "codigo": "HC",
    "nombre": "Historia clínica, consentimiento y comunicación",
    "tipo": "transversal"
  },
  {
    "codigo": "EA",
    "nombre": "Evento adverso y mejora continua",
    "tipo": "transversal"
  },
  {
    "codigo": "TH",
    "nombre": "Talento humano, infraestructura y emergencias",
    "tipo": "transversal"
  },
  {
    "codigo": "CE",
    "nombre": "Consulta externa",
    "tipo": "servicio"
  },
  {
    "codigo": "OD",
    "nombre": "Odontología",
    "tipo": "servicio"
  },
  {
    "codigo": "LC",
    "nombre": "Laboratorio clínico y toma de muestras",
    "tipo": "servicio"
  },
  {
    "codigo": "ES",
    "nombre": "Esterilización",
    "tipo": "servicio"
  },
  {
    "codigo": "DM",
    "nombre": "Dispensación de medicamentos",
    "tipo": "servicio"
  },
  {
    "codigo": "IM",
    "nombre": "Imágenes diagnósticas",
    "tipo": "servicio"
  },
  {
    "codigo": "TR",
    "nombre": "Terapias y rehabilitación",
    "tipo": "servicio"
  }
];

export const AMB_ITEMS: Item[] = [
  {
    "id": "ID-01",
    "bloque": "ID",
    "bloque_nombre": "Identificación correcta del usuario",
    "tipo": "transversal",
    "item": "En admisión se pide el documento de identidad y se confronta contra la agenda: nombre completo y número de documento.",
    "referencia": "Práctica segura: identificación correcta del paciente · Guía Técnica BPSP (MinSalud) · Res. 3100/2019, procesos prioritarios",
    "fuente": "Observación de 10 admisiones",
    "nota": "No se usa manilla: en sede ambulatoria la verificación es documental y verbal.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / líder de admisión",
      "que": "Implementar la confrontación del documento físico contra la agenda en el 100 % de las admisiones.",
      "porque": "¿No está definido como paso obligatorio, o se omite por el tiempo de atención?",
      "como": "Incluir el paso en el procedimiento de admisión, capacitar al personal del front y observar 20 admisiones."
    }
  },
  {
    "id": "ID-02",
    "bloque": "ID",
    "bloque_nombre": "Identificación correcta del usuario",
    "tipo": "transversal",
    "item": "Antes de tomar una muestra, aplicar un medicamento o iniciar un procedimiento, el profesional le PREGUNTA al usuario su nombre y documento; no se los afirma ni los lee del rótulo.",
    "referencia": "Práctica segura: identificación correcta del paciente · Guía Técnica BPSP (MinSalud) · Res. 3100/2019, procesos prioritarios",
    "fuente": "Observación directa en cada área",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / líder de admisión",
      "que": "Instaurar la identificación activa: el usuario dice su nombre y documento, el profesional confirma.",
      "porque": "¿Costumbre de identificar leyendo la orden, o desconocimiento de la diferencia entre identificación activa y pasiva?",
      "como": "Reentrenar con demostración en cada área y observar 10 procedimientos con retroalimentación inmediata."
    }
  },
  {
    "id": "ID-03",
    "bloque": "ID",
    "bloque_nombre": "Identificación correcta del usuario",
    "tipo": "transversal",
    "item": "No se llama ni se identifica al usuario por número de turno, consultorio, diagnóstico ni por expresiones como 'el de las diez'.",
    "referencia": "Práctica segura: identificación correcta del paciente · Guía Técnica BPSP (MinSalud) · Res. 3100/2019, procesos prioritarios",
    "fuente": "Observación de la sala de espera y del llamado",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / líder de admisión",
      "que": "Eliminar el llamado por turno o diagnóstico y usar nombre completo del usuario.",
      "porque": "¿El sistema de turnos induce la práctica, o es costumbre del personal de llamado?",
      "como": "Ajustar el llamado del turnero, socializar la regla y verificar en la siguiente ronda."
    }
  },
  {
    "id": "ID-04",
    "bloque": "ID",
    "bloque_nombre": "Identificación correcta del usuario",
    "tipo": "transversal",
    "item": "Tubos, frascos, placas y piezas se marcan delante del usuario, inmediatamente después de la toma; no antes ni al cierre de la jornada.",
    "referencia": "Práctica segura: identificación correcta del paciente · Guía Técnica BPSP (MinSalud) · Res. 3100/2019, procesos prioritarios",
    "fuente": "Observación directa en toma de muestras y odontología",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / líder de admisión",
      "que": "Rotular en presencia del usuario, inmediatamente después de la toma.",
      "porque": "¿Rotulado diferido por volumen de agenda, o material de rotulado ausente en el punto de toma?",
      "como": "Ubicar rótulos y marcador en el punto de toma y observar 10 tomas."
    }
  },
  {
    "id": "ID-05",
    "bloque": "ID",
    "bloque_nombre": "Identificación correcta del usuario",
    "tipo": "transversal",
    "item": "Al entregar resultados, fórmulas, incapacidades u órdenes se verifica el documento; si lo reclama un tercero, hay autorización escrita.",
    "referencia": "Práctica segura: identificación correcta del paciente · Guía Técnica BPSP (MinSalud) · Res. 3100/2019, procesos prioritarios",
    "fuente": "Observación del punto de entrega",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / líder de admisión",
      "que": "Definir e implementar la verificación de identidad y la autorización de terceros en el punto de entrega.",
      "porque": "¿Entrega por nombre sin confirmar documento, o ausencia de procedimiento para terceros?",
      "como": "Elaborar el procedimiento de entrega, disponer el formato de autorización y observar 20 entregas."
    }
  },
  {
    "id": "ID-06",
    "bloque": "ID",
    "bloque_nombre": "Identificación correcta del usuario",
    "tipo": "transversal",
    "item": "La agenda del día se revisó para detectar usuarios con nombres iguales o parecidos y el personal fue advertido.",
    "referencia": "Práctica segura: identificación correcta del paciente · Guía Técnica BPSP (MinSalud) · Res. 3100/2019, procesos prioritarios",
    "fuente": "Agenda del día y entrevista a admisión",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de la sede / líder de admisión",
      "que": "Instaurar la revisión de homónimos en la agenda al inicio de cada jornada.",
      "porque": "¿No hay responsable de revisar la agenda, o no existe una alerta definida para homónimos?",
      "como": "Asignar la revisión a admisión al abrir la jornada y definir cómo se marca la alerta."
    }
  },
  {
    "id": "ID-07",
    "bloque": "ID",
    "bloque_nombre": "Identificación correcta del usuario",
    "tipo": "transversal",
    "item": "El personal sabe cómo identificar al usuario sin documento, menor de edad o con discapacidad cognitiva.",
    "referencia": "Práctica segura: identificación correcta del paciente · Guía Técnica BPSP (MinSalud) · Res. 3100/2019, procesos prioritarios",
    "fuente": "Entrevista a mínimo 3 personas",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de la sede / líder de admisión",
      "que": "Socializar el procedimiento de identificación de usuarios con barreras.",
      "porque": "¿El procedimiento no existe para el ambulatorio, o existe y no fue socializado con admisión?",
      "como": "Ajustar el documento, socializarlo y dejar acta de asistencia."
    }
  },
  {
    "id": "HM-01",
    "bloque": "HM",
    "bloque_nombre": "Higiene de manos: insumos y condiciones del punto",
    "tipo": "transversal",
    "item": "Todo lavamanos tiene jabón disponible, en dispensador funcional; no hay botellas rellenadas ni jabón en barra.",
    "referencia": "Práctica segura: prevención de IAAS · Directrices OMS sobre higiene de manos · Res. 3100/2019",
    "fuente": "Verificación de cada lavamanos (matriz de puntos)",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Dotar todos los lavamanos con jabón en dispensador y retirar envases rellenados o jabón en barra.",
      "porque": "¿Desabastecimiento, dispensadores dañados, o práctica de rellenar por ahorro?",
      "como": "Inventariar los lavamanos, reponer dispensadores y definir responsable de reposición por jornada."
    }
  },
  {
    "id": "HM-02",
    "bloque": "HM",
    "bloque_nombre": "Higiene de manos: insumos y condiciones del punto",
    "tipo": "transversal",
    "item": "Todo lavamanos tiene toallas de papel desechables disponibles; no se usa toalla de tela ni secador de aire como único medio.",
    "referencia": "Práctica segura: prevención de IAAS · Directrices OMS sobre higiene de manos · Res. 3100/2019",
    "fuente": "Verificación de cada lavamanos (matriz de puntos)",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Garantizar toallas de papel desechables en el 100 % de los lavamanos.",
      "porque": "¿Stock mínimo no definido, reposición sin responsable, o dispensador de toallas ausente?",
      "como": "Definir stock mínimo por punto y responsable de reposición, y verificar punto por punto."
    }
  },
  {
    "id": "HM-03",
    "bloque": "HM",
    "bloque_nombre": "Higiene de manos: insumos y condiciones del punto",
    "tipo": "transversal",
    "item": "Cada lavamanos tiene caneca cerca, con bolsa, sin desbordar y de preferencia con accionamiento de pedal.",
    "referencia": "Práctica segura: prevención de IAAS · Directrices OMS sobre higiene de manos · Res. 3100/2019",
    "fuente": "Verificación de cada lavamanos",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de PCI de la sede",
      "que": "Dotar cada lavamanos con caneca de pedal con bolsa y definir su frecuencia de recolección.",
      "porque": "¿Canecas insuficientes, o frecuencia de recolección inadecuada para el flujo de la sede?",
      "como": "Reponer canecas y ajustar la ruta de recolección con servicios generales."
    }
  },
  {
    "id": "HM-04",
    "bloque": "HM",
    "bloque_nombre": "Higiene de manos: insumos y condiciones del punto",
    "tipo": "transversal",
    "item": "Hay alcohol glicerinado disponible en cada consultorio, en el punto de toma de muestras y en la unidad odontológica.",
    "referencia": "Práctica segura: prevención de IAAS · Directrices OMS sobre higiene de manos · Res. 3100/2019",
    "fuente": "Recorrido de todos los puntos de atención",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Ubicar alcohol glicerinado en todos los puntos de atención de la sede.",
      "porque": "¿Dispensadores insuficientes, o desabastecimiento del producto?",
      "como": "Inventariar los puntos de atención, instalar dispensadores faltantes y asegurar el stock de reserva."
    }
  },
  {
    "id": "HM-05",
    "bloque": "HM",
    "bloque_nombre": "Higiene de manos: insumos y condiciones del punto",
    "tipo": "transversal",
    "item": "Los dispensadores de alcohol entregan producto al accionarlos: no están vacíos, obstruidos ni descolgados.",
    "referencia": "Práctica segura: prevención de IAAS · Directrices OMS sobre higiene de manos · Res. 3100/2019",
    "fuente": "Accionar cada dispensador durante el recorrido",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Reparar, reponer o recargar los dispensadores que no entregan producto.",
      "porque": "¿Dispensadores dañados sin reporte, o recarga sin responsable asignado?",
      "como": "Probar todos los dispensadores, radicar mantenimiento y definir la verificación en la apertura de la jornada."
    }
  },
  {
    "id": "HM-06",
    "bloque": "HM",
    "bloque_nombre": "Higiene de manos: insumos y condiciones del punto",
    "tipo": "transversal",
    "item": "El jabón y el alcohol glicerinado tienen rótulo legible: producto, lote, fecha de vencimiento y fecha de apertura.",
    "referencia": "Práctica segura: prevención de IAAS · Directrices OMS sobre higiene de manos · Res. 3100/2019",
    "fuente": "Lectura del rótulo de cada envase en uso",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Rotular todos los envases de jabón y alcohol con producto, lote, vencimiento y fecha de apertura.",
      "porque": "¿Rótulo original retirado al instalar el envase, o rótulo de apertura no implementado?",
      "como": "Disponer el rótulo de apertura, capacitar a quien instala los envases y verificar en cada ronda."
    }
  },
  {
    "id": "HM-07",
    "bloque": "HM",
    "bloque_nombre": "Higiene de manos: insumos y condiciones del punto",
    "tipo": "transversal",
    "item": "No hay envases de jabón o alcohol rellenados, trasvasados ni 'completados' con otro producto.",
    "referencia": "Práctica segura: prevención de IAAS · Directrices OMS sobre higiene de manos · Res. 3100/2019",
    "fuente": "Inspección de los envases en uso",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Prohibir y eliminar el rellenado y trasvase de jabón y alcohol glicerinado.",
      "porque": "¿Práctica instaurada por ahorro, o desabastecimiento que obliga a completar envases?",
      "como": "Socializar la prohibición y el riesgo de contaminación, y asegurar el abastecimiento."
    }
  },
  {
    "id": "HM-08",
    "bloque": "HM",
    "bloque_nombre": "Higiene de manos: insumos y condiciones del punto",
    "tipo": "transversal",
    "item": "La grifería es de accionamiento no manual (codo, pedal, sensor); si no, el personal cierra el grifo con toalla de papel.",
    "referencia": "Práctica segura: prevención de IAAS · Directrices OMS sobre higiene de manos · Res. 3100/2019",
    "fuente": "Verificación física y observación del cierre",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de PCI de la sede",
      "que": "Adecuar la grifería a accionamiento no manual o instaurar el cierre con toalla mientras se adecúa.",
      "porque": "¿Limitación de infraestructura, grifería deteriorada, o adecuación no incluida en el plan de inversión?",
      "como": "Inventariar los lavamanos no conformes, instaurar el cierre con toalla y escalar la adecuación."
    }
  },
  {
    "id": "HM-09",
    "bloque": "HM",
    "bloque_nombre": "Higiene de manos: insumos y condiciones del punto",
    "tipo": "transversal",
    "item": "El afiche de los cinco momentos y el de la técnica están visibles sobre o junto a cada lavamanos y dispensador, legibles y sin deterioro.",
    "referencia": "Práctica segura: prevención de IAAS · Directrices OMS sobre higiene de manos · Res. 3100/2019",
    "fuente": "Verificación de cada punto",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de PCI de la sede",
      "que": "Instalar y mantener los afiches de técnica y cinco momentos en todos los puntos.",
      "porque": "¿Material no disponible, afiches deteriorados sin reposición, o ubicados fuera del campo visual?",
      "como": "Imprimir el material institucional, instalarlo en cada punto y verificar en cada ronda."
    }
  },
  {
    "id": "HM-10",
    "bloque": "HM",
    "bloque_nombre": "Higiene de manos: insumos y condiciones del punto",
    "tipo": "transversal",
    "item": "El agua sale con presión suficiente, sin fugas, y el sifón no presenta olores ni retorno.",
    "referencia": "Práctica segura: prevención de IAAS · Directrices OMS sobre higiene de manos · Res. 3100/2019",
    "fuente": "Accionar cada lavamanos",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de PCI de la sede",
      "que": "Corregir las fallas hidráulicas y sanitarias de los lavamanos identificadas.",
      "porque": "¿Mantenimiento correctivo no solicitado, o solicitud radicada sin respuesta?",
      "como": "Inventariar las fallas, radicar a mantenimiento con priorización y verificar el cierre."
    }
  },
  {
    "id": "MM-01",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 1 · Cambio de sistema: la sede tiene lavamanos y dispensadores suficientes para el número de consultorios y áreas de procedimiento.",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Conteo de puntos frente al número de áreas de atención",
    "nota": "Componente 1 de los 5 de la estrategia multimodal.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Completar la dotación de lavamanos y dispensadores según el número de áreas de atención.",
      "porque": "¿Nunca se dimensionó la necesidad, o la sede creció sin ajustar la dotación?",
      "como": "Levantar el conteo de áreas frente a puntos disponibles y presentar la necesidad a la dirección."
    }
  },
  {
    "id": "MM-02",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 1: el alcohol glicerinado está en el punto de atención, al alcance del profesional sin que deba salir del consultorio.",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Recorrido: medir si el producto está al alcance del sitio de atención",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Reubicar los dispensadores al punto de atención, dentro del alcance del profesional.",
      "porque": "¿Dispensadores ubicados en pasillos y no en el punto de atención, o instalación hecha sin analizar el flujo de trabajo?",
      "como": "Reubicar según el recorrido real del profesional y verificar en la siguiente ronda."
    }
  },
  {
    "id": "MM-03",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 1: hay stock de reserva de jabón, toallas y alcohol, y un responsable de reposición identificable por nombre.",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Verificación del sitio de almacenamiento y entrevista",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Definir stock mínimo de reserva y un responsable nominal de reposición.",
      "porque": "¿No hay stock de seguridad definido, o la reposición depende de solicitud sin periodicidad?",
      "como": "Definir stock mínimo, asignar responsable por nombre y establecer la revisión al abrir la jornada."
    }
  },
  {
    "id": "MM-04",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 2 · Formación: todo el personal asistencial tiene capacitación en los cinco momentos y en técnica, con registro del último año.",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Registros de capacitación y cobertura por persona",
    "nota": "Componente 2.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Completar la capacitación en higiene de manos de todo el personal asistencial de la sede.",
      "porque": "¿Personal nuevo sin capacitar, o cronograma no ejecutado por dificultad para liberar de la agenda?",
      "como": "Programar capacitaciones cortas en el cambio de jornada y verificar cobertura persona por persona."
    }
  },
  {
    "id": "MM-05",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 2: hay al menos una persona en la sede entrenada como observador de higiene de manos.",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Entrevista y certificado o registro de entrenamiento",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Entrenar y designar formalmente al menos un observador de higiene de manos en la sede.",
      "porque": "¿No se ha designado observador, o el designado no recibió entrenamiento formal?",
      "como": "Entrenar al candidato en la metodología OMS, designarlo por escrito y programar sus observaciones."
    }
  },
  {
    "id": "MM-06",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 3 · Evaluación: se realizan observaciones periódicas con formato estandarizado y se conserva el registro.",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Formatos de observación diligenciados del último trimestre",
    "nota": "Componente 3.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Instaurar la observación periódica de higiene de manos con formato estandarizado y archivo del registro.",
      "porque": "¿No hay observador ni cronograma, o se observa sin conservar el registro?",
      "como": "Definir cronograma y número mínimo de oportunidades por periodo, y archivar los formatos."
    }
  },
  {
    "id": "MM-07",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 3: el resultado de adherencia se retroalimenta al personal y queda constancia (acta, correo o cartelera fechada).",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Acta, correo o cartelera con el último resultado",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Retroalimentar al personal el resultado de adherencia y dejar constancia fechada.",
      "porque": "¿El dato se produce pero no retorna al personal, o no hay espacio definido para socializarlo?",
      "como": "Presentar el resultado en la reunión de la sede, publicarlo en cartelera y archivar el acta."
    }
  },
  {
    "id": "MM-08",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 4 · Recordatorios: hay recordatorios visuales vigentes en los puntos de atención, no solo en pasillos o baños.",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Recorrido de consultorios y áreas de procedimiento",
    "nota": "Componente 4.",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Instalar recordatorios visuales en los puntos de atención, no únicamente en zonas comunes.",
      "porque": "¿Material instalado solo en pasillos, o cantidad insuficiente para cubrir los consultorios?",
      "como": "Distribuir el material por punto de atención y verificar cobertura en la siguiente ronda."
    }
  },
  {
    "id": "MM-09",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 4: los recordatorios están legibles, sin deterioro, en español y a la altura visual del personal.",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Inspección de cada afiche",
    "nota": "",
    "prop": {
      "criticidad": "Baja",
      "plazo": 60,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Reponer los recordatorios deteriorados y reubicarlos a la altura visual del personal.",
      "porque": "¿Material antiguo sin reposición, o instalado a altura inadecuada?",
      "como": "Reponer e instalar a la altura correcta, y verificar en cada ronda."
    }
  },
  {
    "id": "MM-10",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 5 · Clima de seguridad: hay compromiso visible de la dirección — meta de adherencia definida, campaña vigente o compromiso escrito.",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Documento, cartelera o entrevista a la dirección de la sede",
    "nota": "Componente 5.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Formalizar el compromiso de la dirección de la sede con una meta de adherencia y una campaña vigente.",
      "porque": "¿La higiene de manos se maneja como tarea operativa sin respaldo directivo, o la meta institucional no llegó a la sede?",
      "como": "Definir la meta con la dirección, comunicarla al personal y dejar el compromiso por escrito."
    }
  },
  {
    "id": "MM-11",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 5: el personal manifiesta que puede recordarle a un compañero, incluido un médico, que debe higienizarse las manos, sin temor a represalia.",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Entrevista a mínimo 3 personas de distinto cargo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Instalar la autorización explícita para el recordatorio entre pares, incluido hacia el personal médico.",
      "porque": "¿Jerarquía que inhibe el recordatorio, o ausencia de un mensaje directivo que lo autorice?",
      "como": "Comunicar el respaldo de la dirección al recordatorio entre pares y reforzarlo en la socialización del indicador."
    }
  },
  {
    "id": "MM-12",
    "bloque": "MM",
    "bloque_nombre": "Estrategia multimodal de la OMS",
    "tipo": "transversal",
    "item": "COMPONENTE 5: la meta de adherencia es conocida por el personal y la medición tiene periodicidad definida.",
    "referencia": "Estrategia multimodal de la OMS para la mejora de la higiene de manos (5 componentes) · Marco de autoevaluación de higiene de manos (HHSAF)",
    "fuente": "Entrevista a mínimo 3 personas",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de PCI / dirección de la sede",
      "que": "Socializar la meta de adherencia y la periodicidad de medición con todo el personal.",
      "porque": "¿La meta existe pero no se comunicó, o no hay periodicidad establecida?",
      "como": "Publicar meta y periodicidad en cartelera y verificarlo por entrevista en la siguiente ronda."
    }
  },
  {
    "id": "PE-01",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "El personal usa guantes solo cuando está indicado, se los retira al terminar y se higieniza las manos entre usuarios.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Corregir el uso de guantes: retiro entre usuarios e higiene de manos posterior.",
      "porque": "¿Percepción de que el guante reemplaza la higiene de manos, o guantes usados por comodidad?",
      "como": "Reentrenar sobre indicación del guante y su relación con los cinco momentos; observar 10 atenciones."
    }
  },
  {
    "id": "PE-02",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "No se observa personal circulando por pasillos, admisión o zonas comunes con guantes puestos.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Recorrido de la sede",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Eliminar la circulación con guantes fuera del área de procedimiento.",
      "porque": "¿Costumbre para ahorrar tiempo, o desconocimiento del riesgo de contaminación cruzada?",
      "como": "Socializar la regla, señalizar y verificar por observación en cada ronda."
    }
  },
  {
    "id": "PE-03",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "Se usa mascarilla, protección ocular y bata según el procedimiento (odontología, toma de muestras, curaciones).",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Observación directa por área",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Garantizar el uso de la barrera correspondiente a cada procedimiento.",
      "porque": "¿EPP no disponible en el punto, o incomodidad que lleva a omitirlo?",
      "como": "Verificar disponibilidad por área, reentrenar y observar 10 procedimientos."
    }
  },
  {
    "id": "PE-04",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "El personal asistencial cumple brazos libres: sin anillos, pulseras, reloj, uñas largas, esmalte ni uñas acrílicas.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Inspección directa del personal en turno",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Hacer cumplir la política de brazos libres en todo el personal asistencial.",
      "porque": "¿La política no fue socializada en la sede, o no hay seguimiento a su cumplimiento?",
      "como": "Socializar la política, verificar al inicio de la jornada y registrar el cumplimiento en cada ronda."
    }
  },
  {
    "id": "PE-05",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "Los usuarios con síntomas respiratorios reciben mascarilla en admisión y hay señalización de higiene respiratoria visible.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Observación de admisión y sala de espera",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Implementar la entrega de mascarilla al usuario sintomático y la señalización de higiene respiratoria.",
      "porque": "¿Mascarillas no disponibles para el usuario, o el tamizaje respiratorio no está definido en admisión?",
      "como": "Disponer mascarillas en admisión, instalar la señalización y definir la pregunta de tamizaje."
    }
  },
  {
    "id": "PE-06",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "La sala de espera permite separar al usuario sintomático respiratorio, o su atención se prioriza para reducir el tiempo de exposición.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Observación de la sala y entrevista a admisión",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de PCI de la sede",
      "que": "Definir el área de separación o la priorización de atención del usuario sintomático respiratorio.",
      "porque": "¿Sala sin espacio para separar, o ausencia de una regla de priorización?",
      "como": "Delimitar el área posible, definir la priorización y socializarla con admisión."
    }
  },
  {
    "id": "PE-07",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "La técnica aséptica se cumple en venopunción, curación, inyectología y procedimientos odontológicos.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Observación directa del procedimiento",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Reforzar y verificar la técnica aséptica en los procedimientos ambulatorios.",
      "porque": "¿Insumos de asepsia insuficientes, o procedimiento apresurado por la agenda?",
      "como": "Verificar insumos, reentrenar con demostración y observar 10 procedimientos."
    }
  },
  {
    "id": "PE-08",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "Los guardianes están correctamente ensamblados, rotulados, ubicados al alcance del brazo y no superan las tres cuartas partes.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Inspección de cada guardián",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Corregir ensamble, rotulación, ubicación y nivel de llenado de los guardianes.",
      "porque": "¿Guardianes insuficientes, cambio tardío, o desconocimiento del límite de llenado?",
      "como": "Reponer guardianes, definir responsable de cambio y verificar en cada ronda."
    }
  },
  {
    "id": "PE-09",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "No se reencapsulan agujas ni se manipulan cortopunzantes con las dos manos.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Observación directa de la toma y de inyectología",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Eliminar el reencapsulado de agujas en toda la sede.",
      "porque": "¿Guardián fuera del alcance en el momento del procedimiento, o costumbre no corregida?",
      "como": "Reubicar el guardián al alcance del brazo, reentrenar y observar 10 procedimientos."
    }
  },
  {
    "id": "PE-10",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "Los recipientes de residuos cumplen el código de colores, están rotulados y la segregación es correcta en el punto de generación.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Inspección de los puntos ecológicos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Corregir la segregación y la rotulación de los recipientes de residuos.",
      "porque": "¿Puntos ecológicos incompletos, rotulación ausente, o desconocimiento del código de colores?",
      "como": "Completar y rotular los puntos, capacitar al personal y verificar por muestreo en cada ronda."
    }
  },
  {
    "id": "PE-11",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "El cuarto de residuos está cerrado, señalizado, limpio, con báscula y registro de entrega al gestor autorizado.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Inspección del cuarto y revisión del registro",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Adecuar el cuarto de residuos y restablecer el registro de entrega al gestor.",
      "porque": "¿Cuarto sin condiciones exigidas, registro no diligenciado, o contrato del gestor vencido?",
      "como": "Adecuar y señalizar el cuarto, restablecer el registro y verificar la vigencia del contrato."
    }
  },
  {
    "id": "PE-12",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "Existe programa de limpieza y desinfección con producto, dilución, frecuencia y responsable definidos por área, y el personal de aseo lo conoce.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Documento del programa y entrevista al personal de aseo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Formalizar y socializar el programa de limpieza y desinfección por área.",
      "porque": "¿El programa no existe o está desactualizado, o el personal de aseo no fue capacitado?",
      "como": "Elaborar el programa con fichas técnicas, definir diluciones por área y capacitar con registro."
    }
  },
  {
    "id": "PE-13",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "Las superficies de contacto (unidad odontológica, camilla, silla de toma, mesón) se desinfectan entre usuarios y hay planilla al día.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Observación entre dos atenciones y revisión de planilla",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Restablecer la desinfección registrada de superficies entre usuarios.",
      "porque": "¿Tiempo entre citas insuficiente, desinfectante no disponible, o planilla no diligenciada?",
      "como": "Ajustar la agenda para permitir la desinfección, asegurar el insumo y auditar la planilla semanalmente."
    }
  },
  {
    "id": "PE-14",
    "bloque": "PE",
    "bloque_nombre": "Precauciones estándar, IAAS y residuos",
    "tipo": "transversal",
    "item": "El personal tiene esquema de vacunación acorde al riesgo biológico y conoce la ruta ante accidente biológico.",
    "referencia": "Precauciones estándar · Guía Técnica BPSP · Res. 3100/2019 · Res. 1164/2002 y Decreto 780/2016 (residuos)",
    "fuente": "Carné de vacunación y entrevista",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de PCI de la sede",
      "que": "Completar el esquema de vacunación del personal y socializar la ruta post-exposición.",
      "porque": "¿Esquemas incompletos sin seguimiento, o ruta de accidente biológico no socializada en la sede?",
      "como": "Verificar carné por persona con talento humano, completar esquemas y publicar la ruta post-exposición."
    }
  },
  {
    "id": "RT-01",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "Ningún envase de la sede está sin rótulo, con rótulo ilegible, enmendado o con contenido distinto al que declara.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Recorrido de todas las áreas con insumos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del área verificada",
      "que": "Depurar todas las áreas y retirar los envases sin rótulo o con rótulo no confiable.",
      "porque": "¿No hay verificación periódica del rotulado, o hay trasvases informales?",
      "como": "Depurar las áreas, definir responsable y frecuencia de verificación, y reauditar en 30 días."
    }
  },
  {
    "id": "RT-02",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "El jabón y el alcohol glicerinado en uso tienen rótulo con producto, lote, fecha de vencimiento y fecha de apertura.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Lectura del rótulo de cada envase",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del área verificada",
      "que": "Rotular todos los envases de jabón y alcohol con los datos mínimos exigidos.",
      "porque": "¿Rótulo original retirado al instalar, o rótulo de apertura no implementado?",
      "como": "Disponer rótulos de apertura y capacitar a quien instala los envases."
    }
  },
  {
    "id": "RT-03",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "Los desinfectantes de superficies en uso indican principio activo, dilución, fecha de preparación y fecha de vencimiento.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Inspección de los recipientes de dilución",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del área verificada",
      "que": "Rotular las diluciones de desinfectante con concentración, fecha de preparación y vencimiento.",
      "porque": "¿Diluciones preparadas sin registro, o desconocimiento de la estabilidad del producto diluido?",
      "como": "Definir diluciones con la ficha técnica, disponer el rótulo y capacitar a quien prepara."
    }
  },
  {
    "id": "RT-04",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "Los antisépticos (clorhexidina, yodopovidona, alcohol) tienen fecha de apertura y no superan la vida útil definida.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Inspección de los frascos en uso",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del área verificada",
      "que": "Implementar el rótulo de apertura y el descarte por vida útil de los antisépticos.",
      "porque": "¿No hay tiempos de vida útil definidos, o práctica de usar hasta agotar el frasco?",
      "como": "Socializar los tiempos de estabilidad institucionales, rotular la apertura y depurar los frascos."
    }
  },
  {
    "id": "RT-05",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "Los medicamentos y anestésicos locales del stand están vigentes, con rótulo original legible y almacenados en su empaque.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Inspección del stand y la nevera",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del área verificada",
      "que": "Depurar el stand y garantizar rótulo original legible en todo medicamento.",
      "porque": "¿Revisión de vencimientos sin responsable, o almacenamiento fuera del empaque original?",
      "como": "Asignar responsable y frecuencia de revisión, corregir el almacenamiento y verificar en cada ronda."
    }
  },
  {
    "id": "RT-06",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "Los frascos multidosis abiertos tienen fecha y hora de apertura y fecha de descarte.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Inspección de la nevera y el stand",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del área verificada",
      "que": "Implementar el rótulo de apertura y descarte en frascos multidosis.",
      "porque": "¿Rótulo no disponible, o desconocimiento de la vida útil tras la apertura?",
      "como": "Disponer rótulos, socializar tiempos de estabilidad y depurar nevera y stand."
    }
  },
  {
    "id": "RT-07",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "Las muestras están rotuladas con nombre completo, documento, tipo de muestra, fecha y hora de toma.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Inspección de las muestras del día",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del área verificada",
      "que": "Completar el rótulo de muestras con los cinco datos mínimos.",
      "porque": "¿Rótulo con un solo identificador, o rotulado realizado sin el usuario presente?",
      "como": "Estandarizar el rótulo, exigir el rotulado en presencia del usuario y registrar los rechazos por rótulo."
    }
  },
  {
    "id": "RT-08",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "Los paquetes estériles indican contenido, número de ciclo o lote, fecha de esterilización y fecha de vencimiento.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Inspección del almacenamiento de estéril",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del área verificada",
      "que": "Estandarizar el rótulo de los paquetes estériles con los cuatro datos exigidos.",
      "porque": "¿Rótulo incompleto por volumen de trabajo, o vigencia por tipo de empaque no definida?",
      "como": "Estandarizar el rótulo, definir la vigencia por empaque y verificar el almacenamiento."
    }
  },
  {
    "id": "RT-09",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "Neveras y estantes están identificados por contenido y condición de conservación.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Recorrido de las áreas de almacenamiento",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador del área verificada",
      "que": "Identificar y rotular neveras y estantes por contenido y condición de conservación.",
      "porque": "¿Almacenamiento sin organización definida, o rótulos no instalados?",
      "como": "Reorganizar y rotular por contenido, y verificar en la siguiente ronda."
    }
  },
  {
    "id": "RT-10",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "Los productos químicos y de aseo tienen etiqueta del Sistema Globalmente Armonizado y la ficha de datos de seguridad está accesible.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Inspección del cuarto de aseo y carpeta de fichas",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador del área verificada",
      "que": "Etiquetar conforme al SGA y disponer las fichas de datos de seguridad accesibles.",
      "porque": "¿Trasvase a envases sin rótulo, fichas no solicitadas al proveedor, o personal no capacitado en SGA?",
      "como": "Solicitar fichas al proveedor, etiquetar y capacitar al personal de aseo."
    }
  },
  {
    "id": "RT-11",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "Los reactivos de laboratorio tienen lote, fecha de vencimiento y fecha de apertura o reconstitución.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Inspección de la nevera y el estante de reactivos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del área verificada",
      "que": "Implementar el registro de lote, vencimiento y apertura de todos los reactivos.",
      "porque": "¿Kardex de reactivos no diligenciado, o rótulo de reconstitución no implementado?",
      "como": "Restablecer el kardex por lote, disponer rótulos de apertura y verificar en cada ronda."
    }
  },
  {
    "id": "RT-12",
    "bloque": "RT",
    "bloque_nombre": "Rotulación y trazabilidad",
    "tipo": "transversal",
    "item": "No hay insumos, medicamentos ni reactivos vencidos en ninguna área de la sede.",
    "referencia": "Res. 3100/2019, medicamentos, dispositivos e insumos · Res. 1403/2007 · Decreto 1496/2018 (SGA)",
    "fuente": "Muestreo de todas las áreas de almacenamiento",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del área verificada",
      "que": "Retirar todo producto vencido y establecer control de próximos a vencer.",
      "porque": "¿Rotación por vencimiento no aplicada, o ausencia de reporte de próximos a vencer?",
      "como": "Depurar todas las áreas, aplicar rotación y generar reporte mensual de próximos a vencer."
    }
  },
  {
    "id": "MD-01",
    "bloque": "MD",
    "bloque_nombre": "Medicamentos, insumos y dispositivos",
    "tipo": "transversal",
    "item": "El maletín o carro de emergencia está sellado, con inventario vigente y verificación registrada, accesible desde todas las áreas de atención.",
    "referencia": "Res. 3100/2019, medicamentos y dispositivos · Res. 1403/2007 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Lista de chequeo del maletín y ubicación",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / químico farmacéutico de referencia",
      "que": "Restablecer la dotación, el sellado y la verificación registrada del maletín de emergencia.",
      "porque": "¿Verificación sin responsable, insumos vencidos sin reposición, o maletín fuera del alcance de algunas áreas?",
      "como": "Asignar responsable y frecuencia con firma, reponer lo vencido y reubicarlo en punto accesible."
    }
  },
  {
    "id": "MD-02",
    "bloque": "MD",
    "bloque_nombre": "Medicamentos, insumos y dispositivos",
    "tipo": "transversal",
    "item": "Hay adrenalina vigente y el personal sabe dónde está y cómo usarla ante una reacción anafiláctica.",
    "referencia": "Res. 3100/2019, medicamentos y dispositivos · Res. 1403/2007 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Verificación física y entrevista a mínimo 3 personas",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / químico farmacéutico de referencia",
      "que": "Garantizar adrenalina vigente y el entrenamiento del personal en el manejo de la anafilaxia.",
      "porque": "¿Medicamento vencido o ausente, o personal sin entrenamiento en el manejo inicial?",
      "como": "Reponer el medicamento, entrenar al personal y realizar un simulacro de anafilaxia."
    }
  },
  {
    "id": "MD-03",
    "bloque": "MD",
    "bloque_nombre": "Medicamentos, insumos y dispositivos",
    "tipo": "transversal",
    "item": "Los medicamentos de control especial, si los hay, están bajo llave, con registro y responsable definido.",
    "referencia": "Res. 3100/2019, medicamentos y dispositivos · Res. 1403/2007 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Inspección y libro de registro",
    "nota": "Marcar NA si la sede no maneja control especial.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / químico farmacéutico de referencia",
      "que": "Restablecer las condiciones de seguridad y el registro de los medicamentos de control especial.",
      "porque": "¿Llave sin responsable definido, o registro no diligenciado?",
      "como": "Asignar responsable, conciliar inventario contra libro y capacitar en la Res. 1478 de 2006."
    }
  },
  {
    "id": "MD-04",
    "bloque": "MD",
    "bloque_nombre": "Medicamentos, insumos y dispositivos",
    "tipo": "transversal",
    "item": "La nevera de biológicos o reactivos es exclusiva, con termómetro calibrado y planilla de temperatura al día.",
    "referencia": "Res. 3100/2019, medicamentos y dispositivos · Res. 1403/2007 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Inspección de la nevera y planilla",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / químico farmacéutico de referencia",
      "que": "Restablecer el control y el registro de la cadena de frío.",
      "porque": "¿Termómetro descalibrado o ausente, nevera compartida, o planilla no diligenciada?",
      "como": "Gestionar calibración, destinar nevera exclusiva y asignar responsable de registro por jornada."
    }
  },
  {
    "id": "MD-05",
    "bloque": "MD",
    "bloque_nombre": "Medicamentos, insumos y dispositivos",
    "tipo": "transversal",
    "item": "No hay alimentos ni objetos personales en las neveras de insumos, reactivos o muestras.",
    "referencia": "Res. 3100/2019, medicamentos y dispositivos · Res. 1403/2007 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Apertura de cada nevera",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / químico farmacéutico de referencia",
      "que": "Retirar alimentos y objetos personales de las neveras asistenciales y destinar una nevera de uso del personal.",
      "porque": "¿No hay nevera para el personal, o desconocimiento de la prohibición?",
      "como": "Disponer nevera separada para el personal, señalizar y verificar en cada ronda."
    }
  },
  {
    "id": "MD-06",
    "bloque": "MD",
    "bloque_nombre": "Medicamentos, insumos y dispositivos",
    "tipo": "transversal",
    "item": "Se aplican los correctos al administrar cualquier medicamento inyectable en la sede.",
    "referencia": "Res. 3100/2019, medicamentos y dispositivos · Res. 1403/2007 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Observación de la administración",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / químico farmacéutico de referencia",
      "que": "Reforzar y verificar los correctos en la administración de medicamentos inyectables.",
      "porque": "¿Interrupciones durante la preparación, o desconocimiento de los correctos?",
      "como": "Observar 10 administraciones con retroalimentación inmediata y reentrenar al equipo."
    }
  },
  {
    "id": "MD-07",
    "bloque": "MD",
    "bloque_nombre": "Medicamentos, insumos y dispositivos",
    "tipo": "transversal",
    "item": "No se reutiliza ningún dispositivo médico de un solo uso.",
    "referencia": "Res. 3100/2019, medicamentos y dispositivos · Res. 1403/2007 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Observación directa y entrevista",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / químico farmacéutico de referencia",
      "que": "Eliminar toda reutilización de dispositivos de un solo uso.",
      "porque": "¿Desabastecimiento del insumo, o práctica instaurada por control de costos?",
      "como": "Verificar disponibilidad del insumo, socializar la prohibición y verificar en cada ronda."
    }
  },
  {
    "id": "MD-08",
    "bloque": "MD",
    "bloque_nombre": "Medicamentos, insumos y dispositivos",
    "tipo": "transversal",
    "item": "Los dispositivos médicos tienen registro sanitario vigente y el personal sabe cómo reportar a tecnovigilancia.",
    "referencia": "Res. 3100/2019, medicamentos y dispositivos · Res. 1403/2007 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Inventario, registro INVIMA y entrevista",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de la sede / químico farmacéutico de referencia",
      "que": "Verificar el registro sanitario de los dispositivos y socializar el reporte de tecnovigilancia.",
      "porque": "¿Verificación no realizada en la compra, o procedimiento de reporte no socializado en la sede?",
      "como": "Cruzar el inventario con registros INVIMA y socializar el formato de reporte."
    }
  },
  {
    "id": "MD-09",
    "bloque": "MD",
    "bloque_nombre": "Medicamentos, insumos y dispositivos",
    "tipo": "transversal",
    "item": "El personal sabe cómo y dónde reportar una reacción adversa a medicamento.",
    "referencia": "Res. 3100/2019, medicamentos y dispositivos · Res. 1403/2007 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Entrevista a mínimo 3 personas",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de la sede / químico farmacéutico de referencia",
      "que": "Socializar el canal de reporte de farmacovigilancia en la sede.",
      "porque": "¿Desconocimiento del canal, o percepción de que el reporte no genera respuesta?",
      "como": "Socializar el canal, retroalimentar reportes previos y publicar el resultado del programa."
    }
  },
  {
    "id": "MD-10",
    "bloque": "MD",
    "bloque_nombre": "Medicamentos, insumos y dispositivos",
    "tipo": "transversal",
    "item": "Los equipos biomédicos tienen hoja de vida, mantenimiento preventivo y calibración vigentes, con sticker visible.",
    "referencia": "Res. 3100/2019, medicamentos y dispositivos · Res. 1403/2007 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Hoja de vida y sticker de cada equipo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la sede / químico farmacéutico de referencia",
      "que": "Actualizar mantenimiento, calibración y hoja de vida de los equipos biomédicos de la sede.",
      "porque": "¿Cronograma vencido, proveedor sin contrato, o hoja de vida no actualizada tras la intervención?",
      "como": "Solicitar cronograma a ingeniería biomédica, priorizar equipos críticos y verificar stickers."
    }
  },
  {
    "id": "EN-01",
    "bloque": "EN",
    "bloque_nombre": "Entorno seguro y riesgo de caídas",
    "tipo": "transversal",
    "item": "Se identifica desde admisión al usuario con riesgo de caída: adulto mayor, gestante, persona con discapacidad, usuario sedado o en posprocedimiento.",
    "referencia": "Práctica segura: prevención de caídas · Res. 3100/2019, infraestructura y dotación · NTC 4140 y 4143 (accesibilidad)",
    "fuente": "Observación de admisión y entrevista",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador administrativo de la sede",
      "que": "Implementar la identificación del usuario con riesgo de caída desde la admisión.",
      "porque": "¿No hay criterio de riesgo definido para el ambulatorio, o el riesgo se detecta pero no se registra?",
      "como": "Definir los criterios de riesgo ambulatorio, incluirlos en la admisión y verificar en la siguiente ronda."
    }
  },
  {
    "id": "EN-02",
    "bloque": "EN",
    "bloque_nombre": "Entorno seguro y riesgo de caídas",
    "tipo": "transversal",
    "item": "El usuario identificado en riesgo es acompañado durante su recorrido, incluidos baño, escaleras y salida.",
    "referencia": "Práctica segura: prevención de caídas · Res. 3100/2019, infraestructura y dotación · NTC 4140 y 4143 (accesibilidad)",
    "fuente": "Observación del recorrido del usuario",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador administrativo de la sede",
      "que": "Garantizar el acompañamiento efectivo del usuario en riesgo en todos los trayectos.",
      "porque": "¿Personal de apoyo insuficiente, o trayectos críticos como baño y salida no cubiertos?",
      "como": "Definir responsable por franja horaria, cubrir los trayectos críticos y verificar por observación."
    }
  },
  {
    "id": "EN-03",
    "bloque": "EN",
    "bloque_nombre": "Entorno seguro y riesgo de caídas",
    "tipo": "transversal",
    "item": "Los pisos están secos; si hay limpieza en curso, está señalizada con aviso de piso húmedo.",
    "referencia": "Práctica segura: prevención de caídas · Res. 3100/2019, infraestructura y dotación · NTC 4140 y 4143 (accesibilidad)",
    "fuente": "Recorrido de la sede",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador administrativo de la sede",
      "que": "Instaurar la señalización de piso húmedo y ajustar el horario de aseo al flujo de usuarios.",
      "porque": "¿Avisos no disponibles, o aseo realizado en horas de mayor afluencia?",
      "como": "Dotar de avisos, ajustar el horario de aseo con servicios generales y verificar en cada ronda."
    }
  },
  {
    "id": "EN-04",
    "bloque": "EN",
    "bloque_nombre": "Entorno seguro y riesgo de caídas",
    "tipo": "transversal",
    "item": "Pasillos, salas y rutas de evacuación están libres de cajas, equipos o mobiliario.",
    "referencia": "Práctica segura: prevención de caídas · Res. 3100/2019, infraestructura y dotación · NTC 4140 y 4143 (accesibilidad)",
    "fuente": "Recorrido de la sede",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador administrativo de la sede",
      "que": "Despejar de inmediato pasillos y rutas de evacuación y definir el sitio de almacenamiento.",
      "porque": "¿Falta de espacio de almacenamiento, o insumos dejados en tránsito tras la entrega?",
      "como": "Habilitar el sitio de almacenamiento, despejar las rutas y verificar en cada ronda."
    }
  },
  {
    "id": "EN-05",
    "bloque": "EN",
    "bloque_nombre": "Entorno seguro y riesgo de caídas",
    "tipo": "transversal",
    "item": "Camillas, sillas de procedimiento, sillas de ruedas y unidad odontológica tienen frenos funcionales y estructura en buen estado.",
    "referencia": "Práctica segura: prevención de caídas · Res. 3100/2019, infraestructura y dotación · NTC 4140 y 4143 (accesibilidad)",
    "fuente": "Verificación física de cada mueble",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador administrativo de la sede",
      "que": "Reparar o reponer frenos y estructura deteriorada del mobiliario de atención.",
      "porque": "¿Mantenimiento correctivo no solicitado, solicitud sin respuesta, o mobiliario en fin de vida útil?",
      "como": "Inventariar las fallas, radicar a mantenimiento con priorización y verificar el cierre."
    }
  },
  {
    "id": "EN-06",
    "bloque": "EN",
    "bloque_nombre": "Entorno seguro y riesgo de caídas",
    "tipo": "transversal",
    "item": "Escalones, desniveles y rampas están señalizados, con superficie antideslizante y pasamanos donde se requiere.",
    "referencia": "Práctica segura: prevención de caídas · Res. 3100/2019, infraestructura y dotación · NTC 4140 y 4143 (accesibilidad)",
    "fuente": "Recorrido de accesos y circulaciones",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador administrativo de la sede",
      "que": "Señalizar y adecuar escalones, desniveles y rampas conforme a los requisitos de accesibilidad.",
      "porque": "¿Barreras arquitectónicas preexistentes, o adecuación no incluida en el plan de inversión?",
      "como": "Señalizar de inmediato, instalar cinta antideslizante y escalar la adecuación estructural."
    }
  },
  {
    "id": "EN-07",
    "bloque": "EN",
    "bloque_nombre": "Entorno seguro y riesgo de caídas",
    "tipo": "transversal",
    "item": "El baño de usuarios tiene barras de apoyo, piso antideslizante y medio de llamado.",
    "referencia": "Práctica segura: prevención de caídas · Res. 3100/2019, infraestructura y dotación · NTC 4140 y 4143 (accesibilidad)",
    "fuente": "Inspección del baño de usuarios",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador administrativo de la sede",
      "que": "Dotar el baño de usuarios con barras de apoyo, superficie antideslizante y medio de llamado.",
      "porque": "¿Dotación nunca instalada, o elementos deteriorados sin reposición?",
      "como": "Instalar los elementos faltantes y verificar su funcionamiento en cada ronda."
    }
  },
  {
    "id": "EN-08",
    "bloque": "EN",
    "bloque_nombre": "Entorno seguro y riesgo de caídas",
    "tipo": "transversal",
    "item": "La iluminación es suficiente en consultorios, pasillos, escaleras y baños; no hay luminarias fundidas.",
    "referencia": "Práctica segura: prevención de caídas · Res. 3100/2019, infraestructura y dotación · NTC 4140 y 4143 (accesibilidad)",
    "fuente": "Recorrido de la sede",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador administrativo de la sede",
      "que": "Reponer las luminarias fundidas y corregir los puntos con iluminación insuficiente.",
      "porque": "¿Reporte de fallas no radicado, o mantenimiento sin respuesta?",
      "como": "Inventariar los puntos, radicar a mantenimiento y verificar el cierre."
    }
  },
  {
    "id": "EN-09",
    "bloque": "EN",
    "bloque_nombre": "Entorno seguro y riesgo de caídas",
    "tipo": "transversal",
    "item": "El usuario que recibió sedación o anestesia local es observado y valorado antes de autorizar su salida.",
    "referencia": "Práctica segura: prevención de caídas · Res. 3100/2019, infraestructura y dotación · NTC 4140 y 4143 (accesibilidad)",
    "fuente": "Historia clínica y observación del área de espera",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador administrativo de la sede",
      "que": "Implementar la observación y valoración documentada antes de autorizar la salida.",
      "porque": "¿No hay criterios ni tiempo mínimo definidos, o la salida se autoriza por presión de agenda?",
      "como": "Definir criterios y tiempo mínimo de observación, habilitar el espacio y auditar 10 historias."
    }
  },
  {
    "id": "EN-10",
    "bloque": "EN",
    "bloque_nombre": "Entorno seguro y riesgo de caídas",
    "tipo": "transversal",
    "item": "La sede tiene accesibilidad para personas con movilidad reducida: acceso, ancho de puertas y baño accesible.",
    "referencia": "Práctica segura: prevención de caídas · Res. 3100/2019, infraestructura y dotación · NTC 4140 y 4143 (accesibilidad)",
    "fuente": "Recorrido con criterio de accesibilidad",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador administrativo de la sede",
      "que": "Corregir las barreras de accesibilidad identificadas o escalarlas al plan de inversión.",
      "porque": "¿Barreras arquitectónicas preexistentes, o adecuación nunca presupuestada?",
      "como": "Documentar las barreras, corregir lo posible e incluir el resto en el plan de inversión."
    }
  },
  {
    "id": "HC-01",
    "bloque": "HC",
    "bloque_nombre": "Historia clínica, consentimiento y comunicación",
    "tipo": "transversal",
    "item": "La historia clínica se diligencia durante la consulta, no al cierre de la jornada, y queda identificado el profesional responsable.",
    "referencia": "Res. 1995/1999 · Ley 23/1981 y Res. 3100/2019, historia clínica y registros",
    "fuente": "Auditoría de 10 historias del día y observación",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Instaurar el registro en tiempo real de la historia clínica durante la atención.",
      "porque": "¿Tiempo de consulta insuficiente, fallas del sistema, o costumbre de registrar al final de la jornada?",
      "como": "Retroalimentar individualmente, revisar los tiempos de agenda y reauditar en 30 días."
    }
  },
  {
    "id": "HC-02",
    "bloque": "HC",
    "bloque_nombre": "Historia clínica, consentimiento y comunicación",
    "tipo": "transversal",
    "item": "El registro incluye motivo de consulta, examen físico, análisis, plan y la educación entregada al usuario.",
    "referencia": "Res. 1995/1999 · Ley 23/1981 y Res. 3100/2019, historia clínica y registros",
    "fuente": "Auditoría de 10 historias",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de seguridad del paciente",
      "que": "Completar el contenido mínimo del registro clínico.",
      "porque": "¿Uso de plantillas que no reflejan la atención, o desconocimiento de los requisitos?",
      "como": "Revisar las plantillas del sistema, socializar los requisitos y reauditar."
    }
  },
  {
    "id": "HC-03",
    "bloque": "HC",
    "bloque_nombre": "Historia clínica, consentimiento y comunicación",
    "tipo": "transversal",
    "item": "El consentimiento informado es específico del procedimiento, está firmado antes de realizarlo y explica riesgos y alternativas.",
    "referencia": "Res. 1995/1999 · Ley 23/1981 y Res. 3100/2019, historia clínica y registros",
    "fuente": "Auditoría de 10 historias con procedimiento",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Garantizar consentimientos específicos, previos y con explicación de riesgos y alternativas.",
      "porque": "¿Formato genérico único, o firma obtenida sin explicación previa?",
      "como": "Revisar los formatos por procedimiento, capacitar sobre el proceso y auditar 10 historias."
    }
  },
  {
    "id": "HC-04",
    "bloque": "HC",
    "bloque_nombre": "Historia clínica, consentimiento y comunicación",
    "tipo": "transversal",
    "item": "Al entregar órdenes y fórmulas se explican los signos de alarma y se verifica que el usuario entendió.",
    "referencia": "Res. 1995/1999 · Ley 23/1981 y Res. 3100/2019, historia clínica y registros",
    "fuente": "Observación y entrevista a 3 usuarios a la salida",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Implementar la verificación de comprensión mediante repetición por el usuario.",
      "porque": "¿Tiempo de consulta insuficiente, o ausencia de material educativo escrito?",
      "como": "Adoptar la técnica de repetición, disponer material escrito y verificar por entrevista al usuario."
    }
  },
  {
    "id": "HC-05",
    "bloque": "HC",
    "bloque_nombre": "Historia clínica, consentimiento y comunicación",
    "tipo": "transversal",
    "item": "Hay seguimiento a resultados pendientes de entrega y a usuarios que no asistieron a control.",
    "referencia": "Res. 1995/1999 · Ley 23/1981 y Res. 3100/2019, historia clínica y registros",
    "fuente": "Registro de pendientes e inasistentes",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Implementar el seguimiento de resultados pendientes y de inasistentes a control.",
      "porque": "¿No hay responsable asignado, o el sistema no genera el reporte de pendientes?",
      "como": "Definir responsable y periodicidad, generar el reporte y registrar la gestión de contacto."
    }
  },
  {
    "id": "HC-06",
    "bloque": "HC",
    "bloque_nombre": "Historia clínica, consentimiento y comunicación",
    "tipo": "transversal",
    "item": "La comunicación de un resultado crítico o alterado al médico tratante queda registrada con fecha, hora y quién lo recibió.",
    "referencia": "Res. 1995/1999 · Ley 23/1981 y Res. 3100/2019, historia clínica y registros",
    "fuente": "Registro de reporte de resultados críticos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Implementar el registro de comunicación de resultados críticos con confirmación de recepción.",
      "porque": "¿Listado de valores críticos no definido, o comunicación realizada sin registro?",
      "como": "Definir el listado y el canal, y exigir registro de a quién, cuándo y confirmación."
    }
  },
  {
    "id": "HC-07",
    "bloque": "HC",
    "bloque_nombre": "Historia clínica, consentimiento y comunicación",
    "tipo": "transversal",
    "item": "Los consultorios garantizan privacidad visual y auditiva; historias y pantallas no quedan expuestas a terceros.",
    "referencia": "Res. 1995/1999 · Ley 23/1981 y Res. 3100/2019, historia clínica y registros",
    "fuente": "Recorrido y observación durante la atención",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de seguridad del paciente",
      "que": "Corregir las condiciones de privacidad y el manejo confidencial de la información.",
      "porque": "¿Puerta que permanece abierta, pantallas orientadas al público, o historias sobre el mesón?",
      "como": "Ajustar la disposición del consultorio, orientar pantallas y socializar el deber de confidencialidad."
    }
  },
  {
    "id": "HC-08",
    "bloque": "HC",
    "bloque_nombre": "Historia clínica, consentimiento y comunicación",
    "tipo": "transversal",
    "item": "El usuario remitido a otro nivel cuenta con la remisión documentada y con instrucciones claras de qué hacer.",
    "referencia": "Res. 1995/1999 · Ley 23/1981 y Res. 3100/2019, historia clínica y registros",
    "fuente": "Auditoría de historias con remisión",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de seguridad del paciente",
      "que": "Documentar la remisión y la instrucción entregada al usuario.",
      "porque": "¿Formato de remisión incompleto, o instrucciones entregadas solo verbalmente?",
      "como": "Ajustar el formato, entregar instrucción escrita y auditar 10 remisiones."
    }
  },
  {
    "id": "EA-01",
    "bloque": "EA",
    "bloque_nombre": "Evento adverso y mejora continua",
    "tipo": "transversal",
    "item": "El personal sabe qué es un incidente y qué es un evento adverso, y dónde se reportan en esta sede.",
    "referencia": "Política Nacional de Seguridad del Paciente · Guía Técnica BPSP · Protocolo de Londres",
    "fuente": "Entrevista a mínimo 3 personas de distinto cargo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Socializar la definición y el canal de reporte de incidentes y eventos adversos en la sede.",
      "porque": "¿Canal no socializado en la sede, o personal nuevo sin inducción en el tema?",
      "como": "Socializar el procedimiento, publicar el canal en cartelera y verificar por entrevista."
    }
  },
  {
    "id": "EA-02",
    "bloque": "EA",
    "bloque_nombre": "Evento adverso y mejora continua",
    "tipo": "transversal",
    "item": "El personal percibe el reporte como no punitivo y puede mencionar un reporte reciente de la sede.",
    "referencia": "Política Nacional de Seguridad del Paciente · Guía Técnica BPSP · Protocolo de Londres",
    "fuente": "Entrevista a mínimo 3 personas",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Reforzar el carácter no punitivo del reporte con evidencia de aprendizaje visible.",
      "porque": "¿Temor a la sanción, o experiencia previa de reporte sin retroalimentación?",
      "como": "Retroalimentar públicamente los aprendizajes de reportes previos y medir la tasa de reporte de la sede."
    }
  },
  {
    "id": "EA-03",
    "bloque": "EA",
    "bloque_nombre": "Evento adverso y mejora continua",
    "tipo": "transversal",
    "item": "Los eventos de la sede están reportados, analizados y con plan de mejoramiento vigente.",
    "referencia": "Política Nacional de Seguridad del Paciente · Guía Técnica BPSP · Protocolo de Londres",
    "fuente": "Base de eventos y actas de análisis",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Completar el reporte, el análisis y el plan de mejoramiento de los eventos de la sede.",
      "porque": "¿Análisis no realizado por falta de tiempo, o eventos no reportados?",
      "como": "Programar las sesiones de análisis y llevar los casos al Comité de Seguridad del Paciente."
    }
  },
  {
    "id": "EA-04",
    "bloque": "EA",
    "bloque_nombre": "Evento adverso y mejora continua",
    "tipo": "transversal",
    "item": "Los planes derivados de rondas anteriores tienen evidencia de avance verificable.",
    "referencia": "Política Nacional de Seguridad del Paciente · Guía Técnica BPSP · Protocolo de Londres",
    "fuente": "Plan de mejoramiento institucional y evidencias",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Reactivar el seguimiento a los planes de rondas anteriores con evidencia de avance.",
      "porque": "¿Responsables no designados, plazos no definidos, o acciones sin recursos para ejecutarse?",
      "como": "Revisar cada acción vencida, reasignar responsable y plazo, y hacer seguimiento mensual."
    }
  },
  {
    "id": "EA-05",
    "bloque": "EA",
    "bloque_nombre": "Evento adverso y mejora continua",
    "tipo": "transversal",
    "item": "Los indicadores de seguridad de la sede están publicados y el personal los conoce.",
    "referencia": "Política Nacional de Seguridad del Paciente · Guía Técnica BPSP · Protocolo de Londres",
    "fuente": "Cartelera y entrevista a mínimo 3 personas",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de seguridad del paciente",
      "que": "Publicar y socializar los indicadores de seguridad de la sede.",
      "porque": "¿La medición no llega a la sede, o el dato se produce sin analizarse con el equipo?",
      "como": "Definir un tablero visible con actualización mensual y analizar el resultado con el equipo."
    }
  },
  {
    "id": "EA-06",
    "bloque": "EA",
    "bloque_nombre": "Evento adverso y mejora continua",
    "tipo": "transversal",
    "item": "Se informa y documenta al usuario y su familia cuando ocurre un evento adverso.",
    "referencia": "Política Nacional de Seguridad del Paciente · Guía Técnica BPSP · Protocolo de Londres",
    "fuente": "Historia clínica y acta de información",
    "nota": "Marcar NA si no se presentaron eventos en el periodo.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Implementar la información documentada al usuario frente al evento adverso.",
      "porque": "¿Ausencia de procedimiento de comunicación, o temor a la implicación legal?",
      "como": "Adoptar el procedimiento de comunicación honesta, entrenar a los líderes y dejar acta."
    }
  },
  {
    "id": "TH-01",
    "bloque": "TH",
    "bloque_nombre": "Talento humano, infraestructura y emergencias",
    "tipo": "transversal",
    "item": "El personal de la sede cumple perfil y suficiencia para los servicios habilitados.",
    "referencia": "Res. 3100/2019, talento humano e infraestructura · Res. 0312/2019 (SG-SST)",
    "fuente": "Programación del día y verificación de perfiles",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Talento humano / coordinador de la sede",
      "que": "Ajustar el talento humano de la sede al perfil y la suficiencia exigidos.",
      "porque": "¿Vacantes sin cubrir, ausentismo no reemplazado, o dimensionamiento desactualizado?",
      "como": "Cuantificar la brecha frente al estándar y presentar la necesidad a talento humano y a la dirección."
    }
  },
  {
    "id": "TH-02",
    "bloque": "TH",
    "bloque_nombre": "Talento humano, infraestructura y emergencias",
    "tipo": "transversal",
    "item": "Los profesionales de la sede tienen inscripción vigente en el ReTHUS.",
    "referencia": "Res. 3100/2019, talento humano e infraestructura · Res. 0312/2019 (SG-SST)",
    "fuente": "Consulta ReTHUS del personal en turno",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Talento humano / coordinador de la sede",
      "que": "Verificar y regularizar la inscripción en ReTHUS del personal de la sede.",
      "porque": "¿Verificación no realizada en la contratación, o inscripciones vencidas sin seguimiento?",
      "como": "Cruzar el listado del personal contra ReTHUS y establecer la verificación previa a la contratación."
    }
  },
  {
    "id": "TH-03",
    "bloque": "TH",
    "bloque_nombre": "Talento humano, infraestructura y emergencias",
    "tipo": "transversal",
    "item": "El personal nuevo recibió inducción en seguridad del paciente antes de iniciar labores.",
    "referencia": "Res. 3100/2019, talento humano e infraestructura · Res. 0312/2019 (SG-SST)",
    "fuente": "Registros de inducción del personal ingresado",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Talento humano / coordinador de la sede",
      "que": "Garantizar la inducción en seguridad del paciente previa al inicio de labores.",
      "porque": "¿Ingreso sin inducción por urgencia de cubrir el turno, o inducción no programada para la sede?",
      "como": "Condicionar el inicio de labores a la inducción y verificar cobertura persona por persona."
    }
  },
  {
    "id": "TH-04",
    "bloque": "TH",
    "bloque_nombre": "Talento humano, infraestructura y emergencias",
    "tipo": "transversal",
    "item": "La sede cuenta con la infraestructura y dotación exigidas para los servicios que presta, sin obras que interfieran la atención.",
    "referencia": "Res. 3100/2019, talento humano e infraestructura · Res. 0312/2019 (SG-SST)",
    "fuente": "Recorrido de la sede",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Talento humano / coordinador de la sede",
      "que": "Corregir las condiciones de infraestructura y dotación identificadas en el recorrido.",
      "porque": "¿Solicitudes de mantenimiento sin respuesta, o condición no detectada antes?",
      "como": "Radicar las novedades con priorización e incluirlas en el plan de inversión."
    }
  },
  {
    "id": "TH-05",
    "bloque": "TH",
    "bloque_nombre": "Talento humano, infraestructura y emergencias",
    "tipo": "transversal",
    "item": "Extintores vigentes y señalizados, rutas de evacuación visibles, salidas despejadas y punto de encuentro definido.",
    "referencia": "Res. 3100/2019, talento humano e infraestructura · Res. 0312/2019 (SG-SST)",
    "fuente": "Inspección de extintores y señalización",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Talento humano / coordinador de la sede",
      "que": "Regularizar extintores, señalización de evacuación y punto de encuentro de la sede.",
      "porque": "¿Recarga de extintores vencida, señalización ausente, o plan de emergencias no socializado?",
      "como": "Gestionar la recarga, instalar la señalización y socializar el plan de emergencias con simulacro."
    }
  },
  {
    "id": "CE-01",
    "bloque": "CE",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "El usuario es atendido dentro del horario asignado o se le informa la demora; la oportunidad se mide.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas)",
    "fuente": "Observación de la sala e indicador de oportunidad",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de consulta externa",
      "que": "Medir y gestionar la oportunidad de la consulta e informar las demoras al usuario.",
      "porque": "¿Agenda insuficiente frente a la demanda, o ausencia de comunicación de la demora?",
      "como": "Analizar la oportunidad por especialidad, ajustar la agenda y definir quién informa las demoras."
    }
  },
  {
    "id": "CE-02",
    "bloque": "CE",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "El consultorio tiene lavamanos o alcohol glicerinado al alcance del profesional sin salir del espacio.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas)",
    "fuente": "Verificación de cada consultorio",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de consulta externa",
      "que": "Dotar cada consultorio con alcohol glicerinado al alcance del profesional.",
      "porque": "¿Dispensadores insuficientes, o instalados fuera del alcance del sitio de atención?",
      "como": "Instalar y reubicar dispensadores según el flujo de trabajo y verificar en cada ronda."
    }
  },
  {
    "id": "CE-03",
    "bloque": "CE",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Tensiómetro, báscula, tallímetro, fonendoscopio y otoscopio están funcionales y con calibración vigente.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas)",
    "fuente": "Verificación física y sticker de calibración",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de consulta externa",
      "que": "Regularizar la calibración y funcionalidad de los equipos del consultorio.",
      "porque": "¿Cronograma de calibración vencido, o daños no reportados a mantenimiento?",
      "como": "Inventariar los equipos, solicitar cronograma de calibración y verificar stickers."
    }
  },
  {
    "id": "CE-04",
    "bloque": "CE",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "La camilla tiene papel desechable que se cambia entre usuarios y escalerilla estable.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas)",
    "fuente": "Observación entre dos atenciones",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de consulta externa",
      "que": "Garantizar el cambio de papel de camilla entre usuarios y la estabilidad de la escalerilla.",
      "porque": "¿Desabastecimiento del papel, o cambio omitido por el ritmo de la agenda?",
      "como": "Asegurar el insumo, socializar la regla y verificar por observación."
    }
  },
  {
    "id": "CE-05",
    "bloque": "CE",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Los procedimientos menores en consulta cuentan con consentimiento, campo estéril e insumos vigentes.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas)",
    "fuente": "Auditoría de historias y observación",
    "nota": "Marcar NA si no se realizan procedimientos menores.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de consulta externa",
      "que": "Garantizar consentimiento, asepsia e insumos vigentes en los procedimientos menores.",
      "porque": "¿Consentimiento no exigido para procedimientos menores, o insumos de asepsia insuficientes?",
      "como": "Definir qué procedimientos requieren consentimiento, verificar insumos y auditar 10 historias."
    }
  },
  {
    "id": "CE-06",
    "bloque": "CE",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "El usuario recibe explicación de su diagnóstico y tratamiento en lenguaje comprensible.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas)",
    "fuente": "Entrevista a 3 usuarios a la salida",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de consulta externa",
      "que": "Fortalecer la explicación en lenguaje comprensible y su verificación con el usuario.",
      "porque": "¿Tiempo de consulta insuficiente, o uso de lenguaje técnico sin verificar comprensión?",
      "como": "Adoptar la técnica de repetición y verificar por entrevista al usuario en cada ronda."
    }
  },
  {
    "id": "CE-07",
    "bloque": "CE",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Los residuos generados en el consultorio se segregan en el punto de generación, con recipientes completos.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas)",
    "fuente": "Inspección de cada consultorio",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de consulta externa",
      "que": "Completar los recipientes de segregación en cada consultorio.",
      "porque": "¿Puntos ecológicos incompletos en consultorios, o segregación realizada en el pasillo?",
      "como": "Dotar cada consultorio con los recipientes exigidos y capacitar al personal."
    }
  },
  {
    "id": "CE-08",
    "bloque": "CE",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "La sala de espera tiene capacidad, ventilación y asientos suficientes para la agenda del día.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas)",
    "fuente": "Observación en hora de mayor afluencia",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de consulta externa",
      "que": "Ajustar la capacidad de la sala de espera o la distribución de la agenda.",
      "porque": "¿Agenda concentrada en franjas, o capacidad de la sala inferior a la demanda?",
      "como": "Redistribuir la agenda por franjas y evaluar la ampliación o ventilación de la sala."
    }
  },
  {
    "id": "OD-01",
    "bloque": "OD",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "El instrumental crítico se esteriliza; no se sustituye la esterilización por desinfección química.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 482/2018 (protección radiológica)",
    "fuente": "Observación del proceso y registros",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Odontólogo líder de la sede",
      "que": "Garantizar la esterilización de todo el instrumental crítico odontológico.",
      "porque": "¿Instrumental insuficiente para la rotación, o autoclave con capacidad o disponibilidad limitada?",
      "como": "Cuantificar el instrumental necesario, ajustar la programación del autoclave y verificar registros."
    }
  },
  {
    "id": "OD-02",
    "bloque": "OD",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "Las piezas de mano se esterilizan entre usuarios; no se limita a desinfección externa.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 482/2018 (protección radiológica)",
    "fuente": "Entrevista y registros de esterilización",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Odontólogo líder de la sede",
      "que": "Instaurar la esterilización de piezas de mano entre usuarios.",
      "porque": "¿Número insuficiente de piezas de mano para la rotación, o desconocimiento del requisito?",
      "como": "Adquirir las piezas necesarias para la rotación y ajustar el proceso de esterilización."
    }
  },
  {
    "id": "OD-03",
    "bloque": "OD",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "La unidad odontológica, la escupidera y las mangueras se desinfectan entre usuarios y hay registro.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 482/2018 (protección radiológica)",
    "fuente": "Observación entre dos atenciones y planilla",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Odontólogo líder de la sede",
      "que": "Restablecer la desinfección registrada de la unidad odontológica entre usuarios.",
      "porque": "¿Tiempo entre citas insuficiente, desinfectante no disponible, o planilla no diligenciada?",
      "como": "Ajustar la agenda, asegurar el insumo y auditar la planilla semanalmente."
    }
  },
  {
    "id": "OD-04",
    "bloque": "OD",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "Se usan barreras desechables en jeringa triple, lámpara, cabecera y controles, y se cambian entre usuarios.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 482/2018 (protección radiológica)",
    "fuente": "Observación entre dos atenciones",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Odontólogo líder de la sede",
      "que": "Implementar el uso y cambio de barreras desechables entre usuarios.",
      "porque": "¿Desabastecimiento de barreras, o práctica no instaurada por costo?",
      "como": "Asegurar el suministro, socializar el protocolo y verificar por observación."
    }
  },
  {
    "id": "OD-05",
    "bloque": "OD",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "El operador y el auxiliar usan mascarilla, protección ocular y guantes durante todo el procedimiento.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 482/2018 (protección radiológica)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Odontólogo líder de la sede",
      "que": "Garantizar el uso completo de barreras por operador y auxiliar durante el procedimiento.",
      "porque": "¿EPP no disponible, o incomodidad que lleva a omitir la protección ocular?",
      "como": "Asegurar la dotación, capacitar en el riesgo por aerosoles y verificar por observación."
    }
  },
  {
    "id": "OD-06",
    "bloque": "OD",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "Los cartuchos de anestésico están vigentes, en su empaque original y no se reutilizan.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 482/2018 (protección radiológica)",
    "fuente": "Inspección del stand y observación",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Odontólogo líder de la sede",
      "que": "Depurar los anestésicos y eliminar toda reutilización de cartuchos.",
      "porque": "¿Revisión de vencimientos sin responsable, o reutilización por costo?",
      "como": "Asignar responsable de revisión, socializar la prohibición y verificar en cada ronda."
    }
  },
  {
    "id": "OD-07",
    "bloque": "OD",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "La amalgama y sus residuos se segregan en recipiente específico y hay contrato con gestor autorizado.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 482/2018 (protección radiológica)",
    "fuente": "Inspección y contrato del gestor",
    "nota": "Marcar NA si no se usa amalgama.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Odontólogo líder de la sede",
      "que": "Implementar la segregación específica de amalgama con gestor autorizado.",
      "porque": "¿Recipiente específico ausente, o gestor sin contrato para este residuo?",
      "como": "Disponer el recipiente, verificar el contrato del gestor y capacitar en la segregación."
    }
  },
  {
    "id": "OD-08",
    "bloque": "OD",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "Se verifica con el usuario la pieza y el sitio a intervenir antes de iniciar el procedimiento.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 482/2018 (protección radiológica)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Odontólogo líder de la sede",
      "que": "Implementar la verificación del sitio y la pieza con el usuario antes de iniciar.",
      "porque": "¿Verificación no definida como paso obligatorio, o confianza en la orden sin confirmar?",
      "como": "Definir el paso previo, socializarlo y verificar por observación."
    }
  },
  {
    "id": "OD-09",
    "bloque": "OD",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "La historia clínica odontológica tiene odontograma, plan de tratamiento y consentimiento firmado.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 482/2018 (protección radiológica)",
    "fuente": "Auditoría de 10 historias",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Odontólogo líder de la sede",
      "que": "Completar el contenido de la historia clínica odontológica.",
      "porque": "¿Formato incompleto, o registro apresurado por la agenda?",
      "como": "Ajustar el formato, socializar los requisitos y auditar 10 historias."
    }
  },
  {
    "id": "OD-10",
    "bloque": "OD",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "El equipo de rayos X periapical tiene licencia vigente, delantal plomado en buen estado y dosimetría del operador.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 482/2018 (protección radiológica)",
    "fuente": "Licencia, inspección del delantal y registro de dosimetría",
    "nota": "Marcar NA si no hay equipo de rayos X.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Odontólogo líder de la sede",
      "que": "Regularizar licencia, protección plomada y dosimetría del equipo de rayos X.",
      "porque": "¿Licencia vencida, delantal deteriorado, o dosimetría sin lectura periódica?",
      "como": "Gestionar la renovación de la licencia, reponer el delantal y regularizar la dosimetría."
    }
  },
  {
    "id": "LC-01",
    "bloque": "LC",
    "bloque_nombre": "Laboratorio clínico y toma de muestras",
    "tipo": "servicio",
    "item": "El área de toma tiene silla con apoyabrazos y respaldo, y hay camilla disponible ante lipotimia.",
    "referencia": "Res. 3100/2019, laboratorio clínico y toma de muestras · Guía de flebotomía OMS",
    "fuente": "Inspección del área de toma",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Bacteriólogo líder de la sede",
      "que": "Dotar el área de toma con silla adecuada y camilla disponible para lipotimia.",
      "porque": "¿Mobiliario nunca dotado, o camilla ubicada fuera del alcance del área?",
      "como": "Dotar la silla adecuada y ubicar la camilla accesible desde el punto de toma."
    }
  },
  {
    "id": "LC-02",
    "bloque": "LC",
    "bloque_nombre": "Laboratorio clínico y toma de muestras",
    "tipo": "servicio",
    "item": "Se verifica la identidad del usuario y su correspondencia con la orden antes de puncionar.",
    "referencia": "Res. 3100/2019, laboratorio clínico y toma de muestras · Guía de flebotomía OMS",
    "fuente": "Observación de 10 tomas",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Bacteriólogo líder de la sede",
      "que": "Implementar la verificación de identidad y de correspondencia con la orden antes de puncionar.",
      "porque": "¿Verificación no definida como paso obligatorio, o alto volumen en la jornada?",
      "como": "Definir el paso previo, capacitar al flebotomista y observar 20 tomas."
    }
  },
  {
    "id": "LC-03",
    "bloque": "LC",
    "bloque_nombre": "Laboratorio clínico y toma de muestras",
    "tipo": "servicio",
    "item": "Los tubos se rotulan delante del usuario, inmediatamente después de la toma.",
    "referencia": "Res. 3100/2019, laboratorio clínico y toma de muestras · Guía de flebotomía OMS",
    "fuente": "Observación de 10 tomas",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Bacteriólogo líder de la sede",
      "que": "Rotular los tubos en presencia del usuario inmediatamente después de la toma.",
      "porque": "¿Rotulado diferido por volumen, o material de rotulado ausente en el punto?",
      "como": "Ubicar el material en el punto de toma y observar 10 tomas con retroalimentación."
    }
  },
  {
    "id": "LC-04",
    "bloque": "LC",
    "bloque_nombre": "Laboratorio clínico y toma de muestras",
    "tipo": "servicio",
    "item": "El torniquete es desechable o se desinfecta entre usuarios; no se reutiliza sin desinfección.",
    "referencia": "Res. 3100/2019, laboratorio clínico y toma de muestras · Guía de flebotomía OMS",
    "fuente": "Observación directa y entrevista",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Bacteriólogo líder de la sede",
      "que": "Instaurar el torniquete desechable o su desinfección documentada entre usuarios.",
      "porque": "¿Desabastecimiento de torniquetes desechables, o desconocimiento del riesgo de contaminación?",
      "como": "Evaluar el paso a torniquete desechable o definir el protocolo de desinfección con registro."
    }
  },
  {
    "id": "LC-05",
    "bloque": "LC",
    "bloque_nombre": "Laboratorio clínico y toma de muestras",
    "tipo": "servicio",
    "item": "El guardián está al alcance del brazo del flebotomista y no se reencapsulan agujas.",
    "referencia": "Res. 3100/2019, laboratorio clínico y toma de muestras · Guía de flebotomía OMS",
    "fuente": "Observación de 10 tomas",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Bacteriólogo líder de la sede",
      "que": "Reubicar el guardián al alcance del brazo y eliminar el reencapsulado.",
      "porque": "¿Guardián ubicado lejos del punto de punción, o costumbre no corregida?",
      "como": "Reubicar el guardián, reentrenar y observar 10 tomas."
    }
  },
  {
    "id": "LC-06",
    "bloque": "LC",
    "bloque_nombre": "Laboratorio clínico y toma de muestras",
    "tipo": "servicio",
    "item": "Los criterios de rechazo de muestra están definidos y cada rechazo se registra con su causa.",
    "referencia": "Res. 3100/2019, laboratorio clínico y toma de muestras · Guía de flebotomía OMS",
    "fuente": "Documento de criterios y registro de rechazos",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Bacteriólogo líder de la sede",
      "que": "Documentar los criterios de rechazo y registrar cada rechazo con su causa.",
      "porque": "¿Criterios no socializados con quien toma la muestra, o registro de rechazos inexistente?",
      "como": "Socializar los criterios, registrar cada rechazo y retroalimentar mensualmente."
    }
  },
  {
    "id": "LC-07",
    "bloque": "LC",
    "bloque_nombre": "Laboratorio clínico y toma de muestras",
    "tipo": "servicio",
    "item": "Los valores críticos se reportan de inmediato, con registro de a quién, cuándo y confirmación de recepción.",
    "referencia": "Res. 3100/2019, laboratorio clínico y toma de muestras · Guía de flebotomía OMS",
    "fuente": "Libro o registro de valores críticos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Bacteriólogo líder de la sede",
      "que": "Implementar el reporte registrado de valores críticos con confirmación de recepción.",
      "porque": "¿Listado de valores críticos desactualizado, o canal de comunicación no definido?",
      "como": "Actualizar el listado, definir el canal y exigir el registro con hora y confirmación."
    }
  },
  {
    "id": "LC-08",
    "bloque": "LC",
    "bloque_nombre": "Laboratorio clínico y toma de muestras",
    "tipo": "servicio",
    "item": "El control de calidad interno se ejecuta y registra; hay participación en control externo.",
    "referencia": "Res. 3100/2019, laboratorio clínico y toma de muestras · Guía de flebotomía OMS",
    "fuente": "Registros de control de calidad",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Bacteriólogo líder de la sede",
      "que": "Restablecer el control de calidad interno y la participación en control externo.",
      "porque": "¿Material de control no disponible, o resultados fuera de rango sin acción correctiva?",
      "como": "Asegurar el material, cumplir la periodicidad y documentar la acción ante cada desviación."
    }
  },
  {
    "id": "LC-09",
    "bloque": "LC",
    "bloque_nombre": "Laboratorio clínico y toma de muestras",
    "tipo": "servicio",
    "item": "Los equipos tienen mantenimiento y calibración vigentes, y los reactivos, trazabilidad de lote y vencimiento.",
    "referencia": "Res. 3100/2019, laboratorio clínico y toma de muestras · Guía de flebotomía OMS",
    "fuente": "Hojas de vida y kardex de reactivos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Bacteriólogo líder de la sede",
      "que": "Actualizar mantenimiento, calibración y trazabilidad de equipos y reactivos.",
      "porque": "¿Cronograma vencido, o kardex de reactivos no diligenciado?",
      "como": "Solicitar cronograma a ingeniería biomédica y restablecer el kardex por lote."
    }
  },
  {
    "id": "LC-10",
    "bloque": "LC",
    "bloque_nombre": "Laboratorio clínico y toma de muestras",
    "tipo": "servicio",
    "item": "Hay ducha o lavaojos funcional y kit de derrames completo en el área.",
    "referencia": "Res. 3100/2019, laboratorio clínico y toma de muestras · Guía de flebotomía OMS",
    "fuente": "Accionar el lavaojos e inspeccionar el kit",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Bacteriólogo líder de la sede",
      "que": "Habilitar el lavaojos funcional y completar el kit de derrames del área.",
      "porque": "¿Lavaojos sin mantenimiento, o kit incompleto sin responsable de reposición?",
      "como": "Gestionar el mantenimiento, completar el kit y capacitar en el manejo de derrames."
    }
  },
  {
    "id": "ES-01",
    "bloque": "ES",
    "bloque_nombre": "Esterilización",
    "tipo": "servicio",
    "item": "Hay separación de flujo entre zona sucia, limpia y de almacenamiento de estéril, sin cruces de material.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Recorrido del área",
    "nota": "En sede ambulatoria puede ser separación funcional y no física; verificar que no haya cruce.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de esterilización de la sede",
      "que": "Establecer el flujo unidireccional sucio–limpio–estéril, al menos de forma funcional.",
      "porque": "¿Limitación de planta física, o rutas no definidas ni señalizadas?",
      "como": "Definir y señalizar las rutas y horarios de flujo, y escalar la limitación estructural."
    }
  },
  {
    "id": "ES-02",
    "bloque": "ES",
    "bloque_nombre": "Esterilización",
    "tipo": "servicio",
    "item": "El instrumental se lava antes de esterilizar; no se esteriliza material con residuo orgánico visible.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Observación del proceso e inspección del material",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de esterilización de la sede",
      "que": "Garantizar el lavado previo del instrumental antes de la esterilización.",
      "porque": "¿Protocolo de lavado no definido, o personal sin entrenamiento?",
      "como": "Actualizar el protocolo, entrenar con verificación de destreza y auditar las planillas."
    }
  },
  {
    "id": "ES-03",
    "bloque": "ES",
    "bloque_nombre": "Esterilización",
    "tipo": "servicio",
    "item": "El personal usa guantes de caucho, delantal y protección ocular en la zona sucia.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de esterilización de la sede",
      "que": "Dotar y hacer cumplir el uso de EPP en la zona sucia.",
      "porque": "¿EPP no disponible, o desconocimiento del riesgo específico del área?",
      "como": "Reponer el EPP, capacitar en el riesgo del área y verificar por observación."
    }
  },
  {
    "id": "ES-04",
    "bloque": "ES",
    "bloque_nombre": "Esterilización",
    "tipo": "servicio",
    "item": "Cada ciclo tiene control químico interno y externo; el control biológico se realiza con la periodicidad definida y queda registro.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Registros de ciclos e indicadores",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de esterilización de la sede",
      "que": "Restablecer los controles químico y biológico de cada ciclo con su registro.",
      "porque": "¿Indicadores no disponibles, periodicidad del biológico incumplida, o resultado no conforme sin acción?",
      "como": "Asegurar el suministro de indicadores, cumplir la periodicidad y documentar la acción ante desviaciones."
    }
  },
  {
    "id": "ES-05",
    "bloque": "ES",
    "bloque_nombre": "Esterilización",
    "tipo": "servicio",
    "item": "El autoclave tiene mantenimiento, calibración y validación vigentes, con hoja de vida al día.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Hoja de vida y certificados",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de esterilización de la sede",
      "que": "Regularizar mantenimiento, calibración y validación del autoclave.",
      "porque": "¿Cronograma vencido, validación no realizada tras reparación, o contrato sin renovar?",
      "como": "Gestionar cronograma y validación con ingeniería biomédica y verificar la vigencia del contrato."
    }
  },
  {
    "id": "ES-06",
    "bloque": "ES",
    "bloque_nombre": "Esterilización",
    "tipo": "servicio",
    "item": "Los paquetes se almacenan en estantería cerrada o protegida, alejados de humedad, piso y fuentes de calor.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Inspección del almacenamiento",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de esterilización de la sede",
      "que": "Adecuar el almacenamiento de estéril: estantería protegida y alejada de humedad y calor.",
      "porque": "¿Estantería inadecuada, o área compartida con fuentes de humedad?",
      "como": "Adecuar la estantería, reubicar el almacenamiento y verificar en cada ronda."
    }
  },
  {
    "id": "ES-07",
    "bloque": "ES",
    "bloque_nombre": "Esterilización",
    "tipo": "servicio",
    "item": "No hay paquetes húmedos, rotos, con indicador no virado ni vencidos en el almacenamiento.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Inspección paquete por paquete",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de esterilización de la sede",
      "que": "Retirar los paquetes no conformes y establecer la verificación previa a la entrega.",
      "porque": "¿Falla del ciclo de secado, empaque inadecuado, o ausencia de verificación antes de entregar?",
      "como": "Revisar el ciclo con el proveedor, verificar cada paquete antes de entregar y registrar los retiros."
    }
  },
  {
    "id": "ES-08",
    "bloque": "ES",
    "bloque_nombre": "Esterilización",
    "tipo": "servicio",
    "item": "Existe registro que permite relacionar el lote esterilizado con el usuario en quien se utilizó.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Registro de trazabilidad e historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de esterilización de la sede",
      "que": "Implementar la trazabilidad del lote esterilizado hasta el usuario.",
      "porque": "¿Sistema de trazabilidad no implementado, o el lote no se traslada al registro clínico?",
      "como": "Definir el registro de lote por paquete, trasladarlo a la historia y auditar 10 procedimientos."
    }
  },
  {
    "id": "ES-09",
    "bloque": "ES",
    "bloque_nombre": "Esterilización",
    "tipo": "servicio",
    "item": "El empaque es apto para el método de esterilización y el sellado está íntegro.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Inspección de los paquetes",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de esterilización de la sede",
      "que": "Ajustar el tipo de empaque al método de esterilización y verificar la integridad del sellado.",
      "porque": "¿Empaque no apto por disponibilidad, o selladora sin mantenimiento?",
      "como": "Verificar la compatibilidad del empaque, gestionar el mantenimiento de la selladora y capacitar."
    }
  },
  {
    "id": "ES-10",
    "bloque": "ES",
    "bloque_nombre": "Esterilización",
    "tipo": "servicio",
    "item": "Hay procedimiento escrito de recall ante ciclo fallido y el personal sabe qué hacer.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Documento y entrevista",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de esterilización de la sede",
      "que": "Elaborar y socializar el procedimiento de recall ante ciclo fallido.",
      "porque": "¿El procedimiento no existe, o existe y no fue socializado con el personal?",
      "como": "Elaborar el procedimiento, socializarlo y verificar por entrevista en la siguiente ronda."
    }
  },
  {
    "id": "DM-01",
    "bloque": "DM",
    "bloque_nombre": "Dispensación de medicamentos",
    "tipo": "servicio",
    "item": "El área de dispensación está delimitada, ordenada y con acceso restringido a personal autorizado.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1403/2007",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Responsable de dispensación",
      "que": "Delimitar y restringir el acceso al área de dispensación.",
      "porque": "¿Limitación de espacio, o control de acceso no implementado?",
      "como": "Redistribuir y señalizar el área y definir el control de acceso."
    }
  },
  {
    "id": "DM-02",
    "bloque": "DM",
    "bloque_nombre": "Dispensación de medicamentos",
    "tipo": "servicio",
    "item": "Se controlan y registran temperatura y humedad del área de almacenamiento.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1403/2007",
    "fuente": "Termohigrómetro y planillas",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de dispensación",
      "que": "Restablecer el control y registro de temperatura y humedad del almacenamiento.",
      "porque": "¿Termohigrómetro ausente o descalibrado, o registro no diligenciado?",
      "como": "Instalar y calibrar el termohigrómetro, asignar responsable y documentar las desviaciones."
    }
  },
  {
    "id": "DM-03",
    "bloque": "DM",
    "bloque_nombre": "Dispensación de medicamentos",
    "tipo": "servicio",
    "item": "Se aplica rotación por fecha de vencimiento y hay control de próximos a vencer.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1403/2007",
    "fuente": "Kardex e inventario",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de dispensación",
      "que": "Restablecer la rotación por vencimiento y el control de próximos a vencer.",
      "porque": "¿Rotación no aplicada en la recepción, o ausencia de reporte de próximos a vencer?",
      "como": "Aplicar la rotación, generar reporte mensual y gestionar su uso o devolución."
    }
  },
  {
    "id": "DM-04",
    "bloque": "DM",
    "bloque_nombre": "Dispensación de medicamentos",
    "tipo": "servicio",
    "item": "La entrega al usuario incluye explicación de dosis, frecuencia, duración y conservación.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1403/2007",
    "fuente": "Observación de 5 entregas",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de dispensación",
      "que": "Instaurar la explicación completa al usuario en el momento de la entrega.",
      "porque": "¿Volumen de entregas que impide la explicación, o ausencia de guion definido?",
      "como": "Definir el contenido mínimo de la entrega y observar 10 dispensaciones."
    }
  },
  {
    "id": "DM-05",
    "bloque": "DM",
    "bloque_nombre": "Dispensación de medicamentos",
    "tipo": "servicio",
    "item": "Los medicamentos de control especial cumplen libro, actas, condiciones de seguridad y reporte al Fondo Nacional de Estupefacientes.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1403/2007",
    "fuente": "Libro de control especial y actas",
    "nota": "Marcar NA si la sede no maneja control especial.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de dispensación",
      "que": "Regularizar el manejo de medicamentos de control especial conforme a la normativa.",
      "porque": "¿Libro desactualizado, condiciones de seguridad insuficientes, o reportes no presentados?",
      "como": "Actualizar el libro, conciliar inventario, corregir la seguridad y regularizar los reportes."
    }
  },
  {
    "id": "DM-06",
    "bloque": "DM",
    "bloque_nombre": "Dispensación de medicamentos",
    "tipo": "servicio",
    "item": "Existe registro y gestión de faltantes, con alternativa informada al equipo asistencial.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1403/2007",
    "fuente": "Registro de faltantes y comunicaciones",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Responsable de dispensación",
      "que": "Formalizar el registro de faltantes y la comunicación de alternativas al equipo.",
      "porque": "¿Falla del proveedor, ausencia de stock de seguridad, o desabastecimiento no informado?",
      "como": "Registrar cada faltante con causa, definir alternativas y comunicar por canal formal."
    }
  },
  {
    "id": "DM-07",
    "bloque": "DM",
    "bloque_nombre": "Dispensación de medicamentos",
    "tipo": "servicio",
    "item": "Las devoluciones, bajas y destrucción de medicamentos están documentadas.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1403/2007",
    "fuente": "Actas de baja y devolución",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Responsable de dispensación",
      "que": "Documentar devoluciones, bajas y destrucción conforme al procedimiento.",
      "porque": "¿Procedimiento no definido, o disposición final sin gestor autorizado?",
      "como": "Adoptar el procedimiento, elaborar actas y verificar el contrato del gestor."
    }
  },
  {
    "id": "DM-08",
    "bloque": "DM",
    "bloque_nombre": "Dispensación de medicamentos",
    "tipo": "servicio",
    "item": "No hay medicamentos vencidos ni deteriorados en el área de dispensación.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1403/2007",
    "fuente": "Muestreo del inventario",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Responsable de dispensación",
      "que": "Retirar los medicamentos vencidos o deteriorados y reforzar el control de inventario.",
      "porque": "¿Revisión sin responsable, o rotación por vencimiento no aplicada?",
      "como": "Depurar el inventario, asignar responsable de revisión y verificar mensualmente."
    }
  },
  {
    "id": "IM-01",
    "bloque": "IM",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se verifica identidad del usuario, correspondencia con el estudio solicitado y lateralidad antes de iniciar.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018",
    "fuente": "Observación de 10 estudios",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes",
      "que": "Implementar la verificación de identidad, estudio y lateralidad antes de cada procedimiento.",
      "porque": "¿Verificación no definida como paso obligatorio, u orden médica sin lateralidad?",
      "como": "Definir el paso previo, exigir lateralidad en la orden y auditar 20 estudios."
    }
  },
  {
    "id": "IM-02",
    "bloque": "IM",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se aplica y registra la verificación de embarazo en mujeres en edad fértil antes de estudios con radiación.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018",
    "fuente": "Formato de verificación",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes",
      "que": "Implementar la verificación registrada de embarazo previa a estudios con radiación.",
      "porque": "¿Formato inexistente, o pregunta realizada sin dejar registro?",
      "como": "Adoptar el formato, capacitar al personal y auditar 20 estudios."
    }
  },
  {
    "id": "IM-03",
    "bloque": "IM",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se cumple la protección radiológica: delantales plomados en buen estado, señalización, dosimetría y licencia vigente.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018",
    "fuente": "Inspección y licencia de la práctica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes",
      "que": "Corregir las condiciones de protección radiológica y regularizar la licencia.",
      "porque": "¿Elementos plomados deteriorados, dosimetría sin lectura, o licencia vencida?",
      "como": "Reponer elementos plomados, regularizar la dosimetría y gestionar la licencia."
    }
  },
  {
    "id": "IM-04",
    "bloque": "IM",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "El consentimiento para medio de contraste está firmado y se indagó alergia y función renal.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018",
    "fuente": "Auditoría de estudios con contraste",
    "nota": "Marcar NA si no se usa medio de contraste.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes",
      "que": "Garantizar el consentimiento y la valoración previa para estudios con medio de contraste.",
      "porque": "¿Formato no específico, o creatinina no solicitada según protocolo?",
      "como": "Ajustar el formato, definir el requisito de función renal y auditar 10 estudios."
    }
  },
  {
    "id": "IM-05",
    "bloque": "IM",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Hay carro o kit de emergencia accesible para el manejo de reacción al medio de contraste.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018",
    "fuente": "Verificación física",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes",
      "que": "Garantizar el kit de emergencia accesible y el entrenamiento para la reacción al contraste.",
      "porque": "¿Kit no asignado al área, o personal sin entrenamiento en el manejo de la reacción?",
      "como": "Asignar y verificar el kit, completar el inventario y entrenar al personal."
    }
  },
  {
    "id": "IM-06",
    "bloque": "IM",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Los equipos tienen mantenimiento, control de calidad y hoja de vida al día.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018",
    "fuente": "Hoja de vida del equipo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes",
      "que": "Actualizar mantenimiento, control de calidad y hoja de vida de los equipos.",
      "porque": "¿Cronograma vencido, o hoja de vida sin actualizar tras las intervenciones?",
      "como": "Solicitar cronograma a ingeniería biomédica y actualizar hojas de vida."
    }
  },
  {
    "id": "IM-07",
    "bloque": "IM",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Los hallazgos críticos se comunican de forma inmediata y documentada al médico tratante.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018",
    "fuente": "Registro de reporte de hallazgos críticos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes",
      "que": "Implementar la comunicación registrada de hallazgos críticos.",
      "porque": "¿Listado de hallazgos críticos no definido, o comunicación sin registro?",
      "como": "Definir el listado y el canal, y exigir registro con hora y confirmación."
    }
  },
  {
    "id": "IM-08",
    "bloque": "IM",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se garantiza privacidad del usuario y manejo confidencial de las imágenes.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018",
    "fuente": "Observación y control de acceso al sistema",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de imágenes",
      "que": "Garantizar la privacidad del usuario y el acceso controlado a las imágenes.",
      "porque": "¿Área sin barrera visual, o perfiles de acceso al sistema compartidos?",
      "como": "Disponer barrera visual, revisar los perfiles de acceso y socializar la confidencialidad."
    }
  },
  {
    "id": "TR-01",
    "bloque": "TR",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Cada usuario tiene valoración inicial, plan terapéutico y registro de evolución por sesión.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación",
    "fuente": "Auditoría de 10 historias",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de terapias",
      "que": "Completar la valoración, el plan y el registro por sesión.",
      "porque": "¿Formato incompleto, o registro consolidado en lugar de por sesión?",
      "como": "Ajustar el formato, reservar tiempo de registro en la agenda y auditar 10 historias."
    }
  },
  {
    "id": "TR-02",
    "bloque": "TR",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Los equipos terapéuticos tienen mantenimiento, calibración y verificación previa al uso.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación",
    "fuente": "Hoja de vida y registro de verificación",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de terapias",
      "que": "Regularizar mantenimiento, calibración y verificación previa de los equipos.",
      "porque": "¿Cronograma vencido, o verificación previa no definida?",
      "como": "Solicitar cronograma a ingeniería biomédica y definir la verificación previa por jornada."
    }
  },
  {
    "id": "TR-03",
    "bloque": "TR",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se aplican medidas de prevención de caídas durante la sesión: supervisión, superficies seguras y elementos de apoyo.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación",
    "fuente": "Observación de la sesión",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de terapias",
      "que": "Implementar las medidas de prevención de caídas durante la sesión terapéutica.",
      "porque": "¿Supervisión insuficiente por número de usuarios, o elementos de apoyo no disponibles?",
      "como": "Valorar el riesgo antes de cada sesión, ajustar la relación terapeuta-usuario y dotar los elementos."
    }
  },
  {
    "id": "TR-04",
    "bloque": "TR",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se verifican contraindicaciones antes de aplicar agentes físicos y se documenta la educación al usuario.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación",
    "fuente": "Auditoría de 10 historias",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de terapias",
      "que": "Incorporar la verificación de contraindicaciones al formato de sesión.",
      "porque": "¿Verificación no incorporada al formato, o realizada verbalmente sin registro?",
      "como": "Incluir el chequeo en el formato y auditar 10 registros."
    }
  },
  {
    "id": "TR-05",
    "bloque": "TR",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "El material de uso compartido se limpia y desinfecta entre usuarios, con registro.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación",
    "fuente": "Observación y planilla",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de terapias",
      "que": "Restablecer la limpieza registrada del material compartido entre usuarios.",
      "porque": "¿Tiempo entre sesiones insuficiente, o desinfectante no disponible?",
      "como": "Ajustar la agenda, asegurar el insumo y auditar la planilla semanalmente."
    }
  },
  {
    "id": "TR-06",
    "bloque": "TR",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Las áreas son suficientes, limpias, con privacidad y accesibles para el usuario.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Baja",
      "plazo": 60,
      "quien": "Coordinador de terapias",
      "que": "Adecuar las áreas de terapia en limpieza, privacidad y accesibilidad.",
      "porque": "¿Limitación de espacio, o ausencia de barrera visual?",
      "como": "Reorganizar el espacio, disponer barrera visual y escalar la limitación estructural."
    }
  },
  {
    "id": "TR-07",
    "bloque": "TR",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se realiza tamizaje del riesgo de broncoaspiración en terapia de deglución.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación",
    "fuente": "Auditoría de historias",
    "nota": "Marcar NA si no se presta terapia de deglución.",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de terapias",
      "que": "Implementar el tamizaje y manejo del riesgo de broncoaspiración.",
      "porque": "¿Tamizaje no adoptado, o ausencia de ruta con nutrición y medicina?",
      "como": "Adoptar el tamizaje, entrenar al equipo y definir la ruta de manejo."
    }
  },
  {
    "id": "TR-08",
    "bloque": "TR",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se documenta la comunicación con el médico tratante sobre la evolución del usuario.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación",
    "fuente": "Historia clínica y formato de contrarreferencia",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de terapias",
      "que": "Restablecer la contrarreferencia documentada al médico tratante.",
      "porque": "¿Formato no definido, o comunicación realizada de manera informal?",
      "como": "Adoptar el formato, definir la periodicidad y auditar 10 casos."
    }
  }
];

export const AMB_NOMBRE_BLOQUE: Record<string, string> = Object.fromEntries(
  AMB_BLOQUES.map((b) => [b.codigo, b.nombre]),
);

export const AMB_BLOQUES_TRANSVERSALES = AMB_BLOQUES.filter((b) => b.tipo === 'transversal');
export const AMB_BLOQUES_SERVICIO = AMB_BLOQUES.filter((b) => b.tipo === 'servicio');
export const AMB_CODIGOS_TRANSVERSALES = new Set(AMB_BLOQUES_TRANSVERSALES.map((b) => b.codigo));

export const CHK_HM = ['Jabón', 'Toallas', 'Alcohol', 'Dispensador OK', 'Rótulo', 'Afiche', 'Caneca'] as const;
export const CHK_RT = ['Rótulo completo', 'Fecha apertura', 'Vigente', 'Legible', 'Corresponde'] as const;

export const MOMENTOS: Array<[string, string]> = [
  ['1', 'Antes de tocar al usuario'],
  ['2', 'Antes de tarea aséptica'],
  ['3', 'Después de exposición a fluidos'],
  ['4', 'Después de tocar al usuario'],
  ['5', 'Después del contacto con el entorno'],
];

export const CARGOS = [
  'Médico',
  'Odontólogo',
  'Auxiliar de odontología',
  'Higienista oral',
  'Bacteriólogo',
  'Auxiliar de laboratorio',
  'Enfermera',
  'Auxiliar de enfermería',
  'Fisioterapeuta',
  'Servicios generales',
  'Admisión',
  'Otro',
] as const;

export const ACCIONES: Array<[string, string]> = [
  ['FR', 'Fricción con alcohol'],
  ['LM', 'Lavado con agua y jabón'],
  ['OM', 'Omisión'],
];

export const AREAS_DEFAULT = ['CE', 'OD', 'LC', 'ES'];

export function itemsTransversales(): Item[] {
  return AMB_ITEMS.filter((i) => AMB_CODIGOS_TRANSVERSALES.has(i.bloque));
}

export function itemsDeArea(codigo: string): Item[] {
  return AMB_ITEMS.filter((i) => i.bloque === codigo);
}

export function itemAmbPorId(id: string): Item | undefined {
  return AMB_ITEMS.find((i) => i.id === id);
}
