import type { Bloque, Item } from '../types';

/** Datos maestros extraídos del HTML original. No se modifican desde la UI. */

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
    "nota": ""
  },
  {
    "id": "A02",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "El personal verifica activamente los dos identificadores antes de administrar medicamentos, tomar muestras, transfundir o realizar cualquier procedimiento.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Observación directa de la práctica",
    "nota": ""
  },
  {
    "id": "A03",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "No se utiliza el número de cama, el diagnóstico ni el nombre del servicio como identificador del paciente.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Observación directa y entrevista al personal",
    "nota": ""
  },
  {
    "id": "A04",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "Existe y se conoce el procedimiento para identificar pacientes con barreras: inconscientes, NN, pediátricos o con alteración del estado mental.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Documento institucional y entrevista al personal",
    "nota": ""
  },
  {
    "id": "A05",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "Los pacientes homónimos están señalizados y el equipo conoce la alerta activa.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Observación directa y tablero/censo del servicio",
    "nota": ""
  },
  {
    "id": "A06",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "Las muestras de laboratorio se rotulan en presencia del paciente e inmediatamente después de la toma.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Observación directa de la toma de muestras",
    "nota": ""
  },
  {
    "id": "A07",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "El binomio madre-hijo cuenta con identificación cruzada verificada y registrada.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Observación directa y registro clínico",
    "nota": "Aplica a servicios obstétricos y neonatales"
  },
  {
    "id": "A08",
    "bloque": "A",
    "bloque_nombre": "Identificación correcta del paciente",
    "tipo": "transversal",
    "item": "La identificación del paciente se verifica en cada transición asistencial: ingreso, traslado y egreso.",
    "referencia": "Práctica segura: identificación correcta del paciente. Guía Técnica BPSP (MinSalud) · Res. 3100/2019, estándar procesos prioritarios",
    "fuente": "Registro clínico y lista de entrega de paciente",
    "nota": ""
  },
  {
    "id": "B01",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Todos los puntos de atención cuentan con insumos completos y vigentes para higiene de manos (jabón, toallas desechables, alcohol glicerinado).",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa del punto de atención",
    "nota": ""
  },
  {
    "id": "B02",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Los dispensadores de alcohol glicerinado están ubicados en el punto de atención y se encuentran funcionales.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "B03",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "El personal cumple los cinco momentos de la higiene de manos.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa de al menos 5 oportunidades durante la ronda",
    "nota": ""
  },
  {
    "id": "B04",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "El personal aplica la técnica y el tiempo correctos (40–60 s con agua y jabón; 20–30 s con alcohol glicerinado).",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "B05",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "El personal asistencial cumple 'brazos libres': sin joyas, uñas cortas, sin esmalte ni uñas artificiales.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "B06",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Los elementos de protección personal se usan y se retiran correctamente según el tipo de precaución.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "B07",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Los pacientes en aislamiento están señalizados y el aislamiento se cumple (EPP a la entrada, insumos exclusivos, puerta).",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa y censo de aislamientos",
    "nota": ""
  },
  {
    "id": "B08",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Se cumple la técnica aséptica en la inserción y el manejo de dispositivos invasivos.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa y registro clínico",
    "nota": ""
  },
  {
    "id": "B09",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "La adherencia a higiene de manos se mide, se socializa con el equipo y tiene plan de acción vigente.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Acta de socialización e indicador del servicio",
    "nota": ""
  },
  {
    "id": "B10",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Los residuos hospitalarios cumplen segregación en la fuente; los guardianes están rotulados y no superan 3/4 de su capacidad.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Observación directa de los puntos ecológicos",
    "nota": ""
  },
  {
    "id": "B11",
    "bloque": "B",
    "bloque_nombre": "Higiene de manos y prevención de IAAS",
    "tipo": "transversal",
    "item": "Superficies y equipos de uso clínico están limpios y existe registro de limpieza y desinfección al día.",
    "referencia": "Práctica segura: prevención de IAAS e higiene de manos. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios · Res. 1164/2002 (residuos)",
    "fuente": "Planilla de limpieza y observación directa",
    "nota": ""
  },
  {
    "id": "C01",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Los medicamentos de control especial permanecen bajo llave, con inventario y registro al día.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa y libro/registro de control",
    "nota": ""
  },
  {
    "id": "C02",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Los medicamentos de alto riesgo (LASA, electrolitos concentrados, anticoagulantes, insulinas, opioides) tienen rótulo diferenciado y almacenamiento separado.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa del stand de medicamentos",
    "nota": ""
  },
  {
    "id": "C03",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "No hay electrolitos concentrados sin diluir en el carro de paro ni en el stand del servicio, salvo autorización expresa.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "C04",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "No se encuentran medicamentos vencidos, sin rótulo, sin fecha de apertura ni reenvasados sin trazabilidad.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa del stand y la nevera",
    "nota": ""
  },
  {
    "id": "C05",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Se cumple la cadena de frío: nevera exclusiva, termómetro calibrado y registro de temperatura diligenciado.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Planilla de temperatura y observación directa",
    "nota": ""
  },
  {
    "id": "C06",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Se aplican los correctos de la administración de medicamentos (paciente, medicamento, dosis, vía, hora, registro, educación, caducidad y respuesta).",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa de la administración",
    "nota": ""
  },
  {
    "id": "C07",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Las mezclas y diluciones se rotulan con paciente, medicamento, dosis, diluyente, hora y responsable.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa de las infusiones activas",
    "nota": ""
  },
  {
    "id": "C08",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "El carro de paro está sellado, con inventario vigente, desfibrilador funcional y verificación diaria registrada.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Lista de chequeo del carro de paro",
    "nota": ""
  },
  {
    "id": "C09",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Existe conciliación medicamentosa documentada al ingreso, en el traslado y en el egreso.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "C10",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Se reportan las reacciones adversas y los errores de medicación al programa de farmacovigilancia.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Reportes del periodo y entrevista al personal",
    "nota": ""
  },
  {
    "id": "C11",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Los dispositivos médicos cuentan con registro sanitario vigente y se reporta al programa de tecnovigilancia.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Inventario y reportes de tecnovigilancia",
    "nota": ""
  },
  {
    "id": "C12",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "Los equipos biomédicos tienen hoja de vida, mantenimiento preventivo y calibración vigentes.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Hoja de vida del equipo y sticker de calibración",
    "nota": ""
  },
  {
    "id": "C13",
    "bloque": "C",
    "bloque_nombre": "Seguridad en medicamentos y dispositivos médicos",
    "tipo": "transversal",
    "item": "No se reutilizan dispositivos médicos de un solo uso.",
    "referencia": "Práctica segura: uso seguro de medicamentos. Guía Técnica BPSP · Res. 3100/2019, estándar de medicamentos, dispositivos e insumos · Res. 1403/2007",
    "fuente": "Observación directa y entrevista al personal",
    "nota": ""
  },
  {
    "id": "D01",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "A todo paciente se le aplica y registra la escala de valoración de riesgo de caídas al ingreso y con la periodicidad definida.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "D02",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "Los pacientes con riesgo alto de caída están señalizados y con medidas implementadas (barandas, timbre al alcance, calzado antideslizante, acompañante).",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "D03",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "Los pisos están secos, señalizados cuando hay humedad, libres de obstáculos y con iluminación adecuada.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Observación directa del área",
    "nota": ""
  },
  {
    "id": "D04",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "Camas y camillas tienen frenos funcionales y barandas en buen estado.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Verificación física de las unidades",
    "nota": ""
  },
  {
    "id": "D05",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "A todo paciente en riesgo se le aplica y registra la escala de valoración de lesiones por presión (Braden o Norton).",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "D06",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "Se cumplen las medidas de prevención de LPP: cambios de posición registrados, superficies de apoyo, protección de prominencias y valoración diaria de la piel.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Historia clínica y observación directa",
    "nota": ""
  },
  {
    "id": "D07",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "El traslado intra e interinstitucional se realiza con acompañamiento, monitoreo e informe de entrega documentado.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Formato de traslado y entrega",
    "nota": ""
  },
  {
    "id": "D08",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "La contención física o farmacológica cuenta con orden médica, consentimiento, reevaluación periódica y registro.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Historia clínica",
    "nota": "Marcar NA si no se emplea contención"
  },
  {
    "id": "D09",
    "bloque": "D",
    "bloque_nombre": "Gestión del riesgo del paciente (caídas, LPP, traslado)",
    "tipo": "transversal",
    "item": "Se valora e interviene el riesgo nutricional y de broncoaspiración en los pacientes que lo requieren.",
    "referencia": "Práctica segura: prevención de caídas y de úlceras por presión. Guía Técnica BPSP · Res. 3100/2019, procesos prioritarios",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "E01",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "El talento humano del servicio cumple perfil, cantidad y suficiencia conforme a la Resolución 3100 de 2019.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Programación de turnos y verificación de perfiles",
    "nota": ""
  },
  {
    "id": "E02",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "El personal acredita inducción, reinducción y capacitación vigente en seguridad del paciente.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Registros de capacitación y entrevista al personal",
    "nota": ""
  },
  {
    "id": "E03",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Los profesionales cuentan con inscripción vigente en el ReTHUS y con las autorizaciones que apliquen.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Consulta ReTHUS y hoja de vida",
    "nota": ""
  },
  {
    "id": "E04",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "La historia clínica es única, legible, oportuna, completa y con identificación del responsable de cada registro.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Auditoría de historias del servicio",
    "nota": ""
  },
  {
    "id": "E05",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Las notas registran valoración, plan de manejo, evolución y educación al paciente y su familia.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Auditoría de historias del servicio",
    "nota": ""
  },
  {
    "id": "E06",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "El consentimiento informado está diligenciado, firmado y es específico para el procedimiento realizado.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "E07",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Se aplica una herramienta estandarizada para la entrega de turno y la transferencia de pacientes.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Observación de la entrega de turno y formato institucional",
    "nota": ""
  },
  {
    "id": "E08",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Las órdenes verbales o telefónicas se registran y se confirman mediante repetición (read-back).",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Historia clínica y observación directa",
    "nota": "Marcar NA si el servicio no las usa"
  },
  {
    "id": "E09",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "El personal conoce el procedimiento de reporte de incidentes y eventos adversos y lo percibe como no punitivo.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Entrevista a mínimo 3 miembros del equipo",
    "nota": ""
  },
  {
    "id": "E10",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Los eventos adversos del servicio están reportados, analizados con Protocolo de Londres y con plan de mejoramiento vigente.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Base de eventos y actas de análisis",
    "nota": ""
  },
  {
    "id": "E11",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Los planes de mejoramiento derivados de rondas y eventos previos muestran avance verificable.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Plan de mejoramiento institucional",
    "nota": ""
  },
  {
    "id": "E12",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Se realiza y documenta la información al paciente y su familia frente al evento adverso ocurrido.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Historia clínica y acta de información",
    "nota": "Marcar NA si no se presentaron eventos en el periodo"
  },
  {
    "id": "E13",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "Los indicadores de seguridad del paciente del servicio se miden, se publican y se socializan con el equipo.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Cartelera del servicio y acta de socialización",
    "nota": ""
  },
  {
    "id": "E14",
    "bloque": "E",
    "bloque_nombre": "Talento humano, historia clínica, comunicación y evento adverso",
    "tipo": "transversal",
    "item": "El servicio cumple las condiciones de infraestructura y dotación exigidas y cuenta con señalización de rutas de evacuación.",
    "referencia": "Res. 3100/2019, estándares de talento humano, historia clínica y registros, y procesos prioritarios · Res. 1995/1999 · Política Nacional de Seguridad del Paciente",
    "fuente": "Recorrido del área",
    "nota": ""
  },
  {
    "id": "F01",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "El triage se aplica con la escala definida en la Resolución 5596 de 2015, por personal autorizado y con registro de la hora.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Registro de triage",
    "nota": ""
  },
  {
    "id": "F02",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Se cumplen los tiempos de atención por categoría de triage y se miden los desistimientos.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Indicador del servicio",
    "nota": ""
  },
  {
    "id": "F03",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Los pacientes en sala de espera cuentan con vigilancia y reevaluación documentada.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Observación directa y registro de reevaluación",
    "nota": ""
  },
  {
    "id": "F04",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "La sala de reanimación está completa, funcional y con verificación diaria registrada.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Lista de chequeo de la sala",
    "nota": ""
  },
  {
    "id": "F05",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Existe control del tiempo de estancia en urgencias y gestión activa de la sobreocupación.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Censo y tablero de gestión",
    "nota": ""
  },
  {
    "id": "F06",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Los pacientes en observación tienen monitoreo, evolución y reevaluación médica documentada según su condición.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "F07",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Los códigos institucionales (azul, rojo, ACV, IAM, sepsis, trauma) se identifican y activan oportunamente.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Entrevista al personal y registro de activaciones",
    "nota": ""
  },
  {
    "id": "F08",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Se aplica la ruta de atención integral a víctimas de violencia sexual e intrafamiliar y se cumple la notificación obligatoria.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Historia clínica y notificación SIVIGILA",
    "nota": ""
  },
  {
    "id": "F09",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Se respeta la separación de áreas: adultos, pediatría, aislamiento y gineco-obstétrica.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Recorrido del área",
    "nota": ""
  },
  {
    "id": "F10",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Los pacientes que requieren remisión cuentan con gestión documentada, referencia aceptada y traslado seguro.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Formato de referencia y contrarreferencia",
    "nota": ""
  },
  {
    "id": "F11",
    "bloque": "F",
    "bloque_nombre": "Urgencias",
    "tipo": "servicio",
    "item": "Se garantiza la custodia de pertenencias y la seguridad del paciente con alteración mental o riesgo de fuga.",
    "referencia": "Res. 3100/2019, servicio de urgencias · Res. 5596/2015 (triage) · Res. 459/2012 (violencia sexual)",
    "fuente": "Observación directa y formato de custodia",
    "nota": ""
  },
  {
    "id": "G01",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "La ronda médica y de enfermería se realiza y registra con la periodicidad definida.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "G02",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "La relación de personal por paciente corresponde a la complejidad del servicio.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Programación de turnos y censo",
    "nota": ""
  },
  {
    "id": "G03",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Los timbres de llamado funcionan y están al alcance de todos los pacientes.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Verificación física por unidad",
    "nota": ""
  },
  {
    "id": "G04",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Los pacientes con dispositivos invasivos tienen registro de fecha de inserción, valoración diaria del sitio y criterio de retiro.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Historia clínica y observación del sitio",
    "nota": ""
  },
  {
    "id": "G05",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Se aplica y registra la valoración y el manejo del dolor.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "G06",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "El plan de egreso incluye educación, conciliación de medicamentos y cita de control documentada.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Epicrisis y formato de egreso",
    "nota": ""
  },
  {
    "id": "G07",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Las unidades de paciente están limpias, completas y con dotación funcional.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Recorrido del área",
    "nota": ""
  },
  {
    "id": "G08",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Se cumple lo definido institucionalmente sobre visitas y acompañamiento permanente.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Observación directa y política institucional",
    "nota": ""
  },
  {
    "id": "G09",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "Los pacientes con riesgo de deterioro clínico se detectan con escala de alerta temprana y existe respuesta documentada.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "G10",
    "bloque": "G",
    "bloque_nombre": "Hospitalización",
    "tipo": "servicio",
    "item": "La entrega y recepción de pacientes entre servicios se realiza con lista de chequeo firmada.",
    "referencia": "Res. 3100/2019, servicio de hospitalización · Guía Técnica BPSP",
    "fuente": "Formato de entrega de paciente",
    "nota": ""
  },
  {
    "id": "H01",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "La lista de verificación de cirugía segura se diligencia completa en sus tres momentos (entrada, pausa quirúrgica y salida) y con firmas del equipo.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Lista de chequeo de las cirugías del periodo",
    "nota": ""
  },
  {
    "id": "H02",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "El marcado del sitio quirúrgico lo realiza el cirujano, con participación del paciente, y queda registrado.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Observación directa e historia clínica",
    "nota": ""
  },
  {
    "id": "H03",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "El conteo de gasas, compresas, agujas e instrumental se realiza y registra antes, durante y al cierre.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Formato de conteo quirúrgico",
    "nota": ""
  },
  {
    "id": "H04",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "La profilaxis antibiótica se administra dentro de la ventana de tiempo definida y queda documentada.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Registro de anestesia e historia clínica",
    "nota": ""
  },
  {
    "id": "H05",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "La valoración preanestésica está documentada y vigente, con clasificación ASA y plan anestésico.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "H06",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "Los consentimientos informados quirúrgico y anestésico están firmados, son específicos y previos al procedimiento.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "H07",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "Las áreas quirúrgicas cumplen la restricción de circulación, el uso de vestier y el flujo separado de material limpio y sucio.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Recorrido del área",
    "nota": ""
  },
  {
    "id": "H08",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "Los equipos de anestesia y monitoreo tienen verificación previa registrada, con respaldo de fuente eléctrica y de oxígeno.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Lista de chequeo de máquina de anestesia",
    "nota": ""
  },
  {
    "id": "H09",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "Se cumplen las medidas de prevención de hipotermia, tromboembolismo y lesiones por posicionamiento.",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Registro de anestesia y observación directa",
    "nota": ""
  },
  {
    "id": "H10",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "El manejo y la trazabilidad de las piezas de patología están garantizados (rotulado, cadena de custodia y entrega).",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Libro de piezas y formato de entrega",
    "nota": ""
  },
  {
    "id": "H11",
    "bloque": "H",
    "bloque_nombre": "Cirugía y anestesia",
    "tipo": "servicio",
    "item": "La recuperación posanestésica cuenta con monitoreo, personal permanente y criterios de egreso documentados (Aldrete).",
    "referencia": "Práctica segura: cirugía segura. Res. 3100/2019, servicio de cirugía · Lista de verificación de cirugía segura (OMS/MinSalud)",
    "fuente": "Registro de recuperación",
    "nota": ""
  },
  {
    "id": "I01",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Se aplican y verifican diariamente los paquetes de medidas para prevención de NAV, infección asociada a catéter e infección urinaria asociada a sonda.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Lista de chequeo diaria de bundles",
    "nota": ""
  },
  {
    "id": "I02",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "La cabecera se mantiene entre 30° y 45° en pacientes con ventilación mecánica y queda registrado.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Observación directa e historia clínica",
    "nota": ""
  },
  {
    "id": "I03",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Se valoran y registran diariamente sedación, analgesia y delirium con escalas validadas (RASS, CAM-ICU).",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "I04",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Se documenta la prueba diaria de destete o interrupción de la sedación cuando está indicada.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "I05",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Las alarmas de monitores y ventiladores están activas, parametrizadas por paciente y son atendidas oportunamente.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "I06",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Las bombas de infusión están rotuladas, correctamente programadas y con doble chequeo en medicamentos de alto riesgo.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Observación directa y registro de doble chequeo",
    "nota": ""
  },
  {
    "id": "I07",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "La relación de personal por cama corresponde a lo exigido y hay médico permanente en el servicio.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Programación de turnos",
    "nota": ""
  },
  {
    "id": "I08",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Existe registro de la información diaria a la familia y horario de acompañamiento definido.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Registro de información a familiares",
    "nota": ""
  },
  {
    "id": "I09",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "Se documentan las metas terapéuticas, la adecuación del esfuerzo terapéutico y la voluntad anticipada cuando aplica.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "I10",
    "bloque": "I",
    "bloque_nombre": "UCI / cuidado crítico",
    "tipo": "servicio",
    "item": "El carro de paro, el desfibrilador y el ventilador de transporte están disponibles y verificados.",
    "referencia": "Res. 3100/2019, servicio de cuidado intensivo · Guía Técnica BPSP (prevención de IAAS asociadas a dispositivos)",
    "fuente": "Lista de chequeo del equipo",
    "nota": ""
  },
  {
    "id": "J01",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "Las órdenes y las muestras cumplen identificación positiva y los criterios documentados de aceptación o rechazo.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Registro de recepción de muestras",
    "nota": ""
  },
  {
    "id": "J02",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "Los tiempos de procesamiento y entrega de resultados se miden y cumplen lo definido.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Indicador del servicio",
    "nota": ""
  },
  {
    "id": "J03",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "Los valores críticos se reportan de inmediato, con registro de a quién, cuándo y confirmación de recepción.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Libro o registro de valores críticos",
    "nota": ""
  },
  {
    "id": "J04",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "El control de calidad interno se ejecuta y registra según la periodicidad definida y hay participación en control externo.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Registros de control de calidad",
    "nota": ""
  },
  {
    "id": "J05",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "Equipos y reactivos cuentan con mantenimiento, calibración y trazabilidad de lote y vencimiento.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Hojas de vida y kardex de reactivos",
    "nota": ""
  },
  {
    "id": "J06",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "La cadena de frío y las condiciones de almacenamiento de reactivos y muestras están controladas y registradas.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Planilla de temperatura",
    "nota": ""
  },
  {
    "id": "J07",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "Se cumple la bioseguridad del área: EPP, manejo de derrames, transporte de muestras en triple empaque y ducha o lavaojos funcional.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Recorrido del área",
    "nota": ""
  },
  {
    "id": "J08",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "La toma de muestras respeta la privacidad y la comodidad del paciente.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "J09",
    "bloque": "J",
    "bloque_nombre": "Laboratorio clínico",
    "tipo": "servicio",
    "item": "El servicio transfusional cumple identificación, pruebas pretransfusionales, hemovigilancia y registro de reacciones.",
    "referencia": "Res. 3100/2019, laboratorio clínico · Decreto 1011/2006 · Res. 1441/2013 (banco de sangre)",
    "fuente": "Registros del servicio transfusional",
    "nota": "Marcar NA si la institución no tiene servicio transfusional"
  },
  {
    "id": "K01",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Las áreas de recepción, almacenamiento y dispensación están delimitadas, ordenadas y con acceso restringido.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Recorrido del área",
    "nota": ""
  },
  {
    "id": "K02",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Se controlan y registran la temperatura y la humedad de las áreas de almacenamiento.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Planillas de control",
    "nota": ""
  },
  {
    "id": "K03",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Se aplica rotación por fecha de vencimiento y existe control de próximos a vencer.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Kardex e inventario",
    "nota": ""
  },
  {
    "id": "K04",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "La dispensación se realiza por el sistema definido (dosis unitaria u otro), con verificación farmacéutica de la orden.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Observación directa y registro de dispensación",
    "nota": ""
  },
  {
    "id": "K05",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Los medicamentos de control especial cumplen la normativa: libro, actas, condiciones de seguridad y reporte al Fondo Nacional de Estupefacientes.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Libro de control especial y actas",
    "nota": ""
  },
  {
    "id": "K06",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Existe registro y gestión de faltantes o desabastecimiento, con alternativa terapéutica informada al equipo asistencial.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Registro de faltantes y comunicaciones",
    "nota": ""
  },
  {
    "id": "K07",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Las devoluciones, bajas y destrucción de medicamentos están documentadas.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Actas de baja y devolución",
    "nota": ""
  },
  {
    "id": "K08",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Los programas de farmacovigilancia y tecnovigilancia operan con reportes, análisis y retroalimentación al personal.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Reportes y actas del comité",
    "nota": ""
  },
  {
    "id": "K09",
    "bloque": "K",
    "bloque_nombre": "Servicio farmacéutico",
    "tipo": "servicio",
    "item": "Las preparaciones magistrales o adecuaciones se realizan en las condiciones exigidas y con trazabilidad.",
    "referencia": "Res. 3100/2019, servicio farmacéutico · Decreto 780/2016 · Res. 1478/2006 (control especial) · Res. 1403/2007",
    "fuente": "Registro de preparaciones",
    "nota": "Marcar NA si el servicio no realiza preparaciones"
  },
  {
    "id": "L01",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se verifica la identificación del paciente y su correspondencia con el estudio solicitado y la lateralidad.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Observación directa y orden médica",
    "nota": ""
  },
  {
    "id": "L02",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se aplica y registra la verificación de embarazo en mujeres en edad fértil antes de estudios con radiación ionizante.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Formato de verificación",
    "nota": ""
  },
  {
    "id": "L03",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se cumple la protección radiológica: delantales plomados, señalización, dosimetría del personal y licencia vigente.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Recorrido del área y licencia de la práctica",
    "nota": ""
  },
  {
    "id": "L04",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "El consentimiento informado para estudios con medio de contraste está firmado y se indaga alergia y función renal.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "L05",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Hay disponibilidad de carro de paro e insumos para el manejo de reacción adversa al medio de contraste.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Verificación física",
    "nota": ""
  },
  {
    "id": "L06",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Los equipos cuentan con mantenimiento, control de calidad y hoja de vida al día.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Hoja de vida del equipo",
    "nota": ""
  },
  {
    "id": "L07",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Los hallazgos críticos se comunican de forma inmediata y documentada al médico tratante.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Registro de reporte de hallazgos críticos",
    "nota": ""
  },
  {
    "id": "L08",
    "bloque": "L",
    "bloque_nombre": "Imágenes diagnósticas",
    "tipo": "servicio",
    "item": "Se garantiza la privacidad del paciente y el manejo confidencial de las imágenes.",
    "referencia": "Res. 3100/2019, imágenes diagnósticas · Res. 482/2018 (protección radiológica)",
    "fuente": "Observación directa y control de acceso al sistema",
    "nota": ""
  },
  {
    "id": "M01",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "El flujo unidireccional sucio–limpio–estéril se respeta sin cruces.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Recorrido del área",
    "nota": ""
  },
  {
    "id": "M02",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "El lavado, secado y empaque del instrumental cumple el protocolo y queda registrado.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Observación directa y planillas",
    "nota": ""
  },
  {
    "id": "M03",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "Se realizan y registran los controles físicos, químicos y biológicos de cada ciclo.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Registros de ciclos",
    "nota": ""
  },
  {
    "id": "M04",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "Los paquetes estériles están rotulados con contenido, lote, fecha de esterilización y de vencimiento, y se almacenan correctamente.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Observación directa del área de almacenamiento",
    "nota": ""
  },
  {
    "id": "M05",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "Los paquetes no presentan humedad, roturas ni indicadores no virados; lo no conforme se retira.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "M06",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "Existe trazabilidad del instrumental estéril hasta el paciente.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Registro de trazabilidad",
    "nota": ""
  },
  {
    "id": "M07",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "Los autoclaves cuentan con mantenimiento, calibración y validación vigentes.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Hoja de vida del equipo",
    "nota": ""
  },
  {
    "id": "M08",
    "bloque": "M",
    "bloque_nombre": "Central de esterilización",
    "tipo": "servicio",
    "item": "El personal usa EPP y cumple las condiciones de bioseguridad del área.",
    "referencia": "Res. 3100/2019, esterilización · Manual de buenas prácticas de esterilización (MinSalud)",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "N01",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "El equipo de trabajo cumple bioseguridad: barreras, campos, cambio de guantes y protección ocular.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "N02",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "El instrumental se esteriliza y se trazabiliza; no se reutiliza material desechable.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Registro de esterilización y observación directa",
    "nota": ""
  },
  {
    "id": "N03",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "Las superficies y la unidad odontológica se desinfectan entre pacientes y existe registro.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Planilla de limpieza y observación directa",
    "nota": ""
  },
  {
    "id": "N04",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "El manejo de residuos anatomopatológicos, cortopunzantes y de amalgama cumple la normativa.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Recorrido del área",
    "nota": ""
  },
  {
    "id": "N05",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "La historia clínica odontológica incluye odontograma, consentimiento informado y plan de tratamiento.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Auditoría de historias",
    "nota": ""
  },
  {
    "id": "N06",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "Se verifica con el paciente el sitio y la pieza dental a intervenir antes del procedimiento.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "N07",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "El equipo de rayos X periapical cumple protección radiológica y cuenta con licencia vigente.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Licencia y recorrido del área",
    "nota": "Marcar NA si no se cuenta con equipo de rayos X"
  },
  {
    "id": "N08",
    "bloque": "N",
    "bloque_nombre": "Odontología",
    "tipo": "servicio",
    "item": "Los medicamentos y anestésicos locales están vigentes, rotulados y con manejo seguro.",
    "referencia": "Res. 3100/2019, odontología · Res. 1164/2002 · Res. 4816/2008 (tecnovigilancia)",
    "fuente": "Observación directa del stand",
    "nota": ""
  },
  {
    "id": "O01",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Cada usuario cuenta con valoración inicial, plan terapéutico y registro de evolución por sesión.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "O02",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Los equipos terapéuticos tienen mantenimiento, calibración y verificación previa al uso.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Hoja de vida del equipo",
    "nota": ""
  },
  {
    "id": "O03",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se aplican medidas de prevención de caídas y lesiones durante la sesión (supervisión, arneses, superficies seguras).",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "O04",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se verifican contraindicaciones antes de aplicar agentes físicos y se documenta la educación al usuario.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": ""
  },
  {
    "id": "O05",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Las áreas son suficientes, limpias, con privacidad y accesibles para el usuario.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Recorrido del área",
    "nota": ""
  },
  {
    "id": "O06",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "El material de uso compartido se limpia y desinfecta entre usuarios, con registro.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Planilla de limpieza",
    "nota": ""
  },
  {
    "id": "O07",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se realiza tamizaje y manejo del riesgo de broncoaspiración en terapia de deglución.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Historia clínica",
    "nota": "Marcar NA si no se presta terapia de deglución"
  },
  {
    "id": "O08",
    "bloque": "O",
    "bloque_nombre": "Terapias y rehabilitación",
    "tipo": "servicio",
    "item": "Se documenta la contrarreferencia y la comunicación con el médico tratante sobre la evolución del usuario.",
    "referencia": "Res. 3100/2019, servicios de rehabilitación · Guía Técnica BPSP",
    "fuente": "Historia clínica y formato de contrarreferencia",
    "nota": ""
  },
  {
    "id": "P01",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "La asignación de citas, la oportunidad y las cancelaciones se miden y se gestionan.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Indicador de oportunidad y agenda",
    "nota": ""
  },
  {
    "id": "P02",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Se verifica la identificación del paciente y su correspondencia con la agenda antes de la consulta.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Observación directa",
    "nota": ""
  },
  {
    "id": "P03",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "El consultorio garantiza privacidad visual y auditiva.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Recorrido del área",
    "nota": ""
  },
  {
    "id": "P04",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "La historia clínica registra motivo de consulta, examen físico, análisis, plan y educación al paciente.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Auditoría de historias",
    "nota": ""
  },
  {
    "id": "P05",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Los procedimientos menores realizados en consulta cuentan con consentimiento informado, asepsia y registro.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Historia clínica y observación directa",
    "nota": ""
  },
  {
    "id": "P06",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Se entregan y explican órdenes, fórmulas y signos de alarma, verificando la comprensión del paciente.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Observación directa y entrevista al paciente",
    "nota": ""
  },
  {
    "id": "P07",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Existe seguimiento de resultados pendientes y de pacientes que no asisten a control.",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Registro de seguimiento",
    "nota": ""
  },
  {
    "id": "P08",
    "bloque": "P",
    "bloque_nombre": "Consulta externa",
    "tipo": "servicio",
    "item": "Los equipos del consultorio están calibrados y funcionales (tensiómetro, báscula, fonendoscopio, otoscopio).",
    "referencia": "Res. 3100/2019, consulta externa · Res. 1552/2013 (asignación de citas) · Guía Técnica BPSP",
    "fuente": "Verificación física y sticker de calibración",
    "nota": ""
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
