async function findBy(modelName, conditions, attributes) {
    try {
      const Model = sequelize.models[modelName]
      const result = await Model.findOne({
        where: conditions,
        attributes,
      })
      return result
    } catch (error) {
      console.error('Ocorreu um erro durante a consulta:', error)
      throw error
    }
  }
  
  async function findByAll(modelName, conditions, attributes) {
    try {
      const Model = sequelize.models[modelName]
      const result = await Model.findAll({
        where: conditions,
        attributes,
      })
      return result
    } catch (error) {
      console.error('Ocorreu um erro durante a consulta:', error)
      throw error
    }
  }
  
  async function createUserLastId(identifier) {
    try {
      let Player = sequelize.models['players']
      const p = await Player.create({
        identifier: identifier,
      })
  
      const id = p.id
      return id
    } catch (error) {
      console.error('Ocorreu um erro ao criar o usuário:', error)
      throw error
    }
  }
  module.exports = { createUserLastId, findBy, findByAll }
  