import { EntitySchema } from "typeorm";

const Usuario = new EntitySchema({
  name: "Usuario",
  tableName: "usuarios",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    nombre: {
      type: "varchar",
      length: 100,
      nullable: false,
    },
    email: {
      type: "varchar",
      length: 150,
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      length: 255,
      nullable: false,
    },
    createdAt: {
      type: "datetime",
      createDate: true,
    },
  },
});

export default Usuario;
