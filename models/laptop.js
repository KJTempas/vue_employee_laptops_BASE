'use strict';
module.exports = (sequelize, DataTypes) => {
  const Laptop = sequelize.define('Laptop', {
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    serialNumber: DataTypes.STRING,
    unique: true
  }, {});
  Laptop.associate = function(models) {
    // associations can be defined here
    Laptop.belongsTo(models.Employee, {
      foreignKey: 'employeeId', 
      onDelete: 'SET NULL'
    })
  };
  return Laptop;
};