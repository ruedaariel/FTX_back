use pruebaftx;
select * from usuario;

select * from datospersonales;

select * from datos_fisicos;

/*listado de todos los usuarios (todos los datos)*/
SELECT * FROM usuario u
LEFT JOIN datospersonales dp ON u.id = dp.id
LEFT JOIN datos_fisicos df ON u.id = df.id;


/* buscar un ususario completo por mail*/
SELECT * FROM usuario u
LEFT JOIN datospersonales dp ON u.id = dp.id
LEFT JOIN datos_fisicos df ON u.id = df.id
WHERE u.email = 'ariel@correo.com';

/*modificar un campo*/
UPDATE usuario
SET estado = 'inactivo' -- o 'activo', 'archivado'
WHERE id = 5;

/*borrar un ususario OJO NO BORRA EN CASCADA*/
DELETE FROM datos_fisicos WHERE id = 17;
