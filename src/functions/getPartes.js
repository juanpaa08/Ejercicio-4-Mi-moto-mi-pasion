const partesService = require('../business/partes.service');

function buildResponse(statusCode, payload) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(payload)
  };
}

async function handler(event) {
  try {
    const tipo = event.queryStringParameters?.tipo;
    const partes = await partesService.getPartesByTipo(tipo);

    return buildResponse(200, partes);
  } catch (error) {
    const isBadRequest = error.message.startsWith('El ');

    return buildResponse(isBadRequest ? 400 : 500, {
      message: isBadRequest ? error.message : 'Ocurrio un error interno al consultar las partes.',
      details: isBadRequest ? undefined : error.message
    });
  }
}

module.exports = {
  handler
};
