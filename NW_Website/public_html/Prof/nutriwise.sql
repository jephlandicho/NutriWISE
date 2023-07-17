-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 17, 2023 at 12:57 PM
-- Server version: 10.6.14-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u479135962_nutriwise`
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
(48, 7, 'TRY CLASS', 'TRY-121', 'TRY'),
(49, 8, 'TRY2', 'TR2-3232', 'TRY2'),
(52, 7, 'TRY CLASS 2', 'CLASS-CODE', 'HEHEHE'),
(53, 10, 'App Dev', 'ejwsdu10', 'App Development'),
(54, 16, 'XXX Class', 'Xxx-666', 'Class ko po'),
(55, 17, 'thfth', 'fghfgh', 'dfghdfgdfhdh'),
(56, 18, 'App Dev', 'slfbe13', 'Apl Development'),
(57, 20, 'Advanced English', 'gfh2df5', 'Advanced English'),
(58, 20, 'Algebra III', 'lgbr3mth1', '');

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `birthDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`id`, `fullName`, `sex`, `birthDate`) VALUES
(0, 'Clarence Phol Andino', 'Male', '2001-11-20');

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
  `fats` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client_measurements`
--

INSERT INTO `client_measurements` (`id`, `client_id`, `student_id`, `assessment_date`, `waistCircum`, `hipCircum`, `weight`, `height`, `physicalActLevel`, `WHR`, `BMI`, `remarks`, `DBW`, `TER`, `protein`, `carbs`, `fats`) VALUES
(2, 0, 1, '2023-07-15', 66, 86, 45, 1.53, 'Sedentary', 0.77, 19.2, 'Normal', 47.7, 1450, 55, 235, 30);

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
  `carbohydrats` float NOT NULL,
  `protein` float NOT NULL,
  `fats` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `class_id`, `description`, `materials`, `links`, `date`) VALUES
(44, 48, 'TRY', 'uploadedfiles/300964491_479493797523946_8324112470786242159_n.jpg', 'https://www.google.com/search?client=opera-gx&q=rick&sourceid=opera&ie=UTF-8&oe=UTF-8', '2023-07-16'),
(45, 49, 'TRY2', 'uploadedfiles/300964491_479493797523946_8324112470786242159_n.jpg', 'rasdsd', '2023-07-16'),
(46, 48, 'ewew', 'uploadedfiles/April Joy Andino - RESUME (1).pdf', 'ewew', '2023-07-16'),
(47, 53, 'cars', '', 'https://www.mazda.ph/vehicles/mazda6', '2023-07-16'),
(48, 55, 'Wassup Madlang Pipol', '', '', '2023-07-17'),
(49, 56, 'Youtube', '', 'https://www.mazda.ph/vehicles/mazda6', '2023-07-17'),
(50, 57, 'C1 Advanced English level', '', 'https://learnenglish.britishcouncil.org/english-levels/understand-your-english-level/c1-advanced', '2023-07-17'),
(51, 57, 'Advanced English: 23 Methods and Additional Resources for Continuous Improvement', '', 'https://www.fluentu.com/blog/english/learn-advanced-english/', '2023-07-17'),
(52, 57, 'Advanced English Conversation: How to Say and Understand Anything in English', '', 'https://www.fluentu.com/blog/english/advanced-english-conversation/', '2023-07-17'),
(53, 58, 'Welcome to Integrated math 3!', '', 'https://www.khanacademy.org/math/math3', '2023-07-17'),
(54, 58, 'Module Fundamentals', '', 'https://faculty.math.illinois.edu/~r-ash/Algebra/Chapter4.pdf', '2023-07-17'),
(55, 58, 'Learning Module Algebra', '', 'https://peac.org.ph/wp-content/uploads/2020/05/2016_MATHG7Q2.pdf', '2023-07-17');

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
(7, 'try', 'try@gmail.com', 'try', '080f651e3fcca17df3a47c2cecfcb880'),
(8, 'try2', 'try2@gmail.com', 'try2', 'c0556c9522fe6ead9862e23b1f113829'),
(9, 'Clarence Phol Bautista Andino', 'clarence3@gmail.com', 'clarence4', '$2y$10$d.OkL.OcaZ9M8YG7oNthwOG.X6OV47zpC0irlRa8iYOBQ.LZXkm2C'),
(10, 'Cleo Lopez', 'cleoald@gmail.com', 'cald', '05f25dd147116b17ca7c03686dac07c3'),
(11, 'Yami', 'yami1@gmail.com', 'yami1', '$2y$10$z3iFdHTL0wFInZiz6zd86ew9VOqm1dtFQcBl885bc/e5ivLoTLXre'),
(12, 'Asta', 'asta@gmail.com', 'asta', 'f10b0c134cc9601ba7711a9b2c9444ad'),
(13, 'ass', 'ass@gmail.com', 'ass', '964d72e72d053d501f2949969849b96c'),
(14, 'cc', 'clarence@gmail.com', 'cc', '$2y$10$BuUPZJ6hgdREVaZZqo2LdOIOrcG91/mUkL.uQDbI7T0MgcLu3yM2C'),
(15, 'dd', 'bautistaphol0@gmail.com', 'dd14', '$2y$10$9QG0WG.lSgjoeBdEi62MnOT5RcNILFL5R4plP9UnO/.ulJBYlrF1K'),
(16, 'Xxx', 'xxx@gmail.com', 'xxx', '$2y$10$M2lVBG9PKqTa0EuxKr05i.sdF7IF7VRn1PDlIoThPehueDYd0giOm'),
(17, 'Jephthah', 'landichojjl@gmail.com', 'jephthah', '$2y$10$JyRe7d12rIdaebt/2HJvqeoRJyT1cW8C.uch7GEPbX7ElZzdmue7G'),
(18, 'Wilgrace', 'wilg@gmail.com', 'Wilg', '$2y$10$j0OIxJS467M5KswAcjNFQOaeeasYUm4f5.oaJX1ih221T9kE.nUUS'),
(19, 'Paolo D. Julongbayan', 'paolojulongbayan23@gmail.com', 'Paolo', '$2y$10$q7WFP22xl74Tfkc0DAunN.l8sejZZwXDptonJUHAo3Hr460Ba5bna'),
(20, 'Angelo Dimailig', 'cleo@gmail.com', 'cleooo', '$2y$10$xAdqW0A0uHeyUeUOVh8Jn.ZimAmex9num0mTKYsIOEvQb0GygCcxe'),
(21, 'Jordan Jonson', 'jonsonjordan@gmail.com', 'jrdnpg', '$2y$10$/Xm1crRScl2SavLn1hgEUOa2xnQTLCZzSqSj5nrNQpnPWXhu5kBFO'),
(22, 'prof', 'prof@gmail.com', 'prof', '$2y$10$O2xXJGrit3zwLftINzBZ1O1hzRUbVrR6Ut2rx8Gr4o1T/KEXNWZdG');

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
(2, 'Cleo Angelo Dimailig', 'c.a.dimailig00@gmail.com', 'cleo', 'cleoangelo');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `client_measurements`
--
ALTER TABLE `client_measurements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `exchanges`
--
ALTER TABLE `exchanges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT for table `meal`
--
ALTER TABLE `meal`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `professor`
--
ALTER TABLE `professor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `professor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
