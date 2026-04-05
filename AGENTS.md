# AGENTS.md

## Agente responsable

Todo el repositorio fue generado por `Codex (GPT-5)` dentro de una sola sesion de trabajo local. No se usaron subagentes adicionales.

## Archivos y capas generadas

- Configuracion base:
  - `serverless.yml`
  - `package.json`
  - `.env.example`
- Capa de modelo:
  - `src/models/parte.model.js`
- Capa de repositorio:
  - `src/repositories/partes.repository.js`
- Capa de negocio:
  - `src/business/partes.service.js`
- Capa de funciones:
  - `src/functions/createParte.js`
  - `src/functions/getPartes.js`
  - `src/functions/getFrontend.js`
- Datos y utilidades de seed:
  - `seed/seed.json`
  - `seed/seed.js`
- Documentacion:
  - `README.md`
  - `AGENTS.md`

## Instrucciones usadas por componente

- Configuracion:
  - Objetivo: levantar una API serverless local con Node.js 18, Serverless Framework v3, `serverless-offline` y `serverless-dynamodb-local`.
  - Restricciones aplicadas: cero credenciales reales, tabla `PartesMoto`, GSI `TipoIndex`, entorno local por defecto.
- Modelo:
  - Objetivo: definir la forma de la entidad `Parte` sin logica adicional.
- Repositorio:
  - Objetivo: centralizar todas las llamadas a DynamoDB usando AWS SDK v3 y endpoint local cuando `IS_OFFLINE` esta activo.
  - Restriccion aplicada: ningun handler o servicio accede directo al SDK.
- Negocio:
  - Objetivo: validar `nombre`, `tipo` y `precio`, construir la entidad con UUID y timestamp ISO, y delegar persistencia/consulta al repositorio.
- Funciones:
  - Objetivo: mapear eventos HTTP a llamadas del servicio y devolver respuestas JSON consistentes con codigos `201`, `200`, `400` y `500`.
- Frontend:
  - Objetivo: servir una interfaz HTML local para crear y consultar partes usando los mismos endpoints del backend.
- Seed:
  - Objetivo: proveer datos iniciales realistas en tres categorias y un script alterno para sembrado manual sobre DynamoDB Local.
- Documentacion:
  - Objetivo: explicar arquitectura, flujo por capas, uso local, ejemplos `curl`, inspeccion de DynamoDB Local y diferencias entre desarrollo offline y deploy real.

## Ajustes manuales posteriores

- Se agrego `seed/seed.js` ademas de `seed/seed.json` para contar con una opcion de sembrado manual fuera del plugin.
- Se normalizo `tipo` a minusculas en la capa de negocio para asegurar consultas consistentes por GSI.
- Se incluyo la tabla DynamoDB y su indice como recursos en `serverless.yml` para que el proyecto quede autocontenido.
- Se agrego el script `npm run seed` como apoyo local, aunque los scripts obligatorios solicitados (`dev` y `deploy`) se mantuvieron.
- Se agrego una funcion frontend que entrega una UI HTML inline para navegar el marketplace desde el navegador sin incorporar un framework aparte.
