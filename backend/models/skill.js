
export default  (Sequelize,DataTypes)=>{
    // craetion du modele 
 const skill = Sequelize.define('skill',{
    Id_S:{
        type: DataTypes.INTEGER ,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },   
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    taux: {
        type: DataTypes.ENUM('1', '2', '3', '4','5'),
        allowNull: false
      }, 
  },
  {
    tableName: 'skill',  
    timestamps: false  

 });
  //definir les relations Nb que Cette méthode sera appelée par Sequelize plus tard pour connecter ce modèle aux autres.
  skill.associate = (models) => {
    if (models.user_skill) {
      skill.hasMany(models.user_skill, { foreignKey: 'Id_S' });
    }
  };

  return skill;

};