SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";



CREATE TABLE `meal_plans` (
  `id` int(11) NOT NULL,
  `client_name` varchar(255) DEFAULT NULL,
  `meal_name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



INSERT INTO `meal_plans` (`id`, `client_name`, `meal_name`) VALUES
(7, ' Clarence Andino', 'Eggs and toast'),
(8, 'Jeph Landicho', 'Grilled chicken salad');


ALTER TABLE `meal_plans`
  ADD PRIMARY KEY (`id`);


ALTER TABLE `meal_plans`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;


