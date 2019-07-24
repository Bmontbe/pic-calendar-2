CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `event` varchar(100) NOT NULL,
  `date_event` DATE NOT NULL,
  `picture` varchar(255),
  `comment` varchar(255)
);

ALTER TABLE `event` ADD PRIMARY KEY (`id`);
ALTER TABLE `event` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT