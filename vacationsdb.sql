-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 21, 2022 at 02:51 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacationsdb`
--
CREATE DATABASE IF NOT EXISTS `vacationsdb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacationsdb`;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `userName` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0,
  `followV` varchar(1000) DEFAULT '[]'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstName`, `lastName`, `userName`, `password`, `isAdmin`, `followV`) VALUES
(1, 'Lital', 'Ackerman', 'lital', 'lala432', 1, '[]'),
(27, 'moti', 'ackerman', 'moti', 'mot497', 0, '[134]'),
(45, 'Rivka', 'Nadav', 'Rivkana', 'riv671', 0, '[131,126]');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(150) NOT NULL,
  `image` varchar(100) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `followers` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `destination`, `description`, `image`, `startDate`, `endDate`, `price`, `followers`) VALUES
(126, 'Brazil', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta tempore, enim deleniti debitis autem nemo tenetur possimus ea dolores aliquid, atque o', 'Brazil.jpg', '2022-12-27', '2023-01-01', 900, 24),
(127, 'Israel', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta tempore, enim deleniti debitis autem nemo tenetur possimus ea dolores aliquid, atque o', 'israel.jpg', '2022-12-25', '2022-12-30', 2000, 15),
(128, 'Dubai', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta tempore, enim deleniti debitis autem nemo tenetur possimus ea dolores aliquid, atque o', 'Dubai.jpg', '2023-01-29', '2023-02-08', 450, 18),
(129, 'Australia', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta tempore, enim deleniti debitis autem nemo tenetur possimus ea dolores aliquid, atque o', 'Australia.jpg', '2023-03-26', '2023-03-30', 890, 3),
(130, 'China', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta tempore, enim deleniti debitis autem nemo tenetur possimus ea dolores aliquid, atque o', 'topic-china-gettyimages-565786575.jpg', '2023-02-06', '2023-02-15', 4500, 10),
(131, 'Africa', 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta tempore, enim deleniti debitis autem nemo tenetur possimus ea dolores aliquid, atque o', 'Sout-Africa.jpg', '2022-12-25', '2023-01-05', 6500, 46);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=136;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
