-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 28, 2023 at 05:59 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

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
-- Table structure for table `foods`
--

CREATE TABLE `foods` (
  `id` int(11) NOT NULL,
  `meal_name` varchar(255) DEFAULT NULL,
  `household_measure` varchar(255) DEFAULT NULL,
  `meal_weight` decimal(20,2) DEFAULT NULL,
  `meal_group` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `foods`
--

INSERT INTO `foods` (`id`, `meal_name`, `household_measure`, `meal_weight`, `meal_group`) VALUES
(18, 'Alagaw, Dahon', '', '0.00', 'Vegetable'),
(19, 'Ampalaya, dahon', '', '0.00', 'Vegetable'),
(20, 'Artichoke', '', '0.00', 'Vegetable'),
(21, 'Broccoli', '', '0.00', 'Vegetable'),
(22, 'Carrot', '', '0.00', 'Vegetable'),
(23, 'Gabi, dahon', '', '0.00', 'Vegetable'),
(24, 'Himbaba-o, bulaklak', '', '0.00', 'Vegetable'),
(25, 'Himbaba-o, dahon', '', '0.00', 'Vegetable'),
(26, 'Kabuti, sariwa', '', '0.00', 'Vegetable'),
(27, 'Kadyos, bunga', '', '0.00', 'Vegetable'),
(28, 'Kalabasa, bunga', '', '0.00', 'Vegetable'),
(29, 'Kalabasa, dahon', '', '0.00', 'Vegetable'),
(30, 'Kamansi, bunga', '', '0.00', 'Vegetable'),
(31, 'Kamansi, dahon', '', '0.00', 'Vegetable'),
(32, 'Katuray, dahon', '', '0.00', 'Vegetable'),
(33, 'Langka, hilaw', '', '0.00', 'Vegetable'),
(34, 'Malunggay, dahon', '', '0.00', 'Vegetable'),
(35, 'Paayap, bunga', '', '0.00', 'Vegetable'),
(36, 'Patani, bunga', '', '0.00', 'Vegetable'),
(37, 'Remolacha', '', '0.00', 'Vegetable'),
(38, 'Rimas, bunga', '', '0.00', 'Vegetable'),
(39, 'Saluyot, dahon', '', '0.00', 'Vegetable'),
(40, 'Sibuyas, ulo (Bombay, Tagalog)', '', '0.00', 'Vegetable'),
(41, 'Singkamas, bunga', '', '0.00', 'Vegetable'),
(42, 'Sitaw, bunga', '', '0.00', 'Vegetable'),
(43, 'Sitsaro', '', '0.00', 'Vegetable'),
(44, 'Togue', '', '0.00', 'Vegetable'),
(45, 'Ubod, niyog', '', '0.00', 'Vegetable'),
(46, 'Yakon', '', '0.00', 'Vegetable'),
(47, 'Asparagus, de lata', '1 cup', '100.00', 'Vegetable'),
(48, 'Mais, del lata', '2 pcs (8x1.5cm)', '75.00', 'Vegetable'),
(49, 'Garbansos, de lata', '1 tbsp', '15.00', 'Vegetable'),
(50, 'Gisantes(de lata, frozen)', '1 tbsp', '25.00', 'Vegetable'),
(51, 'Mixed vegetables (carrot, peas, and corn), frozen', '2 tbsp', '25.00', 'Vegetable'),
(52, 'Kabuti, de lata', '¼ cup', '110.00', 'Vegetable'),
(53, 'Kamatis, de lata', '3 tbsp', '50.00', 'Vegetable'),
(54, 'Tomato Juice, de lata', '¼ cup', '65.00', 'Vegetable'),
(55, 'Apulid, de lata', '4 pcs (2 cm diameter)', '40.00', 'Vegetable'),
(56, 'Abitsuwelas, bunga', '', '0.00', 'Vegetable'),
(57, 'Alfalfa sprouts', '', '0.00', 'Vegetable'),
(58, 'Alugbati, dahon', '', '0.00', 'Vegetable'),
(59, 'Ampalaya, bunga', '', '0.00', 'Vegetable'),
(60, 'Arugula', '', '0.00', 'Vegetable'),
(61, 'Asparagus', '', '0.00', 'Vegetable'),
(62, 'Baby corn/young corn', '', '0.00', 'Vegetable'),
(63, 'Baby corn/young corn', '', '0.00', 'Vegetable'),
(64, 'Bataw, bunga', '', '0.00', 'Vegetable'),
(65, 'Bok choy', '', '0.00', 'Vegetable'),
(66, 'Caulliflower', '', '0.00', 'Vegetable'),
(67, 'Kalabasa, bulaklak', '', '0.00', 'Vegetable'),
(68, 'Kale', '', '0.00', 'Vegetable'),
(69, 'Kamatis', '', '0.00', 'Vegetable'),
(70, 'Kamote, dahon', '', '0.00', 'Vegetable'),
(71, 'Kangkong, dahon', '', '0.00', 'Vegetable'),
(72, 'Katuray, bulaklak', '', '0.00', 'Vegetable'),
(73, 'Labanos', '', '0.00', 'Vegetable'),
(74, 'Labong', '', '0.00', 'Vegetable'),
(75, 'Letsugas, dahon at tangkay', '', '0.00', 'Vegetable'),
(76, 'Malunggay, bunga', '', '0.00', 'Vegetable'),
(77, 'Mustasa, dahon', '', '0.00', 'Vegetable'),
(78, 'Okra', '', '0.00', 'Vegetable'),
(79, 'Pako, dahon', '', '0.00', 'Vegetable'),
(80, 'Papaya, bunga, hilaw', '', '0.00', 'Vegetable'),
(81, 'Patola, bunga', '', '0.00', 'Vegetable'),
(82, 'Pechay Baguio', '', '0.00', 'Vegetable'),
(83, 'Pechay, dahon', '', '0.00', 'Vegetable'),
(84, 'Pipino', '', '0.00', 'Vegetable'),
(85, 'Puso ng saging, Butuan', '', '0.00', 'Vegetable'),
(86, 'Repolyo (berde, pula)', '', '0.00', 'Vegetable'),
(87, 'Sayote, bunga', '', '0.00', 'Vegetable'),
(88, 'Sayote, dahon', '', '0.00', 'Vegetable'),
(89, 'Seaweed (balbalulang, kulot, lato, lukot, pokpoklo)', '', '0.00', 'Vegetable'),
(90, 'Sigarilyas, bunga', '', '0.00', 'Vegetable'),
(91, 'Sili, lara', '', '0.00', 'Vegetable'),
(92, 'Singkamas, ugat', '', '0.00', 'Vegetable'),
(93, 'Sitaw, talbos', '', '0.00', 'Vegetable'),
(94, 'Spinach, dahon', '', '0.00', 'Vegetable'),
(95, 'Upo, bunga', '', '0.00', 'Vegetable'),
(96, 'Talinum, dahon', '', '0.00', 'Vegetable'),
(97, 'Talong', '', '0.00', 'Vegetable'),
(98, 'Alimuran', '13 pcs', '119.00', 'Fruit'),
(99, 'Atis', '1 pc', '100.00', 'Fruit'),
(100, 'Balimbing', '4 ½ pcs', '182.00', 'Fruit'),
(101, 'Bayabas, pula', '2 pcs', '61.00', 'Fruit'),
(102, 'Bayabas, puti', '3 pcs', '81.00', 'Fruit'),
(103, 'Bignay', '2 cups', '299.00', 'Fruit'),
(104, 'Blueberries', '½ cup', '84.00', 'Fruit'),
(105, 'Camachili', '7 pods', '110.00', 'Fruit'),
(106, 'Cherries, hinog', '7 pcs', '76.00', 'Fruit'),
(107, 'Chico', '1 pc', '54.00', 'Fruit'),
(108, 'Gatas, kalabaw', '¼ cup', '200.00', 'Milk'),
(109, 'Gatas, baka', '1 cup', '250.00', 'Milk'),
(110, 'Gatas, evaporada', '½ cup', '125.00', 'Milk'),
(111, 'Gatas, evaporada, filled', '½ cup', '125.00', 'Milk'),
(112, 'Gatas, kambing', '1 cup', '250.00', 'Milk'),
(113, 'Gatas, recombined', '¼ cup', '200.00', 'Milk'),
(114, 'Gatas, pulbos, filled, instant', '5 tbsp, level', '35.00', 'Milk'),
(115, 'Gatas, pulbos, full cream', '5 tbsp, level', '35.00', 'Milk'),
(116, 'Gatas, low fat', '1 cup', '250.00', 'Milk'),
(117, 'Yogurt', '½ cup', '150.00', 'Milk'),
(118, 'Buttermilk', '¼ cup', '180.00', 'Milk'),
(119, 'Gatas, skim', '1 cup', '250.00', 'Milk'),
(120, 'Gatas, pulbos, skim', '4 tbsp, level', '25.00', 'Milk'),
(121, 'Gatas, pulbos, non-fat, instant', '4 tbsp, level', '25.00', 'Milk'),
(122, 'Yogurt, plain, skim', '½ cup', '150.00', 'Milk'),
(123, 'Kanin, “protein-reduced”', '1/3 cup', '55.00', 'Rice A'),
(124, 'Ampaw, pinipig', '2 pcs', '25.00', 'Rice A'),
(125, 'Biko', '1 slice', '40.00', 'Rice A'),
(126, 'Cuchinta', '6 pcs', '60.00', 'Rice A'),
(127, 'Sapin-Sapin', '1 slice', '75.00', 'Rice A'),
(128, 'Cornstarch', '1/4 cup', '25.00', 'Rice A'),
(129, 'Maja Blanca', '1/2 slice', '65.00', 'Rice A'),
(130, 'Maja Mais', '1 slice', '75.00', 'Rice A'),
(131, 'Bihon', '1 cup', '100.00', 'Rice A'),
(132, 'Misua', '1 cup', '100.00', 'Rice A'),
(133, 'Sotanghon', '1 cup', '100.00', 'Rice A'),
(134, 'Sweet potato noodles', '1 cup', '100.00', 'Rice A'),
(135, 'Bigas, maputi, sinaing', '1/2 cup', '80.00', 'Rice B'),
(136, 'Bigas, mapula, sinaing', '1/2 cup', '80.00', 'Rice B'),
(137, 'Pinawa, sinaing', '1/2 cup', '80.00', 'Rice B'),
(139, 'Medium Consistency Lugaw (1/2 cup cooked rice + 3 cups water)', '3 cups', '435.00', 'Rice B'),
(140, 'Thin Consistency Lugaw (1/2 cup cooked rice + 5 cups water)', '4 1/2 cups', '705.00', 'Rice B'),
(141, 'Thick Consistency Lugaw (1/2 cup cooked rice + 2 cups water)', '1 1/2 cups', '250.00', 'Rice B'),
(142, 'Ampaw, rice', '2 pcs', '25.00', 'Rice B'),
(143, 'Bibingka, galapong', '1/2 slice', '45.00', 'Rice B'),
(144, 'Bibingka, malagkit', '1/2 slice', '40.00', 'Rice B'),
(145, 'Bibingka, pinipig', '1 slice', '50.00', 'Rice B'),
(146, 'Espasol', '1 slice', '35.00', 'Rice B'),
(147, 'Kalamay, may latik', '1 slice', '50.00', 'Rice B'),
(148, 'Kalamay, ube', '1 slice', '60.00', 'Rice B'),
(149, 'Palitaw, walang Niyog', '3 pcs', '50.00', 'Rice B'),
(150, 'Bread, wheat', '1 1/2 pcs', '40.00', 'Rice C'),
(151, 'Ensaymada', '1 pc', '35.00', 'Rice C'),
(152, 'Hamburger bun', '1 pc', '35.00', 'Rice C'),
(153, 'Hotdog roll', '1 pc', '35.00', 'Rice C'),
(154, 'Loaf bread/Pan Amerikano', '1 1/2 pcs', '35.00', 'Rice C'),
(155, 'Pan de bonete', '1 1/2 pcs', '35.00', 'Rice C'),
(156, 'Pan de leche', '1 1/2 pcs', '35.00', 'Rice C'),
(157, 'Pan de limon', '1 pc', '35.00', 'Rice C'),
(158, 'Pan de monay', '1/2 pc', '35.00', 'Rice C'),
(159, 'Pan de sal', '1 1/2 pcs', '35.00', 'Rice C'),
(160, 'Pita bread, white (enriched/unenriched)', '1/2 pc', '40.00', 'Rice C'),
(161, 'Pita bread, whole wheat', '1/2 pc', '40.00', 'Rice C'),
(162, 'Tinapay, tostado', '1 1/2 pcs', '30.00', 'Rice C'),
(163, 'Couscous', '1 cup', '100.00', 'Rice C'),
(164, 'Pasta (enriched/unenriched)', '1/2 cup', '70.00', 'Rice C'),
(165, 'Udon', '1 cup', '100.00', 'Rice C'),
(166, 'Balat ng lumpia', '7 pcs', '35.00', 'Rice C'),
(167, 'Langka, buto', '14 pcs', '75.00', 'Rice C'),
(168, 'Quinoa', '1 cup', '95.00', 'Rice C'),
(169, 'Beef kenchi', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(170, 'Beef laman', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(171, 'Beef pierna corta at pierca larga', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(172, 'Beef solomilyo', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(173, 'Beef tagiliran, gitna', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(174, 'Beef tagiliran, hulihan', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(175, 'Carabeef hita', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(176, 'Carabeef kenchi', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(177, 'Carabeef laman, bahagyang taba', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(178, 'Carabeef paypay', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(179, 'Carabeef pierta corta at pierna larga', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(180, 'Carabeef Tapadera', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(181, 'Pork lomo', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(182, 'Goat balikat', '1 slice', '40.00', 'Low Fat Meat'),
(183, 'Goat binti', '1 slice', '40.00', 'Low Fat Meat'),
(184, 'Goat biyas', '1 slice', '40.00', 'Low Fat Meat'),
(185, 'Goat dibdib', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(186, 'Goat leeg', '1 slice', '40.00', 'Low Fat Meat'),
(187, 'Goat likod', '1 slice', '40.00', 'Low Fat Meat'),
(188, 'Goat lomo', '1 slice, mbs', '35.00', 'Low Fat Meat'),
(189, 'Goat tadyang', '1 slice', '40.00', 'Low Fat Meat'),
(190, 'Beef paypay, laman', '1 slice, mbs', '35.00', 'Medium Fat Meat'),
(191, 'Beef punta y pecho', '1 slice, mbs', '35.00', 'Medium Fat Meat'),
(192, 'Pork pata', '1 slice, mbs', '35.00', 'Medium Fat Meat'),
(193, 'Chicken binti', '1 pc', '35.00', 'Medium Fat Meat'),
(194, 'Chicken hita', '1 pc', '35.00', 'Medium Fat Meat'),
(195, 'Chicken pakpak', '1 pc', '35.00', 'Medium Fat Meat'),
(196, 'Chicken ulo', '2 pcs', '50.00', 'Medium Fat Meat'),
(197, 'Duck hita', '1 pc', '35.00', 'Medium Fat Meat'),
(198, 'Duck likod', '1 slice', '30.00', 'Medium Fat Meat'),
(199, 'Duck pitso', '1 slice, mbs', '35.00', 'Medium Fat Meat'),
(200, 'Goat tiyan', '1 slice, mbs', '35.00', 'Medium Fat Meat'),
(201, 'Carabeef bitukang maliit', '1/4 cup', '35.00', 'Medium Fat Meat'),
(202, 'Beef goto', '1/4 cup', '85.00', 'Medium Fat Meat'),
(203, 'Pork/Beef/carabeef utak', '1/4 cup', '45.00', 'Medium Fat Meat'),
(204, 'Chicken whole egg', '1 pc medium', '55.00', 'Medium Fat Meat'),
(205, 'Duck whole salted egg', '1 pc medium', '55.00', 'Medium Fat Meat'),
(206, 'Quail egg', '7 pcs small', '55.00', 'Medium Fat Meat'),
(207, 'Fish karpa', '1/2 pc', '35.00', 'Medium Fat Meat'),
(208, 'Avocado', '', '65.00', 'Fat'),
(209, 'Olive oil', '1 tsp', '6.00', 'Fat'),
(210, 'Almond nuts', '7 pcs', '8.00', 'Fat'),
(211, 'Kasoy', '6 pcs, whole', '9.00', 'Fat'),
(212, 'Macadamia', '5 pcs', '7.00', 'Fat'),
(213, 'Mixed nuts', '1 tbsp', '7.00', 'Fat'),
(214, 'Pili nut', '5 pcs', '7.00', 'Fat'),
(215, 'Peanut Butter', '1/2 tbsp', '10.00', 'Fat'),
(216, 'Sunflower seeds', '1 tbsp', '8.00', 'Fat'),
(217, 'Patani seeds', '5 pcs', '10.00', 'Fat'),
(218, 'Shortening', '1 tsp', '5.00', 'Fat'),
(219, 'Arnibal', '1 tsp', '5.00', 'Sugar'),
(220, 'Asukal (muscovado, pula, puti)', '1 tsp', '5.00', 'Sugar'),
(221, 'Banana chips', '2 pcs', '5.00', 'Sugar'),
(222, 'Bukayo', '1 pc (2 cm diameter)', '5.00', 'Sugar'),
(223, 'Candy (caramel, hard, toffee)', '1 pc', '5.00', 'Sugar'),
(224, 'Champoy', '1 pc (2 cm diameter)', '5.00', 'Sugar'),
(225, 'Cherry, in syrup', '5 pcs', '20.00', 'Sugar'),
(226, 'Chewing gum, bubble gum', '1-2 pcs', '5.00', 'Sugar'),
(227, 'Chocolate', '2 pcs', '5.00', 'Sugar'),
(228, 'Coco sugar', '1 tsp', '5.00', 'Sugar'),
(229, 'Coco syrup', '1 tsp', '5.00', 'Sugar'),
(230, 'Dates, pitted', '1 pc', '5.00', 'Sugar'),
(231, 'Dikyam', '1 pc', '10.00', 'Sugar'),
(232, 'Dried jackfruit', '1 pc', '5.00', 'Sugar'),
(233, 'Dried kiwi', '1 pc', '5.00', 'Sugar'),
(234, 'Dried papaya chunks', '1 pc', '5.00', 'Sugar'),
(235, 'Dried pineapple', '1 pc', '5.00', 'Sugar'),
(236, 'Dulce de Leche', '2 pcs', '5.00', 'Sugar'),
(237, 'Gatas, sweetened, kondensada, filled', '1 tsp', '5.00', 'Sugar'),
(238, 'Gulaman, may lasang prutas', '1 pc', '15.00', 'Sugar'),
(239, 'Jam at jellies', '2 tsp', '10.00', 'Sugar'),
(240, 'Kiamoy', '2 pcs', '15.00', 'Sugar'),
(241, 'Leche Flan', '1 slice', '10.00', 'Sugar'),
(242, 'Lokum', '1 pc', '5.00', 'Sugar'),
(243, 'Marshmallow', '3 pcs', '5.00', 'Sugar'),
(244, 'Matamis na bao', '1 tsp', '5.00', 'Sugar'),
(245, 'Nata de coco/ nata de pina, sweetened', '1 tbsp', '15.00', 'Sugar'),
(246, 'Pakaskas/Panocha', '1 tsp', '5.00', 'Sugar'),
(247, 'Pasas', '1 tsp', '5.00', 'Sugar'),
(248, 'Pastilyas (durian, gatas, langka)', '1 pc', '5.00', 'Sugar'),
(249, 'Prunes', '2 pcs', '10.00', 'Sugar'),
(250, 'Pulot', '2 tsp', '10.00', 'Sugar'),
(251, 'Pulot-pukyutan', '1 tsp', '5.00', 'Sugar'),
(252, 'Sampalok, candied', '2 pcs', '5.00', 'Sugar'),
(253, 'Taho na may arnibal at sago', '1/4 cup', '40.00', 'Sugar'),
(254, 'Tira-tira', '1 pc', '5.00', 'Sugar'),
(255, 'Ice candy', '1 pc', '75.00', 'Sugar'),
(256, 'Ice drop', '1 pc', '40.00', 'Sugar'),
(257, 'Kundol, candied', '1 pc', '15.00', 'Sugar'),
(258, 'Polvoron', '1 pc', '10.00', 'Sugar'),
(259, 'Rimas, candied', '3 pcs', '35.00', 'Sugar'),
(260, 'Ubedol', '1 pc', '20.00', 'Sugar'),
(261, 'Yema', '1 pc', '25.00', 'Sugar'),
(262, 'Dalandan, (ladu,/szinkom)', '3 pcs', '344.00', 'Fruit'),
(263, 'Datiles/Aratiles', '1/4 cup or 25 pcs', '61.00', 'Fruit'),
(264, 'Dragon fruit', '1/2 cup or 1/4 pc', '119.00', 'Fruit'),
(265, 'Duhat', '12 pcs', '80.00', 'Fruit'),
(266, 'Durian', '2 segments', '150.00', 'Fruit'),
(267, 'Granada', '1/2 pc', '182.00', 'Fruit'),
(268, 'Guyabano', '1 slice', '107.00', 'Fruit'),
(269, 'Kasuy, bunga', '2 pcs', '78.00', 'Fruit'),
(270, 'Kaymito, berde', '1/2 pc', '123.00', 'Fruit'),
(271, 'Kaymito, murado', '1/2 pc', '103.00', 'Fruit'),
(272, 'Kiwifruit, berde', '1 pc', '99.00', 'Fruit'),
(273, 'Langka, hinog', '1 1/2 segments', '118.00', 'Fruit'),
(274, 'Lansones', '5 pcs', '118.00', 'Fruit'),
(275, 'Lechiyas/litchi', '4 pcs', '77.00', 'Fruit'),
(276, 'Longan', '13 pcs', '113.00', 'Fruit'),
(277, 'Mabolo', '1/2 pc', '100.00', 'Fruit'),
(278, 'Makopa', '9 pcs', '188.00', 'Fruit'),
(279, 'Mangga, Indian, hilaw', '1/2 cup or 1 pc', '140.00', 'Fruit'),
(280, 'Mangga, kalabaw, hilaw', '1/2 cup or 1 slice', '97.00', 'Fruit'),
(281, 'Mangga, kalabaw, manibalang', '1/2 cup or 1 slice', '97.00', 'Fruit'),
(284, 'Mangga, paho/pahutan, hilaw', '9 pcs', '79.00', 'Fruit'),
(285, 'Mangga, piko, hilaw', '1 slice', '82.00', 'Fruit'),
(286, 'Mangga, piko, hinog', '1 slice', '103.00', 'Fruit'),
(287, 'Mangga, piko, manibalang', '1 slice', '85.00', 'Fruit'),
(288, 'Mangga, supsupin, hinog', '1 pc', '94.00', 'Fruit'),
(289, 'Mangosteen', '2 pcs', '212.00', 'Fruit'),
(290, 'Mansanas, berde', '1 pc', '97.00', 'Fruit'),
(291, 'Mansanas, pula', '1 pc', '99.00', 'Fruit'),
(292, 'Marang', '10 pcs', '121.00', 'Fruit'),
(293, 'Milon, honey dew', '1/4 cup or 1 slice', '119.00', 'Fruit'),
(294, 'Milon, kastila', '1 1/4 cup or 1 slice', '317.00', 'Fruit'),
(295, 'Orange, Florida', '1/2 pc', '135.00', 'Fruit'),
(296, 'Orange, kiat kiat', '1 pc', '108.00', 'Fruit'),
(297, 'Orange, ponkan', '1 pc', '108.00', 'Fruit'),
(298, 'Pakwan', '1 cup or 1 slice', '242.00', 'Fruit'),
(299, 'Papaya, hinog', '1/4 cup or 1 slice', '141.00', 'Fruit'),
(300, 'Passion fruit', '1/4 cup or 2 pcs', '125.00', 'Fruit'),
(301, 'Peras', '1/4 cup or 1/2 pc', '130.00', 'Fruit'),
(302, 'Persimon', '1/2 pc', '105.00', 'Fruit'),
(303, 'Pinya', '1/2 cup or 1 slice', '138.00', 'Fruit'),
(304, 'Rambutan', '5 pcs', '153.00', 'Fruit'),
(305, 'Saging, bungulan', '1/2 pc', '60.00', 'Fruit'),
(306, 'Saging, cavendish, hinog', '1/2 pc', '63.00', 'Fruit'),
(307, 'Saging, gloria', '1/2 pc', '65.00', 'Fruit'),
(308, 'Saging, lakatan', '1/2 pc', '58.00', 'Fruit'),
(309, 'Saging, latundan', '1/2 pc', '55.00', 'Fruit'),
(310, 'Saging, murado', '1/2 pc', '60.00', 'Fruit'),
(311, 'Saging, saba', '1/2 pc', '70.00', 'Fruit'),
(312, 'Sampalok, hinog', '12 segments', '34.00', 'Fruit'),
(313, 'Santol', '1 pc', '110.00', 'Fruit'),
(314, 'Singkamas, ugat', '1 cup or 1 1/2 pcs', '230.00', 'Fruit'),
(315, 'Siniguwelas', '4 pcs', '78.00', 'Fruit'),
(316, 'Strawberry', '1 1/4 cups', '168.00', 'Fruit'),
(317, 'Suha', '2 segments or 1/4 pc', '156.00', 'Fruit'),
(318, 'Tiesa', '1/4 pc or 1 slice', '41.00', 'Fruit'),
(319, 'Ubas', '5 pcs / 12 pcs small', '69.00', 'Fruit'),
(320, 'Fresh lemon juice', '1/2 cup', '130.00', 'Fruit'),
(321, 'Fresh Coconut water', '1 cup', '240.00', 'Fruit'),
(322, 'Fresh orange juice', '1/3 cup', '90.00', 'Fruit'),
(323, 'Passion fruit juice', '1/4 cup', '65.00', 'Fruit'),
(324, 'Canned apple sauce', '4 tbsp', '60.00', 'Fruit'),
(325, 'Canned apple sauce unsweetened', '1/2 cup', '100.00', 'Fruit'),
(326, 'Blackberries, heavy syrup, solids and liquids', '1/4 cup or 9 pcs', '45.00', 'Fruit'),
(327, 'Blueberries, light syrup, drained', '1/4 cup or 29 pcs', '45.00', 'Fruit'),
(328, 'Fruit cocktail, tropical, in syrup', '1/4 cup', '45.00', 'Fruit'),
(329, 'Lychee in syrup', '4 pcs', '45.00', 'Fruit'),
(330, 'Peach halves in heavy syrup', '1 pc', '65.00', 'Fruit'),
(331, 'Pineapple crushed/tidbits/chunks ', '1/3 cup', '50.00', 'Fruit'),
(332, 'Pineapple slice', '1 ring', '40.00', 'Fruit'),
(333, 'Strawberrries, frozen, unsweetened', '1/4 cup or 26 pcs', '130.00', 'Fruit'),
(334, 'Strawberries, heavy syrup, solids and liquids', '1/4 cup or 7 pcs', '45.00', 'Fruit'),
(335, 'Dried champoy', '2 pcs', '10.00', 'Fruit'),
(336, 'Dried Dates', '2 pcs', '15.00', 'Fruit'),
(337, 'Dried dikyam', '2 pcs', '15.00', 'Fruit'),
(338, 'Dried mango chips', '2 pcs', '10.00', 'Fruit'),
(339, 'Dried prunes', '1 pc', '15.00', 'Fruit'),
(340, 'Dried Raisins', '2 tbsp', '15.00', 'Fruit'),
(341, 'Gabi rootcrop', '1/4 cup, cubes', '100.00', 'Rice A'),
(342, 'Kamote rootcrop (dilaw, murado, puti)', '	1 pc or 1/4 cup, cubed', '85.00', 'Rice A'),
(343, 'Kamoteng kahoy, balinghoy', '1 slice, or 1/4 cup, cubed', '85.00', 'Rice A'),
(344, 'Kamoteng kahoy, bibingka', '1 slice', '55.00', 'Rice A'),
(345, 'Kamoteng kahoy, linupak', '1 pc', '55.00', 'Rice A'),
(346, 'Kamoteng kahoy, pichi-pichi', '1 pc', '45.00', 'Rice A'),
(347, 'Kamoteng kahoy, suman', '1 pc', '45.00', 'Rice A'),
(348, 'Tugi', '1 pc or 1 1/4 cups, cubed', '150.00', 'Rice A'),
(349, 'Ubi', '1 cup, cubed', '130.00', 'Rice A'),
(350, 'Saging na saba, nilaga', '1 pc', '65.00', 'Rice A'),
(351, 'Sago, nilaga', '1/2 cup', '120.00', 'Rice A'),
(352, 'Sago, tapioca', '3/4 cup', '160.00', 'Rice A'),
(353, 'Puto, brown', '1/2 slice', '50.00', 'Rice B'),
(354, 'Puto bumbong', '2 pcs', '40.00', 'Rice B'),
(355, 'Puto maya', '1/2 slice ', '60.00', 'Rice B'),
(356, 'Puto, puti/Puto Calasiao', '3-4 pcs', '50.00', 'Rice B'),
(357, 'Puto seko', '4 pcs', '25.00', 'Rice B'),
(358, 'Puto seko, may niyog', '7 pcs', '25.00', 'Rice B'),
(359, 'Suman marwekos, may niyog', '1 pc', '50.00', 'Rice B'),
(360, 'Suman sa ibos', '1 pc', '60.00', 'Rice B'),
(361, 'Suman sa lihiya', '1/2 pc ', '55.00', 'Rice B'),
(362, 'Tamales', '2 pcs ', '100.00', 'Rice B'),
(363, 'Tikoy', '1 slice', '40.00', 'Rice B'),
(364, 'Tupig', '1 pc', '35.00', 'Rice B'),
(365, 'Apas', '7 pcs', '25.00', 'Rice B'),
(366, 'Brohas', '5 pcs', '25.00', 'Rice B'),
(367, 'Cake, mamon, tostado', '2 1/2 pcs', '25.00', 'Rice B'),
(368, 'Cuapao', '1/2 pc', '35.00', 'Rice B'),
(369, 'Hopyang hapon', '1 pc', '30.00', 'Rice B'),
(370, 'Marie', '8 pcs', '25.00', 'Rice B'),
(371, 'Pasencia', '7 pcs', '25.00', 'Rice B'),
(372, 'Pianono', '1 slice', '35.00', 'Rice B'),
(373, 'Sponge cake', '1 slice', '35.00', 'Rice B'),
(374, 'Binatog', '1/2 cup', '90.00', 'Rice B'),
(375, 'Corn flakes', '1/2 cup', '25.00', 'Rice B'),
(376, 'Mais, butil, de lata', '1 cup', '160.00', 'Rice B'),
(377, 'Mais, cream style, de lata', '1/2 cup', '130.00', 'Rice B'),
(378, 'Mais, durog (dilaw, puti)', '1 cup', '120.00', 'Rice B'),
(379, 'Mais sa busal', '1/2 pc', '65.00', 'Rice B'),
(380, 'Patatas rootcrop', '1 pc or 1 1/4 cups, cubed', '170.00', 'Rice B'),
(381, 'Kastanyas, binusa', '8 pcs', '40.00', 'Rice B'),
(382, 'Plantains', '1 pc', '80.00', 'Rice B'),
(383, 'Chicken laman', '1 slice', '30.00', 'Low Fat Meat'),
(384, 'Chciken pitso', '1 slice', '30.00', 'Low Fat Meat'),
(385, 'Duck pakpak', '1 pc', '30.00', 'Low Fat Meat'),
(386, 'Palaka, laman', '1 pc big or 2 pcs small', '30.00', 'Low Fat Meat'),
(387, 'Atay (pork, beef, carabeef, chicken)', '	1/4 cup or 1 pc', '30.00', 'Low Fat Meat'),
(388, 'Baga (pork, beef, carabeef)', '1/4 cup', '35.00', 'Low Fat Meat'),
(389, 'Balun-balunan (chicken, duck)', '1/4 cup or 4 pcs	', '25.00', 'Low Fat Meat'),
(390, 'Bato(pork, beef, carabeef)', '1/2 cup', '45.00', 'Low Fat Meat'),
(391, 'Bitukang maliit ', '2 sticks', '20.00', 'Low Fat Meat'),
(392, 'Dugo (pork, beef, chicken', '1/4 cup', '35.00', 'Low Fat Meat'),
(393, 'Lapay (pork, beef, carabeef)', '1/2 cup', '45.00', 'Low Fat Meat'),
(394, 'Librilyo (beef, carabeef)', '1/2 cup', '50.00', 'Low Fat Meat'),
(395, 'Litid (beef)', '1 slice, mbs', '30.00', 'Low Fat Meat'),
(396, 'Puso (pork, beef, carabeef)', '1/4 cup', '25.00', 'Low Fat Meat'),
(397, 'Alumahan', '1/2 pc', '35.00', 'Low Fat Meat'),
(398, 'Bakokong moro', '1/2 slice', '40.00', 'Low Fat Meat'),
(399, 'Bangus', '1 slice', '35.00', 'Low Fat Meat'),
(400, 'Dalag ', '1/2 slice', '40.00', 'Low Fat Meat'),
(401, 'Dalagang bukid', '1/2 pc', '35.00', 'Low Fat Meat'),
(402, 'Dilis, buo', '1/3 cup', '35.00', 'Low Fat Meat'),
(403, 'Dilis, walang ulo', '1/4 cup', '25.00', 'Low Fat Meat'),
(404, 'Dulong', '1/2 cup', '50.00', 'Low Fat Meat'),
(405, 'Galunggong', '1 pc', '35.00', 'Low Fat Meat'),
(406, 'Hasa-hasa', '1 pc', '35.00', 'Low Fat Meat'),
(407, 'Hito', '1 slice', '35.00', 'Low Fat Meat'),
(408, 'Labahita', '1/2 slice', '40.00', 'Low Fat Meat'),
(409, 'Matang baka', '1 pc', '35.00', 'Low Fat Meat'),
(410, 'Sapsap', '2 pcs', '35.00', 'Low Fat Meat'),
(411, 'Saramulyete', '1 pc', '35.00', 'Low Fat Meat'),
(412, 'Tambakol', '1/2 slice', '35.00', 'Low Fat Meat'),
(413, 'Tamban', '1 1/2 pcs', '35.00', 'Low Fat Meat'),
(414, 'Tawilis', '2 pcs', '30.00', 'Low Fat Meat'),
(415, 'Tilapia', '1/2 slice', '35.00', 'Low Fat Meat'),
(416, 'Tulingan', '1/2 slice', '35.00', 'Low Fat Meat'),
(417, 'Alimango, alige', '1 tbsp', '15.00', 'Low Fat Meat'),
(418, 'Alimango, laman', '1/3 cup or 1/2 pc', '50.00', 'Low Fat Meat'),
(419, 'Alimasag, alige', '2 1/2 tbsp', '25.00', 'Low Fat Meat'),
(420, 'Alimasag, laman', '1/3 cup or 1 pc', '40.00', 'Low Fat Meat'),
(421, 'Balatan', '6 pcs', '120.00', 'Low Fat Meat'),
(422, 'Pugita', '', '40.00', 'Low Fat Meat'),
(423, 'Pusit', '2 pcs', '50.00', 'Low Fat Meat'),
(424, 'Talangka', '6 pcs', '25.00', 'Low Fat Meat'),
(425, 'Hipon, alamang', '1/3 cup', '40.00', 'Low Fat Meat'),
(426, 'Hipon, sugpo', '1/2 pc', '40.00', 'Low Fat Meat'),
(427, 'Hipon, suwahe', '4 pcs', '40.00', 'Low Fat Meat'),
(428, 'Hipon, tagunton', '', '40.00', 'Low Fat Meat'),
(429, 'Hipon, ulang', '40', '0.00', 'Low Fat Meat'),
(430, 'Batotoy', '1/2 cup or 4 pcs', '60.00', 'Low Fat Meat'),
(431, 'Lapas/ Kapinan', '2-3 pcs', '30.00', 'Low Fat Meat'),
(432, 'Paros', '1/3 cup or 12 pcs', '60.00', 'Low Fat Meat'),
(433, 'Tuway', '2 1/2 cup (w/shells) or 1/4 cup (w/o shells) or 22 pcs', '45.00', 'Low Fat Meat'),
(434, 'Cottage', '1/3 cup', '50.00', 'Low Fat Meat'),
(435, 'Tuna flakes, in brine', '1/4 cup', '45.00', 'Low Fat Meat'),
(436, 'Alakaak', '8 pcs', '25.00', 'Low Fat Meat'),
(437, 'Alumahan', '2 pcs', '25.00', 'Low Fat Meat'),
(438, 'Bakalaw', '2 pcs', '25.00', 'Low Fat Meat'),
(439, 'Bisugo', '1 pc', '25.00', 'Low Fat Meat'),
(440, 'Biyang puti', '11 pcs small', '25.00', 'Low Fat Meat'),
(441, 'Lapu-lapu', '1 pc', '25.00', 'Low Fat Meat'),
(442, 'Malasug/Espada', '3 1/2 pcs', '20.00', 'Low Fat Meat'),
(443, 'Sapsap', '7 pcs', '25.00', 'Low Fat Meat'),
(444, 'Tamban', '2 pcs', '25.00', 'Low Fat Meat'),
(445, 'Tanigi/Tangigi', '', '25.00', 'Low Fat Meat'),
(446, 'Tilapia', '1 pc', '25.00', 'Low Fat Meat'),
(447, 'Alamang', '1/2 cup', '15.00', 'Low Fat Meat'),
(448, 'Ayunin', '', '15.00', 'Low Fat Meat'),
(449, 'Dilis', '13 pcs', '15.00', 'Low Fat Meat'),
(450, 'Hibe', '4 tbsp', '25.00', 'Low Fat Meat'),
(451, 'Pusit dried', '2 pcs', '15.00', 'Low Fat Meat'),
(452, 'Sapsap dried', '4 pcs', '20.00', 'Low Fat Meat'),
(453, 'Tamban dried', '2 pcs', '20.00', 'Low Fat Meat'),
(454, 'Smoked galunggong', '1/2 pc', '25.00', 'Low Fat Meat'),
(455, 'Smoked tamban', '3 pcs', '25.00', 'Low Fat Meat'),
(456, 'Smoked tunsoy', '3 pcs', '25.00', 'Low Fat Meat'),
(457, 'Processed cheddar, pasteurized', '1 slice', '30.00', 'Medium Fat Meat'),
(458, 'Processed/smoked bangus', '1 slice', '30.00', 'Medium Fat Meat'),
(459, 'Canned salmon sa mantika', '3 slices', '45.00', 'Medium Fat Meat'),
(460, 'Canned sardinas sa tomato', '2 pcs', '80.00', 'Medium Fat Meat'),
(461, 'Canned tuna spread', '2 tbsp', '25.00', 'Medium Fat Meat'),
(462, 'Canned carne norte', '1/4 cup', '45.00', 'Medium Fat Meat'),
(463, 'Canned sausage, ham', '2 pcs', '55.00', 'Medium Fat Meat'),
(464, 'Processed tofu', '1/2 cup', '100.00', 'Medium Fat Meat'),
(465, 'Processed tokwa', '1 pc', '70.00', 'Medium Fat Meat'),
(466, 'Processed chick, one day-old, fried', '2 pcs', '35.00', 'Medium Fat Meat'),
(467, 'Processed manok paa, barbecue', '4 pcs (CAP)', '35.00', 'Medium Fat Meat'),
(468, 'Processed manok ulo, barbecue', '3 pcs', '35.00', 'Medium Fat Meat'),
(469, 'Aseyte', '1 tsp', '5.00', 'Fat'),
(470, 'Fish oil, cod liver', '1 tsp', '5.00', 'Fat'),
(471, 'Mantika/langis (canola, corn, flaxseed, sesame,soybean, sunflower', '1 tsp', '5.00', 'Fat'),
(472, 'Walnut', '2 pcs', '7.00', 'Fat'),
(473, 'Flaxseed seeds', '2 1/2 tsp', '8.00', 'Fat'),
(474, 'Kalabasa seeds', '1 tbsp', '10.00', 'Fat'),
(475, 'Linga seeds', '1 tbsp', '8.00', 'Fat'),
(476, 'Pakwan seeds', '1 1/2 tbsp', '10.00', 'Fat'),
(477, 'Bacon', '1 strip', '10.00', 'Fat'),
(478, 'Cream cheese', '1 tbsp', '15.00', 'Fat'),
(479, 'Cream, all purpose', '1 tbsp', '15.00', 'Fat'),
(480, 'Cream, fluid, whipping (heavy, light)', '1 tbsp', '15.00', 'Fat'),
(481, 'Cream, whipped', '', '20.00', 'Fat'),
(482, 'Krema', '4 tsp', '20.00', 'Fat'),
(483, 'Lard', '1 tsp', '5.00', 'Fat'),
(484, 'Latik', '2 tsp', '10.00', 'Fat'),
(485, 'Mantekilya', '1 tsp', '5.00', 'Fat'),
(486, 'Mantekilya light', '2 tsp', '10.00', 'Fat'),
(487, 'Mantika/Langis, niyog', '1 tsp', '5.00', 'Fat'),
(488, 'Mantika/Langis, niyog(virgin, extra virgin)', '1 tsp', '5.00', 'Fat'),
(489, 'Mantika, palm', '1 tsp', '5.00', 'Fat'),
(490, 'Margarine', '1 tsp', '5.00', 'Fat'),
(491, 'Mayonnaise', '1 tsp', '5.00', 'Fat'),
(492, 'Mayonnaise, diet', '4 tsp', '20.00', 'Fat'),
(493, 'Mayonnaise, light', '1 tbsp', '15.00', 'Fat'),
(494, 'Niyog, magulang', '4 tsp', '20.00', 'Fat'),
(495, 'Niyog, kakang gata', '1 tbsp', '15.00', 'Fat'),
(496, 'Salad dressing', '2 tsp', '10.00', 'Fat'),
(497, 'Sandwich spread', '1 tbsp', '15.00', 'Fat'),
(498, 'Sitsarong baboy/sitsarong balat', '5 pcs', '10.00', 'Fat'),
(499, 'Sour cream', '5 tsp', '25.00', 'Fat'),
(500, 'Beef tallow', '1 tsp', '5.00', 'Fat');

-- --------------------------------------------------------

--
-- Table structure for table `prof_form`
--

CREATE TABLE `prof_form` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prof_form`
--

INSERT INTO `prof_form` (`id`, `email`, `password`) VALUES
(1, 'joelapuk11@gmail.com', '099b3b060154898840f0ebdfb46ec78f'),
(2, 'joelapuk11@gmail.com', '4124bc0a9335c27f086f24ba207a4912'),
(3, 'kimbe@gmail.com', 'dc468c70fb574ebd07287b38d0d0676d'),
(4, 'cangelo@gmail.com', '78014beca8b9d99cafc99ed49c1e0287'),
(5, 'kimber@gmail.com', '4124bc0a9335c27f086f24ba207a4912'),
(6, 'joelapuk11@gmail.com', '4297f44b13955235245b2497399d7a93'),
(7, '11@gmail.com', '6512bd43d9caa6e02c990b0a82652dca');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `foods`
--
ALTER TABLE `foods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `prof_form`
--
ALTER TABLE `prof_form`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `foods`
--
ALTER TABLE `foods`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=501;

--
-- AUTO_INCREMENT for table `prof_form`
--
ALTER TABLE `prof_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;