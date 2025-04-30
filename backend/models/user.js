
export default  (Sequelize,DataTypes)=>{
    // craetion du modele 
 const user = Sequelize.define('user',{
    Id_U:{
        type: DataTypes.INTEGER ,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
      type: DataTypes.STRING,
      allowNull: false
    },   
    prenom: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'user',  //precise  le nom exact de la table dans PostgreSQL 
    timestamps: true  // pas creer les 2col createdAt et updateAt

 });
  //definir les relations Nb que Cette méthode sera appelée par Sequelize plus tard pour connecter ce modèle aux autres.
  user.associate = (models) => {
    if (models.user_skill) {
      user.hasMany(models.user_skill, { foreignKey: 'Id_U' });
    }
  };
  return user;

};