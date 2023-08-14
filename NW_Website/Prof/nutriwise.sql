-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 14, 2023 at 06:37 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nutriwise`
--

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `id` int(11) NOT NULL,
  `professor_id` int(11) NOT NULL,
  `class_name` varchar(50) NOT NULL,
  `class_code` varchar(10) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`id`, `professor_id`, `class_name`, `class_code`, `description`) VALUES
(108, 31, '1', 'z71iQSUt', '1'),
(109, 31, '2', 'W7hljgEt', '2');

-- --------------------------------------------------------

--
-- Table structure for table `class_schedule`
--

CREATE TABLE `class_schedule` (
  `id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `schedule_day` varchar(50) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_schedule`
--

INSERT INTO `class_schedule` (`id`, `class_id`, `schedule_day`, `start_time`, `end_time`) VALUES
(2, 108, 'Monday', '00:00:00', '00:00:00'),
(3, 109, 'Wednesday', '00:00:00', '00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `birthdate` date NOT NULL,
  `sex` varchar(10) NOT NULL,
  `syncData` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `name`, `birthdate`, `sex`, `syncData`) VALUES
(239365, 'Random', '2000-07-18', 'Male', 0),
(357062, 'Clarence', '2002-07-18', 'Male', 0),
(376404, 'Elijah ', '2020-07-24', 'Male', 0),
(513327, 'Maurice', '2002-07-20', 'Male', 0),
(533670, 'Sir Yno', '1989-07-20', 'Male', 0),
(547314, 'Hatdog', '2000-07-25', 'Male', 0),
(553743, 'Michael Jordan', '1970-07-18', 'Male', 0),
(626846, 'Maxine', '2001-07-18', 'Female', 0),
(710800, 'Hello', '2001-07-18', 'Female', 0),
(744568, 'Lebron James', '2000-07-18', 'Male', 0),
(802987, 'John Doe', '2000-07-18', 'Female', 0),
(828065, 'Lei', '2000-07-24', 'Female', 0),
(883917, 'Jephthah', '2002-07-18', 'Male', 0),
(910407, 'Missy', '2023-07-15', 'Female', 0),
(984329, 'Ali', '2018-07-20', 'Male', 0);

-- --------------------------------------------------------

--
-- Table structure for table `client_measurements`
--

CREATE TABLE `client_measurements` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `assessment_date` date NOT NULL,
  `waistCircum` float NOT NULL,
  `hipCircum` float NOT NULL,
  `weight` float NOT NULL,
  `height` float NOT NULL,
  `physicalActLevel` varchar(50) NOT NULL,
  `WHR` float NOT NULL,
  `BMI` float NOT NULL,
  `remarks` varchar(50) NOT NULL,
  `DBW` float NOT NULL,
  `TER` float NOT NULL,
  `protein` float NOT NULL,
  `carbs` float NOT NULL,
  `fats` float NOT NULL,
  `syncData` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client_measurements`
--

INSERT INTO `client_measurements` (`id`, `client_id`, `student_id`, `assessment_date`, `waistCircum`, `hipCircum`, `weight`, `height`, `physicalActLevel`, `WHR`, `BMI`, `remarks`, `DBW`, `TER`, `protein`, `carbs`, `fats`, `syncData`) VALUES
(1165357, 357062, 1, '2023-07-18', 30, 50, 66, 1.76, 'Sedentary', 0.6, 21.3, 'Normal', 68.4, 2050, 75, 335, 45, 0),
(1208917, 513327, 1, '2023-07-19', 67, 68, 55, 1.55, 'Moderate', 0.99, 22.9, 'Normal', 49.5, 2000, 75, 325, 45, 0),
(1247345, 553743, 4, '2023-07-18', 90, 90, 85, 120, 'Moderate', 1, 0, 'Underweight', 10710, 428400, 16065, 69615, 9520, 0),
(1266049, 239365, 1, '2023-07-18', 88, 99, 80, 1.96, 'Sedentary', 0.89, 20.8, 'Normal', 86.4, 2600, 100, 425, 60, 0),
(1278580, 883917, 1, '2023-07-18', 46, 69, 45, 1.53, 'Sedentary', 0.67, 19.2, 'Normal', 47.7, 1450, 55, 235, 30, 0),
(1329781, 828065, 1, '2023-07-24', 66, 69, 80, 1.98, 'Light', 0.96, 20.4, 'Normal', 88.2, 3100, 115, 505, 70, 0),
(1464413, 910407, 7, '2023-07-20', 11, 12, 13, 42, 'Light', 0.92, 0, 'Underweight', 3690, 129150, 4845, 20985, 2870, 0),
(1540761, 533670, 1, '2023-07-20', 66, 69, 58, 1.8, 'Moderate', 0.96, 17.9, 'Underweight', 72, 2900, 110, 470, 65, 0),
(1648188, 802987, 1, '2023-07-18', 89, 87, 60, 1.9, 'Vigorous', 1.02, 16.6, 'Underweight', 81, 3650, 135, 595, 80, 0),
(1816466, 547314, 1, '2023-07-25', 67, 88, 55, 1.6, 'Moderate', 0.76, 21.5, 'Normal', 54, 2150, 80, 350, 50, 0),
(1841509, 626846, 1, '2023-07-18', 66, 64, 60, 1.9, 'Light', 1.03, 16.6, 'Underweight', 81, 2850, 105, 465, 65, 0),
(1918060, 744568, 1, '2023-07-18', 98, 99, 80, 1.9, 'Vigorous', 0.99, 22.2, 'Normal', 81, 3650, 135, 595, 80, 0),
(1943467, 710800, 1, '2023-07-18', 56, 60, 66, 1.8, 'Moderate', 0.93, 20.4, 'Normal', 72, 2900, 110, 470, 65, 0),
(1968356, 376404, 1, '2023-07-24', 36, 66, 45, 1.53, 'Sedentary', 0.55, 19.2, 'Normal', 47.7, 1450, 55, 235, 30, 0),
(1976147, 984329, 6, '2023-07-20', 21, 35, 56, 167, 'Light', 0.6, 0, 'Underweight', 14940, 522900, 19610, 84970, 11620, 0);

-- --------------------------------------------------------

--
-- Table structure for table `exchanges`
--

CREATE TABLE `exchanges` (
  `id` int(11) NOT NULL,
  `measurement_id` int(11) NOT NULL,
  `vegetables` float NOT NULL,
  `fruit` float NOT NULL,
  `milk` float NOT NULL,
  `sugar` float NOT NULL,
  `riceA` float NOT NULL,
  `riceB` float NOT NULL,
  `riceC` float NOT NULL,
  `lfMeat` float NOT NULL,
  `mfMeat` float NOT NULL,
  `fat` float NOT NULL,
  `TER` float NOT NULL,
  `carbohydrates` float NOT NULL,
  `protein` float NOT NULL,
  `fats` float NOT NULL,
  `syncData` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exchanges`
--

INSERT INTO `exchanges` (`id`, `measurement_id`, `vegetables`, `fruit`, `milk`, `sugar`, `riceA`, `riceB`, `riceC`, `lfMeat`, `mfMeat`, `fat`, `TER`, `carbohydrates`, `protein`, `fats`, `syncData`) VALUES
(2163019, 1816466, 3, 5, 1, 2, 1, 5, 1, 2, 2, 2, 1502, 242, 57, 34, 0),
(2166240, 1976147, 4, 3, 2, 3, 2, 2, 3, 1, 1, 2, 1509, 242, 52, 37, 0),
(2199652, 1278580, 3, 5, 1, 2, 1, 5, 1, 2, 2, 2, 1502, 242, 57, 34, 0),
(2202914, 1943467, 3, 5, 1, 2, 1, 5, 1, 2, 2, 2, 1502, 242, 57, 34, 0),
(2275789, 1841509, 3, 6, 3, 3, 1, 2, 2, 1, 1, 0, 1493, 235, 55, 37, 0),
(2299351, 1329781, 3, 5, 1, 2, 1, 5, 1, 2, 2, 2, 1502, 242, 57, 34, 0),
(2344980, 1968356, 3, 5, 1, 2, 1, 5, 1, 2, 2, 2, 1502, 242, 57, 34, 0),
(2357585, 1540761, 3, 5, 1, 2, 1, 5, 1, 2, 2, 2, 1502, 242, 57, 34, 0),
(2368544, 1918060, 3, 5, 1, 2, 1, 5, 1, 2, 2, 2, 1502, 242, 57, 34, 0),
(2500362, 1165357, 3, 5, 1, 2, 1, 5, 1, 2, 2, 2, 1502, 242, 57, 34, 0),
(2677024, 1208917, 3, 5, 1, 2, 1, 5, 1, 2, 2, 2, 1502, 242, 57, 34, 0),
(2697003, 1247345, 3, 3, 2, 2, 3, 3, 1, 2, 2, 0, 1486, 234, 61, 34, 0),
(2744097, 1648188, 3, 5, 1, 2, 1, 5, 1, 2, 2, 2, 1502, 242, 57, 34, 0),
(2830230, 1464413, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2972858, 1266049, 3, 5, 1, 2, 1, 5, 1, 2, 2, 2, 1502, 242, 57, 34, 0);

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `food_name` varchar(100) NOT NULL,
  `food_group` varchar(100) NOT NULL,
  `household_measurement` varchar(50) NOT NULL,
  `food_weight` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `description` varchar(150) NOT NULL,
  `materials` varchar(150) NOT NULL,
  `links` varchar(150) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meal`
--

CREATE TABLE `meal` (
  `id` int(11) NOT NULL,
  `meal_plan_id` int(11) NOT NULL,
  `meal` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meal_plan`
--

CREATE TABLE `meal_plan` (
  `id` int(11) NOT NULL,
  `exchange_id` int(11) NOT NULL,
  `meal_time` varchar(20) NOT NULL,
  `exchange_distribution` float NOT NULL,
  `food_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `professor`
--

CREATE TABLE `professor` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `professor`
--

INSERT INTO `professor` (`id`, `fullName`, `email`, `username`, `password`) VALUES
(17, 'Jephthah', 'landichojjl@gmail.com', 'jephthah', '$2y$10$JyRe7d12rIdaebt/2HJvqeoRJyT1cW8C.uch7GEPbX7ElZzdmue7G'),
(18, 'Wilgrace', 'wilg@gmail.com', 'Wilg', '$2y$10$j0OIxJS467M5KswAcjNFQOaeeasYUm4f5.oaJX1ih221T9kE.nUUS'),
(19, 'Paolo D. Julongbayan', 'paolojulongbayan23@gmail.com', 'Paolo', '$2y$10$q7WFP22xl74Tfkc0DAunN.l8sejZZwXDptonJUHAo3Hr460Ba5bna'),
(21, 'Jordan Jonson', 'jonsonjordan@gmail.com', 'jrdnpg', '$2y$10$/Xm1crRScl2SavLn1hgEUOa2xnQTLCZzSqSj5nrNQpnPWXhu5kBFO'),
(28, 'Clarence Phol Bautista Andino', 'clarence@gmail.com', 'clarence5', '$2y$10$Il1dzhDH0vTHgEPNMP/LNudiuxsNL62TvXVGX0UemK6SA2uIeo1x6'),
(29, 'Gojo Satoru', 'gojo@gmail.com', 'gojo', '$2y$10$A5u0Gz.vZDUsjfVMitiOS.7TCqDiZomVKpKedCnNL3wp4zCWzRM6i'),
(30, 'aa', 'aa@gmail.com', 'aa', '$2y$10$0hDRfq1aqvOneqCJn1y4Oe7vAlbbq52qKPGxjAEYB3I5/G9ICVyuO'),
(31, 'Peter', 'pete@gmail.com', 'pete', '$2y$10$X2hTwGanVvShnVFANtkAOe0AiRr3c9/bVhx2UWzdh4nTiMLH0FKgO');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `fullName`, `email`, `username`, `password`) VALUES
(1, 'Jephthah Jehosaphat Landicho', 'jephthahlandicho1212@gmail.com', 'jephthah', 'jephthah'),
(2, 'Cleo Angelo Dimailig', 'c.a.dimailig00@gmail.com', 'cleo', 'cleoangelo'),
(3, 'Clarence Phol Andino', 'joelapuk00@gmail.com', 'clarence', 'clarence'),
(4, 'Paolo D. Julongbayan', 'paolo@gmail.com', 'paolo', 'paolojulongbayan'),
(5, 'Maxine Singson', 'maxinesingson@gmail.com', 'maxine', 'maxinesingson'),
(6, 'Alison Kate Reyes', 'alibayan2@gmail.com', 'alison', 'alisonkate'),
(7, 'Cyrelyn Bugtong', 'cyrelyn@gmail.com', 'cyrelyn', 'cyrelynbugtong'),
(8, 'Wilgrace Ednaco', 'wilgrace@gmail.com', 'wilgrace', 'wilgrace');

-- --------------------------------------------------------

--
-- Table structure for table `student_class`
--

CREATE TABLE `student_class` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `professor_id` (`professor_id`);

--
-- Indexes for table `class_schedule`
--
ALTER TABLE `class_schedule`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_class_schedule_class_id` (`class_id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `client_measurements`
--
ALTER TABLE `client_measurements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `exchanges`
--
ALTER TABLE `exchanges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `measurement_id` (`measurement_id`);

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `materials`
--
ALTER TABLE `materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

--
-- Indexes for table `meal`
--
ALTER TABLE `meal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meal_plan_id` (`meal_plan_id`);

--
-- Indexes for table `meal_plan`
--
ALTER TABLE `meal_plan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exchange_id` (`exchange_id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `professor`
--
ALTER TABLE `professor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `student_class`
--
ALTER TABLE `student_class`
  ADD KEY `student_id` (`student_id`),
  ADD KEY `class_id` (`class_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT for table `class_schedule`
--
ALTER TABLE `class_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `professor`
--
ALTER TABLE `professor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class_schedule`
--
ALTER TABLE `class_schedule`
  ADD CONSTRAINT `class_schedule_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  ADD CONSTRAINT `fk_class_schedule_class_id` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `client_measurements`
--
ALTER TABLE `client_measurements`
  ADD CONSTRAINT `client_measurements_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `client_measurements_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `exchanges`
--
ALTER TABLE `exchanges`
  ADD CONSTRAINT `exchanges_ibfk_1` FOREIGN KEY (`measurement_id`) REFERENCES `client_measurements` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `materials`
--
ALTER TABLE `materials`
  ADD CONSTRAINT `materials_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `meal`
--
ALTER TABLE `meal`
  ADD CONSTRAINT `meal_ibfk_1` FOREIGN KEY (`meal_plan_id`) REFERENCES `meal_plan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `meal_plan`
--
ALTER TABLE `meal_plan`
  ADD CONSTRAINT `meal_plan_ibfk_1` FOREIGN KEY (`exchange_id`) REFERENCES `exchanges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `meal_plan_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_class`
--
ALTER TABLE `student_class`
  ADD CONSTRAINT `student_class_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `student_class_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
