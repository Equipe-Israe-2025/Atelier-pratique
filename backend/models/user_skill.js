
export default  (Sequelize,DataTypes)=>{
    // craetion du modele 
 const user_skill = Sequelize.define('user_skill',{
    Id_U: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'user',
            key: 'Id_U'
        }
    },
    Id_S: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'skill',
            key: 'Id_S'
        }
    }
  },
  {
    tableName: 'user_skill',  
    timestamps: false  

 });
  //definir les relations Nb que Cette méthode sera appelée par Sequelize plus tard pour connecter ce modèle aux autres.
  user_skill.associate = (models) => {
    user_skill.belongsTo(models.user, { 
        foreignKey: 'Id_U',
        as: 'user'
    });
    user_skill.belongsTo(models.skill, { 
        foreignKey: 'Id_S',
        as: 'skill'
    });
  };

  return user_skill;

};