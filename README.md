# Moto Parts Marketplace Serverless API

Repositorio monolitico y local-first que simula un entorno de AWS Lambda + DynamoDB sin requerir una cuenta real de AWS. La API permite publicar repuestos para moto y consultarlos por categoria usando una arquitectura serverless por capas.

## Arquitectura

`serverless-offline` simula API Gateway y Lambda en tu maquina local, mientras `serverless-dynamodb-local` levanta una instancia embebida de DynamoDB en el puerto `8000`. Esto permite desarrollar, probar y depurar el flujo completo sin credenciales reales ni recursos remotos.

Topologia de funciones:

1. Una peticion HTTP entra por el endpoint local de Serverless Framework.
2. El handler en `src/functions/*.js` interpreta el evento y arma la respuesta HTTP.
3. La capa de negocio en `src/business/partes.service.js` valida reglas, construye entidades y coordina el caso de uso.
4. La capa de repositorio en `src/repositories/partes.repository.js` encapsula todas las llamadas a DynamoDB.
5. DynamoDB Local persiste y consulta los datos de la tabla `PartesMoto`, incluyendo el GSI `TipoIndex`.

## Responsabilidades por capa

- Model: `src/models/parte.model.js` define la forma de una `Parte` sin ejecutar logica.
- Repository: `src/repositories/partes.repository.js` realiza lecturas y escrituras DynamoDB (`put`, `query`) y no contiene reglas de negocio.
- Business: `src/business/partes.service.js` valida entrada, construye entidades, normaliza datos y llama al repositorio.
- Function: `src/functions/createParte.js` y `src/functions/getPartes.js` traducen eventos HTTP a servicios y formatean la respuesta.

## Estructura del proyecto

```text
moto-parts-serverless/
├── serverless.yml
├── package.json
├── .env.example
├── README.md
├── AGENTS.md
├── seed/
│   ├── seed.js
│   └── seed.json
└── src/
    ├── models/
    │   └── parte.model.js
    ├── repositories/
    │   └── partes.repository.js
    ├── business/
    │   └── partes.service.js
    └── functions/
        ├── createParte.js
        └── getPartes.js
```

## Configuracion local paso a paso

Prerequisitos:

- Node.js 18.x
- npm
- Java Runtime Environment (requerido por DynamoDB Local)

Pasos:

```bash
npm install
serverless dynamodb install
npm run dev
```

La API quedara disponible en `http://localhost:3000/dev`.

Variables locales recomendadas:

1. Copia `.env.example` si quieres personalizar variables.
2. Los valores por defecto ya apuntan a DynamoDB Local y usan credenciales ficticias.

## Endpoints

### `POST /partes`

Crea una nueva parte.

Body JSON:

```json
{
  "nombre": "Carburador Keihin",
  "tipo": "motor",
  "precio": 85.0
}
```

Validaciones:

- `nombre`: obligatorio, string no vacio.
- `tipo`: obligatorio, string no vacio.
- `precio`: obligatorio, numero mayor que `0`.

Ejemplo con `curl`:

```bash
curl -X POST http://localhost:3000/dev/partes \
  -H "Content-Type: application/json" \
  -d "{\"nombre\":\"Carburador Keihin\",\"tipo\":\"motor\",\"precio\":85}"
```

Respuesta esperada `201`:

```json
{
  "id": "uuid-generado",
  "nombre": "Carburador Keihin",
  "tipo": "motor",
  "precio": 85,
  "creadoEn": "2026-04-04T12:00:00.000Z"
}
```

Respuesta esperada `400`:

```json
{
  "message": "El campo \"precio\" es obligatorio y debe ser un numero mayor que 0."
}
```

### `GET /partes?tipo=x`

Consulta partes por categoria usando el indice `TipoIndex`.

Parametro requerido:

- `tipo`

Ejemplo con `curl`:

```bash
curl "http://localhost:3000/dev/partes?tipo=frenos"
```

Respuesta esperada `200`:

```json
[
  {
    "id": "2867f66b-3ff5-4027-a57f-c0886d2c1320",
    "nombre": "Disco de freno delantero Brembo 300mm",
    "tipo": "frenos",
    "precio": 140,
    "creadoEn": "2026-04-04T08:10:00.000Z"
  }
]
```

Respuesta esperada `400`:

```json
{
  "message": "El query param \"tipo\" es obligatorio."
}
```

## DynamoDB Local

La base de datos local escucha en `http://localhost:8000`.

Opciones para inspeccionarla:

- Con AWS CLI: `aws dynamodb scan --table-name PartesMoto --endpoint-url http://localhost:8000`
- Con el script de seed manual: `npm run seed`
- Con cualquier GUI compatible con DynamoDB apuntando al endpoint local

## `npm run dev` vs `npm run deploy`

`npm run dev` levanta la simulacion local completa: API Gateway, Lambdas y DynamoDB Local. No crea nada en AWS.

`npm run deploy` ejecuta el flujo de despliegue real del Serverless Framework hacia AWS. En este proyecto existe para mantener compatibilidad con una futura cuenta real, pero si deseas seguir cumpliendo la restriccion de cero AWS solo debes usar el modo local.

## Datos semilla

`seed/seed.json` incluye 6 repuestos de ejemplo distribuidos entre `motor`, `frenos` y `suspension`. El plugin de DynamoDB los carga automaticamente al iniciar en `dev`.
