-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 25, 2023 at 07:43 AM
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
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(150) DEFAULT NULL,
  `links` varchar(150) DEFAULT NULL,
  `date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`id`, `class_id`, `title`, `description`, `links`, `date`) VALUES
(202, 125, 'HIWALAY KAYA', 'HIWALAY', 'https://www.google.com/search?client=opera-gx&q=rick&sourceid=opera&ie=UTF-8&oe=UTF-8', '2023-09-04'),
(203, 115, 'Hello World', 'This is the announcement', '', '2023-09-04'),
(204, 115, 'Hello World', 'Helllele', '', '2023-09-04'),
(205, 131, 'TITLE', 'ANNOUNCEMENT', 'https://www.google.com/search?client=opera-gx&q=rick&sourceid=opera&ie=UTF-8&oe=UTF-8', '2023-09-04'),
(206, 130, 'Hello Madalang Pipol', 'Mabuhay', '', '2023-09-04'),
(207, 130, 'Poster', 'asfasdfasdfsdfjaklsjdg sadhfgoisdefrgiosdfgn sdiofugnsdfjivmsdf90gisdoprfigmnerg', 'https://www.google.com/maps', '2023-09-04'),
(208, 130, 'ssdfsdfsdf', 'drhrsthjdfthjn ftyuftyuntyutyukty', 'https://www.google.com/maps', '2023-09-04'),
(209, 130, 'Hello', '', '', '2023-09-04'),
(210, 130, 'Click the Link', '', 'https://www.jw.org/tl', '2023-09-04'),
(211, 137, 'Announcement', '222', '', '2023-09-23');

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
(55, 17, 'thfth', 'fghfgh', 'dfghdfgdfhdh'),
(56, 18, 'App Dev', 'slfbe13', 'Apl Development'),
(75, 28, 'CLASS', '1221-3', 'CLASS PO'),
(76, 29, 'JUJTSU CLASS', '121-IHIHD', 'JUJUTSU CLASS'),
(77, 17, 'IPT', 'fdjskd12', 'IPT'),
(114, 30, 'ONLINE CLASSROOM', 'mly1j06i', 'IT-331'),
(115, 17, 'Nutrition 101', 'Ax9Rwr81', 'ND-1101'),
(126, 17, 'Jephthah', 'axKw4EVu', 'BSIT'),
(130, 17, 'Class101', 'fBNIp0R1', 'BSIT 3201'),
(132, 17, 'Nutrition 201', 'fAJVIQUu', 'BSND 2101'),
(133, 17, 'Hello', 'xJsb6tLA', 'Hello'),
(134, 17, 'BSND Class', 'ef5ONXhJ', 'BSND Class'),
(136, 17, 'sdgdf', 'LOM0zH96', 'ffghjfgh'),
(137, 32, 'Juice Wrld', 's92OnG6u', 'Wasted 2211'),
(138, 36, 'Jj', 'iCopOha2', 'Ascertain\nEstablish\nIdentify\nDecide\nConclude\nSettle\nResolve\nDeduce\nFix\nPinpoint');

-- --------------------------------------------------------

--
-- Table structure for table `class_schedule`
--

CREATE TABLE `class_schedule` (
  `id` int(11) NOT NULL,
  `class_id` int(11) DEFAULT NULL,
  `schedule_day` varchar(20) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `class_schedule`
--

INSERT INTO `class_schedule` (`id`, `class_id`, `schedule_day`, `start_time`, `end_time`) VALUES
(34, 123, 'Monday', '14:22:00', '15:33:00'),
(35, 124, 'Monday', '04:15:00', '06:15:00'),
(36, 125, 'Monday', '23:11:00', '14:22:00'),
(37, 126, 'Monday', '17:45:00', '18:45:00'),
(38, 127, 'Tuesday', '11:11:00', '14:22:00'),
(39, 128, 'Monday', '23:12:00', '14:22:00'),
(40, 129, 'Tuesday', '14:22:00', '15:33:00'),
(41, 130, 'Monday', '08:00:00', '09:00:00'),
(42, 130, 'Wednesday', '09:00:00', '10:00:00'),
(43, 131, 'Monday', '14:22:00', '05:55:00'),
(44, 132, 'Monday', '19:00:00', '20:00:00'),
(45, 132, 'Tuesday', '08:00:00', '09:25:00'),
(46, 133, 'Monday', '20:00:00', '21:00:00'),
(47, 134, 'Monday', '21:01:00', '22:39:00'),
(48, 135, 'Monday', '00:00:00', '00:00:00'),
(49, 136, 'Friday', '12:00:00', '13:00:00'),
(50, 137, 'Monday', '11:11:00', '14:22:00'),
(51, 138, 'Monday', '14:45:00', '15:45:00');

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
(123115, 'Someone', '2023-09-15', 'Male', 0),
(239365, 'Random', '2000-07-18', 'Male', 0),
(268795, 'Dhiskshsjs', '2010-09-18', 'Male', 0),
(269147, 'Kier Karlo', '1996-09-14', 'Male', 0),
(280313, 'Doggy', '2000-09-12', 'Male', 0),
(281174, 'Albert Paytaren', '2001-08-17', 'Male', 0),
(330091, 'JephthahLandichoJehosaphat', '1991-08-22', 'Male', 0),
(357062, 'Clarence', '2002-07-18', 'Male', 0),
(369372, 'Alex', '2000-08-21', 'Female', 0),
(376404, 'Elijah ', '2020-07-24', 'Male', 0),
(430058, 'MyName', '2000-09-12', 'Female', 0),
(481509, 'Mommy Shark', '2005-09-11', 'Female', 0),
(513327, 'Maurice', '2002-07-20', 'Male', 0),
(533670, 'Sir Yno', '1989-07-20', 'Male', 0),
(547314, 'Hatdog', '2000-07-25', 'Male', 0),
(553743, 'Michael Jordan', '1970-07-18', 'Male', 0),
(559713, 'Jephthahhhhhhhh', '2002-07-28', 'Male', 0),
(573100, 'Hello It\'s me', '2007-09-15', 'Male', 0),
(593595, 'Jopay', '2000-09-25', 'Female', 0),
(626846, 'Maxine', '2001-07-18', 'Female', 0),
(637975, 'Kier Karlo Dela Luna', '1996-09-14', 'Male', 0),
(652545, 'John John Wick', '2002-09-22', 'Male', 0),
(710800, 'Hello', '2001-07-18', 'Female', 0),
(744568, 'Lebron James', '2000-07-18', 'Male', 0),
(761707, 'Odksjsks', '2010-09-18', 'Female', 0),
(802987, 'John Doe', '2000-07-18', 'Female', 0),
(828065, 'Lei', '2000-07-24', 'Female', 0),
(883917, 'Jephthah', '2002-07-18', 'Male', 0),
(910407, 'Missy', '2023-07-15', 'Female', 0),
(953330, 'Royal Kludge ', '2000-09-11', 'Male', 0),
(972879, 'Grandpa Shark', '2000-09-11', 'Male', 0),
(984329, 'Ali', '2018-07-20', 'Male', 0),
(992298, 'Baby Shark', '2010-09-11', 'Male', 0);

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
(1138561, 369372, 1, '2023-08-21', 66, 36, 45, 1.53, 'Light', 1.83, 19.2, 'Normal', 47.7, 1650, 60, 270, 35, 0),
(1149582, 268795, 11, '2023-09-18', 96, 80, 45, 1.9, 'Sedentary', 1.2, 12.5, 'Underweight', 81, 2450, 90, 400, 55, 0),
(1165357, 357062, 1, '2023-07-18', 30, 50, 66, 1.76, 'Sedentary', 0.6, 21.3, 'Normal', 68.4, 2050, 75, 335, 45, 0),
(1194059, 559713, 1, '2023-07-28', 66, 86, 45, 1.53, 'Sedentary', 0.77, 19.2, 'Normal', 47.7, 1450, 55, 235, 30, 0),
(1208917, 513327, 1, '2023-07-19', 67, 68, 55, 1.55, 'Moderate', 0.99, 22.9, 'Normal', 49.5, 2000, 75, 325, 45, 0),
(1247345, 553743, 4, '2023-07-18', 90, 90, 85, 120, 'Moderate', 1, 0, 'Underweight', 10710, 428400, 16065, 69615, 9520, 0),
(1254622, 281174, 1, '2023-08-17', 26, 29, 50, 1.75, 'Light', 0.9, 16.3, 'Underweight', 67.5, 2350, 90, 380, 50, 0),
(1266049, 239365, 1, '2023-07-18', 88, 99, 80, 1.96, 'Sedentary', 0.89, 20.8, 'Normal', 86.4, 2600, 100, 425, 60, 0),
(1278580, 883917, 1, '2023-07-18', 46, 69, 45, 1.53, 'Sedentary', 0.67, 19.2, 'Normal', 47.7, 1450, 55, 235, 30, 0),
(1329781, 828065, 1, '2023-07-24', 66, 69, 80, 1.98, 'Light', 0.96, 20.4, 'Normal', 88.2, 3100, 115, 505, 70, 0),
(1377593, 269147, 13, '2023-09-14', 98, 107, 79, 1.67, 'Light', 0.92, 28.3, 'Overweight', 60.3, 2100, 80, 340, 45, 0),
(1385166, 123115, 11, '2023-09-15', 69, 70, 45, 1.53, 'Light', 0.99, 19.2, 'Normal', 47.7, 1650, 60, 270, 35, 0),
(1424441, 972879, 1, '2023-09-11', 80, 90, 45, 1.8, 'Light', 0.89, 13.9, 'Underweight', 72, 2500, 95, 405, 55, 0),
(1464413, 910407, 7, '2023-07-20', 11, 12, 13, 42, 'Light', 0.92, 0, 'Underweight', 3690, 129150, 4845, 20985, 2870, 0),
(1501175, 430058, 12, '2023-09-12', 69, 63, 50, 1.6, 'Light', 1.1, 19.5, 'Normal', 54, 1900, 71, 310, 39, 0),
(1540761, 533670, 1, '2023-07-20', 66, 69, 58, 1.8, 'Moderate', 0.96, 17.9, 'Underweight', 72, 2900, 110, 470, 65, 0),
(1566008, 280313, 11, '2023-09-12', 66, 56, 50, 1.8, 'Light', 1.18, 15.4, 'Underweight', 72, 2500, 95, 405, 55, 0),
(1606088, 481509, 1, '2023-09-11', 66, 69, 40, 1.53, 'Moderate', 0.96, 17.1, 'Underweight', 47.7, 1900, 70, 310, 40, 0),
(1623834, 953330, 1, '2023-09-11', 66, 69, 80, 1.8, 'Light', 0.96, 24.7, 'Normal', 72, 2500, 95, 405, 55, 0),
(1629862, 593595, 11, '2023-09-25', 69, 70, 55, 1.9, 'Sedentary', 0.99, 15.2, 'Underweight', 81, 2450, 90, 400, 55, 0),
(1648188, 802987, 1, '2023-07-18', 89, 87, 60, 1.9, 'Vigorous', 1.02, 16.6, 'Underweight', 81, 3650, 135, 595, 80, 0),
(1712521, 593595, 11, '2023-09-25', 80, 70, 55, 1.7, 'Sedentary', 1.14, 19, 'Normal', 63, 1900, 70, 310, 40, 0),
(1732081, 573100, 11, '2023-09-15', 69, 70, 45, 1.53, 'Light', 0.99, 19.2, 'Normal', 47.7, 1650, 60, 270, 35, 0),
(1816466, 547314, 1, '2023-07-25', 67, 88, 55, 1.6, 'Moderate', 0.76, 21.5, 'Normal', 54, 2150, 80, 350, 50, 0),
(1817904, 652545, 11, '2023-09-22', 68, 70, 50, 1.6, 'Light', 0.97, 19.5, 'Normal', 54, 1900, 70, 310, 40, 0),
(1829490, 330091, 1, '2023-08-22', 66, 96, 45, 1.6, 'Sedentary', 0.69, 17.6, 'Underweight', 54, 1600, 60, 260, 35, 0),
(1833488, 761707, 11, '2023-09-18', 68, 90, 50, 1.9, 'Sedentary', 0.76, 13.9, 'Underweight', 81, 2450, 90, 400, 55, 0),
(1841509, 626846, 1, '2023-07-18', 66, 64, 60, 1.9, 'Light', 1.03, 16.6, 'Underweight', 81, 2850, 105, 465, 65, 0),
(1907223, 280313, 11, '2023-09-14', 69, 70, 45, 1.53, 'Light', 0.99, 19.2, 'Normal', 47.7, 1650, 60, 270, 35, 0),
(1918060, 744568, 1, '2023-07-18', 98, 99, 80, 1.9, 'Vigorous', 0.99, 22.2, 'Normal', 81, 3650, 135, 595, 80, 0),
(1924704, 992298, 1, '2023-09-11', 69, 88, 45, 1.53, 'Sedentary', 0.78, 19.2, 'Normal', 47.7, 1450, 55, 235, 30, 0),
(1943467, 710800, 1, '2023-07-18', 56, 60, 66, 1.8, 'Moderate', 0.93, 20.4, 'Normal', 72, 2900, 110, 470, 65, 0),
(1946415, 637975, 1, '2023-08-17', 36, 37, 75, 1.67, 'Light', 0.97, 26.9, 'Overweight', 60.3, 2100, 80, 340, 45, 0),
(1968356, 376404, 1, '2023-07-24', 36, 66, 45, 1.53, 'Sedentary', 0.55, 19.2, 'Normal', 47.7, 1450, 55, 235, 30, 0),
(1973094, 593595, 11, '2023-09-25', 90, 70, 45, 1.6, 'Moderate', 1.29, 17.6, 'Underweight', 54, 2150, 80, 350, 50, 0),
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
  `hfMeat` float NOT NULL,
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

INSERT INTO `exchanges` (`id`, `measurement_id`, `vegetables`, `fruit`, `milk`, `sugar`, `riceA`, `riceB`, `riceC`, `lfMeat`, `mfMeat`, `hfMeat`, `fat`, `TER`, `carbohydrates`, `protein`, `fats`, `syncData`) VALUES
(2107181, 1833488, 5, 3, 5, 2, 5, 5, 2, 1, 2, 0, -2, 2389, 391, 87, 53, 0),
(2163019, 1816466, 3, 5, 1, 2, 1, 5, 1, 2, 2, 0, 2, 1502, 242, 57, 34, 0),
(2163329, 1829490, 5, 3, 1, 3, 4, 0, 4, 1, 1, 0, 0, 1601, 256, 61, 37, 0),
(2166240, 1976147, 4, 3, 2, 3, 2, 2, 3, 1, 1, 0, 2, 1509, 242, 52, 37, 0),
(2171345, 1385166, 3, 5, 1, 2, 2, 2, 4, 1, 1, 2, 0, 1645, 265, 63, 37, 0),
(2191206, 1732081, 3, 5, 1, 2, 4, 4, 0, 2, 3, 0, 3, 1611, 265, 59, 35, 0),
(2199652, 1278580, 3, 5, 1, 2, 1, 5, 1, 2, 2, 0, 2, 1502, 242, 57, 34, 0),
(2202914, 1943467, 3, 5, 1, 2, 1, 5, 1, 2, 2, 0, 2, 1502, 242, 57, 34, 0),
(2210712, 1149582, 3, 1, 4, 1, 5, 5, 4, 2, 2, 0, 0, 2434, 394, 93, 54, 0),
(2252817, 1254622, 5, 2, 1, 4, 1, 2, 5, 1, 1, 0, 4, 1549, 251, 53, 37, 0),
(2275789, 1841509, 3, 6, 3, 3, 1, 2, 2, 1, 1, 0, 0, 1493, 235, 55, 37, 0),
(2299351, 1329781, 3, 5, 1, 2, 1, 5, 1, 2, 2, 0, 2, 1502, 242, 57, 34, 0),
(2344980, 1968356, 3, 5, 1, 2, 1, 5, 1, 2, 2, 0, 2, 1502, 242, 57, 34, 0),
(2357585, 1540761, 3, 5, 1, 2, 1, 5, 1, 2, 2, 0, 2, 1502, 242, 57, 34, 0),
(2368544, 1918060, 3, 5, 1, 2, 1, 5, 1, 2, 2, 0, 2, 1502, 242, 57, 34, 0),
(2458301, 1712521, 2, 2, 2, 2, 5, 5, 1, 2, 3, 0, 4, 1900, 313, 72, 40, 0),
(2500362, 1165357, 3, 5, 1, 2, 1, 5, 1, 2, 2, 0, 2, 1502, 242, 57, 34, 0),
(2505566, 1623834, 3, 5, 1, 2, 3, 5, 6, 2, 2, 2, 2, 2470, 403, 93, 54, 0),
(2554118, 1973094, 5, 3, 1, 2, 5, 5, 2, 3, 3, 0, 5, 2147, 343, 79, 51, 0),
(2558410, 1629862, 3, 5, 1, 2, 5, 5, 4, 2, 2, 3, 1, 2470, 403, 93, 54, 0),
(2561173, 1566008, 3, 5, 1, 2, 2, 7, 5, 2, 2, 2, 2, 2470, 403, 93, 54, 0),
(2658848, 1424441, 5, 3, 2, 1, 7, 3, 4, 1, 5, 1, -1, 2484, 396, 99, 56, 0),
(2669624, 1194059, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2671682, 1377593, 3, 3, 1, 3, 4, 8, 0, 2, 3, 1, 1, 2089, 345, 76, 45, 0),
(2677024, 1208917, 3, 5, 1, 2, 1, 5, 1, 2, 2, 0, 2, 1502, 242, 57, 34, 0),
(2687948, 1817904, 5, 3, 1, 2, 5, 5, 1, 2, 2, 1, 2, 1899, 320, 67, 39, 0),
(2697003, 1247345, 3, 3, 2, 2, 3, 3, 1, 2, 2, 0, 0, 1486, 234, 61, 34, 0),
(2744097, 1648188, 3, 5, 1, 2, 1, 5, 1, 2, 2, 0, 2, 1502, 242, 57, 34, 0),
(2773932, 1138561, 5, 3, 1, 3, 3, 6, 0, 2, 1, 0, 1, 1641, 279, 57, 33, 0),
(2830230, 1464413, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(2948656, 1946415, 5, 3, 1, 3, 2, 5, 1, 2, 2, 0, 2, 1566, 256, 59, 34, 0),
(2972858, 1266049, 3, 5, 1, 2, 1, 5, 1, 2, 2, 0, 2, 1502, 242, 57, 34, 0),
(2986210, 1907223, 3, 5, 1, 2, 2, 4, 2, 2, 2, 0, 2, 1602, 265, 59, 34, 0);

-- --------------------------------------------------------

--
-- Table structure for table `exchange_distribution`
--

CREATE TABLE `exchange_distribution` (
  `id` int(11) NOT NULL,
  `exchange_id` int(11) NOT NULL,
  `food_group` varchar(100) NOT NULL,
  `breakfast` float NOT NULL,
  `am_snacks` float NOT NULL,
  `lunch` float NOT NULL,
  `pm_snacks` float NOT NULL,
  `dinner` float NOT NULL,
  `syncData` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `exchange_distribution`
--

INSERT INTO `exchange_distribution` (`id`, `exchange_id`, `food_group`, `breakfast`, `am_snacks`, `lunch`, `pm_snacks`, `dinner`, `syncData`) VALUES
(1, 2773932, '0', 1, 1, 1, 1, 1, 0),
(2, 2773932, '0', 1, 0, 1, 0, 1, 0),
(3, 2773932, '0', 0, 1, 0, 2, 0, 0),
(4, 2773932, '0', 1, 0, 2, 0, 3, 0),
(5, 2773932, '0', 0, 0, 0, 0, 0, 0),
(6, 2773932, '0', 0, 0, 1, 0, 0, 0),
(7, 2773932, '0', 0, 0, 2, 0, 0, 0),
(8, 2773932, '0', 0, 0, 0, 1, 0, 0),
(9, 2773932, '0', 0, 1, 0, 0, 0, 0),
(10, 2773932, '0', 0, 0, 0, 1, 0, 0),
(11, 2773932, '0', 0, 0, 0, 3, 0, 0),
(12, 2163329, '0', 1, 1, 1, 1, 1, 0),
(13, 2163329, '0', 1, 0, 1, 0, 1, 0),
(14, 2163329, '0', 1, 0, 1, 0, 2, 0),
(15, 2163329, '0', 0, 0, 0, 0, 0, 0),
(16, 2163329, '0', 1, 2, 1, 0, 0, 0),
(17, 2163329, '0', 1, 0, 0, 0, 0, 0),
(18, 2163329, '0', 0, 0, 1, 0, 0, 0),
(19, 2163329, '0', 0, 0, 0, 1, 0, 0),
(20, 2163329, '0', 0, 1, 0, 1, 0, 0),
(21, 2163329, '0', 0, 0, 0, 0, 0, 0),
(22, 2163329, '0', 0, 1, 1, 1, 0, 0),
(34, 2658848, '0', 2, 0, 2, 0, 1, 0),
(35, 2658848, '0', 3, 0, 0, 2, 0, 0),
(36, 2658848, '0', 2, 2, 2, 0, 1, 0),
(37, 2658848, '0', 1, 0, 1, 0, 1, 0),
(38, 2658848, '0', 2, 0, 1, 1, 0, 0),
(39, 2658848, '0', 2, 0, 0, 0, 0, 0),
(40, 2658848, '0', 0, 0, 1, 0, 0, 0),
(41, 2658848, '0', 1, 1, 1, 1, 1, 0),
(42, 2658848, '0', 0, 0, 0, 1, 0, 0),
(43, 2658848, '0', 0, 0, 0, 0, 0, 0),
(44, 2658848, '0', 0, 0, 1, 0, 0, 0),
(45, 2505566, '0', 1, 0, 1, 0, 1, 0),
(46, 2505566, '0', 1, 1, 1, 0, 2, 0),
(47, 2505566, '0', 0, 1, 1, 1, 0, 0),
(48, 2505566, '0', 0, 0, 5, 0, 0, 0),
(49, 2505566, '0', 0, 0, 0, 6, 0, 0),
(50, 2505566, '0', 1, 0, 0, 0, 0, 0),
(51, 2505566, '0', 0, 0, 2, 0, 0, 0),
(52, 2505566, '0', 0, 0, 0, 0, 2, 0),
(53, 2505566, '0', 0, 0, 0, 0, 2, 0),
(54, 2505566, '0', 0, 2, 0, 0, 0, 0),
(55, 2505566, '0', 0, 0, 0, 2, 0, 0),
(112, 2561173, 'Vegetable', 1, 0, 1, 0, 1, 0),
(113, 2561173, 'Fruit', 0, 5, 0, 0, 0, 0),
(114, 2561173, 'Rice A', 0, 0, 2, 0, 0, 0),
(115, 2561173, 'Rice B', 0, 0, 0, 7, 0, 0),
(116, 2561173, 'Rice C', 0, 1, 0, 2, 2, 0),
(117, 2561173, 'Milk', 0.5, 0, 0, 0, 0.5, 0),
(118, 2561173, 'LF Meat', 1.5, 0, 0, 0.5, 0, 0),
(119, 2561173, 'MF Meat', 2, 0, 0, 0, 0, 0),
(120, 2561173, 'HF Meat', 0, 0, 0, 2, 0, 0),
(121, 2561173, 'Fat', 0, 2, 0, 0, 0, 0),
(122, 2561173, 'Sugar', 0, 0, 0, 0, 2, 0),
(123, 2671682, 'Vegetable', 1, 0, 0.5, 0, 1.5, 0),
(124, 2671682, 'Fruit', 0, 1, 1, 1, 0, 0),
(125, 2671682, 'Rice A', 2, 0, 0, 2, 0, 0),
(126, 2671682, 'Rice B', 2, 1, 2, 1, 2, 0),
(127, 2671682, 'Rice C', 0, 0, 0, 0, 0, 0),
(128, 2671682, 'Milk', 1, 0, 0, 0, 0, 0),
(129, 2671682, 'LF Meat', 1, 0, 1, 0, 0, 0),
(130, 2671682, 'MF Meat', 1, 0, 1, 0, 1, 0),
(131, 2671682, 'HF Meat', 0, 0, 1, 0, 0, 0),
(132, 2671682, 'Fat', 1, 0, 0, 0, 0, 0),
(133, 2671682, 'Sugar', 1, 0, 1, 0, 1, 0),
(145, 2191206, 'Vegetable', 0, 3, 0, 0, 0, 0),
(146, 2191206, 'Fruit', 0, 0, 5, 0, 0, 0),
(147, 2191206, 'Rice A', 4, 0, 0, 0, 0, 0),
(148, 2191206, 'Rice B', 0, 0, 0, 4, 0, 0),
(149, 2191206, 'Rice C', 0, 0, 0, 0, 0, 0),
(150, 2191206, 'Milk', 0, 0, 0, 0, 1, 0),
(151, 2191206, 'LF Meat', 0, 0, 0, 2, 0, 0),
(152, 2191206, 'MF Meat', 0, 3, 0, 0, 0, 0),
(153, 2191206, 'HF Meat', 0, 0, 0, 0, 0, 0),
(154, 2191206, 'Fat', 0, 0, 0, 0, 3, 0),
(155, 2191206, 'Sugar', 0, 0, 2, 0, 0, 0),
(156, 2171345, 'Vegetable', 3, 0, 0, 0, 0, 0),
(157, 2171345, 'Fruit', 0, 5, 0, 0, 0, 0),
(158, 2171345, 'Rice A', 0, 0, 2, 0, 0, 0),
(159, 2171345, 'Rice B', 0, 0, 0, 2, 0, 0),
(160, 2171345, 'Rice C', 0, 0, 0, 0, 4, 0),
(161, 2171345, 'Milk', 0, 0, 0, 1, 0, 0),
(162, 2171345, 'LF Meat', 0, 0, 1, 0, 0, 0),
(163, 2171345, 'MF Meat', 0, 1, 0, 0, 0, 0),
(164, 2171345, 'HF Meat', 2, 0, 0, 0, 0, 0),
(165, 2171345, 'Fat', 0, 0, 0, 0, 0, 0),
(166, 2171345, 'Sugar', 0, 0, 2, 0, 0, 0),
(167, 2210712, 'Vegetable', 1, 0, 1, 0, 1, 0),
(168, 2210712, 'Fruit', 1, 0, 0, 0, 0, 0),
(169, 2210712, 'Rice A', 5, 0, 0, 0, 0, 0),
(170, 2210712, 'Rice B', 0, 5, 0, 0, 0, 0),
(171, 2210712, 'Rice C', 0, 0, 4, 0, 0, 0),
(172, 2210712, 'Milk', 1, 1, 1, 1, 0, 0),
(173, 2210712, 'LF Meat', 0, 2, 0, 0, 0, 0),
(174, 2210712, 'MF Meat', 0, 0, 2, 0, 0, 0),
(175, 2210712, 'HF Meat', 0, 0, 0, 0, 0, 0),
(176, 2210712, 'Fat', 0, 0, 0, 0, 0, 0),
(177, 2210712, 'Sugar', 0, 0, 0, 1, 0, 0),
(178, 2107181, 'Vegetable', 5, 0, 0, 0, 0, 0),
(179, 2107181, 'Fruit', 0, 3, 0, 0, 0, 0),
(180, 2107181, 'Rice A', 0, 0, 5, 0, 0, 0),
(181, 2107181, 'Rice B', 0, 0, 0, 5, 0, 0),
(182, 2107181, 'Rice C', 0, 0, 0, 0, 2, 0),
(183, 2107181, 'Milk', 1, 1, 2, 1, 0, 0),
(184, 2107181, 'LF Meat', 1, 0, 0, 0, 0, 0),
(185, 2107181, 'MF Meat', 0, 2, 0, 0, 0, 0),
(186, 2107181, 'HF Meat', 0, 0, 0, 0, 0, 0),
(187, 2107181, 'Fat', 0, 0, 0, 0, 0, 0),
(188, 2107181, 'Sugar', 0, 2, 0, 0, 0, 0),
(189, 2687948, 'Vegetable', 1, 1, 1, 1, 1, 0),
(190, 2687948, 'Fruit', 1, 0, 1, 0, 1, 0),
(191, 2687948, 'Rice A', 3, 2, 0, 0, 0, 0),
(192, 2687948, 'Rice B', 2, 0, 3, 0, 0, 0),
(193, 2687948, 'Rice C', 1, 0, 0, 0, 0, 0),
(194, 2687948, 'Milk', 1, 0, 0, 0, 0, 0),
(195, 2687948, 'LF Meat', 2, 0, 0, 0, 0, 0),
(196, 2687948, 'MF Meat', 0, 0, 0, 2, 0, 0),
(197, 2687948, 'HF Meat', 0, 0, 0, 1, 0, 0),
(198, 2687948, 'Fat', 0, 0, 0, 0, 2, 0),
(199, 2687948, 'Sugar', 0, 0, 0, 0, 2, 0),
(200, 2554118, 'Vegetable', 1, 1, 1, 1, 1, 0),
(201, 2554118, 'Fruit', 1, 0, 1.5, 0, 0.5, 0),
(202, 2554118, 'Rice A', 2, 0, 0.5, 2.5, 0, 0),
(203, 2554118, 'Rice B', 0, 2, 0, 0, 3, 0),
(204, 2554118, 'Rice C', 0, 0, 1, 1, 0, 0),
(205, 2554118, 'Milk', 1, 0, 0, 0, 0, 0),
(206, 2554118, 'LF Meat', 0, 3, 0, 0, 0, 0),
(207, 2554118, 'MF Meat', 0, 0, 0, 3, 0, 0),
(208, 2554118, 'HF Meat', 0, 0, 0, 0, 0, 0),
(209, 2554118, 'Fat', 0, 2, 0, 0, 3, 0),
(210, 2554118, 'Sugar', 1, 0, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `meal_name` varchar(255) DEFAULT NULL,
  `household_measure` varchar(255) DEFAULT NULL,
  `meal_weight` decimal(20,2) DEFAULT NULL,
  `meal_group` varchar(255) DEFAULT NULL,
  `measurement` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`id`, `meal_name`, `household_measure`, `meal_weight`, `meal_group`, `measurement`) VALUES
(18, 'Alagaw, Dahon', '', 0.00, 'Vegetable', ''),
(19, 'Ampalaya, dahon', '', 0.00, 'Vegetable', ''),
(20, 'Artichoke', '', 0.00, 'Vegetable', ''),
(21, 'Broccoli', '', 0.00, 'Vegetable', ''),
(22, 'Carrot', '', 0.00, 'Vegetable', ''),
(23, 'Gabi, dahon', '', 0.00, 'Vegetable', ''),
(24, 'Himbaba-o, bulaklak', '', 0.00, 'Vegetable', ''),
(25, 'Himbaba-o, dahon', '', 0.00, 'Vegetable', ''),
(26, 'Kabuti, sariwa', '', 0.00, 'Vegetable', ''),
(27, 'Kadyos, bunga', '', 0.00, 'Vegetable', ''),
(28, 'Kalabasa, bunga', '', 0.00, 'Vegetable', ''),
(29, 'Kalabasa, dahon', '', 0.00, 'Vegetable', ''),
(30, 'Kamansi, bunga', '', 0.00, 'Vegetable', ''),
(31, 'Kamansi, dahon', '', 0.00, 'Vegetable', ''),
(32, 'Katuray, dahon', '', 0.00, 'Vegetable', ''),
(33, 'Langka, hilaw', '', 0.00, 'Vegetable', ''),
(34, 'Malunggay, dahon', '', 0.00, 'Vegetable', ''),
(35, 'Paayap, bunga', '', 0.00, 'Vegetable', ''),
(36, 'Patani, bunga', '', 0.00, 'Vegetable', ''),
(37, 'Remolacha', '', 0.00, 'Vegetable', ''),
(38, 'Rimas, bunga', '', 0.00, 'Vegetable', ''),
(39, 'Saluyot, dahon', '', 0.00, 'Vegetable', ''),
(40, 'Sibuyas, ulo (Bombay, Tagalog)', '', 0.00, 'Vegetable', ''),
(41, 'Singkamas, bunga', '', 0.00, 'Vegetable', ''),
(42, 'Sitaw, bunga', '', 0.00, 'Vegetable', ''),
(43, 'Sitsaro', '', 0.00, 'Vegetable', ''),
(44, 'Togue', '', 0.00, 'Vegetable', ''),
(45, 'Ubod, niyog', '', 0.00, 'Vegetable', ''),
(46, 'Yakon', '', 0.00, 'Vegetable', ''),
(47, 'Asparagus, de lata', '1 cup', 100.00, 'Vegetable', ''),
(48, 'Mais, del lata', '2 pcs (8x1.5cm)', 75.00, 'Vegetable', ''),
(49, 'Garbansos, de lata', '1 tbsp', 15.00, 'Vegetable', ''),
(50, 'Gisantes(de lata, frozen)', '1 tbsp', 25.00, 'Vegetable', ''),
(51, 'Mixed vegetables (carrot, peas, and corn), frozen', '2 tbsp', 25.00, 'Vegetable', ''),
(52, 'Kabuti, de lata', '¼ cup', 110.00, 'Vegetable', ''),
(53, 'Kamatis, de lata', '3 tbsp', 50.00, 'Vegetable', ''),
(54, 'Tomato Juice, de lata', '¼ cup', 65.00, 'Vegetable', ''),
(55, 'Apulid, de lata', '4 pcs (2 cm diameter)', 40.00, 'Vegetable', ''),
(56, 'Abitsuwelas, bunga', '', 0.00, 'Vegetable', ''),
(57, 'Alfalfa sprouts', '', 0.00, 'Vegetable', ''),
(58, 'Alugbati, dahon', '', 0.00, 'Vegetable', ''),
(59, 'Ampalaya, bunga', '', 0.00, 'Vegetable', ''),
(60, 'Arugula', '', 0.00, 'Vegetable', ''),
(61, 'Asparagus', '', 0.00, 'Vegetable', ''),
(62, 'Baby corn/young corn', '', 0.00, 'Vegetable', ''),
(63, 'Baby corn/young corn', '', 0.00, 'Vegetable', ''),
(64, 'Bataw, bunga', '', 0.00, 'Vegetable', ''),
(65, 'Bok choy', '', 0.00, 'Vegetable', ''),
(66, 'Caulliflower', '', 0.00, 'Vegetable', ''),
(67, 'Kalabasa, bulaklak', '', 0.00, 'Vegetable', ''),
(68, 'Kale', '', 0.00, 'Vegetable', ''),
(69, 'Kamatis', '', 0.00, 'Vegetable', ''),
(70, 'Kamote, dahon', '', 0.00, 'Vegetable', ''),
(71, 'Kangkong, dahon', '', 0.00, 'Vegetable', ''),
(72, 'Katuray, bulaklak', '', 0.00, 'Vegetable', ''),
(73, 'Labanos', '', 0.00, 'Vegetable', ''),
(74, 'Labong', '', 0.00, 'Vegetable', ''),
(75, 'Letsugas, dahon at tangkay', '', 0.00, 'Vegetable', ''),
(76, 'Malunggay, bunga', '', 0.00, 'Vegetable', ''),
(77, 'Mustasa, dahon', '', 0.00, 'Vegetable', ''),
(78, 'Okra', '', 0.00, 'Vegetable', ''),
(79, 'Pako, dahon', '', 0.00, 'Vegetable', ''),
(80, 'Papaya, bunga, hilaw', '', 0.00, 'Vegetable', ''),
(81, 'Patola, bunga', '', 0.00, 'Vegetable', ''),
(82, 'Pechay Baguio', '', 0.00, 'Vegetable', ''),
(83, 'Pechay, dahon', '', 0.00, 'Vegetable', ''),
(84, 'Pipino', '', 0.00, 'Vegetable', ''),
(85, 'Puso ng saging, Butuan', '', 0.00, 'Vegetable', ''),
(86, 'Repolyo (berde, pula)', '', 0.00, 'Vegetable', ''),
(87, 'Sayote, bunga', '', 0.00, 'Vegetable', ''),
(88, 'Sayote, dahon', '', 0.00, 'Vegetable', ''),
(89, 'Seaweed (balbalulang, kulot, lato, lukot, pokpoklo)', '', 0.00, 'Vegetable', ''),
(90, 'Sigarilyas, bunga', '', 0.00, 'Vegetable', ''),
(91, 'Sili, lara', '', 0.00, 'Vegetable', ''),
(92, 'Singkamas, ugat', '', 0.00, 'Vegetable', ''),
(93, 'Sitaw, talbos', '', 0.00, 'Vegetable', ''),
(94, 'Spinach, dahon', '', 0.00, 'Vegetable', ''),
(95, 'Upo, bunga', '', 0.00, 'Vegetable', ''),
(96, 'Talinum, dahon', '', 0.00, 'Vegetable', ''),
(97, 'Talong', '', 0.00, 'Vegetable', ''),
(98, 'Alimuran', '13 pcs', 119.00, 'Fruit', ''),
(99, 'Atis', '1 pc', 100.00, 'Fruit', ''),
(100, 'Balimbing', '4 ½ pcs', 182.00, 'Fruit', ''),
(101, 'Bayabas, pula', '2 pcs', 61.00, 'Fruit', ''),
(102, 'Bayabas, puti', '3 pcs', 81.00, 'Fruit', ''),
(103, 'Bignay', '2 cups', 299.00, 'Fruit', ''),
(104, 'Blueberries', '½ cup', 84.00, 'Fruit', ''),
(105, 'Camachili', '7 pods', 110.00, 'Fruit', ''),
(106, 'Cherries, hinog', '7 pcs', 76.00, 'Fruit', ''),
(107, 'Chico', '1 pc', 54.00, 'Fruit', ''),
(108, 'Gatas, kalabaw', '¼ cup', 200.00, 'Milk', ''),
(109, 'Gatas, baka', '1 cup', 250.00, 'Milk', ''),
(110, 'Gatas, evaporada', '½ cup', 125.00, 'Milk', ''),
(111, 'Gatas, evaporada, filled', '½ cup', 125.00, 'Milk', ''),
(112, 'Gatas, kambing', '1 cup', 250.00, 'Milk', ''),
(113, 'Gatas, recombined', '¼ cup', 200.00, 'Milk', ''),
(114, 'Gatas, pulbos, filled, instant', '5 tbsp, level', 35.00, 'Milk', ''),
(115, 'Gatas, pulbos, full cream', '5 tbsp, level', 35.00, 'Milk', ''),
(116, 'Gatas, low fat', '1 cup', 250.00, 'Milk', ''),
(117, 'Yogurt', '½ cup', 150.00, 'Milk', ''),
(118, 'Buttermilk', '¼ cup', 180.00, 'Milk', ''),
(119, 'Gatas, skim', '1 cup', 250.00, 'Milk', ''),
(120, 'Gatas, pulbos, skim', '4 tbsp, level', 25.00, 'Milk', ''),
(121, 'Gatas, pulbos, non-fat, instant', '4 tbsp, level', 25.00, 'Milk', ''),
(122, 'Yogurt, plain, skim', '½ cup', 150.00, 'Milk', ''),
(123, 'Kanin, “protein-reduced”', '1/3 cup', 55.00, 'Rice A', ''),
(124, 'Ampaw, pinipig', '2 pcs', 25.00, 'Rice A', ''),
(125, 'Biko', '1 slice', 40.00, 'Rice A', ''),
(126, 'Cuchinta', '6 pcs', 60.00, 'Rice A', ''),
(127, 'Sapin-Sapin', '1 slice', 75.00, 'Rice A', ''),
(128, 'Cornstarch', '1/4 cup', 25.00, 'Rice A', ''),
(129, 'Maja Blanca', '1/2 slice', 65.00, 'Rice A', ''),
(130, 'Maja Mais', '1 slice', 75.00, 'Rice A', ''),
(131, 'Bihon', '1 cup', 100.00, 'Rice A', ''),
(132, 'Misua', '1 cup', 100.00, 'Rice A', ''),
(133, 'Sotanghon', '1 cup', 100.00, 'Rice A', ''),
(134, 'Sweet potato noodles', '1 cup', 100.00, 'Rice A', ''),
(135, 'Bigas, maputi, sinaing', '1/2 cup', 80.00, 'Rice B', ''),
(136, 'Bigas, mapula, sinaing', '1/2 cup', 80.00, 'Rice B', ''),
(137, 'Pinawa, sinaing', '1/2 cup', 80.00, 'Rice B', ''),
(139, 'Medium Consistency Lugaw (1/2 cup cooked rice + 3 cups water)', '3 cups', 435.00, 'Rice B', ''),
(140, 'Thin Consistency Lugaw (1/2 cup cooked rice + 5 cups water)', '4 1/2 cups', 705.00, 'Rice B', ''),
(141, 'Thick Consistency Lugaw (1/2 cup cooked rice + 2 cups water)', '1 1/2 cups', 250.00, 'Rice B', ''),
(142, 'Ampaw, rice', '2 pcs', 25.00, 'Rice B', ''),
(143, 'Bibingka, galapong', '1/2 slice', 45.00, 'Rice B', ''),
(144, 'Bibingka, malagkit', '1/2 slice', 40.00, 'Rice B', ''),
(145, 'Bibingka, pinipig', '1 slice', 50.00, 'Rice B', ''),
(146, 'Espasol', '1 slice', 35.00, 'Rice B', ''),
(147, 'Kalamay, may latik', '1 slice', 50.00, 'Rice B', ''),
(148, 'Kalamay, ube', '1 slice', 60.00, 'Rice B', ''),
(149, 'Palitaw, walang Niyog', '3 pcs', 50.00, 'Rice B', ''),
(150, 'Bread, wheat', '1 1/2 pcs', 40.00, 'Rice C', ''),
(151, 'Ensaymada', '1 pc', 35.00, 'Rice C', ''),
(152, 'Hamburger bun', '1 pc', 35.00, 'Rice C', ''),
(153, 'Hotdog roll', '1 pc', 35.00, 'Rice C', ''),
(154, 'Loaf bread/Pan Amerikano', '1 1/2 pcs', 35.00, 'Rice C', ''),
(155, 'Pan de bonete', '1 1/2 pcs', 35.00, 'Rice C', ''),
(156, 'Pan de leche', '1 1/2 pcs', 35.00, 'Rice C', ''),
(157, 'Pan de limon', '1 pc', 35.00, 'Rice C', ''),
(158, 'Pan de monay', '1/2 pc', 35.00, 'Rice C', ''),
(159, 'Pan de sal', '1 1/2 pcs', 35.00, 'Rice C', ''),
(160, 'Pita bread, white (enriched/unenriched)', '1/2 pc', 40.00, 'Rice C', ''),
(161, 'Pita bread, whole wheat', '1/2 pc', 40.00, 'Rice C', ''),
(162, 'Tinapay, tostado', '1 1/2 pcs', 30.00, 'Rice C', ''),
(163, 'Couscous', '1 cup', 100.00, 'Rice C', ''),
(164, 'Pasta (enriched/unenriched)', '1/2 cup', 70.00, 'Rice C', ''),
(165, 'Udon', '1 cup', 100.00, 'Rice C', ''),
(166, 'Balat ng lumpia', '7 pcs', 35.00, 'Rice C', ''),
(167, 'Langka, buto', '14 pcs', 75.00, 'Rice C', ''),
(168, 'Quinoa', '1 cup', 95.00, 'Rice C', ''),
(169, 'Beef kenchi', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(170, 'Beef laman', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(171, 'Beef pierna corta at pierca larga', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(172, 'Beef solomilyo', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(173, 'Beef tagiliran, gitna', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(174, 'Beef tagiliran, hulihan', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(175, 'Carabeef hita', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(176, 'Carabeef kenchi', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(177, 'Carabeef laman, bahagyang taba', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(178, 'Carabeef paypay', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(179, 'Carabeef pierta corta at pierna larga', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(180, 'Carabeef Tapadera', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(181, 'Pork lomo', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(182, 'Goat balikat', '1 slice', 40.00, 'Low Fat Meat', ''),
(183, 'Goat binti', '1 slice', 40.00, 'Low Fat Meat', ''),
(184, 'Goat biyas', '1 slice', 40.00, 'Low Fat Meat', ''),
(185, 'Goat dibdib', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(186, 'Goat leeg', '1 slice', 40.00, 'Low Fat Meat', ''),
(187, 'Goat likod', '1 slice', 40.00, 'Low Fat Meat', ''),
(188, 'Goat lomo', '1 slice, mbs', 35.00, 'Low Fat Meat', ''),
(189, 'Goat tadyang', '1 slice', 40.00, 'Low Fat Meat', ''),
(190, 'Beef paypay, laman', '1 slice, mbs', 35.00, 'Medium Fat Meat', ''),
(191, 'Beef punta y pecho', '1 slice, mbs', 35.00, 'Medium Fat Meat', ''),
(192, 'Pork pata', '1 slice, mbs', 35.00, 'Medium Fat Meat', ''),
(193, 'Chicken binti', '1 pc', 35.00, 'Medium Fat Meat', ''),
(194, 'Chicken hita', '1 pc', 35.00, 'Medium Fat Meat', ''),
(195, 'Chicken pakpak', '1 pc', 35.00, 'Medium Fat Meat', ''),
(196, 'Chicken ulo', '2 pcs', 50.00, 'Medium Fat Meat', ''),
(197, 'Duck hita', '1 pc', 35.00, 'Medium Fat Meat', ''),
(198, 'Duck likod', '1 slice', 30.00, 'Medium Fat Meat', ''),
(199, 'Duck pitso', '1 slice, mbs', 35.00, 'Medium Fat Meat', ''),
(200, 'Goat tiyan', '1 slice, mbs', 35.00, 'Medium Fat Meat', ''),
(201, 'Carabeef bitukang maliit', '1/4 cup', 35.00, 'Medium Fat Meat', ''),
(202, 'Beef goto', '1/4 cup', 85.00, 'Medium Fat Meat', ''),
(203, 'Pork/Beef/carabeef utak', '1/4 cup', 45.00, 'Medium Fat Meat', ''),
(204, 'Chicken whole egg', '1 pc medium', 55.00, 'Medium Fat Meat', ''),
(205, 'Duck whole salted egg', '1 pc medium', 55.00, 'Medium Fat Meat', ''),
(206, 'Quail egg', '7 pcs small', 55.00, 'Medium Fat Meat', ''),
(207, 'Fish karpa', '1/2 pc', 35.00, 'Medium Fat Meat', ''),
(208, 'Avocado', '', 65.00, 'Fat', ''),
(209, 'Olive oil', '1 tsp', 6.00, 'Fat', ''),
(210, 'Almond nuts', '7 pcs', 8.00, 'Fat', ''),
(211, 'Kasoy', '6 pcs, whole', 9.00, 'Fat', ''),
(212, 'Macadamia', '5 pcs', 7.00, 'Fat', ''),
(213, 'Mixed nuts', '1 tbsp', 7.00, 'Fat', ''),
(214, 'Pili nut', '5 pcs', 7.00, 'Fat', ''),
(215, 'Peanut Butter', '1/2 tbsp', 10.00, 'Fat', ''),
(216, 'Sunflower seeds', '1 tbsp', 8.00, 'Fat', ''),
(217, 'Patani seeds', '5 pcs', 10.00, 'Fat', ''),
(218, 'Shortening', '1 tsp', 5.00, 'Fat', ''),
(219, 'Arnibal', '1 tsp', 5.00, 'Sugar', ''),
(220, 'Asukal (muscovado, pula, puti)', '1 tsp', 5.00, 'Sugar', ''),
(221, 'Banana chips', '2 pcs', 5.00, 'Sugar', ''),
(222, 'Bukayo', '1 pc (2 cm diameter)', 5.00, 'Sugar', ''),
(223, 'Candy (caramel, hard, toffee)', '1 pc', 5.00, 'Sugar', ''),
(224, 'Champoy', '1 pc (2 cm diameter)', 5.00, 'Sugar', ''),
(225, 'Cherry, in syrup', '5 pcs', 20.00, 'Sugar', ''),
(226, 'Chewing gum, bubble gum', '1-2 pcs', 5.00, 'Sugar', ''),
(227, 'Chocolate', '2 pcs', 5.00, 'Sugar', ''),
(228, 'Coco sugar', '1 tsp', 5.00, 'Sugar', ''),
(229, 'Coco syrup', '1 tsp', 5.00, 'Sugar', ''),
(230, 'Dates, pitted', '1 pc', 5.00, 'Sugar', ''),
(231, 'Dikyam', '1 pc', 10.00, 'Sugar', ''),
(232, 'Dried jackfruit', '1 pc', 5.00, 'Sugar', ''),
(233, 'Dried kiwi', '1 pc', 5.00, 'Sugar', ''),
(234, 'Dried papaya chunks', '1 pc', 5.00, 'Sugar', ''),
(235, 'Dried pineapple', '1 pc', 5.00, 'Sugar', ''),
(236, 'Dulce de Leche', '2 pcs', 5.00, 'Sugar', ''),
(237, 'Gatas, sweetened, kondensada, filled', '1 tsp', 5.00, 'Sugar', ''),
(238, 'Gulaman, may lasang prutas', '1 pc', 15.00, 'Sugar', ''),
(239, 'Jam at jellies', '2 tsp', 10.00, 'Sugar', ''),
(240, 'Kiamoy', '2 pcs', 15.00, 'Sugar', ''),
(241, 'Leche Flan', '1 slice', 10.00, 'Sugar', ''),
(242, 'Lokum', '1 pc', 5.00, 'Sugar', ''),
(243, 'Marshmallow', '3 pcs', 5.00, 'Sugar', ''),
(244, 'Matamis na bao', '1 tsp', 5.00, 'Sugar', ''),
(245, 'Nata de coco/ nata de pina, sweetened', '1 tbsp', 15.00, 'Sugar', ''),
(246, 'Pakaskas/Panocha', '1 tsp', 5.00, 'Sugar', ''),
(247, 'Pasas', '1 tsp', 5.00, 'Sugar', ''),
(248, 'Pastilyas (durian, gatas, langka)', '1 pc', 5.00, 'Sugar', ''),
(249, 'Prunes', '2 pcs', 10.00, 'Sugar', ''),
(250, 'Pulot', '2 tsp', 10.00, 'Sugar', ''),
(251, 'Pulot-pukyutan', '1 tsp', 5.00, 'Sugar', ''),
(252, 'Sampalok, candied', '2 pcs', 5.00, 'Sugar', ''),
(253, 'Taho na may arnibal at sago', '1/4 cup', 40.00, 'Sugar', ''),
(254, 'Tira-tira', '1 pc', 5.00, 'Sugar', ''),
(255, 'Ice candy', '1 pc', 75.00, 'Sugar', ''),
(256, 'Ice drop', '1 pc', 40.00, 'Sugar', ''),
(257, 'Kundol, candied', '1 pc', 15.00, 'Sugar', ''),
(258, 'Polvoron', '1 pc', 10.00, 'Sugar', ''),
(259, 'Rimas, candied', '3 pcs', 35.00, 'Sugar', ''),
(260, 'Ubedol', '1 pc', 20.00, 'Sugar', ''),
(261, 'Yema', '1 pc', 25.00, 'Sugar', ''),
(262, 'Dalandan, (ladu,/szinkom)', '3 pcs', 344.00, 'Fruit', ''),
(263, 'Datiles/Aratiles', '1/4 cup or 25 pcs', 61.00, 'Fruit', ''),
(264, 'Dragon fruit', '1/2 cup or 1/4 pc', 119.00, 'Fruit', ''),
(265, 'Duhat', '12 pcs', 80.00, 'Fruit', ''),
(266, 'Durian', '2 segments', 150.00, 'Fruit', ''),
(267, 'Granada', '1/2 pc', 182.00, 'Fruit', ''),
(268, 'Guyabano', '1 slice', 107.00, 'Fruit', ''),
(269, 'Kasuy, bunga', '2 pcs', 78.00, 'Fruit', ''),
(270, 'Kaymito, berde', '1/2 pc', 123.00, 'Fruit', ''),
(271, 'Kaymito, murado', '1/2 pc', 103.00, 'Fruit', ''),
(272, 'Kiwifruit, berde', '1 pc', 99.00, 'Fruit', ''),
(273, 'Langka, hinog', '1 1/2 segments', 118.00, 'Fruit', ''),
(274, 'Lansones', '5 pcs', 118.00, 'Fruit', ''),
(275, 'Lechiyas/litchi', '4 pcs', 77.00, 'Fruit', ''),
(276, 'Longan', '13 pcs', 113.00, 'Fruit', ''),
(277, 'Mabolo', '1/2 pc', 100.00, 'Fruit', ''),
(278, 'Makopa', '9 pcs', 188.00, 'Fruit', ''),
(279, 'Mangga, Indian, hilaw', '1/2 cup or 1 pc', 140.00, 'Fruit', ''),
(280, 'Mangga, kalabaw, hilaw', '1/2 cup or 1 slice', 97.00, 'Fruit', ''),
(281, 'Mangga, kalabaw, manibalang', '1/2 cup or 1 slice', 97.00, 'Fruit', ''),
(284, 'Mangga, paho/pahutan, hilaw', '9 pcs', 79.00, 'Fruit', ''),
(285, 'Mangga, piko, hilaw', '1 slice', 82.00, 'Fruit', ''),
(286, 'Mangga, piko, hinog', '1 slice', 103.00, 'Fruit', ''),
(287, 'Mangga, piko, manibalang', '1 slice', 85.00, 'Fruit', ''),
(288, 'Mangga, supsupin, hinog', '1 pc', 94.00, 'Fruit', ''),
(289, 'Mangosteen', '2 pcs', 212.00, 'Fruit', ''),
(290, 'Mansanas, berde', '1 pc', 97.00, 'Fruit', ''),
(291, 'Mansanas, pula', '1 pc', 99.00, 'Fruit', ''),
(292, 'Marang', '10 pcs', 121.00, 'Fruit', ''),
(293, 'Milon, honey dew', '1/4 cup or 1 slice', 119.00, 'Fruit', ''),
(294, 'Milon, kastila', '1 1/4 cup or 1 slice', 317.00, 'Fruit', ''),
(295, 'Orange, Florida', '1/2 pc', 135.00, 'Fruit', ''),
(296, 'Orange, kiat kiat', '1 pc', 108.00, 'Fruit', ''),
(297, 'Orange, ponkan', '1 pc', 108.00, 'Fruit', ''),
(298, 'Pakwan', '1 cup or 1 slice', 242.00, 'Fruit', ''),
(299, 'Papaya, hinog', '1/4 cup or 1 slice', 141.00, 'Fruit', ''),
(300, 'Passion fruit', '1/4 cup or 2 pcs', 125.00, 'Fruit', ''),
(301, 'Peras', '1/4 cup or 1/2 pc', 130.00, 'Fruit', ''),
(302, 'Persimon', '1/2 pc', 105.00, 'Fruit', ''),
(303, 'Pinya', '1/2 cup or 1 slice', 138.00, 'Fruit', ''),
(304, 'Rambutan', '5 pcs', 153.00, 'Fruit', ''),
(305, 'Saging, bungulan', '1/2 pc', 60.00, 'Fruit', ''),
(306, 'Saging, cavendish, hinog', '1/2 pc', 63.00, 'Fruit', ''),
(307, 'Saging, gloria', '1/2 pc', 65.00, 'Fruit', ''),
(308, 'Saging, lakatan', '1/2 pc', 58.00, 'Fruit', ''),
(309, 'Saging, latundan', '1/2 pc', 55.00, 'Fruit', ''),
(310, 'Saging, murado', '1/2 pc', 60.00, 'Fruit', ''),
(311, 'Saging, saba', '1/2 pc', 70.00, 'Fruit', ''),
(312, 'Sampalok, hinog', '12 segments', 34.00, 'Fruit', ''),
(313, 'Santol', '1 pc', 110.00, 'Fruit', ''),
(314, 'Singkamas, ugat', '1 cup or 1 1/2 pcs', 230.00, 'Fruit', ''),
(315, 'Siniguwelas', '4 pcs', 78.00, 'Fruit', ''),
(316, 'Strawberry', '1 1/4 cups', 168.00, 'Fruit', ''),
(317, 'Suha', '2 segments or 1/4 pc', 156.00, 'Fruit', ''),
(318, 'Tiesa', '1/4 pc or 1 slice', 41.00, 'Fruit', ''),
(319, 'Ubas', '5 pcs / 12 pcs small', 69.00, 'Fruit', ''),
(320, 'Fresh lemon juice', '1/2 cup', 130.00, 'Fruit', ''),
(321, 'Fresh Coconut water', '1 cup', 240.00, 'Fruit', ''),
(322, 'Fresh orange juice', '1/3 cup', 90.00, 'Fruit', ''),
(323, 'Passion fruit juice', '1/4 cup', 65.00, 'Fruit', ''),
(324, 'Canned apple sauce', '4 tbsp', 60.00, 'Fruit', ''),
(325, 'Canned apple sauce unsweetened', '1/2 cup', 100.00, 'Fruit', ''),
(326, 'Blackberries, heavy syrup, solids and liquids', '1/4 cup or 9 pcs', 45.00, 'Fruit', ''),
(327, 'Blueberries, light syrup, drained', '1/4 cup or 29 pcs', 45.00, 'Fruit', ''),
(328, 'Fruit cocktail, tropical, in syrup', '1/4 cup', 45.00, 'Fruit', ''),
(329, 'Lychee in syrup', '4 pcs', 45.00, 'Fruit', ''),
(330, 'Peach halves in heavy syrup', '1 pc', 65.00, 'Fruit', ''),
(331, 'Pineapple crushed/tidbits/chunks ', '1/3 cup', 50.00, 'Fruit', ''),
(332, 'Pineapple slice', '1 ring', 40.00, 'Fruit', ''),
(333, 'Strawberrries, frozen, unsweetened', '1/4 cup or 26 pcs', 130.00, 'Fruit', ''),
(334, 'Strawberries, heavy syrup, solids and liquids', '1/4 cup or 7 pcs', 45.00, 'Fruit', ''),
(335, 'Dried champoy', '2 pcs', 10.00, 'Fruit', ''),
(336, 'Dried Dates', '2 pcs', 15.00, 'Fruit', ''),
(337, 'Dried dikyam', '2 pcs', 15.00, 'Fruit', ''),
(338, 'Dried mango chips', '2 pcs', 10.00, 'Fruit', ''),
(339, 'Dried prunes', '1 pc', 15.00, 'Fruit', ''),
(340, 'Dried Raisins', '2 tbsp', 15.00, 'Fruit', ''),
(341, 'Gabi rootcrop', '1/4 cup, cubes', 100.00, 'Rice A', ''),
(342, 'Kamote rootcrop (dilaw, murado, puti)', '	1 pc or 1/4 cup, cubed', 85.00, 'Rice A', ''),
(343, 'Kamoteng kahoy, balinghoy', '1 slice, or 1/4 cup, cubed', 85.00, 'Rice A', ''),
(344, 'Kamoteng kahoy, bibingka', '1 slice', 55.00, 'Rice A', ''),
(345, 'Kamoteng kahoy, linupak', '1 pc', 55.00, 'Rice A', ''),
(346, 'Kamoteng kahoy, pichi-pichi', '1 pc', 45.00, 'Rice A', ''),
(347, 'Kamoteng kahoy, suman', '1 pc', 45.00, 'Rice A', ''),
(348, 'Tugi', '1 pc or 1 1/4 cups, cubed', 150.00, 'Rice A', ''),
(349, 'Ubi', '1 cup, cubed', 130.00, 'Rice A', ''),
(350, 'Saging na saba, nilaga', '1 pc', 65.00, 'Rice A', ''),
(351, 'Sago, nilaga', '1/2 cup', 120.00, 'Rice A', ''),
(352, 'Sago, tapioca', '3/4 cup', 160.00, 'Rice A', ''),
(353, 'Puto, brown', '1/2 slice', 50.00, 'Rice B', ''),
(354, 'Puto bumbong', '2 pcs', 40.00, 'Rice B', ''),
(355, 'Puto maya', '1/2 slice ', 60.00, 'Rice B', ''),
(356, 'Puto, puti/Puto Calasiao', '3-4 pcs', 50.00, 'Rice B', ''),
(357, 'Puto seko', '4 pcs', 25.00, 'Rice B', ''),
(358, 'Puto seko, may niyog', '7 pcs', 25.00, 'Rice B', ''),
(359, 'Suman marwekos, may niyog', '1 pc', 50.00, 'Rice B', ''),
(360, 'Suman sa ibos', '1 pc', 60.00, 'Rice B', ''),
(361, 'Suman sa lihiya', '1/2 pc ', 55.00, 'Rice B', ''),
(362, 'Tamales', '2 pcs ', 100.00, 'Rice B', ''),
(363, 'Tikoy', '1 slice', 40.00, 'Rice B', ''),
(364, 'Tupig', '1 pc', 35.00, 'Rice B', ''),
(365, 'Apas', '7 pcs', 25.00, 'Rice B', ''),
(366, 'Brohas', '5 pcs', 25.00, 'Rice B', ''),
(367, 'Cake, mamon, tostado', '2 1/2 pcs', 25.00, 'Rice B', ''),
(368, 'Cuapao', '1/2 pc', 35.00, 'Rice B', ''),
(369, 'Hopyang hapon', '1 pc', 30.00, 'Rice B', ''),
(370, 'Marie', '8 pcs', 25.00, 'Rice B', ''),
(371, 'Pasencia', '7 pcs', 25.00, 'Rice B', ''),
(372, 'Pianono', '1 slice', 35.00, 'Rice B', ''),
(373, 'Sponge cake', '1 slice', 35.00, 'Rice B', ''),
(374, 'Binatog', '1/2 cup', 90.00, 'Rice B', ''),
(375, 'Corn flakes', '1/2 cup', 25.00, 'Rice B', ''),
(376, 'Mais, butil, de lata', '1 cup', 160.00, 'Rice B', ''),
(377, 'Mais, cream style, de lata', '1/2 cup', 130.00, 'Rice B', ''),
(378, 'Mais, durog (dilaw, puti)', '1 cup', 120.00, 'Rice B', ''),
(379, 'Mais sa busal', '1/2 pc', 65.00, 'Rice B', ''),
(380, 'Patatas rootcrop', '1 pc or 1 1/4 cups, cubed', 170.00, 'Rice B', ''),
(381, 'Kastanyas, binusa', '8 pcs', 40.00, 'Rice B', ''),
(382, 'Plantains', '1 pc', 80.00, 'Rice B', ''),
(383, 'Chicken laman', '1 slice', 30.00, 'Low Fat Meat', ''),
(384, 'Chciken pitso', '1 slice', 30.00, 'Low Fat Meat', ''),
(385, 'Duck pakpak', '1 pc', 30.00, 'Low Fat Meat', ''),
(386, 'Palaka, laman', '1 pc big or 2 pcs small', 30.00, 'Low Fat Meat', ''),
(387, 'Atay (pork, beef, carabeef, chicken)', '	1/4 cup or 1 pc', 30.00, 'Low Fat Meat', ''),
(388, 'Baga (pork, beef, carabeef)', '1/4 cup', 35.00, 'Low Fat Meat', ''),
(389, 'Balun-balunan (chicken, duck)', '1/4 cup or 4 pcs	', 25.00, 'Low Fat Meat', ''),
(390, 'Bato(pork, beef, carabeef)', '1/2 cup', 45.00, 'Low Fat Meat', ''),
(391, 'Bitukang maliit ', '2 sticks', 20.00, 'Low Fat Meat', ''),
(392, 'Dugo (pork, beef, chicken', '1/4 cup', 35.00, 'Low Fat Meat', ''),
(393, 'Lapay (pork, beef, carabeef)', '1/2 cup', 45.00, 'Low Fat Meat', ''),
(394, 'Librilyo (beef, carabeef)', '1/2 cup', 50.00, 'Low Fat Meat', ''),
(395, 'Litid (beef)', '1 slice, mbs', 30.00, 'Low Fat Meat', ''),
(396, 'Puso (pork, beef, carabeef)', '1/4 cup', 25.00, 'Low Fat Meat', ''),
(397, 'Alumahan', '1/2 pc', 35.00, 'Low Fat Meat', ''),
(398, 'Bakokong moro', '1/2 slice', 40.00, 'Low Fat Meat', ''),
(399, 'Bangus', '1 slice', 35.00, 'Low Fat Meat', ''),
(400, 'Dalag ', '1/2 slice', 40.00, 'Low Fat Meat', ''),
(401, 'Dalagang bukid', '1/2 pc', 35.00, 'Low Fat Meat', ''),
(402, 'Dilis, buo', '1/3 cup', 35.00, 'Low Fat Meat', ''),
(403, 'Dilis, walang ulo', '1/4 cup', 25.00, 'Low Fat Meat', ''),
(404, 'Dulong', '1/2 cup', 50.00, 'Low Fat Meat', ''),
(405, 'Galunggong', '1 pc', 35.00, 'Low Fat Meat', ''),
(406, 'Hasa-hasa', '1 pc', 35.00, 'Low Fat Meat', ''),
(407, 'Hito', '1 slice', 35.00, 'Low Fat Meat', ''),
(408, 'Labahita', '1/2 slice', 40.00, 'Low Fat Meat', ''),
(409, 'Matang baka', '1 pc', 35.00, 'Low Fat Meat', ''),
(410, 'Sapsap', '2 pcs', 35.00, 'Low Fat Meat', ''),
(411, 'Saramulyete', '1 pc', 35.00, 'Low Fat Meat', ''),
(412, 'Tambakol', '1/2 slice', 35.00, 'Low Fat Meat', ''),
(413, 'Tamban', '1 1/2 pcs', 35.00, 'Low Fat Meat', ''),
(414, 'Tawilis', '2 pcs', 30.00, 'Low Fat Meat', ''),
(415, 'Tilapia', '1/2 slice', 35.00, 'Low Fat Meat', ''),
(416, 'Tulingan', '1/2 slice', 35.00, 'Low Fat Meat', ''),
(417, 'Alimango, alige', '1 tbsp', 15.00, 'Low Fat Meat', ''),
(418, 'Alimango, laman', '1/3 cup or 1/2 pc', 50.00, 'Low Fat Meat', ''),
(419, 'Alimasag, alige', '2 1/2 tbsp', 25.00, 'Low Fat Meat', ''),
(420, 'Alimasag, laman', '1/3 cup or 1 pc', 40.00, 'Low Fat Meat', ''),
(421, 'Balatan', '6 pcs', 120.00, 'Low Fat Meat', ''),
(422, 'Pugita', '', 40.00, 'Low Fat Meat', ''),
(423, 'Pusit', '2 pcs', 50.00, 'Low Fat Meat', ''),
(424, 'Talangka', '6 pcs', 25.00, 'Low Fat Meat', ''),
(425, 'Hipon, alamang', '1/3 cup', 40.00, 'Low Fat Meat', ''),
(426, 'Hipon, sugpo', '1/2 pc', 40.00, 'Low Fat Meat', ''),
(427, 'Hipon, suwahe', '4 pcs', 40.00, 'Low Fat Meat', ''),
(428, 'Hipon, tagunton', '', 40.00, 'Low Fat Meat', ''),
(429, 'Hipon, ulang', '40', 0.00, 'Low Fat Meat', ''),
(430, 'Batotoy', '1/2 cup or 4 pcs', 60.00, 'Low Fat Meat', ''),
(431, 'Lapas/ Kapinan', '2-3 pcs', 30.00, 'Low Fat Meat', ''),
(432, 'Paros', '1/3 cup or 12 pcs', 60.00, 'Low Fat Meat', ''),
(433, 'Tuway', '2 1/2 cup (w/shells) or 1/4 cup (w/o shells) or 22 pcs', 45.00, 'Low Fat Meat', ''),
(434, 'Cottage', '1/3 cup', 50.00, 'Low Fat Meat', ''),
(435, 'Tuna flakes, in brine', '1/4 cup', 45.00, 'Low Fat Meat', ''),
(436, 'Alakaak', '8 pcs', 25.00, 'Low Fat Meat', ''),
(437, 'Alumahan', '2 pcs', 25.00, 'Low Fat Meat', ''),
(438, 'Bakalaw', '2 pcs', 25.00, 'Low Fat Meat', ''),
(439, 'Bisugo', '1 pc', 25.00, 'Low Fat Meat', ''),
(440, 'Biyang puti', '11 pcs small', 25.00, 'Low Fat Meat', ''),
(441, 'Lapu-lapu', '1 pc', 25.00, 'Low Fat Meat', ''),
(442, 'Malasug/Espada', '3 1/2 pcs', 20.00, 'Low Fat Meat', ''),
(443, 'Sapsap', '7 pcs', 25.00, 'Low Fat Meat', ''),
(444, 'Tamban', '2 pcs', 25.00, 'Low Fat Meat', ''),
(445, 'Tanigi/Tangigi', '', 25.00, 'Low Fat Meat', ''),
(446, 'Tilapia', '1 pc', 25.00, 'Low Fat Meat', ''),
(447, 'Alamang', '1/2 cup', 15.00, 'Low Fat Meat', ''),
(448, 'Ayunin', '', 15.00, 'Low Fat Meat', ''),
(449, 'Dilis', '13 pcs', 15.00, 'Low Fat Meat', ''),
(450, 'Hibe', '4 tbsp', 25.00, 'Low Fat Meat', ''),
(451, 'Pusit dried', '2 pcs', 15.00, 'Low Fat Meat', ''),
(452, 'Sapsap dried', '4 pcs', 20.00, 'Low Fat Meat', ''),
(453, 'Tamban dried', '2 pcs', 20.00, 'Low Fat Meat', ''),
(454, 'Smoked galunggong', '1/2 pc', 25.00, 'Low Fat Meat', ''),
(455, 'Smoked tamban', '3 pcs', 25.00, 'Low Fat Meat', ''),
(456, 'Smoked tunsoy', '3 pcs', 25.00, 'Low Fat Meat', ''),
(457, 'Processed cheddar, pasteurized', '1 slice', 30.00, 'Medium Fat Meat', ''),
(458, 'Processed/smoked bangus', '1 slice', 30.00, 'Medium Fat Meat', ''),
(459, 'Canned salmon sa mantika', '3 slices', 45.00, 'Medium Fat Meat', ''),
(460, 'Canned sardinas sa tomato', '2 pcs', 80.00, 'Medium Fat Meat', ''),
(461, 'Canned tuna spread', '2 tbsp', 25.00, 'Medium Fat Meat', ''),
(462, 'Canned carne norte', '1/4 cup', 45.00, 'Medium Fat Meat', ''),
(463, 'Canned sausage, ham', '2 pcs', 55.00, 'Medium Fat Meat', ''),
(464, 'Processed tofu', '1/2 cup', 100.00, 'Medium Fat Meat', ''),
(465, 'Processed tokwa', '1 pc', 70.00, 'Medium Fat Meat', ''),
(466, 'Processed chick, one day-old, fried', '2 pcs', 35.00, 'Medium Fat Meat', ''),
(467, 'Processed manok paa, barbecue', '4 pcs (CAP)', 35.00, 'Medium Fat Meat', ''),
(468, 'Processed manok ulo, barbecue', '3 pcs', 35.00, 'Medium Fat Meat', ''),
(469, 'Aseyte', '1 tsp', 5.00, 'Fat', ''),
(470, 'Fish oil, cod liver', '1 tsp', 5.00, 'Fat', ''),
(471, 'Mantika/langis (canola, corn, flaxseed, sesame,soybean, sunflower', '1 tsp', 5.00, 'Fat', ''),
(472, 'Walnut', '2 pcs', 7.00, 'Fat', ''),
(473, 'Flaxseed seeds', '2 1/2 tsp', 8.00, 'Fat', ''),
(474, 'Kalabasa seeds', '1 tbsp', 10.00, 'Fat', ''),
(475, 'Linga seeds', '1 tbsp', 8.00, 'Fat', ''),
(476, 'Pakwan seeds', '1 1/2 tbsp', 10.00, 'Fat', ''),
(477, 'Bacon', '1 strip', 10.00, 'Fat', ''),
(478, 'Cream cheese', '1 tbsp', 15.00, 'Fat', ''),
(479, 'Cream, all purpose', '1 tbsp', 15.00, 'Fat', ''),
(480, 'Cream, fluid, whipping (heavy, light)', '1 tbsp', 15.00, 'Fat', ''),
(481, 'Cream, whipped', '', 20.00, 'Fat', ''),
(482, 'Krema', '4 tsp', 20.00, 'Fat', ''),
(483, 'Lard', '1 tsp', 5.00, 'Fat', ''),
(484, 'Latik', '2 tsp', 10.00, 'Fat', ''),
(485, 'Mantekilya', '1 tsp', 5.00, 'Fat', ''),
(486, 'Mantekilya light', '2 tsp', 10.00, 'Fat', ''),
(487, 'Mantika/Langis, niyog', '1 tsp', 5.00, 'Fat', ''),
(488, 'Mantika/Langis, niyog(virgin, extra virgin)', '1 tsp', 5.00, 'Fat', ''),
(489, 'Mantika, palm', '1 tsp', 5.00, 'Fat', ''),
(490, 'Margarine', '1 tsp', 5.00, 'Fat', ''),
(491, 'Mayonnaise', '1 tsp', 5.00, 'Fat', ''),
(492, 'Mayonnaise, diet', '4 tsp', 20.00, 'Fat', ''),
(493, 'Mayonnaise, light', '1 tbsp', 15.00, 'Fat', ''),
(494, 'Niyog, magulang', '4 tsp', 20.00, 'Fat', ''),
(495, 'Niyog, kakang gata', '1 tbsp', 15.00, 'Fat', ''),
(496, 'Salad dressing', '2 tsp', 10.00, 'Fat', ''),
(497, 'Sandwich spread', '1 tbsp', 15.00, 'Fat', ''),
(498, 'Sitsarong baboy/sitsarong balat', '5 pcs', 10.00, 'Fat', ''),
(499, 'Sour cream', '5 tsp', 25.00, 'Fat', ''),
(500, 'Beef tallow', '1 tsp', 5.00, 'Fat', ''),
(502, 'Beef Camto', '1 slice, mbs', 35.00, 'High Fat Meat', ''),
(503, 'Beef Tadyang', '1 slice, mbs', 35.00, 'High Fat Meat', ''),
(504, 'Pork Kasim', '1 slice, mbs', 35.00, 'High Fat Meat', ''),
(505, 'Pork Liempo', '1 slice', 35.00, 'High Fat Meat', ''),
(506, 'Pork Pigi', '1 slice', 35.00, 'High Fat Meat', ''),
(507, 'Pork Tadyang', '1 slice', 35.00, 'High Fat Meat', ''),
(508, 'Dila (baboy/baka)', '1 slice', 35.00, 'High Fat Meat', ''),
(509, 'Isang baboy, barbecue', '1/2 cup', 35.00, 'High Fat Meat', ''),
(510, 'Puso ng manok', '7 pcs', 35.00, 'High Fat Meat', ''),
(511, 'Tengang baboy, barbecue', '1 slice', 35.00, 'High Fat Meat', ''),
(512, 'Mani, may balok, binusa', '2 tbsp', 20.00, 'High Fat Meat', ''),
(513, 'Mani, walang balok, binusa', '2 tbsp', 20.00, 'High Fat Meat', ''),
(514, 'Egg Balut', '1 pc', 65.00, 'High Fat Meat', ''),
(515, 'Egg Penoy', '1 pc', 65.00, 'High Fat Meat', ''),
(516, 'Egg Pato, buo', '1 pc', 65.00, 'High Fat Meat', ''),
(517, 'Cheese Feta', '1/3 cup', 50.00, 'High Fat Meat', ''),
(518, 'Cheese Gouda', '1 1/2 slice', 30.00, 'High Fat Meat', ''),
(519, 'Cheese Parmesan, Grated', '1/4 cup', 35.00, 'High Fat Meat', ''),
(520, 'Cheese Pimiento', '2 1/2 tbsp', 35.00, 'High Fat Meat', ''),
(521, 'Cheese Keso De Bola', '1 slice', 35.00, 'High Fat Meat', ''),
(522, 'Fish Sardinas, Spanish Style', '3 pcs', 30.00, 'High Fat Meat', ''),
(523, 'Fish Tuna Flakes in vegetable oil', '1/4 cup', 45.00, 'High Fat Meat', ''),
(524, 'Meat Longganisa, chorizo', '1 pc', 30.00, 'High Fat Meat', ''),
(525, 'Meat Sausage, frankfurter', '1 1/2 pc', 60.00, 'High Fat Meat', ''),
(526, 'Meat Sausage, salami', '2 pcs', 50.00, 'High Fat Meat', '');

-- --------------------------------------------------------

--
-- Table structure for table `materials`
--

CREATE TABLE `materials` (
  `id` int(11) NOT NULL,
  `announcement_id` int(11) NOT NULL,
  `materials` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `materials`
--

INSERT INTO `materials` (`id`, `announcement_id`, `materials`) VALUES
(8, 202, 'AndinoClarencePholB_Ass^N1.docx'),
(9, 203, 'Certificate.jpeg'),
(10, 203, 'Homepage.png'),
(11, 204, 'Milestones_Deliverables.docx'),
(12, 205, 'AndinoClarencePholB_Ass^N1.docx'),
(13, 207, 'Milestones_Deliverables.docx'),
(14, 207, 'Sample.txt'),
(15, 207, 'sampleee.txt'),
(16, 208, 'Assignment 1 Database.docx'),
(17, 208, 'Seatwork Lesson 1.docx'),
(18, 209, 'Result.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `meal`
--

CREATE TABLE `meal` (
  `id` int(11) NOT NULL,
  `meal_title_id` int(11) NOT NULL,
  `meal_name` varchar(250) NOT NULL,
  `meal_time` varchar(100) NOT NULL,
  `syncData` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `meal`
--

INSERT INTO `meal` (`id`, `meal_title_id`, `meal_name`, `meal_time`, `syncData`) VALUES
(137770, 3755402, '', 'PMSnacks', 0),
(178337, 3411200, '', 'Dinner', 0),
(179387, 3799771, 'Adobo', 'Breakfast', 0),
(189437, 3876900, 'Hotdog', 'Dinner', 0),
(194753, 3455050, '', 'Lunch', 0),
(198319, 3411200, '', 'AMSnacks', 0),
(199139, 3876900, '', 'PMSnacks', 0),
(199547, 3371130, '', 'Breakfast', 0),
(203827, 3455050, '', 'Breakfast', 0),
(225874, 3356126, '', 'PMSnacks', 0),
(227052, 3885716, '', 'AMSnacks', 0),
(245563, 3371130, '', 'AMSnacks', 0),
(251480, 3356126, '', 'Breakfast', 0),
(265373, 3835693, '', 'PMSnacks', 0),
(282638, 3528222, 'Sinigang', 'Lunch', 0),
(313694, 3876900, 'Sinigang', 'Lunch', 0),
(330868, 3885716, '', 'PMSnacks', 0),
(337094, 3380446, '', 'AMSnacks', 0),
(338239, 3885716, '', 'Lunch', 0),
(344759, 3381498, 'Ginataan', 'Lunch', 0),
(345373, 3876900, 'Adobo', 'Breakfast', 0),
(354458, 3591155, '', 'PMSnacks', 0),
(361394, 3614410, '', 'PMSnacks', 0),
(363777, 3799771, '', 'Dinner', 0),
(371620, 3591155, '', 'AMSnacks', 0),
(384057, 3371130, '', 'Lunch', 0),
(385968, 3755402, '', 'AMSnacks', 0),
(386253, 3755402, '', 'Lunch', 0),
(403601, 3528222, 'Hotdog', 'Dinner', 0),
(404025, 3885716, '', 'Dinner', 0),
(435727, 3380446, 'Beef Brocolli', 'Breakfast', 0),
(435980, 3614410, '', 'Lunch', 0),
(439443, 3528222, '', 'AMSnacks', 0),
(444742, 3755402, '', 'Breakfast', 0),
(452561, 3411200, '', 'PMSnacks', 0),
(465147, 3835693, 'Adobo', 'Breakfast', 0),
(481539, 3591155, '', 'Dinner', 0),
(492166, 3371130, '', 'Dinner', 0),
(494670, 3799771, '', 'AMSnacks', 0),
(495904, 3356126, '', 'Lunch', 0),
(532857, 3381498, '', 'AMSnacks', 0),
(545298, 3799771, '', 'PMSnacks', 0),
(546405, 3455050, '', 'AMSnacks', 0),
(564027, 3614410, '', 'Breakfast', 0),
(569435, 3356126, '', 'AMSnacks', 0),
(570077, 3455050, '', 'PMSnacks', 0),
(581709, 3411200, '', 'Lunch', 0),
(590355, 3591155, '', 'Breakfast', 0),
(590571, 3755402, '', 'Dinner', 0),
(599132, 3380446, 'Ginisang Ampalaya', 'Dinner', 0),
(599966, 3381498, 'Adobo', 'Breakfast', 0),
(620180, 3371130, '', 'PMSnacks', 0),
(622123, 3876900, '', 'AMSnacks', 0),
(648422, 3528222, '', 'PMSnacks', 0),
(681231, 3835693, '', 'AMSnacks', 0),
(698897, 3411200, '', 'Breakfast', 0),
(746620, 3381498, '', 'PMSnacks', 0),
(761355, 3835693, 'Sinigang', 'Lunch', 0),
(764399, 3380446, '', 'Lunch', 0),
(782794, 3835693, 'Pork Chop', 'Dinner', 0),
(782918, 3799771, 'Sinigang', 'Lunch', 0),
(792399, 3614410, '', 'Dinner', 0),
(806251, 3614410, '', 'AMSnacks', 0),
(814375, 3591155, '', 'Lunch', 0),
(826892, 3380446, '', 'PMSnacks', 0),
(827538, 3455050, '', 'Dinner', 0),
(870203, 3528222, 'Adobo', 'Breakfast', 0),
(889194, 3356126, '', 'Dinner', 0),
(899973, 3381498, '', 'Dinner', 0),
(990641, 3885716, 'Adobo', 'Breakfast', 0);

-- --------------------------------------------------------

--
-- Table structure for table `meal_plan`
--

CREATE TABLE `meal_plan` (
  `id` int(11) NOT NULL,
  `meal_name_id` int(11) NOT NULL,
  `exchange_distribution` float NOT NULL,
  `food_id` int(11) NOT NULL,
  `household_measurement` varchar(100) NOT NULL,
  `syncData` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `meal_plan`
--

INSERT INTO `meal_plan` (`id`, `meal_name_id`, `exchange_distribution`, `food_id`, `household_measurement`, `syncData`) VALUES
(45, 345373, 1, 18, '1 cup ', 0),
(46, 345373, 1, 21, '1 cup ', 0),
(47, 345373, 1, 100, '4 ½ pcs', 0),
(48, 345373, 1, 142, '2 pcs', 0),
(49, 622123, 1, 22, '1 cup', 0),
(50, 622123, 1, 125, '1 slice', 0),
(51, 622123, 0, 505, '1 slice', 0),
(52, 313694, 1, 19, '1 cup', 0),
(53, 313694, 1, 102, '3 pcs', 0),
(54, 313694, 2, 136, '1/2 cup', 0),
(55, 313694, 1, 117, '½ cup', 0),
(56, 313694, 2, 183, '1 slice', 0),
(57, 199139, 1, 28, '1 cup', 0),
(58, 199139, 2, 127, '1 slice', 0),
(59, 199139, 1, 194, '1 pc', 0),
(60, 199139, 1, 214, '5 pcs', 0),
(61, 199139, 3, 226, '1-2 pcs', 0),
(62, 189437, 1, 19, '1 cup', 0),
(63, 189437, 1, 22, '1 cup', 0),
(64, 189437, 1, 100, '4 ½ pcs', 0),
(65, 189437, 1, 266, '2 segments', 0),
(66, 189437, 3, 353, '1/2 slice', 0),
(67, 870203, 1, 18, '1 cup ', 0),
(68, 870203, 1, 21, '1 cup ', 0),
(69, 870203, 1, 100, '4 ½ pcs', 0),
(70, 870203, 1, 142, '2 pcs', 0),
(71, 439443, 1, 22, '1 cup', 0),
(72, 439443, 1, 125, '1 slice', 0),
(73, 439443, 1, 505, '1 slice', 0),
(74, 282638, 1, 19, '1 cup', 0),
(75, 282638, 1, 102, '3 pcs', 0),
(76, 282638, 2, 136, '1/2 cup', 0),
(77, 282638, 1, 117, '½ cup', 0),
(78, 282638, 2, 183, '1 slice', 0),
(79, 648422, 1, 28, '1 cup', 0),
(80, 648422, 2, 127, '1 slice', 0),
(81, 648422, 1, 194, '1 pc', 0),
(82, 648422, 1, 214, '5 pcs', 0),
(83, 648422, 3, 226, '1-2 pcs', 0),
(84, 403601, 1, 19, '1 cup', 0),
(85, 403601, 1, 22, '1 cup', 0),
(86, 403601, 1, 100, '4 ½ pcs', 0),
(87, 403601, 1, 266, '2 segments', 0),
(88, 403601, 3, 353, '1/2 slice', 0),
(89, 465147, 1, 18, '1 cup', 0),
(90, 465147, 1, 32, '1 cup', 0),
(91, 465147, 1, 268, '1 slice', 0),
(92, 465147, 1, 118, '¼ cup', 0),
(93, 681231, 1, 102, '3 pcs', 0),
(94, 681231, 1, 132, '1 cup', 0),
(95, 681231, 2, 469, '1 tsp', 0),
(96, 761355, 1, 20, '1 cup ', 0),
(97, 761355, 1, 22, '1 cup ', 0),
(98, 761355, 1, 102, '3 pcs', 0),
(99, 761355, 1, 131, '1 cup', 0),
(100, 761355, 5, 357, '4 pcs', 0),
(101, 761355, 2, 383, '1 slice', 0),
(102, 265373, 1, 125, '1 slice', 0),
(103, 265373, 6, 155, '1 1/2 pcs', 0),
(104, 265373, 2, 227, '2 pcs', 0),
(105, 782794, 1, 22, '1 cup', 0),
(106, 782794, 2, 107, '1 pc', 0),
(107, 782794, 2, 202, '1/4 cup', 0),
(108, 782794, 2, 518, '1 1/2 slice', 0),
(239, 599966, 1, 21, '1 cup', 0),
(240, 599966, 0.5, 110, '½ cup', 0),
(241, 599966, 1.5, 173, '1 slice, mbs', 0),
(242, 599966, 2, 196, '2 pcs', 0),
(243, 532857, 5, 99, '1 pc', 0),
(244, 532857, 1, 154, '1 1/2 pcs', 0),
(245, 532857, 2, 209, '1 tsp', 0),
(246, 344759, 1, 19, '1 cup', 0),
(247, 344759, 2, 126, '6 pcs', 0),
(248, 746620, 7, 139, '3 cups', 0),
(249, 746620, 2, 150, '1 1/2 pcs', 0),
(250, 746620, 0.5, 181, '1 slice, mbs', 0),
(251, 746620, 2, 516, '1 pc', 0),
(252, 899973, 1, 19, '', 0),
(253, 899973, 2, 152, '1 pc', 0),
(254, 899973, 0.5, 112, '1 cup', 0),
(255, 899973, 2, 225, '5 pcs', 0),
(256, 435727, 1, 21, '.5 cup', 0),
(257, 435727, 1, 395, '1 slice, mbs', 0),
(258, 435727, 1, 471, '1 tsp', 0),
(259, 435727, 1, 190, '1 slice, mbs', 0),
(260, 435727, 2, 135, '1/2 cup', 0),
(261, 435727, 1, 114, '5 tbsp, level', 0),
(262, 435727, 1, 219, '1 tsp', 0),
(263, 435727, 2, 129, '1/2 slice', 0),
(264, 337094, 1, 373, '1 slice', 0),
(265, 337094, 1, 104, '½ cup', 0),
(266, 764399, 0.5, 22, '1/4 cup', 0),
(267, 826892, 2, 129, '1/2 slice', 0),
(268, 826892, 1, 99, '1 pc', 0),
(269, 826892, 1, 139, '3 cups', 0),
(270, 599132, 1.5, 19, '.75 cup', 0),
(271, 599132, 2, 135, '1/2 cup', 0),
(272, 599132, 1, 193, '1 pc', 0),
(273, 599132, 1, 223, '1 pc', 0),
(274, 564027, 4, 125, '1 slice', 0),
(275, 806251, 3, 19, '1 cup ', 0),
(276, 806251, 3, 193, '1 pc', 0),
(277, 435980, 5, 101, '2 pcs', 0),
(278, 435980, 2, 219, '1 tsp', 0),
(279, 361394, 4, 137, '1/2 cup', 0),
(280, 361394, 2, 169, '1 slice, mbs', 0),
(281, 792399, 3, 208, '', 0),
(282, 698897, 1, 387, '0.25 cup or 1 pc', 0),
(283, 444742, 0, 116, '1 cup', 0),
(284, 444742, 3, 123, '0.99 cup', 0),
(285, 444742, 3, 124, '6 pcs', 0),
(286, 385968, 1, 18, '1 cup', 0),
(287, 385968, 2, 126, '12 pcs', 0),
(288, 385968, 2, 125, '2 slice', 0),
(289, 990641, 1, 19, '1 cup', 0),
(290, 990641, 3, 125, '3 slice', 0),
(291, 990641, 3, 124, '6 pcs', 0),
(292, 990641, 1, 116, '1 cup', 0),
(293, 227052, 2, 127, '2 slice', 0),
(294, 338239, 1, 100, '4.5 pcs', 0),
(295, 330868, 2, 192, '2 slice, mbs', 0),
(296, 404025, 1, 21, '1 cup', 0),
(297, 203827, 1, 21, '1 cup', 0),
(298, 194753, 1, 100, '4.5 pcs', 0),
(299, 570077, 2, 192, '2 slice, mbs', 0),
(300, 827538, 1, 21, '1 cup', 0),
(301, 590355, 1, 21, '1 cup', 0),
(302, 814375, 1, 100, '4.5 pcs', 0),
(303, 354458, 2, 192, '2 slice, mbs', 0),
(304, 481539, 1, 21, '1 cup', 0),
(305, 251480, 1, 21, '1 cup', 0),
(306, 495904, 1, 100, '4.5 pcs', 0),
(307, 225874, 2, 192, '2 slice, mbs', 0),
(308, 889194, 1, 21, '1 cup', 0),
(309, 179387, 1, 19, '1/2 cup', 0),
(310, 179387, 1, 22, '1/2 cup', 0),
(311, 179387, 1, 100, '4.5 pcs', 0),
(312, 179387, 2, 125, '2 slice', 0),
(313, 179387, 1, 116, '1 cup', 0),
(314, 179387, 1, 219, '1 tsp', 0),
(315, 494670, 1, 21, '1/2 cup', 0),
(316, 494670, 1, 23, '1/2 cup', 0),
(317, 494670, 2, 142, '4 pcs', 0),
(318, 494670, 3, 175, '3 slice, mbs', 0),
(319, 494670, 2, 214, '10 pcs', 0),
(320, 782918, 1, 21, '1/2 cup', 0),
(321, 782918, 1, 23, '1/2 cup', 0),
(322, 782918, 1.5, 103, '3 cups', 0),
(323, 782918, 0.5, 127, '0.5 slice', 0),
(324, 782918, 1, 157, '1 pc', 0),
(325, 782918, 1, 225, '5 pcs', 0),
(326, 545298, 1, 20, '1/2 cup', 0),
(327, 545298, 2.5, 124, '5 pcs', 0),
(328, 545298, 1, 151, '1 pc', 0),
(329, 545298, 3, 193, '3 pc', 0),
(330, 363777, 1, 29, '1/2 cup', 0),
(331, 363777, 1, 30, '1/2 cup', 0),
(332, 363777, 0.5, 99, '0.5 pc', 0),
(333, 363777, 3, 137, '1.5 cup', 0),
(334, 363777, 3, 209, '3 tsp', 0);

-- --------------------------------------------------------

--
-- Table structure for table `meal_title`
--

CREATE TABLE `meal_title` (
  `id` int(11) NOT NULL,
  `exchanges_id` int(11) NOT NULL,
  `meal_title` varchar(250) NOT NULL,
  `syncData` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `meal_title`
--

INSERT INTO `meal_title` (`id`, `exchanges_id`, `meal_title`, `syncData`) VALUES
(3189132, 2558410, 'One day menu', 0),
(3218317, 2344980, '2nd day Meal Plan', 0),
(3261768, 2163329, '3rd day', 0),
(3287159, 2171345, 'Someone One Day Menu', 0),
(3297155, 2210712, 'Dhiskshsjs One Day Menu', 0),
(3356126, 2687948, '5th', 0),
(3371130, 2107181, '2nd day', 0),
(3380446, 2671682, 'Kier Karlo One Day Menu', 0),
(3381498, 2561173, 'Doggy One Day Menu', 0),
(3411200, 2107181, 'Odksjsks One Day Menu', 0),
(3455050, 2687948, '3rd day', 0),
(3528222, 2773932, 'Second Day', 0),
(3540188, 2669624, 'Jephthahhhhhhhh One Day Menu', 0),
(3591155, 2687948, '4th', 0),
(3614410, 2191206, 'Hello It\'s me One Day Menu', 0),
(3665063, 2299351, 'Hatdog', 0),
(3746424, 2299351, 'Lei One Day Menu', 0),
(3751504, 2658848, 'Grandpa Shark One Day Menu', 0),
(3755402, 2687948, 'John John Wick One Day Menu', 0),
(3773876, 2163329, 'JephthahLandichoJehosaphat One Day Menu', 0),
(3799771, 2554118, 'Jopay One Day Menu', 0),
(3835693, 2505566, 'Royal Kludge  One Day Menu', 0),
(3876900, 2773932, 'Alex One Day Menu', 0),
(3885716, 2687948, '2nd day', 0),
(3953192, 2344980, 'Elijah  One Day Menu', 0);

-- --------------------------------------------------------

--
-- Table structure for table `professor`
--

CREATE TABLE `professor` (
  `id` int(11) NOT NULL,
  `fullName` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `professor`
--

INSERT INTO `professor` (`id`, `fullName`, `email`, `username`, `password`, `profile_picture`) VALUES
(17, 'Jephthah', 'landichojjl@gmail.com', 'jephthah', '$2y$10$JyRe7d12rIdaebt/2HJvqeoRJyT1cW8C.uch7GEPbX7ElZzdmue7G', NULL),
(18, 'Wilgrace', 'wilg@gmail.com', 'Wilg', '$2y$10$j0OIxJS467M5KswAcjNFQOaeeasYUm4f5.oaJX1ih221T9kE.nUUS', NULL),
(19, 'Paolo D. Julongbayan', 'paolojulongbayan23@gmail.com', 'Paolo', '$2y$10$q7WFP22xl74Tfkc0DAunN.l8sejZZwXDptonJUHAo3Hr460Ba5bna', NULL),
(21, 'Jordan Jonson', 'jonsonjordan@gmail.com', 'jrdnpg', '$2y$10$/Xm1crRScl2SavLn1hgEUOa2xnQTLCZzSqSj5nrNQpnPWXhu5kBFO', NULL),
(28, 'Clarence Phol Bautista Andino', 'clarence@gmail.com', 'clarence5', '$2y$10$Il1dzhDH0vTHgEPNMP/LNudiuxsNL62TvXVGX0UemK6SA2uIeo1x6', NULL),
(29, 'Gojo Satoru', 'gojo@gmail.com', 'gojo', '$2y$10$A5u0Gz.vZDUsjfVMitiOS.7TCqDiZomVKpKedCnNL3wp4zCWzRM6i', NULL),
(30, 'pete', 'pete@gmail.com', 'pete', '$2y$10$nxh0v6SGuOqw.2ymPSPdK.zzgHJujq/IU8i858Y1qqEhNx26Rw4zW', NULL),
(32, 'Nobra', 'nobara@gmail.com', 'nobara', '$2y$10$o/cp5vijjlkWgw29jtoveODcNNYIG1fHvSHAtJ1FZ71vC8u0JB7Mi', NULL),
(35, '1', '1@gmail.com', '1', '$2y$10$b7zu0f8EXMCpyy1MZV/JfebJzpnEIb774vQfBjDwUiab1HaRKFo8e', '../profile_pictures/MV5BZjZiMGJkMTgtYzUzZi00YTM1LTg3NmEtMGQ1OTUyNDk1MmQ4XkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_FMjpg_UX1000_.jpg'),
(36, 'Joey Deleon', 'pepsi@gmail.com', 'Pepsi', '$2y$10$suDw9xsZU03AbKxJWQvFJOmDNrZKdDO7l.z3pSrET7g7IwVOjI.Sq', '../profile_pictures/images (10).jpeg');

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
(8, 'Wilgrace Ednaco', 'wilgrace@gmail.com', 'wilgrace', 'wilgrace'),
(9, 'We find ways', 'bdo@gmail.com', 'BDO', 'jephthah'),
(10, 'Sir Hatdog', 'Hatdog@gmail.com', 'Hatdog', 'Hatdoggg'),
(11, 'NutriWISE', 'nutriwise@gmail.com', 'nutriwise', 'nutriwise'),
(12, 'MyName', 'myname@gmail.com', 'myname', 'jephthah'),
(13, 'Kier Karlo G.Dela Luna', 'kierkarlo14@gmail.com', 'kiko', 'batstateuconahs'),
(14, 'Kier Karlo G.Dela Luna', 'kierkarlo14@gmail.com', 'kiko', 'batstateuconahs');

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
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`);

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
  ADD KEY `class_id` (`class_id`);

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
-- Indexes for table `exchange_distribution`
--
ALTER TABLE `exchange_distribution`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exchange_id` (`exchange_id`);

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
  ADD KEY `announcement_id` (`announcement_id`);

--
-- Indexes for table `meal`
--
ALTER TABLE `meal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meal_title_id` (`meal_title_id`);

--
-- Indexes for table `meal_plan`
--
ALTER TABLE `meal_plan`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meal_name_id` (`meal_name_id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `meal_title`
--
ALTER TABLE `meal_title`
  ADD PRIMARY KEY (`id`),
  ADD KEY `exchanges_id` (`exchanges_id`);

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
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=212;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT for table `class_schedule`
--
ALTER TABLE `class_schedule`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `exchange_distribution`
--
ALTER TABLE `exchange_distribution`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=527;

--
-- AUTO_INCREMENT for table `materials`
--
ALTER TABLE `materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `meal_plan`
--
ALTER TABLE `meal_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=335;

--
-- AUTO_INCREMENT for table `professor`
--
ALTER TABLE `professor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
-- Constraints for table `exchange_distribution`
--
ALTER TABLE `exchange_distribution`
  ADD CONSTRAINT `exchange_distribution_ibfk_1` FOREIGN KEY (`exchange_id`) REFERENCES `exchanges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `materials`
--
ALTER TABLE `materials`
  ADD CONSTRAINT `materials_ibfk_1` FOREIGN KEY (`announcement_id`) REFERENCES `announcement` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `meal`
--
ALTER TABLE `meal`
  ADD CONSTRAINT `meal_ibfk_1` FOREIGN KEY (`meal_title_id`) REFERENCES `meal_title` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `meal_plan`
--
ALTER TABLE `meal_plan`
  ADD CONSTRAINT `meal_plan_ibfk_1` FOREIGN KEY (`meal_name_id`) REFERENCES `meal` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `meal_plan_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `foods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `meal_title`
--
ALTER TABLE `meal_title`
  ADD CONSTRAINT `meal_title_ibfk_1` FOREIGN KEY (`exchanges_id`) REFERENCES `exchanges` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
