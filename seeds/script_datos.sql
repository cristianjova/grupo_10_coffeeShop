INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `size_id`, `roast_id`, `toast_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Origen Etiopía', 'Intensamente aromático y muy complejo. Frutal, especiado y dulce. Acidez rústica y gran cuerpo. De características singulares.', 1949.98, 'product_1.webp', 1, 1, 2, NULL, NULL),
(2, 'Origen Brasil', 'Achocolatado, dulce, con notas de nuez y fondos de tabacos. Acidez moderada y cuerpo medio a liviano, intensidad media.', 4435.93, 'product_2.webp', 1, 1, 1, NULL, NULL),
(3, 'Origen Colombia', 'Equilibrio entre sus notas aromáticas frutales y cítricas, sabor achocolatado y sutilmente picante.', 4394.79, 'product_3.webp', 1, 1, 1, NULL, NULL),
(4, 'Origen Perú', 'Gran cuerpo con sabor achocolatado. Notas frutales combinadas con una especial acidez e intensidad de aroma.', 3533.78, 'product_4.webp', 1, 1, 1, NULL, NULL),
(5, 'Origen El Salvador', 'Floral en fragancia y de gran dulzor en el sabor y tersura en el cuerpo. Muy sutil en su gran complejidad. Acidez brillante. ', 2546.72, 'product_5.webp', 1, 1, 1, NULL, NULL),
(6, 'Origen Guatemala', 'Sabor sutilmente picante con especial sabor achocolatado. Equilibrio cítrico entre sus notas frutales, de importante aroma.', 1972.47, 'product_6.webp', 1, 2, 3, NULL, NULL),
(7, 'Origen Bolivia', 'Floral muy dulce en aroma, con sabores de avellana, almendra y manteca. Acidez frutal brillante y cuerpo sedoso. Gran dulzor.', 4883.26, 'product_7.webp', 2, 1, 3, NULL, NULL),
(8, 'Origen India', 'Cuerpo muy potente, acidez baja. En aroma predominan las hierbas secas y en boca las maderas y especias.', 4637.95, 'product_9.webp', 1, 3, 1, NULL, NULL),
(9, 'Origen Burundí', 'Los aromas a frutas pasas y caramelos claros con sabor a especias dulces. Cuerpo muy completo y acidez media.', 4270.33, 'product_10.webp', 1, 1, 1, NULL, NULL),
(10, 'Origen Isla de Java', 'Muy brillante en su acidez. Floral y dulce en aroma. Especiado en boca. Muy elegante y limpio en taza.', 4123.28, 'product_11.webp', 1, 1, 1, NULL, NULL),
(11, 'Origen Kenya', 'En aroma y sabor es un café intensamente frutal. De gran acidez, posee un excelente cuerpo y prolongada persistencia.', 2265.24, 'product_12.webp', 1, 2, 2, NULL, NULL),
(12, 'Origen Papúa Nueva Guinea', 'Es un café de gran cuerpo y equilibrio. Se destacan los aromas a resinas y frutas con sabores a chocolates negros.', 3436.91, 'product_13.webp', 1, 1, 1, NULL, NULL),
(13, 'Origen Ruanda', 'Notas aromáticas de especias y frutas secas. Fondos en boca que recuerdan los lúpulos y las avellanas. Acidez dulce en perfecto equilibrio con el cuerpo.', 3601.23, 'product_14.webp', 1, 1, 1, NULL, NULL),
(14, 'Origen Sumatra', 'Café intensamente floral, con presencia de maderas, tabacos, especias y miel. Posee una acidez compleja de tono dulce y floral. Gran cuerpo.', 2507.38, 'product_15.webp', 1, 1, 1, NULL, NULL),
(15, 'Origen Indonesia', 'Sabores terrosos, tonos herbáceos y acidez baja. Cuerpo medio y aroma muy complejo.', 1220.53, 'product_16.webp', 1, 1, 1, NULL, NULL),
(16, 'Origen Mexico', 'Acidez sumamente particular y muy brillante. Notas aromáticas picantes de especias y frutas secas. ', 1728.15, 'product_17.webp', 1, 1, 1, NULL, NULL),
(17, 'Origen Zambia', 'Cuerpo de sabor suave y agradable, con notas dulces y frutales y una excelente acidez. Aroma complejo, fresco, con matices herbales.', 3064.65, 'product_18.webp', 1, 1, 1, NULL, NULL);

INSERT INTO `roasts` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Brasil', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Colombia', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Francia', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

INSERT INTO `sequelizemeta` (`name`) VALUES
('20200921183323-create-product.js'),
('20200921185224-create-size.js'),
('20200921185329-create-roast.js'),
('20200921185344-create-toast.js');

INSERT INTO `sizes` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, '250', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, '500', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, '1000', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

INSERT INTO `toasts` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Suizo', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Español', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Italiano', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `category_id`, `adress`, `phone_number`, `image`) VALUES
(1, 'Ginnifer', 'Muffitt', 'gmuffitt0@cdbaby.com', 'pBIxzjMxm', 1, '8 Crest Line Drive', '690-743-8266', 'avatar.webp'),
(2, 'Cullie', 'Skym', 'cskym1@uol.com.br', 'EfVfPZHDV', 2, '7628 Mendota Street', '885-287-1177', 'avatar.webp'),
(3, 'Enos', 'Songest', 'esongest2@drupal.org', 'BPxtrR', 2, '74669 Melrose Point', '995-553-4659', 'avatar.webp'),
(4, 'Sarine', 'Gruby', 'sgruby3@google.pl', 'auv6QuRU', 2, '663 Hooker Way', '278-649-8488', 'avatar.webp'),
(5, 'Alfredo', 'Barker', 'abarker4@msu.edu', 'qG4W6Oz', 2, '339 Rigney Court', '572-577-1690', 'avatar.webp'),
(6, 'Brigitte', 'Dike', 'bdike5@home.pl', 'aTp63ew', 2, '2146 Mayer Parkway', '546-659-3970', 'avatar.webp'),
(7, 'Del', 'McAsgill', 'dmcasgill6@statcounter.com', 'dXji9r8mYs', 1, '43910 Canary Way', '824-182-2244', 'avatar.webp'),
(8, 'Delila', 'Goscar', 'dgoscar7@sphinn.com', '85vd4JyR', 1, '15047 Morning Trail', '669-477-8842', 'avatar.webp'),
(9, 'Cory', 'Leyson', 'cleyson8@dedecms.com', 'hMxMT0I', 2, '47674 Badeau Crossing', '656-137-5296', 'avatar.webp'),
(10, 'Whitney', 'Orrock', 'worrock9@adobe.com', 'Bzt0mJMJs', 2, '797 Towne Point', '901-728-9821', 'avatar.webp'),
(11, 'Ike', 'Vannuccini', 'ivannuccinia@arstechnica.com', 'feyRQaBv', 2, '27 Kim Court', '671-961-8549', 'avatar.webp'),
(12, 'Lane', 'Barbisch', 'lbarbischb@miibeian.gov.cn', 'XvMMhd', 2, '35 Memorial Court', '725-716-4652', 'avatar.webp'),
(13, 'Clarissa', 'Banyard', 'cbanyardc@wikispaces.com', 'kaafhQGO6gr', 2, '5 Gulseth Trail', '686-525-1583', 'avatar.webp'),
(14, 'Ruben', 'Halshaw', 'rhalshawd@pcworld.com', '23mURTuy', 2, '22 Gina Junction', '296-982-7435', 'avatar.webp'),
(15, 'Piper', 'Petronis', 'ppetronise@psu.edu', 'VN7r8p', 2, '119 Lakeland Lane', '285-147-7961', 'avatar.webp'),
(16, 'Natty', 'Stummeyer', 'nstummeyerf@parallels.com', 'O0BYMCqiUVXz', 2, '65 Merrick Plaza', '161-671-8321', 'avatar.webp'),
(17, 'Iosep', 'Cubbini', 'icubbinig@xing.com', 'ytTwD8', 2, '62254 Iowa Way', '452-508-7259', 'avatar.webp'),
(18, 'Roxana', 'Besset', 'rbesseth@shinystat.com', 'LkrTXZFT2t', 2, '606 Lighthouse Bay Lane', '402-653-2108', 'avatar.webp'),
(19, 'Dov', 'Kerin', 'dkerini@theglobeandmail.com', 'QkWeS9L', 2, '9 Stone Corner Crossing', '757-162-9036', 'avatar.webp'),
(20, 'Georgette', 'Beachamp', 'gbeachampj@apache.org', 'ukgSApeI', 2, '666 Kim Parkway', '991-408-8809', 'avatar.webp');
