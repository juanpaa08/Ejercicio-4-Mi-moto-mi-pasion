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
    const parsedBody = event.body ? JSON.parse(event.body) : null;
    const createdParte = await partesService.createParte(parsedBody);

    return buildResponse(201, createdParte);
  } catch (error) {
    const isBadRequest = error instanceof SyntaxError || error.message.startsWith('El ');

    return buildResponse(isBadRequest ? 400 : 500, {
      message: isBadRequest ? error.message : 'Ocurrio un error interno al crear la parte.',
      details: isBadRequest ? undefined : error.message
    });
  }
}

module.exports = {
  handler
};
