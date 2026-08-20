import type { Bloque, Item } from '../types';

/** Datos maestros extraídos del HTML de rondas. No se modifican desde la UI. */

export const BLOQUES: Bloque[] = [
  {
    "codigo": "A",
    "nombre": "Identificación correcta del paciente",
    "tipo": "transversal"
  },
  {
    "codigo": "B",
    "nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal"
  },
  {
    "codigo": "C",
    "nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal"
  },
  {
    "codigo": "D",
    "nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal"
  },
  {
    "codigo": "E",
    "nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal"
  },
  {
    "codigo": "F",
    "nombre": "Urgencias",
    "tipo": "servicio"
  },
  {
    "codigo": "G",
    "nombre": "Hospitalización",
    "tipo": "servicio"
  },
  {
    "codigo": "H",
    "nombre": "Cirugía y anestesia",
    "tipo": "servicio"
  },
  {
    "codigo": "I",
    "nombre": "UCI / cuidado crítico",
    "tipo": "servicio"
  },
  {
    "codigo": "J",
    "nombre": "Laboratorio clínico",
    "tipo": "servicio"
  },
  {
    "codigo": "K",
    "nombre": "Servicio farmacéutico",
    "tipo": "servicio"
  },
  {
    "codigo": "L",
    "nombre": "Imágenes diagnósticas",
    "tipo": "servicio"
  },
  {
    "codigo": "M",
    "nombre": "Central de esterilización",
    "tipo": "servicio"
  },
  {
    "codigo": "N",
    "nombre": "Odontología",
    "tipo": "servicio"
  },
  {
    "codigo": "O",
    "nombre": "Terapias y rehabilitación",
    "tipo": "servicio"
  },
  {
    "codigo": "P",
    "nombre": "Consulta externa",
    "tipo": "servicio"
  }
] as Bloque[];

export const ITEMS: Item[] = [
  {
    "id": "A01",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "Todos los pacientes portan manilla o brazalete de identificación legible, con al menos dos identificadores (nombre completo y número de documento o de historia clínica).",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Observación directa a los pacientes del servicio",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del servicio auditado",
      "que": "Garantizar manilla de identificación con dos identificadores en el 100 % de los pacientes del servicio, verificando su colocación al ingreso.",
      "porque": "¿Falta de insumo de manillas, manilla retirada durante el baño o procedimiento, o no está asignado el responsable de colocarla al ingreso?",
      "como": "Asignar el responsable en el protocolo de ingreso, asegurar stock de manillas en el servicio y verificar por censo diario durante un mes."
    }
  },
  {
    "id": "A02",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "El personal verifica activamente los dos identificadores antes de administrar medicamentos, tomar muestras, transfundir o realizar cualquier procedimiento.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Observación directa de la práctica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del servicio auditado",
      "que": "Reinstruir y verificar la doble verificación de identidad antes de medicamentos, muestras, transfusión y procedimientos.",
      "porque": "¿Desconocimiento del procedimiento, presión asistencial, o práctica de identificar por número de cama por costumbre?",
      "como": "Capacitación corta en entrega de turno, observación directa de 10 oportunidades por semana y retroalimentación inmediata."
    }
  },
  {
    "id": "A03",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "No se utiliza el número de cama, el diagnóstico ni el nombre del servicio como identificador del paciente.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Observación directa y entrevista al personal",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del servicio auditado",
      "que": "Eliminar el uso de cama, diagnóstico o servicio como identificador, en registros y en comunicación verbal.",
      "porque": "¿Costumbre del equipo, formatos institucionales que inducen a ello, o tableros de servicio que solo muestran la cama?",
      "como": "Revisar formatos y tableros que induzcan el error, socializar la regla y verificar en la siguiente ronda."
    }
  },
  {
    "id": "A04",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "Existe y se conoce el procedimiento para identificar pacientes con barreras: inconscientes, NN, pediátricos o con alteración del estado mental.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Documento institucional y entrevista al personal",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador del servicio auditado",
      "que": "Elaborar o socializar el procedimiento de identificación de pacientes con barreras de comunicación e identificación.",
      "porque": "¿El procedimiento no existe, no está actualizado, o existe pero no fue socializado al personal del servicio?",
      "como": "Ajustar el documento en el sistema documental, socializar en comité de servicio y dejar acta de asistencia."
    }
  },
  {
    "id": "A05",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "Los pacientes homónimos están señalizados y el equipo conoce la alerta activa.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Observación directa y tablero/censo del servicio",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del servicio auditado",
      "que": "Implementar la alerta visible de paciente homónimo en censo, tablero y unidad del paciente.",
      "porque": "¿No existe una regla institucional de homónimos, o existe y el servicio no la aplica?",
      "como": "Definir el distintivo, incorporarlo al proceso de admisión y verificar en la siguiente ronda."
    }
  },
  {
    "id": "A06",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "Las muestras de laboratorio se rotulan en presencia del paciente e inmediatamente después de la toma.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Observación directa de la toma de muestras",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del servicio auditado",
      "que": "Rotular las muestras en presencia del paciente, inmediatamente después de la toma, sin excepción.",
      "porque": "¿Rotulado diferido por volumen de trabajo, ausencia de rótulos en el sitio de toma, o desconocimiento del riesgo?",
      "como": "Ubicar el material de rotulado en el punto de toma, observación directa semanal y registro de muestras rechazadas."
    }
  },
  {
    "id": "A07",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "El binomio madre-hijo cuenta con identificación cruzada verificada y registrada.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Observación directa y registro clínico",
    "nota": "Aplica a servicios obstétricos y neonatales",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del servicio auditado",
      "que": "Verificar y registrar la identificación cruzada del binomio madre-hijo en cada nacimiento y en cada entrega de turno.",
      "porque": "¿Falla en el momento del nacimiento, en el traslado, o falta de verificación en la entrega de turno?",
      "como": "Incluir el ítem en la lista de chequeo de entrega de turno y auditar el 100 % de los binomios durante un mes."
    }
  },
  {
    "id": "A08",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "La identificación del paciente se verifica en cada transición asistencial: ingreso, traslado y egreso.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Registro clínico y lista de entrega de paciente",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador del servicio auditado",
      "que": "Incorporar la verificación de identidad como paso obligatorio en ingreso, traslado y egreso.",
      "porque": "¿El formato de traslado no incluye el campo, o se diligencia sin verificar realmente?",
      "como": "Ajustar el formato de entrega, socializar y auditar 10 traslados en el periodo."
    }
  },
  {
    "id": "B01",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Todos los puntos de atención cuentan con insumos completos y vigentes para higiene de manos (jabón, toallas desechables, alcohol glicerinado).",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa del punto de atención",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder del programa de prevención y control de infecciones",
      "que": "Asegurar la disponibilidad permanente de insumos para higiene de manos en todos los puntos de atención.",
      "porque": "¿Falla en la solicitud del servicio, en el abastecimiento de almacén, o en la reposición durante turnos de la noche y fines de semana?",
      "como": "Definir stock mínimo por punto, responsable de reposición por turno y verificación diaria en la lista de chequeo del servicio."
    }
  },
  {
    "id": "B02",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Los dispensadores de alcohol glicerinado están ubicados en el punto de atención y se encuentran funcionales.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder del programa de prevención y control de infecciones",
      "que": "Reponer, reubicar o reparar los dispensadores de alcohol glicerinado para que queden en el punto de atención.",
      "porque": "¿Dispensadores dañados, mal ubicados respecto al flujo de trabajo, o insuficientes para el número de camas?",
      "como": "Levantar inventario de dispensadores por cama, gestionar mantenimiento y reubicar según el recorrido real del personal."
    }
  },
  {
    "id": "B03",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "El personal cumple los cinco momentos de la higiene de manos.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa de al menos 5 oportunidades durante la ronda",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder del programa de prevención y control de infecciones",
      "que": "Elevar la adherencia a los cinco momentos mediante observación directa con retroalimentación inmediata.",
      "porque": "¿Desconocimiento del momento exacto, alta carga asistencial, o insumo no disponible en el punto de atención?",
      "como": "Observación semanal de 20 oportunidades por observador entrenado, retroalimentación en el momento y publicación del indicador en cartelera."
    }
  },
  {
    "id": "B04",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "El personal aplica la técnica y el tiempo correctos (40–60 s con agua y jabón; 20–30 s con alcohol glicerinado).",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder del programa de prevención y control de infecciones",
      "que": "Reentrenar técnica y tiempo de higiene de manos con demostración práctica y verificación de destreza.",
      "porque": "¿Capacitación solo teórica, rotación de personal nuevo, o percepción de que la técnica corta es suficiente?",
      "como": "Taller práctico con caja de luz ultravioleta, lista de verificación de destreza por persona y registro de asistencia."
    }
  },
  {
    "id": "B05",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "El personal asistencial cumple 'brazos libres': sin joyas, uñas cortas, sin esmalte ni uñas artificiales.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder del programa de prevención y control de infecciones",
      "que": "Hacer cumplir la política de brazos libres en todo el personal asistencial del servicio.",
      "porque": "¿La política no está formalizada, no fue socializada, o no hay seguimiento de su cumplimiento?",
      "como": "Socializar la política, verificar en la entrega de turno y registrar el cumplimiento en las siguientes rondas."
    }
  },
  {
    "id": "B06",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Los elementos de protección personal se usan y se retiran correctamente según el tipo de precaución.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder del programa de prevención y control de infecciones",
      "que": "Reentrenar la secuencia de colocación y retiro de elementos de protección personal según tipo de precaución.",
      "porque": "¿Desconocimiento de la secuencia, EPP insuficiente, o ausencia de ayuda visual en el punto de uso?",
      "como": "Ayuda visual en la entrada de cada habitación de aislamiento, taller práctico y observación directa de 5 secuencias."
    }
  },
  {
    "id": "B07",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Los pacientes en aislamiento están señalizados y el aislamiento se cumple (EPP a la entrada, insumos exclusivos, puerta).",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa y censo de aislamientos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder del programa de prevención y control de infecciones",
      "que": "Garantizar la señalización, la dotación exclusiva y el cumplimiento efectivo de los aislamientos.",
      "porque": "¿Falta de señalización estandarizada, insumos exclusivos no disponibles, o desconocimiento del tipo de precaución indicada?",
      "como": "Kit de aislamiento estandarizado por habitación, señalización institucional y verificación diaria del censo de aislamientos."
    }
  },
  {
    "id": "B08",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Se cumple la técnica aséptica en la inserción y el manejo de dispositivos invasivos.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa y registro clínico",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder del programa de prevención y control de infecciones",
      "que": "Reforzar y verificar la técnica aséptica en inserción y mantenimiento de dispositivos invasivos.",
      "porque": "¿Falla en la inserción, en el mantenimiento diario, o ausencia de lista de verificación del procedimiento?",
      "como": "Lista de chequeo de inserción firmada, capacitación práctica y auditoría de 10 dispositivos activos."
    }
  },
  {
    "id": "B09",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "La adherencia a higiene de manos se mide, se socializa con el equipo y tiene plan de acción vigente.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Acta de socialización e indicador del servicio",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder del programa de prevención y control de infecciones",
      "que": "Restablecer la medición, socialización y plan de acción del indicador de adherencia a higiene de manos.",
      "porque": "¿No hay observador asignado, la medición se hace pero no se socializa, o no se derivan acciones del resultado?",
      "como": "Asignar observadores por servicio, cronograma mensual de medición y presentación del resultado en el Comité de Seguridad del Paciente."
    }
  },
  {
    "id": "B10",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Los residuos hospitalarios cumplen segregación en la fuente; los guardianes están rotulados y no superan 3/4 de su capacidad.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa de los puntos ecológicos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder del programa de prevención y control de infecciones",
      "que": "Corregir la segregación en la fuente y el manejo de guardianes conforme al plan de gestión de residuos.",
      "porque": "¿Puntos ecológicos incompletos o mal ubicados, desconocimiento de la segregación, o falla en la frecuencia de recolección?",
      "como": "Reinstruir al personal, ajustar la ubicación de los puntos, revisar frecuencia de recolección y verificar semanalmente."
    }
  },
  {
    "id": "B11",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Superficies y equipos de uso clínico están limpios y existe registro de limpieza y desinfección al día.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Planilla de limpieza y observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder del programa de prevención y control de infecciones",
      "que": "Restablecer el cumplimiento y el registro de la limpieza y desinfección de superficies y equipos clínicos.",
      "porque": "¿Personal de aseo insuficiente, protocolo no diferenciado para áreas clínicas, o el registro existe pero no se diligencia?",
      "como": "Revisar el protocolo con servicios generales, definir responsable por turno y auditar planillas semanalmente."
    }
  },
  {
    "id": "C01",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Los medicamentos de control especial permanecen bajo llave, con inventario y registro al día.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa y libro/registro de control",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Restablecer las condiciones de seguridad, inventario y registro de los medicamentos de control especial.",
      "porque": "¿Llave sin responsable definido, registro no diligenciado por turno, o desconocimiento de la normativa aplicable?",
      "como": "Asignar responsable y turno de verificación, conciliar inventario contra libro y capacitar en Resolución 1478 de 2006."
    }
  },
  {
    "id": "C02",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Los medicamentos de alto riesgo (LASA, electrolitos concentrados, anticoagulantes, insulinas, opioides) tienen rótulo diferenciado y almacenamiento separado.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa del stand de medicamentos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Rotular de forma diferenciada y separar físicamente los medicamentos de alto riesgo del servicio.",
      "porque": "¿Ausencia de listado institucional de alto riesgo, rotulación no estandarizada, o espacio de almacenamiento insuficiente?",
      "como": "Aplicar el listado institucional de alto riesgo, rotulación tipo LASA y reorganización física del stand con verificación semanal."
    }
  },
  {
    "id": "C03",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "No hay electrolitos concentrados sin diluir en el carro de paro ni en el stand del servicio, salvo autorización expresa.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Retirar del servicio los electrolitos concentrados no autorizados y ajustar el stock al listado aprobado.",
      "porque": "¿El listado de stock del servicio no está actualizado, o se reponen por costumbre sin autorización?",
      "como": "Depurar el stand contra el listado aprobado por el Comité de Farmacia y verificar en cada ronda."
    }
  },
  {
    "id": "C04",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "No se encuentran medicamentos vencidos, sin rótulo, sin fecha de apertura ni reenvasados sin trazabilidad.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa del stand y la nevera",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Depurar el stand y la nevera, y establecer verificación periódica de vencimientos y rotulación.",
      "porque": "¿No hay responsable de la revisión periódica, la rotación por vencimiento no se aplica, o falta el rótulo de fecha de apertura?",
      "como": "Definir responsable y frecuencia de revisión, marcar próximos a vencer y auditar mensualmente con el servicio farmacéutico."
    }
  },
  {
    "id": "C05",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Se cumple la cadena de frío: nevera exclusiva, termómetro calibrado y registro de temperatura diligenciado.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Planilla de temperatura y observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Restablecer el control y el registro de la cadena de frío en el servicio.",
      "porque": "¿Termómetro descalibrado o ausente, nevera compartida con otros usos, o registro no diligenciado en todos los turnos?",
      "como": "Gestionar calibración, destinar nevera exclusiva, definir responsable por turno y auditar la planilla semanalmente."
    }
  },
  {
    "id": "C06",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Se aplican los correctos de la administración de medicamentos (paciente, medicamento, dosis, vía, hora, registro, educación, caducidad y respuesta).",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa de la administración",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Reforzar y verificar la aplicación de los correctos en la administración de medicamentos.",
      "porque": "¿Interrupciones durante la preparación, desconocimiento de los correctos, o presión de tiempo en la ronda de medicamentos?",
      "como": "Observación directa de 10 administraciones, retroalimentación inmediata y análisis de errores reportados en el periodo."
    }
  },
  {
    "id": "C07",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Las mezclas y diluciones se rotulan con paciente, medicamento, dosis, diluyente, hora y responsable.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa de las infusiones activas",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Estandarizar el rótulo de mezclas y diluciones con los datos mínimos exigidos.",
      "porque": "¿No existe rótulo estandarizado disponible en el servicio, o existe y no se diligencia completo?",
      "como": "Imprimir y disponer el rótulo institucional en el área de preparación y verificar las infusiones activas en cada ronda."
    }
  },
  {
    "id": "C08",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "El carro de paro está sellado, con inventario vigente, desfibrilador funcional y verificación diaria registrada.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Lista de chequeo del carro de paro",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Restablecer el sellado, el inventario y la verificación diaria registrada del carro de paro.",
      "porque": "¿Responsable de verificación no asignado por turno, inventario desactualizado, o reposición demorada tras su uso?",
      "como": "Asignar verificación por turno con firma, actualizar el inventario aprobado y auditar la planilla en cada ronda."
    }
  },
  {
    "id": "C09",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Existe conciliación medicamentosa documentada al ingreso, en el traslado y en el egreso.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Implementar la conciliación medicamentosa documentada en ingreso, traslado y egreso.",
      "porque": "¿No existe formato de conciliación, no está asignado el responsable, o no se dispone del listado de medicamentos previos del paciente?",
      "como": "Definir formato y responsable, capacitar al equipo médico y auditar 10 historias por periodo."
    }
  },
  {
    "id": "C10",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Se reportan las reacciones adversas y los errores de medicación al programa de farmacovigilancia.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Reportes del periodo y entrevista al personal",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Reactivar el reporte de reacciones adversas y errores de medicación al programa de farmacovigilancia.",
      "porque": "¿Desconocimiento del canal de reporte, temor a la sanción, o percepción de que el reporte no genera respuesta?",
      "como": "Socializar el canal y el carácter no punitivo, retroalimentar los reportes previos y publicar el resultado del programa."
    }
  },
  {
    "id": "C11",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Los dispositivos médicos cuentan con registro sanitario vigente y se reporta al programa de tecnovigilancia.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Inventario y reportes de tecnovigilancia",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Verificar el registro sanitario de los dispositivos médicos y reactivar el reporte a tecnovigilancia.",
      "porque": "¿Falta verificación en la compra, o no está socializado el procedimiento de reporte de tecnovigilancia?",
      "como": "Cruzar el inventario con registros INVIMA, socializar el formato de reporte y hacer seguimiento en el comité."
    }
  },
  {
    "id": "C12",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Los equipos biomédicos tienen hoja de vida, mantenimiento preventivo y calibración vigentes.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Hoja de vida del equipo y sticker de calibración",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Actualizar hoja de vida, mantenimiento preventivo y calibración de los equipos biomédicos del servicio.",
      "porque": "¿Cronograma de mantenimiento vencido, proveedor sin contrato vigente, o la hoja de vida no se actualiza tras la intervención?",
      "como": "Solicitar cronograma a ingeniería biomédica, priorizar equipos críticos y verificar stickers de calibración en la siguiente ronda."
    }
  },
  {
    "id": "C13",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "No se reutilizan dispositivos médicos de un solo uso.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa y entrevista al personal",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico / coordinador del servicio",
      "que": "Eliminar toda reutilización de dispositivos médicos de un solo uso en el servicio.",
      "porque": "¿Desabastecimiento del insumo, desconocimiento del riesgo, o práctica instaurada por control de costos?",
      "como": "Verificar disponibilidad del insumo, socializar la prohibición y el riesgo, y verificar en cada ronda."
    }
  },
  {
    "id": "D01",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "A todo paciente se le aplica y registra la escala de valoración de riesgo de caídas al ingreso y con la periodicidad definida.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de enfermería del servicio",
      "que": "Garantizar la aplicación y el registro de la escala de riesgo de caídas al ingreso y con la periodicidad definida.",
      "porque": "¿La escala no está en el formato de valoración, no está definida la periodicidad, o no se reevalúa al cambiar la condición del paciente?",
      "como": "Incorporar la escala al formato de ingreso, definir periodicidad de reevaluación y auditar 10 historias por periodo."
    }
  },
  {
    "id": "D02",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "Los pacientes con riesgo alto de caída están señalizados y con medidas implementadas (barandas, timbre al alcance, calzado antideslizante, acompañante).",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de enfermería del servicio",
      "que": "Implementar el distintivo y el paquete de medidas para el paciente con riesgo alto de caída.",
      "porque": "¿No existe distintivo institucional, las medidas no están definidas, o el resultado de la escala no se traduce en acciones?",
      "como": "Definir distintivo y paquete de medidas, socializar y verificar por censo en cada ronda."
    }
  },
  {
    "id": "D03",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "Los pisos están secos, señalizados cuando hay humedad, libres de obstáculos y con iluminación adecuada.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Observación directa del área",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de enfermería del servicio",
      "que": "Corregir las condiciones del área que generan riesgo de caída: humedad, obstáculos e iluminación.",
      "porque": "¿Frecuencia de aseo inadecuada, ausencia de señalización de piso húmedo, o luminarias sin mantenimiento?",
      "como": "Coordinar con servicios generales y mantenimiento, disponer avisos de piso húmedo y verificar en cada ronda."
    }
  },
  {
    "id": "D04",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "Camas y camillas tienen frenos funcionales y barandas en buen estado.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Verificación física de las unidades",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de enfermería del servicio",
      "que": "Reparar o reponer frenos y barandas defectuosas de camas y camillas.",
      "porque": "¿Mantenimiento correctivo no solicitado, solicitud sin respuesta, o mobiliario en fin de vida útil?",
      "como": "Levantar inventario de fallas, radicar a mantenimiento con priorización y verificar el cierre de cada solicitud."
    }
  },
  {
    "id": "D05",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "A todo paciente en riesgo se le aplica y registra la escala de valoración de lesiones por presión (Braden o Norton).",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de enfermería del servicio",
      "que": "Garantizar la aplicación y el registro de la escala de valoración de riesgo de lesión por presión.",
      "porque": "¿La escala no está incorporada al formato, no se aplica a todos los pacientes en riesgo, o no se reevalúa?",
      "como": "Incorporar Braden o Norton al formato, definir periodicidad y auditar 10 historias por periodo."
    }
  },
  {
    "id": "D06",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "Se cumplen las medidas de prevención de LPP: cambios de posición registrados, superficies de apoyo, protección de prominencias y valoración diaria de la piel.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Historia clínica y observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de enfermería del servicio",
      "que": "Restablecer el paquete de prevención de lesiones por presión y su registro en la historia clínica.",
      "porque": "¿Personal insuficiente para los cambios de posición, superficies de apoyo no disponibles, o el registro no se realiza aunque la actividad sí?",
      "como": "Verificar disponibilidad de superficies de apoyo, reorganizar el turno para los cambios de posición y auditar el registro semanalmente."
    }
  },
  {
    "id": "D07",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "El traslado intra e interinstitucional se realiza con acompañamiento, monitoreo e informe de entrega documentado.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Formato de traslado y entrega",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de enfermería del servicio",
      "que": "Garantizar acompañamiento, monitoreo e informe de entrega documentado en todo traslado de paciente.",
      "porque": "¿No hay formato de traslado, personal insuficiente para acompañar, o el equipo de monitoreo de transporte no está disponible?",
      "como": "Definir criterios de acompañamiento por condición del paciente, disponer el formato y auditar 10 traslados."
    }
  },
  {
    "id": "D08",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "La contención física o farmacológica cuenta con orden médica, consentimiento, reevaluación periódica y registro.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Historia clínica",
    "nota": "Marcar NA si no se emplea contención",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de enfermería del servicio",
      "que": "Ajustar el uso de contención a orden médica, consentimiento, reevaluación periódica y registro.",
      "porque": "¿Ausencia de protocolo institucional de contención, desconocimiento del marco legal, o uso como alternativa a la vigilancia?",
      "como": "Adoptar o actualizar el protocolo de contención, capacitar al equipo y auditar el 100 % de los casos del periodo."
    }
  },
  {
    "id": "D09",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "Se valora e interviene el riesgo nutricional y de broncoaspiración en los pacientes que lo requieren.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de enfermería del servicio",
      "que": "Implementar la valoración e intervención del riesgo nutricional y de broncoaspiración en los pacientes que lo requieren.",
      "porque": "¿No hay tamizaje definido, no está disponible el apoyo de nutrición o fonoaudiología, o no se solicita la interconsulta?",
      "como": "Definir el tamizaje de ingreso, articular la ruta con nutrición y terapia, y auditar 10 historias por periodo."
    }
  },
  {
    "id": "E01",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "El talento humano del servicio cumple perfil, cantidad y suficiencia conforme a la Resolución 3100 de 2019.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Programación de turnos y verificación de perfiles",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Ajustar el talento humano del servicio al perfil y la suficiencia exigidos en la Resolución 3100 de 2019.",
      "porque": "¿Vacantes sin cubrir, ausentismo no reemplazado, o dimensionamiento del servicio desactualizado frente a la ocupación real?",
      "como": "Cuantificar la brecha frente al estándar, presentar la necesidad a talento humano y a la gerencia y hacer seguimiento mensual."
    }
  },
  {
    "id": "E02",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "El personal acredita inducción, reinducción y capacitación vigente en seguridad del paciente.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Registros de capacitación y entrevista al personal",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de seguridad del paciente",
      "que": "Cubrir la inducción, reinducción y capacitación en seguridad del paciente del personal del servicio.",
      "porque": "¿Personal nuevo sin inducción, cronograma de capacitación no ejecutado, o dificultad para liberar personal de los turnos?",
      "como": "Cronograma con capacitaciones cortas en cambio de turno, registro de asistencia y verificación de cobertura por persona."
    }
  },
  {
    "id": "E03",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Los profesionales cuentan con inscripción vigente en el ReTHUS y con las autorizaciones que apliquen.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Consulta ReTHUS y hoja de vida",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Verificar y regularizar la inscripción en ReTHUS y las autorizaciones del personal asistencial del servicio.",
      "porque": "¿Verificación no realizada en la contratación, o inscripciones vencidas sin seguimiento?",
      "como": "Cruzar el listado del servicio contra ReTHUS con talento humano y establecer verificación previa a la contratación."
    }
  },
  {
    "id": "E04",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "La historia clínica es única, legible, oportuna, completa y con identificación del responsable de cada registro.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Auditoría de historias del servicio",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Corregir las fallas de calidad de la historia clínica identificadas: legibilidad, oportunidad, integralidad e identificación del responsable.",
      "porque": "¿Sobrecarga asistencial, fallas del sistema de información, o desconocimiento de los requisitos de la Resolución 1995 de 1999?",
      "como": "Retroalimentar individualmente los hallazgos, socializar los requisitos y reauditar 10 historias en 30 días."
    }
  },
  {
    "id": "E05",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Las notas registran valoración, plan de manejo, evolución y educación al paciente y su familia.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Auditoría de historias del servicio",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de seguridad del paciente",
      "que": "Mejorar el contenido de las notas asistenciales: valoración, plan, evolución y educación al paciente.",
      "porque": "¿Ausencia de guía de redacción de notas, uso de plantillas que no reflejan la atención real, o falta de tiempo?",
      "como": "Socializar la guía institucional de redacción de notas, retroalimentar con ejemplos del servicio y reauditar."
    }
  },
  {
    "id": "E06",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "El consentimiento informado está diligenciado, firmado y es específico para el procedimiento realizado.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Garantizar el consentimiento informado diligenciado, firmado y específico para cada procedimiento.",
      "porque": "¿Formato genérico único, firma obtenida sin explicación previa, o desconocimiento de cuáles procedimientos lo requieren?",
      "como": "Revisar los formatos por procedimiento, capacitar sobre el proceso de consentimiento y auditar 10 historias."
    }
  },
  {
    "id": "E07",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Se aplica una herramienta estandarizada para la entrega de turno y la transferencia de pacientes.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Observación de la entrega de turno y formato institucional",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Estandarizar la entrega de turno y la transferencia de pacientes con una herramienta institucional.",
      "porque": "¿No existe formato definido, existe pero no se usa, o la entrega se realiza sin la presencia de todo el equipo?",
      "como": "Adoptar el formato de entrega, definir hora y participantes, y observar tres entregas de turno en el periodo."
    }
  },
  {
    "id": "E08",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Las órdenes verbales o telefónicas se registran y se confirman mediante repetición (read-back).",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Historia clínica y observación directa",
    "nota": "Marcar NA si el servicio no las usa",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de seguridad del paciente",
      "que": "Establecer el registro y la confirmación por repetición de toda orden verbal o telefónica.",
      "porque": "¿No está definida la regla, o se usan órdenes verbales por fuera de la situación de urgencia?",
      "como": "Definir en qué situaciones se permite la orden verbal, socializar el read-back y auditar 10 registros."
    }
  },
  {
    "id": "E09",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "El personal conoce el procedimiento de reporte de incidentes y eventos adversos y lo percibe como no punitivo.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Entrevista a mínimo 3 miembros del equipo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Reforzar el conocimiento del canal de reporte de eventos adversos y su carácter no punitivo.",
      "porque": "¿Desconocimiento del canal, temor a la sanción, o experiencia previa de reporte sin retroalimentación?",
      "como": "Socializar el procedimiento, retroalimentar públicamente los aprendizajes de reportes previos y medir la tasa de reporte del servicio."
    }
  },
  {
    "id": "E10",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Los eventos adversos del servicio están reportados, analizados con Protocolo de Londres y con plan de mejoramiento vigente.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Base de eventos y actas de análisis",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Completar el reporte, el análisis con Protocolo de Londres y el plan de mejoramiento de los eventos del servicio.",
      "porque": "¿Análisis no realizado por falta de tiempo, equipo sin entrenamiento en la metodología, o eventos no reportados?",
      "como": "Programar sesiones de análisis, entrenar al equipo en Protocolo de Londres y llevar los casos al Comité de Seguridad del Paciente."
    }
  },
  {
    "id": "E11",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Los planes de mejoramiento derivados de rondas y eventos previos muestran avance verificable.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Plan de mejoramiento institucional",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Reactivar el seguimiento a los planes de mejoramiento previos con evidencia de avance verificable.",
      "porque": "¿Responsables no designados, plazos no definidos, o acciones formuladas sin recursos para ejecutarlas?",
      "como": "Revisar cada acción vencida, reasignar responsable y plazo, y hacer seguimiento mensual en el comité."
    }
  },
  {
    "id": "E12",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Se realiza y documenta la información al paciente y su familia frente al evento adverso ocurrido.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Historia clínica y acta de información",
    "nota": "Marcar NA si no se presentaron eventos en el periodo",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Líder de seguridad del paciente",
      "que": "Implementar la información documentada al paciente y su familia frente al evento adverso ocurrido.",
      "porque": "¿Ausencia de procedimiento de comunicación de eventos, temor a la implicación legal, o falta de entrenamiento del equipo?",
      "como": "Adoptar el procedimiento de comunicación honesta, entrenar a los líderes y dejar acta de cada información entregada."
    }
  },
  {
    "id": "E13",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Los indicadores de seguridad del paciente del servicio se miden, se publican y se socializan con el equipo.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Cartelera del servicio y acta de socialización",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de seguridad del paciente",
      "que": "Restablecer la medición, publicación y socialización de los indicadores de seguridad del servicio.",
      "porque": "¿La medición no llega al servicio, no hay cartelera asignada, o el dato se produce sin analizarse con el equipo?",
      "como": "Definir tablero visible por servicio, actualización mensual y análisis del resultado en la reunión de servicio."
    }
  },
  {
    "id": "E14",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "El servicio cumple las condiciones de infraestructura y dotación exigidas y cuenta con señalización de rutas de evacuación.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Líder de seguridad del paciente",
      "que": "Corregir las condiciones de infraestructura, dotación y señalización identificadas en el recorrido.",
      "porque": "¿Solicitudes de mantenimiento sin respuesta, ausencia de plan de mejora locativa, o condición no detectada antes?",
      "como": "Radicar las novedades a mantenimiento con priorización, incluirlas en el plan de inversión y verificar el cierre."
    }
  },
  {
    "id": "F01",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "El triage se aplica con la escala definida en la Resolución 5596 de 2015, por personal autorizado y con registro de la hora.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Registro de triage",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de urgencias",
      "que": "Ajustar la aplicación del triage a la Resolución 5596 de 2015, por personal autorizado y con registro de hora.",
      "porque": "¿Personal no entrenado o no autorizado, sistema que no captura la hora, o clasificación por disponibilidad de camas en vez de por criterio clínico?",
      "como": "Certificar al personal de triage, ajustar el registro en el sistema y auditar 20 clasificaciones del periodo."
    }
  },
  {
    "id": "F02",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Se cumplen los tiempos de atención por categoría de triage y se miden los desistimientos.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Indicador del servicio",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de urgencias",
      "que": "Reducir los tiempos de atención por categoría de triage y medir el desistimiento.",
      "porque": "¿Insuficiencia de consultorios o de personal médico, congestión por baja complejidad, o demora en la disponibilidad de camas?",
      "como": "Analizar los tiempos por franja horaria, ajustar la programación del recurso y presentar el indicador al comité."
    }
  },
  {
    "id": "F03",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Los pacientes en sala de espera cuentan con vigilancia y reevaluación documentada.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Observación directa y registro de reevaluación",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de urgencias",
      "que": "Implementar vigilancia y reevaluación documentada del paciente en sala de espera.",
      "porque": "¿No hay personal asignado a la sala, no está definida la periodicidad de reevaluación, o no existe registro para hacerlo?",
      "como": "Asignar responsable por turno, definir periodicidad según categoría de triage y disponer el formato de reevaluación."
    }
  },
  {
    "id": "F04",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "La sala de reanimación está completa, funcional y con verificación diaria registrada.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Lista de chequeo de la sala",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de urgencias",
      "que": "Restablecer la dotación, funcionalidad y verificación diaria registrada de la sala de reanimación.",
      "porque": "¿Verificación sin responsable por turno, reposición demorada tras el uso, o equipos en mantenimiento sin reemplazo?",
      "como": "Lista de chequeo firmada por turno, reposición inmediata post-uso y verificación en cada ronda."
    }
  },
  {
    "id": "F05",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Existe control del tiempo de estancia en urgencias y gestión activa de la sobreocupación.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Censo y tablero de gestión",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de urgencias",
      "que": "Implementar control del tiempo de estancia en urgencias y gestión activa de la sobreocupación.",
      "porque": "¿Ausencia de camas de hospitalización, demora en la gestión de remisiones, o falta de un plan de contingencia por sobreocupación?",
      "como": "Medir la estancia por paciente, activar el plan de contingencia y hacer gestión diaria de egresos con hospitalización."
    }
  },
  {
    "id": "F06",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Los pacientes en observación tienen monitoreo, evolución y reevaluación médica documentada según su condición.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de urgencias",
      "que": "Garantizar monitoreo, evolución y reevaluación médica documentada de los pacientes en observación.",
      "porque": "¿Periodicidad de reevaluación no definida, sobrecarga médica, o registro no realizado aunque la valoración sí?",
      "como": "Definir la periodicidad por condición clínica, asignar responsable y auditar 10 historias de observación."
    }
  },
  {
    "id": "F07",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Los códigos institucionales (azul, rojo, ACV, IAM, sepsis, trauma) se identifican y activan oportunamente.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Entrevista al personal y registro de activaciones",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de urgencias",
      "que": "Reforzar el conocimiento y la activación oportuna de los códigos institucionales.",
      "porque": "¿Personal nuevo sin entrenamiento, criterios de activación no socializados, o experiencia previa de activación sin respuesta?",
      "como": "Simulacro por código, ayuda visual con criterios y número de activación, y análisis de los tiempos de respuesta."
    }
  },
  {
    "id": "F08",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Se aplica la ruta de atención integral a víctimas de violencia sexual e intrafamiliar y se cumple la notificación obligatoria.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Historia clínica y notificación SIVIGILA",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de urgencias",
      "que": "Garantizar la aplicación completa de la ruta de atención a víctimas de violencia sexual e intrafamiliar y su notificación.",
      "porque": "¿Kit de profilaxis no disponible, desconocimiento de la ruta, o falla en la notificación obligatoria?",
      "como": "Verificar disponibilidad del kit, capacitar en la Resolución 459 de 2012 y auditar el 100 % de los casos del periodo."
    }
  },
  {
    "id": "F09",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Se respeta la separación de áreas: adultos, pediatría, aislamiento y gineco-obstétrica.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de urgencias",
      "que": "Restablecer la separación efectiva de áreas de urgencias según población y riesgo.",
      "porque": "¿Limitación de infraestructura, sobreocupación que obliga a mezclar, o señalización insuficiente?",
      "como": "Reorganizar la distribución posible, señalizar las áreas y escalar la limitación estructural al plan de inversión."
    }
  },
  {
    "id": "F10",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Los pacientes que requieren remisión cuentan con gestión documentada, referencia aceptada y traslado seguro.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Formato de referencia y contrarreferencia",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de urgencias",
      "que": "Fortalecer la gestión documentada de remisiones: referencia aceptada, condiciones del traslado y seguimiento.",
      "porque": "¿Demora de las EPS en autorizar, ausencia de registro de gestiones, o traslado sin las condiciones requeridas?",
      "como": "Registrar cada gestión con hora y respuesta, escalar los casos represados y auditar 10 remisiones del periodo."
    }
  },
  {
    "id": "F11",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Se garantiza la custodia de pertenencias y la seguridad del paciente con alteración mental o riesgo de fuga.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Observación directa y formato de custodia",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de urgencias",
      "que": "Garantizar la custodia de pertenencias y la vigilancia del paciente con riesgo de fuga o alteración mental.",
      "porque": "¿Ausencia de formato de custodia, área no adecuada para vigilancia, o personal insuficiente para acompañamiento permanente?",
      "como": "Implementar el formato de custodia, definir el área de vigilancia y coordinar el acompañamiento con seguridad."
    }
  },
  {
    "id": "G01",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "La ronda médica y de enfermería se realiza y registra con la periodicidad definida.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de hospitalización",
      "que": "Restablecer la periodicidad y el registro de la ronda médica y de enfermería.",
      "porque": "¿Periodicidad no definida, sobrecarga de pacientes por profesional, o la ronda se realiza pero no se registra?",
      "como": "Definir horario de ronda, asignar responsables y auditar el registro en 10 historias."
    }
  },
  {
    "id": "G02",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "La relación de personal por paciente corresponde a la complejidad del servicio.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Programación de turnos y censo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de hospitalización",
      "que": "Ajustar la relación de personal por paciente a la complejidad del servicio.",
      "porque": "¿Vacantes, ausentismo no reemplazado, o dimensionamiento desactualizado frente a la ocupación?",
      "como": "Cuantificar la brecha, presentar la necesidad a talento humano y hacer seguimiento mensual de la cobertura."
    }
  },
  {
    "id": "G03",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Los timbres de llamado funcionan y están al alcance de todos los pacientes.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Verificación física por unidad",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de hospitalización",
      "que": "Reparar o reponer los timbres de llamado y garantizar que queden al alcance del paciente.",
      "porque": "¿Timbres averiados sin reporte, solicitud de mantenimiento sin respuesta, o cable fuera del alcance por la posición de la cama?",
      "como": "Inventariar fallas, radicar a mantenimiento y verificar el alcance del timbre en cada ronda."
    }
  },
  {
    "id": "G04",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Los pacientes con dispositivos invasivos tienen registro de fecha de inserción, valoración diaria del sitio y criterio de retiro.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Historia clínica y observación del sitio",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de hospitalización",
      "que": "Implementar el registro de inserción, la valoración diaria del sitio y el criterio de retiro de dispositivos invasivos.",
      "porque": "¿No existe formato de registro, no está definido el criterio de retiro, o la valoración se hace sin registrarse?",
      "como": "Adoptar el formato de dispositivos, definir criterios de retiro y auditar todos los dispositivos activos en la siguiente ronda."
    }
  },
  {
    "id": "G05",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Se aplica y registra la valoración y el manejo del dolor.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de hospitalización",
      "que": "Implementar la valoración y el manejo del dolor con escala validada y registro.",
      "porque": "¿Escala no incorporada al formato de signos vitales, o valoración sin intervención posterior?",
      "como": "Incluir la escala en el registro de signos vitales, definir la conducta según resultado y auditar 10 historias."
    }
  },
  {
    "id": "G06",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "El plan de egreso incluye educación, conciliación de medicamentos y cita de control documentada.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Epicrisis y formato de egreso",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de hospitalización",
      "que": "Completar el plan de egreso con educación, conciliación de medicamentos y cita de control.",
      "porque": "¿Formato de egreso incompleto, egresos apresurados por presión de camas, o educación entregada sin verificar comprensión?",
      "como": "Ajustar el formato de egreso, definir responsable de la educación y auditar 10 epicrisis."
    }
  },
  {
    "id": "G07",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Las unidades de paciente están limpias, completas y con dotación funcional.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de hospitalización",
      "que": "Corregir las condiciones de limpieza, integridad y dotación de las unidades de paciente.",
      "porque": "¿Frecuencia de aseo insuficiente, mobiliario deteriorado, o dotación incompleta por pérdida y no reposición?",
      "como": "Coordinar con servicios generales, inventariar el mobiliario a reponer y verificar en la siguiente ronda."
    }
  },
  {
    "id": "G08",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Se cumple lo definido institucionalmente sobre visitas y acompañamiento permanente.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Observación directa y política institucional",
    "nota": "",
    "prop": {
      "criticidad": "Baja",
      "plazo": 60,
      "quien": "Coordinador de hospitalización",
      "que": "Ajustar la práctica de visitas y acompañamiento a lo definido institucionalmente.",
      "porque": "¿La política no está socializada con usuarios, no hay control de acceso, o la política no responde a la realidad del servicio?",
      "como": "Socializar la política con usuarios y personal, señalizar horarios y revisar la pertinencia de la política vigente."
    }
  },
  {
    "id": "G09",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Los pacientes con riesgo de deterioro clínico se detectan con escala de alerta temprana y existe respuesta documentada.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de hospitalización",
      "que": "Implementar la escala de alerta temprana y la respuesta documentada ante deterioro clínico.",
      "porque": "¿Escala no adoptada, personal sin entrenamiento, o detección sin ruta de respuesta definida?",
      "como": "Adoptar la escala, definir la ruta de activación del equipo de respuesta, entrenar y auditar los casos del periodo."
    }
  },
  {
    "id": "G10",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "La entrega y recepción de pacientes entre servicios se realiza con lista de chequeo firmada.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Formato de entrega de paciente",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de hospitalización",
      "que": "Estandarizar la entrega y recepción de pacientes entre servicios con lista de chequeo firmada.",
      "porque": "¿No existe el formato, traslados apresurados, o entrega realizada solo verbalmente?",
      "como": "Adoptar la lista de chequeo de traslado, socializarla con los servicios involucrados y auditar 10 traslados."
    }
  },
  {
    "id": "H01",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "La lista de verificación de cirugía segura se diligencia completa en sus tres momentos (entrada, pausa quirúrgica y salida) y con firmas del equipo.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Lista de chequeo de las cirugías del periodo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de cirugía y anestesia",
      "que": "Garantizar el diligenciamiento completo de los tres momentos de la lista de verificación de cirugía segura, con firmas.",
      "porque": "¿La lista se diligencia al final del procedimiento, el equipo no se detiene para la pausa quirúrgica, o falta un responsable de liderarla?",
      "como": "Asignar al coordinador de la lista, exigir la pausa con todo el equipo detenido y auditar el 100 % de las listas del periodo."
    }
  },
  {
    "id": "H02",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "El marcado del sitio quirúrgico lo realiza el cirujano, con participación del paciente, y queda registrado.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Observación directa e historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de cirugía y anestesia",
      "que": "Implementar el marcado del sitio quirúrgico por el cirujano, con participación del paciente y registro.",
      "porque": "¿Marcador no disponible, marcado delegado a otro miembro del equipo, o desconocimiento de los procedimientos que lo requieren?",
      "como": "Definir qué procedimientos requieren marcado, disponer el marcador y verificar en la lista de cirugía segura."
    }
  },
  {
    "id": "H03",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "El conteo de gasas, compresas, agujas e instrumental se realiza y registra antes, durante y al cierre.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Formato de conteo quirúrgico",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de cirugía y anestesia",
      "que": "Garantizar el conteo registrado de gasas, compresas, agujas e instrumental en los tres momentos.",
      "porque": "¿Formato de conteo ausente, conteo realizado sin registrar, o rotación de instrumentadoras sin entrenamiento?",
      "como": "Adoptar el formato de conteo, entrenar al personal de instrumentación y auditar el 100 % de los registros del periodo."
    }
  },
  {
    "id": "H04",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "La profilaxis antibiótica se administra dentro de la ventana de tiempo definida y queda documentada.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Registro de anestesia e historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de cirugía y anestesia",
      "que": "Ajustar la administración de la profilaxis antibiótica a la ventana de tiempo definida, con registro.",
      "porque": "¿Medicamento no disponible en quirófano al momento indicado, hora no registrada, o guía de profilaxis desactualizada?",
      "como": "Actualizar la guía de profilaxis, disponer el medicamento en quirófano y auditar la hora en 10 registros de anestesia."
    }
  },
  {
    "id": "H05",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "La valoración preanestésica está documentada y vigente, con clasificación ASA y plan anestésico.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de cirugía y anestesia",
      "que": "Garantizar la valoración preanestésica documentada y vigente antes de todo procedimiento.",
      "porque": "¿Programación sin valoración previa, valoración vencida al momento de la cirugía, o registro incompleto?",
      "como": "Condicionar la programación a la valoración vigente y auditar 10 historias quirúrgicas."
    }
  },
  {
    "id": "H06",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "Los consentimientos informados quirúrgico y anestésico están firmados, son específicos y previos al procedimiento.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de cirugía y anestesia",
      "que": "Garantizar consentimientos quirúrgico y anestésico firmados, específicos y previos al procedimiento.",
      "porque": "¿Formato genérico, firma obtenida en el traslado a quirófano, o ausencia del consentimiento anestésico separado?",
      "como": "Revisar los formatos, exigir la firma previa al traslado y auditar 10 historias quirúrgicas."
    }
  },
  {
    "id": "H07",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "Las áreas quirúrgicas cumplen la restricción de circulación, el uso de vestier y el flujo separado de material limpio y sucio.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de cirugía y anestesia",
      "que": "Restablecer la restricción de circulación y el flujo separado de material limpio y sucio en áreas quirúrgicas.",
      "porque": "¿Señalización insuficiente, vestier mal ubicado, o limitación estructural del flujo de material?",
      "como": "Señalizar y controlar el acceso, socializar la norma de circulación y escalar la limitación estructural."
    }
  },
  {
    "id": "H08",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "Los equipos de anestesia y monitoreo tienen verificación previa registrada, con respaldo de fuente eléctrica y de oxígeno.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Lista de chequeo de máquina de anestesia",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de cirugía y anestesia",
      "que": "Restablecer la verificación previa registrada de equipos de anestesia y monitoreo, con respaldo eléctrico y de oxígeno.",
      "porque": "¿Lista de chequeo no diligenciada, verificación asumida como realizada, o ausencia de respaldo de oxígeno o planta eléctrica?",
      "como": "Exigir la lista de chequeo firmada antes de cada jornada y verificar la disponibilidad de respaldos con mantenimiento."
    }
  },
  {
    "id": "H09",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "Se cumplen las medidas de prevención de hipotermia, tromboembolismo y lesiones por posicionamiento.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Registro de anestesia y observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de cirugía y anestesia",
      "que": "Implementar las medidas de prevención de hipotermia, tromboembolismo y lesión por posicionamiento.",
      "porque": "¿Insumos no disponibles (mantas, medias, apoyos), protocolo no adoptado, o riesgo no valorado antes del procedimiento?",
      "como": "Adoptar el protocolo, verificar disponibilidad de insumos y auditar 10 registros de anestesia."
    }
  },
  {
    "id": "H10",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "El manejo y la trazabilidad de las piezas de patología están garantizados (rotulado, cadena de custodia y entrega).",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Libro de piezas y formato de entrega",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de cirugía y anestesia",
      "que": "Garantizar el rotulado, la cadena de custodia y la entrega documentada de las piezas de patología.",
      "porque": "¿Libro de registro incompleto, rótulo diligenciado fuera del quirófano, o entrega sin constancia de recibido?",
      "como": "Rotular en quirófano con verificación por dos personas, registrar en el libro y exigir firma de recibido."
    }
  },
  {
    "id": "H11",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "La recuperación posanestésica cuenta con monitoreo, personal permanente y criterios de egreso documentados (Aldrete).",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Registro de recuperación",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de cirugía y anestesia",
      "que": "Garantizar monitoreo, personal permanente y criterios documentados de egreso en recuperación posanestésica.",
      "porque": "¿Personal de recuperación insuficiente, escala de Aldrete no aplicada, o egreso decidido por presión de flujo quirúrgico?",
      "como": "Asignar personal permanente, exigir el registro de Aldrete y auditar 10 registros de recuperación."
    }
  },
  {
    "id": "I01",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Se aplican y verifican diariamente los paquetes de medidas para prevención de NAV, infección asociada a catéter e infección urinaria asociada a sonda.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Lista de chequeo diaria de bundles",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la unidad de cuidado intensivo",
      "que": "Restablecer la aplicación y verificación diaria de los paquetes de prevención de infecciones asociadas a dispositivos.",
      "porque": "¿Lista de chequeo diaria no diligenciada, desconocimiento de los componentes del bundle, o insumos no disponibles?",
      "como": "Lista de chequeo diaria por paciente con dispositivo, capacitación en los componentes y medición de adherencia semanal."
    }
  },
  {
    "id": "I02",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "La cabecera se mantiene entre 30° y 45° en pacientes con ventilación mecánica y queda registrado.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Observación directa e historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la unidad de cuidado intensivo",
      "que": "Garantizar y registrar la cabecera entre 30° y 45° en todo paciente con ventilación mecánica.",
      "porque": "¿Camas sin indicador de ángulo, posición modificada durante procedimientos sin restituirla, o registro no realizado?",
      "como": "Marcar el ángulo en las camas, verificar en cada ronda de enfermería y registrar en el control por turno."
    }
  },
  {
    "id": "I03",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Se valoran y registran diariamente sedación, analgesia y delirium con escalas validadas (RASS, CAM-ICU).",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la unidad de cuidado intensivo",
      "que": "Implementar la valoración diaria registrada de sedación, analgesia y delirium con escalas validadas.",
      "porque": "¿Escalas no adoptadas, personal sin entrenamiento en RASS y CAM-ICU, o valoración realizada sin registro?",
      "como": "Adoptar las escalas en el formato diario, entrenar al equipo y auditar 10 historias."
    }
  },
  {
    "id": "I04",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Se documenta la prueba diaria de destete o interrupción de la sedación cuando está indicada.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la unidad de cuidado intensivo",
      "que": "Implementar y documentar la prueba diaria de destete o interrupción de la sedación cuando esté indicada.",
      "porque": "¿Protocolo no adoptado, criterios de indicación no definidos, o decisión no registrada en la historia?",
      "como": "Adoptar el protocolo de destete, incluir el ítem en la ronda multidisciplinaria y auditar 10 historias."
    }
  },
  {
    "id": "I05",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Las alarmas de monitores y ventiladores están activas, parametrizadas por paciente y son atendidas oportunamente.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la unidad de cuidado intensivo",
      "que": "Garantizar alarmas activas, parametrizadas por paciente y atendidas oportunamente.",
      "porque": "¿Fatiga de alarmas por parámetros genéricos, silenciamiento prolongado, o desconocimiento de la parametrización?",
      "como": "Parametrizar por paciente en cada turno, capacitar en manejo de alarmas y observar la respuesta durante la ronda."
    }
  },
  {
    "id": "I06",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Las bombas de infusión están rotuladas, correctamente programadas y con doble chequeo en medicamentos de alto riesgo.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Observación directa y registro de doble chequeo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la unidad de cuidado intensivo",
      "que": "Restablecer el rotulado, la programación verificada y el doble chequeo en bombas de infusión de alto riesgo.",
      "porque": "¿Rótulo no disponible, doble chequeo no definido como obligatorio, o personal insuficiente para realizarlo?",
      "como": "Definir el listado de medicamentos con doble chequeo obligatorio, disponer rótulos y registrar la verificación por dos personas."
    }
  },
  {
    "id": "I07",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "La relación de personal por cama corresponde a lo exigido y hay médico permanente en el servicio.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Programación de turnos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la unidad de cuidado intensivo",
      "que": "Ajustar la relación de personal por cama y la disponibilidad de médico permanente al estándar exigido.",
      "porque": "¿Vacantes, ausentismo no reemplazado, o dimensionamiento no ajustado a la ocupación real?",
      "como": "Cuantificar la brecha frente a la Resolución 3100, escalar a gerencia y hacer seguimiento mensual."
    }
  },
  {
    "id": "I08",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Existe registro de la información diaria a la familia y horario de acompañamiento definido.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Registro de información a familiares",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de la unidad de cuidado intensivo",
      "que": "Restablecer la información diaria registrada a la familia y el horario definido de acompañamiento.",
      "porque": "¿Horario no definido, responsable de la información no asignado, o registro de la información no existente?",
      "como": "Definir horario y responsable, disponer el formato de registro y verificar en la siguiente ronda."
    }
  },
  {
    "id": "I09",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Se documentan las metas terapéuticas, la adecuación del esfuerzo terapéutico y la voluntad anticipada cuando aplica.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de la unidad de cuidado intensivo",
      "que": "Documentar las metas terapéuticas, la adecuación del esfuerzo terapéutico y la voluntad anticipada cuando aplique.",
      "porque": "¿Ausencia de procedimiento institucional, equipo sin entrenamiento en la conversación, o decisión tomada sin registrarse?",
      "como": "Adoptar el procedimiento, entrenar al equipo médico y auditar los casos pertinentes del periodo."
    }
  },
  {
    "id": "I10",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "El carro de paro, el desfibrilador y el ventilador de transporte están disponibles y verificados.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Lista de chequeo del equipo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la unidad de cuidado intensivo",
      "que": "Garantizar disponibilidad y verificación del carro de paro, desfibrilador y ventilador de transporte.",
      "porque": "¿Verificación sin responsable asignado, equipo en mantenimiento sin reemplazo, o reposición demorada tras el uso?",
      "como": "Lista de chequeo firmada por turno, plan de contingencia por equipo en mantenimiento y verificación en cada ronda."
    }
  },
  {
    "id": "J01",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "Las órdenes y las muestras cumplen identificación positiva y los criterios documentados de aceptación o rechazo.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Registro de recepción de muestras",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del laboratorio clínico",
      "que": "Aplicar de forma estricta los criterios documentados de aceptación y rechazo de muestras.",
      "porque": "¿Criterios no socializados con los servicios que toman muestras, presión por procesar de todos modos, o registro de rechazo inexistente?",
      "como": "Socializar los criterios con los servicios, registrar cada rechazo con causa y retroalimentar mensualmente."
    }
  },
  {
    "id": "J02",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "Los tiempos de procesamiento y entrega de resultados se miden y cumplen lo definido.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Indicador del servicio",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador del laboratorio clínico",
      "que": "Ajustar los tiempos de procesamiento y entrega de resultados a lo definido.",
      "porque": "¿Equipos con fallas o mantenimiento, volumen superior a la capacidad, o demora en la validación por el profesional?",
      "como": "Analizar los tiempos por fase, ajustar la programación del recurso y presentar el indicador al comité."
    }
  },
  {
    "id": "J03",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "Los valores críticos se reportan de inmediato, con registro de a quién, cuándo y confirmación de recepción.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Libro o registro de valores críticos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del laboratorio clínico",
      "que": "Garantizar el reporte inmediato y registrado de los valores críticos, con confirmación de recepción.",
      "porque": "¿Listado de valores críticos desactualizado, canal de comunicación no definido, o registro sin confirmación de recibido?",
      "como": "Actualizar el listado de valores críticos, definir el canal y exigir registro de a quién, cuándo y confirmación."
    }
  },
  {
    "id": "J04",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "El control de calidad interno se ejecuta y registra según la periodicidad definida y hay participación en control externo.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Registros de control de calidad",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del laboratorio clínico",
      "que": "Restablecer la ejecución y el registro del control de calidad interno y la participación en control externo.",
      "porque": "¿Material de control no disponible, periodicidad no cumplida, o resultados fuera de rango sin acción correctiva?",
      "como": "Asegurar el material de control, cumplir la periodicidad y documentar la acción ante cada resultado fuera de rango."
    }
  },
  {
    "id": "J05",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "Equipos y reactivos cuentan con mantenimiento, calibración y trazabilidad de lote y vencimiento.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Hojas de vida y kardex de reactivos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del laboratorio clínico",
      "que": "Actualizar mantenimiento, calibración y trazabilidad de lote y vencimiento de equipos y reactivos.",
      "porque": "¿Cronograma de mantenimiento vencido, kardex de reactivos no diligenciado, o proveedor sin contrato vigente?",
      "como": "Solicitar cronograma a ingeniería biomédica, restablecer el kardex por lote y verificar en la siguiente ronda."
    }
  },
  {
    "id": "J06",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "La cadena de frío y las condiciones de almacenamiento de reactivos y muestras están controladas y registradas.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Planilla de temperatura",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del laboratorio clínico",
      "que": "Restablecer el control y el registro de la cadena de frío y las condiciones de almacenamiento.",
      "porque": "¿Termómetro descalibrado, registro no diligenciado en todos los turnos, o equipo de refrigeración con fallas?",
      "como": "Gestionar calibración y mantenimiento, definir responsable de registro por turno y auditar la planilla."
    }
  },
  {
    "id": "J07",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "Se cumple la bioseguridad del área: EPP, manejo de derrames, transporte de muestras en triple empaque y ducha o lavaojos funcional.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del laboratorio clínico",
      "que": "Corregir las condiciones de bioseguridad del área identificadas en el recorrido.",
      "porque": "¿EPP no disponible, kit de derrames incompleto, ducha o lavaojos sin mantenimiento, o desconocimiento del procedimiento?",
      "como": "Reponer EPP y kit de derrames, gestionar mantenimiento de ducha y lavaojos, y capacitar en el manejo de derrames."
    }
  },
  {
    "id": "J08",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "La toma de muestras respeta la privacidad y la comodidad del paciente.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Baja",
      "plazo": 60,
      "quien": "Coordinador del laboratorio clínico",
      "que": "Adecuar el área de toma de muestras para garantizar privacidad y comodidad del paciente.",
      "porque": "¿Limitación de infraestructura, ausencia de biombo o cortina, o flujo de personas por el área de toma?",
      "como": "Disponer barrera visual, reorganizar el flujo y escalar la limitación estructural al plan de inversión."
    }
  },
  {
    "id": "J09",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "El servicio transfusional cumple identificación, pruebas pretransfusionales, hemovigilancia y registro de reacciones.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Registros del servicio transfusional",
    "nota": "Marcar NA si la institución no tiene servicio transfusional",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador del laboratorio clínico",
      "que": "Ajustar el servicio transfusional a los requisitos de identificación, pruebas pretransfusionales y hemovigilancia.",
      "porque": "¿Procedimiento desactualizado, registro de reacciones no diligenciado, o falla en la verificación de identidad previa a la transfusión?",
      "como": "Actualizar el procedimiento, capacitar al personal asistencial y auditar el 100 % de las transfusiones del periodo."
    }
  },
  {
    "id": "K01",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Las áreas de recepción, almacenamiento y dispensación están delimitadas, ordenadas y con acceso restringido.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Químico farmacéutico responsable",
      "que": "Delimitar, ordenar y restringir el acceso a las áreas de recepción, almacenamiento y dispensación.",
      "porque": "¿Limitación de espacio, señalización ausente, o control de acceso no implementado?",
      "como": "Redistribuir y señalizar las áreas, definir el control de acceso y verificar en la siguiente ronda."
    }
  },
  {
    "id": "K02",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Se controlan y registran la temperatura y la humedad de las áreas de almacenamiento.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Planillas de control",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico responsable",
      "que": "Restablecer el control y el registro de temperatura y humedad de las áreas de almacenamiento.",
      "porque": "¿Termohigrómetro ausente o descalibrado, registro no diligenciado, o condiciones del área fuera de rango sin acción?",
      "como": "Instalar y calibrar termohigrómetros, definir responsable de registro y documentar la acción ante desviaciones."
    }
  },
  {
    "id": "K03",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Se aplica rotación por fecha de vencimiento y existe control de próximos a vencer.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Kardex e inventario",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico responsable",
      "que": "Restablecer la rotación por fecha de vencimiento y el control de medicamentos próximos a vencer.",
      "porque": "¿Rotación no aplicada en la recepción, ausencia de reporte de próximos a vencer, o compras sin rotación planeada?",
      "como": "Aplicar el sistema de rotación, generar reporte mensual de próximos a vencer y gestionar su uso o devolución."
    }
  },
  {
    "id": "K04",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "La dispensación se realiza por el sistema definido (dosis unitaria u otro), con verificación farmacéutica de la orden.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Observación directa y registro de dispensación",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico responsable",
      "que": "Ajustar la dispensación al sistema definido, con verificación farmacéutica de la orden médica.",
      "porque": "¿Personal insuficiente para la validación, sistema de información sin la orden completa, o presión de tiempo del servicio?",
      "como": "Definir el flujo de validación, ajustar la programación del químico farmacéutico y auditar 20 dispensaciones."
    }
  },
  {
    "id": "K05",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Los medicamentos de control especial cumplen la normativa: libro, actas, condiciones de seguridad y reporte al Fondo Nacional de Estupefacientes.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Libro de control especial y actas",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico responsable",
      "que": "Ajustar el manejo de medicamentos de control especial a la normativa: libro, actas, seguridad y reporte.",
      "porque": "¿Libro desactualizado, condiciones de seguridad insuficientes, o reporte al Fondo Nacional de Estupefacientes no presentado?",
      "como": "Actualizar el libro y conciliar inventario, corregir las condiciones de seguridad y regularizar los reportes."
    }
  },
  {
    "id": "K06",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Existe registro y gestión de faltantes o desabastecimiento, con alternativa terapéutica informada al equipo asistencial.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Registro de faltantes y comunicaciones",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico responsable",
      "que": "Formalizar el registro y la gestión de faltantes, con comunicación de la alternativa terapéutica al equipo asistencial.",
      "porque": "¿Falla del proveedor, ausencia de stock de seguridad, o desabastecimiento no informado oportunamente al servicio?",
      "como": "Registrar cada faltante con causa, definir alternativas con el Comité de Farmacia y comunicar por canal formal al servicio."
    }
  },
  {
    "id": "K07",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Las devoluciones, bajas y destrucción de medicamentos están documentadas.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Actas de baja y devolución",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Químico farmacéutico responsable",
      "que": "Documentar las devoluciones, bajas y destrucción de medicamentos conforme al procedimiento.",
      "porque": "¿Procedimiento no definido, actas no elaboradas, o disposición final sin gestor autorizado?",
      "como": "Adoptar el procedimiento, elaborar actas de cada movimiento y verificar el contrato del gestor de residuos."
    }
  },
  {
    "id": "K08",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Los programas de farmacovigilancia y tecnovigilancia operan con reportes, análisis y retroalimentación al personal.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Reportes y actas del comité",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Químico farmacéutico responsable",
      "que": "Reactivar la operación de farmacovigilancia y tecnovigilancia con análisis y retroalimentación al personal.",
      "porque": "¿Subregistro por desconocimiento del canal, reportes sin análisis, o resultados que no retornan al personal asistencial?",
      "como": "Socializar el canal, analizar los reportes en el comité y retroalimentar los aprendizajes a los servicios."
    }
  },
  {
    "id": "K09",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Las preparaciones magistrales o adecuaciones se realizan en las condiciones exigidas y con trazabilidad.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Registro de preparaciones",
    "nota": "Marcar NA si el servicio no realiza preparaciones",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Químico farmacéutico responsable",
      "que": "Ajustar las preparaciones magistrales o adecuaciones a las condiciones exigidas, con trazabilidad.",
      "porque": "¿Área no cumple condiciones, personal no entrenado, o registro de trazabilidad inexistente?",
      "como": "Verificar las condiciones del área frente a la norma, entrenar al personal y establecer el registro de trazabilidad."
    }
  },
  {
    "id": "L01",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se verifica la identificación del paciente y su correspondencia con el estudio solicitado y la lateralidad.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Observación directa y orden médica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes diagnósticas",
      "que": "Implementar la verificación de identidad, estudio solicitado y lateralidad antes de cada procedimiento.",
      "porque": "¿Verificación no definida como paso obligatorio, orden médica incompleta en la lateralidad, o alto volumen de estudios?",
      "como": "Definir el paso de verificación previo, exigir lateralidad en la orden y auditar 20 estudios del periodo."
    }
  },
  {
    "id": "L02",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se aplica y registra la verificación de embarazo en mujeres en edad fértil antes de estudios con radiación ionizante.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Formato de verificación",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes diagnósticas",
      "que": "Implementar la verificación registrada de embarazo antes de estudios con radiación en mujeres en edad fértil.",
      "porque": "¿Formato no existente, pregunta realizada sin registrarse, o desconocimiento del requisito?",
      "como": "Adoptar el formato de verificación, capacitar al personal y auditar 20 estudios del periodo."
    }
  },
  {
    "id": "L03",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se cumple la protección radiológica: delantales plomados, señalización, dosimetría del personal y licencia vigente.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Recorrido del área y licencia de la práctica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes diagnósticas",
      "que": "Corregir las condiciones de protección radiológica: elementos plomados, señalización, dosimetría y licencia.",
      "porque": "¿Elementos plomados deteriorados o insuficientes, dosimetría sin lectura periódica, o licencia de la práctica vencida?",
      "como": "Inventariar y reponer elementos plomados, regularizar la dosimetría y gestionar la vigencia de la licencia."
    }
  },
  {
    "id": "L04",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "El consentimiento informado para estudios con medio de contraste está firmado y se indaga alergia y función renal.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes diagnósticas",
      "que": "Garantizar el consentimiento informado para medio de contraste, con indagación de alergia y función renal.",
      "porque": "¿Formato no específico, creatinina no solicitada, o consentimiento firmado sin explicación previa?",
      "como": "Ajustar el formato, definir el requisito de función renal según protocolo y auditar 10 estudios con contraste."
    }
  },
  {
    "id": "L05",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Hay disponibilidad de carro de paro e insumos para el manejo de reacción adversa al medio de contraste.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Verificación física",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes diagnósticas",
      "que": "Garantizar la disponibilidad del carro de paro e insumos para manejo de reacción al medio de contraste.",
      "porque": "¿Carro no asignado al área, inventario incompleto, o personal sin entrenamiento en el manejo de la reacción?",
      "como": "Asignar y verificar el carro de paro del área, completar el inventario y entrenar al personal."
    }
  },
  {
    "id": "L06",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Los equipos cuentan con mantenimiento, control de calidad y hoja de vida al día.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Hoja de vida del equipo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes diagnósticas",
      "que": "Actualizar mantenimiento, control de calidad y hoja de vida de los equipos de imágenes.",
      "porque": "¿Cronograma vencido, control de calidad no realizado, o hoja de vida sin actualizar tras las intervenciones?",
      "como": "Solicitar cronograma a ingeniería biomédica, programar el control de calidad y actualizar hojas de vida."
    }
  },
  {
    "id": "L07",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Los hallazgos críticos se comunican de forma inmediata y documentada al médico tratante.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Registro de reporte de hallazgos críticos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de imágenes diagnósticas",
      "que": "Implementar la comunicación inmediata y documentada de hallazgos críticos al médico tratante.",
      "porque": "¿Listado de hallazgos críticos no definido, canal no establecido, o comunicación realizada sin registro?",
      "como": "Definir el listado de hallazgos críticos y el canal de comunicación, y exigir registro con hora y confirmación."
    }
  },
  {
    "id": "L08",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se garantiza la privacidad del paciente y el manejo confidencial de las imágenes.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Observación directa y control de acceso al sistema",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de imágenes diagnósticas",
      "que": "Garantizar la privacidad del paciente y el manejo confidencial de las imágenes.",
      "porque": "¿Área sin barrera visual, control de acceso al sistema compartido, o imágenes visibles a terceros?",
      "como": "Disponer barrera visual, revisar los perfiles de acceso al sistema y socializar el deber de confidencialidad."
    }
  },
  {
    "id": "M01",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "El flujo unidireccional sucio–limpio–estéril se respeta sin cruces.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la central de esterilización",
      "que": "Restablecer el flujo unidireccional sucio–limpio–estéril sin cruces en la central.",
      "porque": "¿Limitación estructural de la planta física, puertas o rutas no señalizadas, o práctica del personal por conveniencia?",
      "como": "Señalizar y controlar las rutas, reorganizar el flujo posible y escalar la limitación estructural al plan de inversión."
    }
  },
  {
    "id": "M02",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "El lavado, secado y empaque del instrumental cumple el protocolo y queda registrado.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Observación directa y planillas",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la central de esterilización",
      "que": "Ajustar y registrar el lavado, secado y empaque del instrumental conforme al protocolo.",
      "porque": "¿Protocolo desactualizado, personal sin entrenamiento, o registro no diligenciado por carga de trabajo?",
      "como": "Actualizar el protocolo, entrenar al personal con verificación de destreza y auditar las planillas semanalmente."
    }
  },
  {
    "id": "M03",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "Se realizan y registran los controles físicos, químicos y biológicos de cada ciclo.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Registros de ciclos",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la central de esterilización",
      "que": "Restablecer la realización y el registro de los controles físicos, químicos y biológicos de cada ciclo.",
      "porque": "¿Indicadores no disponibles, periodicidad del control biológico no cumplida, o registro incompleto por ciclo?",
      "como": "Asegurar el suministro de indicadores, cumplir la periodicidad y documentar la acción ante cada control no conforme."
    }
  },
  {
    "id": "M04",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "Los paquetes estériles están rotulados con contenido, lote, fecha de esterilización y de vencimiento, y se almacenan correctamente.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Observación directa del área de almacenamiento",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la central de esterilización",
      "que": "Corregir el rotulado y las condiciones de almacenamiento de los paquetes estériles.",
      "porque": "¿Rótulo incompleto, estantería inadecuada o próxima a fuentes de humedad, o rotación por vencimiento no aplicada?",
      "como": "Estandarizar el rótulo, adecuar la estantería y aplicar rotación con verificación semanal."
    }
  },
  {
    "id": "M05",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "Los paquetes no presentan humedad, roturas ni indicadores no virados; lo no conforme se retira.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la central de esterilización",
      "que": "Retirar los paquetes no conformes y establecer verificación previa a la entrega.",
      "porque": "¿Falla en el ciclo de secado, empaque inadecuado, o ausencia de verificación antes de la entrega?",
      "como": "Revisar el ciclo con el proveedor del autoclave, verificar cada paquete antes de entregar y registrar los retiros."
    }
  },
  {
    "id": "M06",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "Existe trazabilidad del instrumental estéril hasta el paciente.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Registro de trazabilidad",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la central de esterilización",
      "que": "Implementar la trazabilidad del instrumental estéril hasta el paciente.",
      "porque": "¿No existe sistema de trazabilidad, registro manual incompleto, o el número de lote no se traslada a la historia clínica?",
      "como": "Definir el registro de lote por paquete, trasladarlo al registro quirúrgico y auditar 10 procedimientos."
    }
  },
  {
    "id": "M07",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "Los autoclaves cuentan con mantenimiento, calibración y validación vigentes.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Hoja de vida del equipo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de la central de esterilización",
      "que": "Regularizar mantenimiento, calibración y validación de los autoclaves.",
      "porque": "¿Cronograma vencido, validación no realizada tras reparación, o contrato de mantenimiento sin renovar?",
      "como": "Gestionar el cronograma y la validación con ingeniería biomédica y verificar la vigencia del contrato."
    }
  },
  {
    "id": "M08",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "El personal usa EPP y cumple las condiciones de bioseguridad del área.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de la central de esterilización",
      "que": "Restablecer el uso de EPP y las condiciones de bioseguridad del personal de la central.",
      "porque": "¿EPP no disponible, desconocimiento del riesgo por área, o incomodidad que lleva a omitirlo?",
      "como": "Reponer EPP por área, capacitar en el riesgo específico y verificar por observación directa."
    }
  },
  {
    "id": "N01",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "El equipo de trabajo cumple bioseguridad: barreras, campos, cambio de guantes y protección ocular.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de odontología",
      "que": "Restablecer el cumplimiento de barreras de bioseguridad del equipo odontológico.",
      "porque": "¿Insumos no disponibles, desconocimiento del riesgo de aerosoles, o práctica relajada por costumbre?",
      "como": "Asegurar el suministro de barreras, capacitar en riesgo por aerosoles y verificar por observación directa."
    }
  },
  {
    "id": "N02",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "El instrumental se esteriliza y se trazabiliza; no se reutiliza material desechable.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Registro de esterilización y observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de odontología",
      "que": "Garantizar la esterilización y la trazabilidad del instrumental, y eliminar toda reutilización de desechables.",
      "porque": "¿Instrumental insuficiente para la rotación, desabastecimiento de desechables, o registro de trazabilidad inexistente?",
      "como": "Cuantificar el instrumental necesario, verificar el abastecimiento y establecer el registro de trazabilidad por paciente."
    }
  },
  {
    "id": "N03",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "Las superficies y la unidad odontológica se desinfectan entre pacientes y existe registro.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Planilla de limpieza y observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de odontología",
      "que": "Restablecer la desinfección registrada de superficies y unidad odontológica entre pacientes.",
      "porque": "¿Tiempo entre citas insuficiente, desinfectante no disponible, o registro no diligenciado?",
      "como": "Ajustar la agenda para permitir la desinfección, asegurar el insumo y auditar la planilla semanalmente."
    }
  },
  {
    "id": "N04",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "El manejo de residuos anatomopatológicos, cortopunzantes y de amalgama cumple la normativa.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de odontología",
      "que": "Corregir el manejo de residuos anatomopatológicos, cortopunzantes y de amalgama.",
      "porque": "¿Recipientes inadecuados o ausentes, desconocimiento de la segregación de amalgama, o gestor sin contrato vigente?",
      "como": "Disponer los recipientes exigidos, capacitar en segregación y verificar el contrato del gestor autorizado."
    }
  },
  {
    "id": "N05",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "La historia clínica odontológica incluye odontograma, consentimiento informado y plan de tratamiento.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Auditoría de historias",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de odontología",
      "que": "Completar la historia clínica odontológica con odontograma, consentimiento y plan de tratamiento.",
      "porque": "¿Formato incompleto, registro apresurado por agenda, o desconocimiento de los requisitos normativos?",
      "como": "Ajustar el formato, socializar los requisitos y auditar 10 historias odontológicas."
    }
  },
  {
    "id": "N06",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "Se verifica con el paciente el sitio y la pieza dental a intervenir antes del procedimiento.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de odontología",
      "que": "Implementar la verificación con el paciente del sitio y la pieza dental antes del procedimiento.",
      "porque": "¿Verificación no definida como paso obligatorio, o confianza en la orden sin confirmar con el paciente?",
      "como": "Definir el paso de verificación previo, socializarlo y verificar por observación directa."
    }
  },
  {
    "id": "N07",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "El equipo de rayos X periapical cumple protección radiológica y cuenta con licencia vigente.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Licencia y recorrido del área",
    "nota": "Marcar NA si no se cuenta con equipo de rayos X",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de odontología",
      "que": "Regularizar la protección radiológica y la licencia del equipo de rayos X periapical.",
      "porque": "¿Licencia vencida, delantal plomado ausente o deteriorado, o dosimetría del personal no gestionada?",
      "como": "Gestionar la renovación de la licencia, reponer elementos plomados y regularizar la dosimetría."
    }
  },
  {
    "id": "N08",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "Los medicamentos y anestésicos locales están vigentes, rotulados y con manejo seguro.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Observación directa del stand",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de odontología",
      "que": "Depurar y rotular los medicamentos y anestésicos locales del servicio.",
      "porque": "¿Revisión de vencimientos sin responsable, almacenamiento inadecuado, o rotulación de fecha de apertura ausente?",
      "como": "Asignar responsable de revisión periódica, corregir el almacenamiento y verificar en la siguiente ronda."
    }
  },
  {
    "id": "O01",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Cada usuario cuenta con valoración inicial, plan terapéutico y registro de evolución por sesión.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de terapias y rehabilitación",
      "que": "Completar la valoración inicial, el plan terapéutico y el registro de evolución por sesión.",
      "porque": "¿Formato incompleto, agenda sin tiempo para el registro, o registro consolidado en vez de por sesión?",
      "como": "Ajustar el formato, reservar tiempo de registro en la agenda y auditar 10 historias."
    }
  },
  {
    "id": "O02",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Los equipos terapéuticos tienen mantenimiento, calibración y verificación previa al uso.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Hoja de vida del equipo",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de terapias y rehabilitación",
      "que": "Regularizar mantenimiento, calibración y verificación previa al uso de los equipos terapéuticos.",
      "porque": "¿Cronograma vencido, verificación previa no definida, o hoja de vida sin actualizar?",
      "como": "Solicitar cronograma a ingeniería biomédica, definir la verificación previa por turno y actualizar hojas de vida."
    }
  },
  {
    "id": "O03",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se aplican medidas de prevención de caídas y lesiones durante la sesión (supervisión, arneses, superficies seguras).",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de terapias y rehabilitación",
      "que": "Implementar las medidas de prevención de caídas y lesiones durante la sesión terapéutica.",
      "porque": "¿Supervisión insuficiente por número de usuarios, elementos de sujeción no disponibles, o riesgo no valorado antes de la sesión?",
      "como": "Valorar el riesgo antes de cada sesión, ajustar la relación terapeuta-usuario y disponer los elementos de seguridad."
    }
  },
  {
    "id": "O04",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se verifican contraindicaciones antes de aplicar agentes físicos y se documenta la educación al usuario.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de terapias y rehabilitación",
      "que": "Implementar la verificación registrada de contraindicaciones y la educación al usuario antes de agentes físicos.",
      "porque": "¿Verificación no incorporada al formato, o realizada verbalmente sin registro?",
      "como": "Incluir el chequeo de contraindicaciones en el formato de sesión y auditar 10 registros."
    }
  },
  {
    "id": "O05",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Las áreas son suficientes, limpias, con privacidad y accesibles para el usuario.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Baja",
      "plazo": 60,
      "quien": "Coordinador de terapias y rehabilitación",
      "que": "Adecuar las áreas de terapia en suficiencia, limpieza, privacidad y accesibilidad.",
      "porque": "¿Limitación de espacio, ausencia de barrera visual, o barreras arquitectónicas de acceso?",
      "como": "Reorganizar el espacio disponible, disponer barrera visual y escalar la limitación estructural al plan de inversión."
    }
  },
  {
    "id": "O06",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "El material de uso compartido se limpia y desinfecta entre usuarios, con registro.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Planilla de limpieza",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de terapias y rehabilitación",
      "que": "Restablecer la limpieza y desinfección registrada del material de uso compartido entre usuarios.",
      "porque": "¿Tiempo entre sesiones insuficiente, desinfectante no disponible, o registro no diligenciado?",
      "como": "Ajustar la agenda, asegurar el insumo y auditar la planilla semanalmente."
    }
  },
  {
    "id": "O07",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se realiza tamizaje y manejo del riesgo de broncoaspiración en terapia de deglución.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": "Marcar NA si no se presta terapia de deglución",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de terapias y rehabilitación",
      "que": "Implementar el tamizaje y el manejo del riesgo de broncoaspiración en terapia de deglución.",
      "porque": "¿Tamizaje no adoptado, personal sin entrenamiento, o ausencia de ruta con nutrición y medicina?",
      "como": "Adoptar el tamizaje, entrenar al equipo y definir la ruta de manejo con nutrición y el médico tratante."
    }
  },
  {
    "id": "O08",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se documenta la contrarreferencia y la comunicación con el médico tratante sobre la evolución del usuario.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Historia clínica y formato de contrarreferencia",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de terapias y rehabilitación",
      "que": "Restablecer la contrarreferencia documentada y la comunicación con el médico tratante.",
      "porque": "¿Formato de contrarreferencia no definido, o comunicación realizada de manera informal?",
      "como": "Adoptar el formato de contrarreferencia, definir la periodicidad del reporte y auditar 10 casos."
    }
  },
  {
    "id": "P01",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "La asignación de citas, la oportunidad y las cancelaciones se miden y se gestionan.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Indicador de oportunidad y agenda",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de consulta externa",
      "que": "Fortalecer la medición y la gestión de la oportunidad, la asignación y la cancelación de citas.",
      "porque": "¿Agenda insuficiente frente a la demanda, cancelaciones no reprogramadas, o indicador no analizado?",
      "como": "Analizar oportunidad por especialidad, ajustar la programación de agendas y presentar el indicador al comité."
    }
  },
  {
    "id": "P02",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Se verifica la identificación del paciente y su correspondencia con la agenda antes de la consulta.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de consulta externa",
      "que": "Implementar la verificación de identidad del paciente frente a la agenda antes de la consulta.",
      "porque": "¿Verificación no definida como paso obligatorio, o llamado por nombre sin confirmar documento?",
      "como": "Definir el paso de verificación con dos identificadores y verificar por observación directa."
    }
  },
  {
    "id": "P03",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "El consultorio garantiza privacidad visual y auditiva.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Recorrido del área",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de consulta externa",
      "que": "Adecuar el consultorio para garantizar privacidad visual y auditiva.",
      "porque": "¿Puerta que permanece abierta, ausencia de aislamiento acústico, o consultorio compartido?",
      "como": "Ajustar la disposición del consultorio, gestionar la adecuación acústica y socializar la práctica de puerta cerrada."
    }
  },
  {
    "id": "P04",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "La historia clínica registra motivo de consulta, examen físico, análisis, plan y educación al paciente.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Auditoría de historias",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de consulta externa",
      "que": "Mejorar el contenido de la historia clínica de consulta externa conforme a los requisitos normativos.",
      "porque": "¿Tiempo de consulta insuficiente, uso de plantillas que no reflejan la atención, o desconocimiento de los requisitos?",
      "como": "Retroalimentar individualmente los hallazgos, revisar las plantillas del sistema y reauditar en 30 días."
    }
  },
  {
    "id": "P05",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Los procedimientos menores realizados en consulta cuentan con consentimiento informado, asepsia y registro.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Historia clínica y observación directa",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de consulta externa",
      "que": "Garantizar consentimiento informado, asepsia y registro en los procedimientos menores de consulta.",
      "porque": "¿Consentimiento no exigido para procedimientos menores, insumos de asepsia insuficientes, o registro incompleto?",
      "como": "Definir qué procedimientos requieren consentimiento, verificar insumos y auditar 10 historias."
    }
  },
  {
    "id": "P06",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Se entregan y explican órdenes, fórmulas y signos de alarma, verificando la comprensión del paciente.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Observación directa y entrevista al paciente",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de consulta externa",
      "que": "Implementar la verificación de comprensión al entregar órdenes, fórmulas y signos de alarma.",
      "porque": "¿Tiempo de consulta insuficiente, ausencia de material educativo, o entrega sin verificar comprensión?",
      "como": "Adoptar la técnica de repetición por el paciente, disponer material educativo escrito y verificar por entrevista al usuario."
    }
  },
  {
    "id": "P07",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Existe seguimiento de resultados pendientes y de pacientes que no asisten a control.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Registro de seguimiento",
    "nota": "",
    "prop": {
      "criticidad": "Alta",
      "plazo": 15,
      "quien": "Coordinador de consulta externa",
      "que": "Implementar el seguimiento a resultados pendientes y a pacientes inasistentes al control.",
      "porque": "¿No hay responsable asignado, sistema sin reporte de pendientes, o ausencia de canal de contacto con el usuario?",
      "como": "Definir responsable y periodicidad, generar reporte de pendientes e inasistentes y registrar la gestión de contacto."
    }
  },
  {
    "id": "P08",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Los equipos del consultorio están calibrados y funcionales (tensiómetro, báscula, fonendoscopio, otoscopio).",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Verificación física y sticker de calibración",
    "nota": "",
    "prop": {
      "criticidad": "Media",
      "plazo": 30,
      "quien": "Coordinador de consulta externa",
      "que": "Regularizar la calibración y funcionalidad de los equipos del consultorio.",
      "porque": "¿Cronograma de calibración vencido, equipos sin hoja de vida, o daños no reportados a mantenimiento?",
      "como": "Inventariar los equipos, solicitar cronograma de calibración y verificar stickers en la siguiente ronda."
    }
  }
] as Item[];

export const NOMBRE_BLOQUE: Record<string, string> = Object.fromEntries(
  BLOQUES.map((b) => [b.codigo, b.nombre]),
);

export const TIPO_BLOQUE: Record<string, Bloque['tipo']> = Object.fromEntries(
  BLOQUES.map((b) => [b.codigo, b.tipo]),
);

export const BLOQUES_TRANSVERSALES = BLOQUES.filter((b) => b.tipo === 'transversal');
export const BLOQUES_SERVICIO = BLOQUES.filter((b) => b.tipo === 'servicio');
export const CODIGOS_TRANSVERSALES = new Set(
  BLOQUES_TRANSVERSALES.map((b) => b.codigo),
);

export function itemsDeServicio(servicioCod: string): Item[] {
  return ITEMS.filter((i) => CODIGOS_TRANSVERSALES.has(i.bloque) || i.bloque === servicioCod);
}

export function itemPorId(id: string): Item | undefined {
  return ITEMS.find((i) => i.id === id);
}
