const { v4: uuidv4 } = require('uuid');
const { ParteModel } = require('../models/parte.model');
const partesRepository = require('../repositories/partes.repository');

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function validateCreateParteInput(input) {
  if (!input || typeof input !== 'object') {
    throw new Error('El cuerpo de la solicitud debe ser un objeto JSON valido.');
  }

  if (!isNonEmptyString(input.nombre)) {
    throw new Error('El campo "nombre" es obligatorio y debe ser un texto no vacio.');
  }

  if (!isNonEmptyString(input.tipo)) {
    throw new Error('El parametro "tipo" es obligatorio y debe ser un texto no vacio.');
  }

  if (typeof input.precio !== 'number' || Number.isNaN(input.precio) || input.precio <= 0) {
    throw new Error('El campo "precio" es obligatorio y debe ser un numero mayor que 0.');
  }
}

function buildParteEntity(input) {
  return {
    id: uuidv4(),
    nombre: input.nombre.trim(),
    tipo: input.tipo.trim().toLowerCase(),
    precio: Number(input.precio),
    creadoEn: new Date().toISOString()
  };
}

async function createParte(input) {
  validateCreateParteInput(input);

  const parte = buildParteEntity(input);
  const expectedKeys = Object.keys(ParteModel);

  for (const key of expectedKeys) {
    if (!(key in parte)) {
      throw new Error(`La entidad Parte no incluye el campo requerido "${key}".`);
    }
  }

  return partesRepository.createParte(parte);
}

async function getPartesByTipo(tipo) {
  if (!isNonEmptyString(tipo)) {
    throw new Error('El query param "tipo" es obligatorio.');
  }

  return partesRepository.getPartesByTipo(tipo.trim().toLowerCase());
}

module.exports = {
  createParte,
  getPartesByTipo,
  validateCreateParteInput,
  buildParteEntity
};
